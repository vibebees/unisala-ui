import React, { useState, useEffect } from "react";
import { X, Frown, Smile } from "lucide-react";

const emojis = [
  { icon: "😠", value: 1 },
  { icon: "🙁", value: 2 },
  { icon: "😐", value: 3 },
  { icon: "🙂", value: 4 },
  { icon: "😄", value: 5 },
];

const FEEDBACK_STORAGE_KEY = "scholarshipFeedbackProvided";
const MODAL_SHOW_DELAY = 180000;

const ScholarshipFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);

  useEffect(() => {
    const hasFeedbackProvided = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!hasFeedbackProvided) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, MODAL_SHOW_DELAY);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleEmojiClick = (value: number) => {
    setSelectedEmoji(value);
    setShowFeedbackInput(value < 3);
  };

  const handleFeedbackSubmit = () => {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, "true");
    console.log("Submitted feedback:", selectedEmoji, feedback);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Feedback
      </button>

      {isOpen && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-700 rounded-lg mx-5 p-5 md:p-8  max-w-[800px] w-full h-3/4 relative animate-fade-in">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className=" mt-10 text-lg md:text-2xl font-bold mb-6 text-center">
              How do you feel about the scholarship?
            </h2>
            <div className="flex justify-center gap-6 mb-6">
              {emojis.map((emoji) => (
                <button
                  key={emoji.value}
                  onClick={() => handleEmojiClick(emoji.value)}
                  className={`text-2xl md:text-3xl  transition-all duration-300 ease-in-out transform hover:scale-125 ${
                    selectedEmoji === emoji.value ? "scale-125" : "scale-110"
                  }`}
                >
                  {emoji.icon}
                </button>
              ))}
            </div>
            {selectedEmoji && selectedEmoji < 3 && (
              <div className="animate-fade-in pt-8">
                <p className="mb-4">
                  <Frown className="inline-block mr-2" size={24} />
                  We're sorry to hear that. Please tell us how we can improve:
                </p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full min-h-44 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500 dark:bg-neutral-900 dark:border-neutral-500"
                  placeholder="Your feedback..."
                ></textarea>
                <button
                  onClick={handleFeedbackSubmit}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                >
                  Submit Feedback
                </button>
              </div>
            )}
            {!showFeedbackInput && (
              <div className="animate-fade-in">
                <p className="mb-4">
                  <Smile className="inline-block mr-2" size={24} />
                  Thank you for your feedback!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScholarshipFeedback;
