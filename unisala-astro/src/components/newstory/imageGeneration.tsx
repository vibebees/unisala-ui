import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TextareaAutoGrow } from '@/components/ui/textarea';
import { Loader2, Image as ImageIcon, Send, RefreshCw } from 'lucide-react';

// Simple Card components
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
);

const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-3 ${className}`}>{children}</div>
);

const Text2ImagePanel = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([
    {
      url: "https://d1f4xt2gnrpjhx.cloudfront.net/unisala-a-beautiful-women-who-looks-ve-1730074758771-1995a444.png",
      prompt: "A beautiful women who looks very attractive"
    }
  ]);
  const [error, setError] = useState('');

  const handlePromptChange = (content: string) => {
    setPrompt(content);
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `generateImage(prompt:"${prompt}")`,
        }),
      });

      const data = await response.json();

      if (data.data?.generateImage?.status?.success) {
        setGeneratedImages([
          { url: data.data.generateImage.data.imageUrl, prompt },
          ...generatedImages.slice(0, 4),
        ]);
      } else {
        setError('Failed to generate image');
      }
    } catch (err) {
      setError('An error occurred while generating the image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">

      {/* Prompt Input */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <TextareaAutoGrow
          placeholder="Describe the image you want to generate..."
          value={prompt}
          className="min-h-[100px] mb-2 resize-none w-full"
          draftId="text2img"
          onContentChange={handlePromptChange}
          maxHeight="200px"
        />
        <div className="flex justify-between items-center gap-2">
          <Button
            onClick={handleGenerateImage}
            disabled={isLoading || !prompt.trim()}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Generate
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setPrompt('');
              handlePromptChange('');
            }}
            disabled={!prompt.trim()}
            className="px-3"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Generated Images */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-4">
          {generatedImages.map((image, index) => (
            <Card key={index}>
              <CardContent>
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="w-full h-48 object-cover"
                />
              </CardContent>
              <CardFooter className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900">
                {image.prompt}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Text2ImagePanel;