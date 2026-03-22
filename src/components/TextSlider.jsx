import React, { useState, useEffect } from 'react';

export default function TextSlider({ words, interval = 3000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span className="inline-grid overflow-hidden align-bottom" style={{ gridTemplateAreas: '"content"' }}>
      {words.map((word, i) => {
        let state = 'next';
        if (i === index) state = 'current';
        else if (i === (index - 1 + words.length) % words.length) state = 'prev';

        let transformClass = 'opacity-0 translate-y-8';
        if (state === 'current') {
          transformClass = 'opacity-100 translate-y-0 z-10';
        } else if (state === 'prev') {
          transformClass = 'opacity-0 -translate-y-8 z-0';
        }

        return (
          <span
            key={i}
            className={`transition-all duration-700 ease-in-out whitespace-nowrap col-start-1 row-start-1 ${transformClass}`}
            style={{ gridArea: 'content' }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
