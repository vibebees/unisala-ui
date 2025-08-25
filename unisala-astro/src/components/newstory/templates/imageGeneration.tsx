import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Image as ImageIcon, Send, RefreshCw, FileText, Check } from 'lucide-react';
import { useAstroQuery } from '@/datasource/apollo-client';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { getGenerateImage } from '@/datasource/graphql/user';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'react-hot-toast';

interface Image {
  url: string;
  prompt: string;
}

const insertImageUrl = (imageUrl: string, savedRange: Range | null) => {
  try {
    const editor = document.querySelector('.ql-editor');
    if (!editor) {
      console.error('No editor found');
      return false;
    }

    // Get Quill instance
    let quill = null;
    const container = editor.closest('.quill');
    if (container) {
      quill = (container as any).__reactProps$?.children?.props?.quill;
    }

    if (!quill) {
      quill = (window as any).quill;
    }

    if (quill) {
      // If we have saved range, convert it to Quill index
      if (savedRange) {
        const rangeIndex = quill.getLength() - 1; // Default to end
        try {
          // Temporarily restore the range to get its position
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(savedRange);
            const newRange = quill.getSelection();
            if (newRange) {
              quill.insertEmbed(newRange.index, 'image', imageUrl);
              quill.setSelection(newRange.index + 1, 0);
              return true;
            }
          }
        } catch (e) {
          console.error('Error restoring range:', e);
        }
      }
      
      // Fallback: Insert at current selection or end
      const range = quill.getSelection(true) || { index: quill.getLength() - 1, length: 0 };
      quill.insertEmbed(range.index, 'image', imageUrl);
      quill.setSelection(range.index + 1, 0);
    } else {
      // DOM Fallback with saved range
      const img = document.createElement('img');
      img.src = imageUrl;
      img.style.maxWidth = '100%';
      img.classList.add('loading');
      
      img.onload = () => {
        img.classList.remove('loading');
      };
      
      img.onerror = () => {
        console.error('Failed to load image:', imageUrl);
        img.remove();
      };
      
      if (savedRange && editor.contains(savedRange.commonAncestorContainer)) {
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(savedRange);
          savedRange.insertNode(img);
          savedRange.collapse(false);
        }
      } else {
        editor.appendChild(img);
      }
      
      editor.dispatchEvent(new Event('input', { bubbles: true }));
    }

    return true;
  } catch (error) {
    console.error('Error inserting image:', error);
    return false;
  }
};

interface ImageCardProps {
  image: Image;
  isLoading: boolean;
  onUseInEditor: (url: string) => Promise<void>;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, isLoading, onUseInEditor }) => {
  const [isInserting, setIsInserting] = useState(false);

  const handleUseInEditor = async () => {
    setIsInserting(true);
    try {
      await onUseInEditor(image.url);
      toast.success('Image added to editor');
    } catch (error) {
      console.error('Error inserting image:', error);
      toast.error('Failed to add image to editor');
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="relative w-full h-[400px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <img
            src={image.url}
            alt={image.prompt}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {image.prompt}
        </p>
        <Button 
          onClick={handleUseInEditor}
          className="w-full"
          variant="outline"
          disabled={isLoading || isInserting}
        >
          {isInserting ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added to Editor
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Use in Editor
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const Text2ImageModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<Image[]>([]);
  const [savedRange, setSavedRange] = useState<Range | null>(null);
  
  const { loading: queryLoading, refetch } = useAstroQuery(getGenerateImage, {
    context: { server: USER_SERVICE_GQL },
    skip: true,
    fetchPolicy: "no-cache",
    onError: (error: any) => {
      console.error('Query error:', error);
      toast.error('Failed to generate image. Please try again.');
      setError('Failed to generate image. Please try again.');
      setIsGenerating(false);
    }
  });

  const handleOpenModal = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0).cloneRange());
    }
    setIsOpen(true);
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for the image');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const { data, errors } = await refetch({
        prompt: prompt.trim(),
      });

      if (errors) {
        throw new Error(errors[0]?.message || 'Failed to generate image');
      }

      if (data?.generateImage?.status?.success) {
        const newImage = {
          url: data.generateImage.data.imageUrl,
          prompt: prompt.trim()
        };
        
        setGeneratedImages(prev => [newImage, ...prev]);
        toast.success('Image generated successfully!');
      } else {
        throw new Error(data?.generateImage?.status?.message || 'Failed to generate image');
      }
    } catch (err) {
      console.error('Image generation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while generating the image';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseInEditor = async (imageUrl: string): Promise<void> => {
    try {
      const success = insertImageUrl(imageUrl, savedRange);
      if (success) {
        setIsOpen(false);
        setSavedRange(null);  // Clear saved range after successful insertion
      } else {
        throw new Error('Failed to insert image');
      }
    } catch (error) {
      console.error('Error using image in editor:', error);
      toast.error('Failed to add image to editor');
      throw error;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && prompt.trim()) {
      handleGenerateImage();
    }
  };

  const clearForm = () => {
    setPrompt('');
    setError(null);
  };

  const isLoading = isGenerating || queryLoading;

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className="w-full flex items-center gap-2 text-gray-500 dark:text-gray-400"
        variant="outline"
      >
        <ImageIcon className="w-4 h-4" />
        Generate Image
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Generate Image</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col flex-1 min-h-0">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe the image you want to generate..."
                  className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleGenerateImage}
                  disabled={isLoading || !prompt.trim()}
                  className="min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={clearForm}
                  disabled={!prompt.trim() || isLoading}
                  className="px-3"
                  title="Clear input"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>

              {error && (
                <div className="mt-2 p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 dark:text-red-400 rounded-md">
                  {error}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 gap-6">
                {isGenerating && (
                  <ImageCard
                    image={{ url: '', prompt: prompt.trim() }}
                    isLoading={true}
                    onUseInEditor={handleUseInEditor}
                  />
                )}
                
                {generatedImages.map((image, index) => (
                  <ImageCard
                    key={`${image.url}-${index}`}
                    image={image}
                    isLoading={false}
                    onUseInEditor={handleUseInEditor}
                  />
                ))}

                {!isGenerating && generatedImages.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No images generated yet. Enter a description and click Generate to create an image.
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Text2ImageModal;