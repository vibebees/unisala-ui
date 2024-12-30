import React, { useEffect, useState } from "react";

const TextMetrics: React.FC<{ text: string }> = ({ text }) => {
  const [wordsTyped, setWordsTyped] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [previousLength, setPreviousLength] = useState(0);

  // Helper to strip HTML and count words
  const stripHTML = (html: string) => {
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

    // Update WPM calculation
    if (startTime !== null && plainText.length > previousLength) {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 60000; // Time in minutes
      const typingSpeed = wordCount / elapsedTime;

      setTypingSpeed(parseFloat(typingSpeed.toFixed(2)));
    }

    setPreviousLength(plainText.length);
  }, [text, startTime, previousLength]);

  // Reset metrics when text is cleared
  useEffect(() => {
    if (stripHTML(text).trim() === "") {
      setWordsTyped(0);
      setTypingSpeed(0);
      setStartTime(null);
      setPreviousLength(0);
    }
    console.log(stripHTML(text))
  }, [text]);

  return (
    <div className="metrics-container">
      <p>Word Count: {wordsTyped}</p>
      <p>Typing Speed: {typingSpeed > 0 ? typingSpeed : 0} WPM</p>
    </div>
  );
};

export default TextMetrics;
