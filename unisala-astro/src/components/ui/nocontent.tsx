import { PlusCircle } from 'lucide-react';

export const EmptySpacePrompt = ({ spaceName , id}: {spaceName:string, id:string}) => {
    const carouselItems = [
        {
            image: "https://i.ibb.co/c8hn44x/Screenshot-2024-08-23-at-2-46-45-PM.png",
        },
        {
            image: "https://i.ibb.co/VYHNrdp/Screenshot-2024-08-23-at-2-47-00-PM.png",
        },
        {
            image: "https://i.ibb.co/TktLYn7/Screenshot-2024-08-23-at-2-47-11-PM.png",
        },
        {
            image: "https://i.ibb.co/dgG8nD6/Screenshot-2024-08-23-at-2-47-28-PM.png",
        },
        {
            image: "https://i.ibb.co/LhsYTRB/Screenshot-2024-08-23-at-2-47-58-PM.png",
        }
    ];
    return (
        <div className="">
            <div className="w-full max-w-4xl mx-auto mb-8">
            <img
              src={carouselItems[0].image}
              className="w-full h-full object-contain"
            />
            </div>
            <h2 className="text-md text-gray-800 mb-4">This space is waiting for its first post!</h2>
            <a 
            href={`/new-story`} 
            className="text-blue-500 hover:underline"
            >
                {/* Be the first to post in {spaceName} */}
                <button 
            className=" relative inline-flex items-center justify-center px-6 py-3 overflow-hidden text-white rounded-full shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <PlusCircle className="mr-2" />
                <span>Be the First to Post</span>
            </button>


                </a>
           

        </div>
    );
};