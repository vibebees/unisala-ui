import { useAstroMutation } from '@/datasource/apollo-client';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import toast from 'react-hot-toast';
import { Button } from '../../ui/button';
import { ADD_NOTES } from '@/datasource/graphql/user';
import { getCache } from '@/utils/cache';
import { navigator } from '@/utils/lib/URLupdate';

// Types
interface Note {
    postTitle: string;
    postText: string;
    createdAt: string;
    updatedAt: string;
}

interface AddNotesResponse {
    addNotes: {
        status: {
            success: boolean;
            message: string;
        }
    }
}


// Custom hook for managing notes mutation
export const useAddNotes = () => {
    const [addNotesMutation] = useAstroMutation<AddNotesResponse>(ADD_NOTES, {
        context: { server: USER_SERVICE_GQL },
        onCompleted: (data: { addNotes: { status: { success: any; }; }; }) => {
            if (data.addNotes.status.success) {
                toast.success('Notes saved successfully!');
                // Clear the drafts from localStorage after successful save
                // localStorage.removeItem('storyDrafts');
            }
        },
        onError: (error: any) => {
            console.error('Error saving notes:', error);
            toast.error('Failed to save notes. Please try again.');
        },
    });

    const saveNotes = async (draftId:string) => {
        try {
            const authData: { accessToken?: string, authenticated?: boolean } | null = getCache('authData') || {} as { accessToken?: string };
            const accessToken = authData?.authenticated;
            if (!accessToken) {
                navigator('/auth?redirect=/new-story?id=' + draftId);
            }

            // Get drafts from cache
            const drafts = getCache('storyDrafts');
            if (!drafts) {
                toast.error('No drafts found to save');
                return;
            }



            // Execute mutation with objects array
            await addNotesMutation({
                variables: {
                    notes: JSON.stringify(drafts)
                }
            });

        } catch (error) {
            console.error('Error in saveNotes:', error);
            toast.error('Failed to save notes. Please try again.');
        }
    };


    return { saveNotes };
};

// Usage Example Component
interface SaveNotesButtonProps {
    draftId: string;
    onClose: () => void;
}

export const SaveNotesButton: React.FC<SaveNotesButtonProps> = ({
    draftId,
    onClose
}) => {

    const { saveNotes } = useAddNotes();


    return (
        <Button
            onClick={() =>{
                 saveNotes(draftId)
                 onClose()
                }}
            className="bg-orange-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
              Save on my profile only
        </Button>
    );
};