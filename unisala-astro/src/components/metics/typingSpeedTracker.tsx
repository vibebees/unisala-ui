import React, { useEffect, useState } from "react";

interface TextMetricsProps {
  text: string;
}

const TextMetrics: React.FC<TextMetricsProps> = ({ text }) => {
  const [wordsTyped, setWordsTyped] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [previousLength, setPreviousLength] = useState(0);

  // Helper to strip HTML tags and get plain text
  const stripHTML = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    const plainText = stripHTML(text);
    const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;

    setWordsTyped(wordCount);

    // Start timer when typing begins
    if (plainText && startTime === null) {
      setStartTime(Date.now());
    }

    // Calculate typing speed
    if (startTime !== null && plainText.length > previousLength) {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 60000; // Time in minutes
      const speed = wordCount / elapsedTime;
      setTypingSpeed(parseFloat(speed.toFixed(2))); // Round to 2 decimal places
    }

    // Update previous length for next comparison
    setPreviousLength(plainText.length);
  }, [text, startTime, previousLength]);

  // Reset metrics if the text is cleared
  useEffect(() => {
    if (stripHTML(text).trim() === "") {
      setWordsTyped(0);
      setTypingSpeed(0);
      setStartTime(null);
      setPreviousLength(0);
    }
  }, [text]);

  return (
    <div className="metrics-container">
      <p>Word Count: {wordsTyped}</p>
      <p>Typing Speed: {typingSpeed > 0 ? typingSpeed : 0} WPM</p>
    </div>
  );
};

export default TextMetrics;
