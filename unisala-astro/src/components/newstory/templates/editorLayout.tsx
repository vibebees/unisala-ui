import type { TopicOptions } from "@/types/post";
import { MainEditor } from "../molecules/mainEditor";
import BottomNavigationBar from "../organisms/bottomNavigationBar";
import VisualAidPanel from "../organisms/visualAidPanels";
import PreviewModal from "./storyPreviewModal";
import DashboardMetrics from "../organisms/dashboard";




interface EditorLayoutProps {
    draftId: string;
    draftTitle: string;
    draftContent: string;
    onTitleChange: (title: string) => void;
    onContentChange: (content: string) => void;
    showImagePanel: boolean;
    setShowImagePanel: (show: boolean) => void;
    activeTab: 'editor' | 'visual';
    setActiveTab: (tab: 'editor' | 'visual') => void;
    showPreview: boolean;
    setShowPreview: (show: boolean) => void;
    hasDrafts: boolean;
    hasPosts: boolean;
    handlePublish: (topics: TopicOptions[], imageUrl: string | null, isPublic: boolean) => Promise<boolean>;
    topics: TopicOptions[];
    setTopics: (topics: TopicOptions[], imageUrl: string | null) => void;
    isDashboardCollapsed: boolean;
    setIsDashboardCollapsed: (isCollapsed: boolean) => void;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
    draftId,
    draftTitle,
    draftContent,
    onTitleChange,
    onContentChange,
    showImagePanel,
    setShowImagePanel,
    activeTab,
    setActiveTab,
    showPreview,
    setShowPreview,
    hasDrafts,
    hasPosts,
    handlePublish,
    topics,
    setTopics,
    isDashboardCollapsed,
    setIsDashboardCollapsed,
}) => (
    <div className="dark:text-black dark:text-white relative min-h-screen">
        <BottomNavigationBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setShowPreview={setShowPreview}
            hasDrafts={hasDrafts}
            hasPosts={hasPosts}
        />
        <div className="flex h-[calc(100vh-64px)]">
            <div className={`flex-1 px-4 py-6 transition-all duration-300 ${showImagePanel ? 'mr-[400px]' : ''}`}>
                <DashboardMetrics
                    isDashboardCollapsed={isDashboardCollapsed}
                    setIsDashboardCollapsed={setIsDashboardCollapsed}
                />
                <div className="max-w-4xl mx-auto">
                    <MainEditor
                        draftId={draftId}
                        draftTitle={draftTitle}
                        draftContent={draftContent}
                        onTitleChange={onTitleChange}
                        onContentChange={onContentChange}
                        panelLayout="split"
                    />
                </div>
            </div>
            <VisualAidPanel showImagePanel={showImagePanel} setShowImagePanel={setShowImagePanel} />
        </div>
        {showPreview && (
            <PreviewModal
                postDraft={{ title: draftTitle, postText: draftContent }}
                onClose={() => setShowPreview(false)}
                onPublish={handlePublish}
                topics={topics}
                setTopics={(topics) => setTopics(topics, null)}
                draftId={draftId}
                onSave={(topics: TopicOptions[], imageUrl: string | null) => {
                    // Handle save
                }}
            />
        )}
    </div>
);



export default EditorLayout;