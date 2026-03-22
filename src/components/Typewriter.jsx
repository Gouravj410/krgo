import React, { useState, useEffect } from 'react';

export default function Typewriter({ words, delay = 100, pause = 2000 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const word = words[currentWordIndex];

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        // Small pause before typing the next word
        timeout = setTimeout(() => {}, 200);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(word.slice(0, currentText.length - 1));
        }, delay / 2); // Deleting is usually faster
      }
    } else {
      if (currentText === word) {
        timeout = setTimeout(() => setIsDeleting(true), pause);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(word.slice(0, currentText.length + 1));
        }, delay);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, delay, pause]);

  return (
    <span className="inline-flex items-center">
      <span>{currentText || '\u200B'}</span>
      <span className="ml-[1px] w-[3px] h-[1em] bg-current animate-pulse"></span>
    </span>
  );
}
