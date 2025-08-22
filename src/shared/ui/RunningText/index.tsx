import React, { useEffect, useRef } from 'react';
import styles from './RunningText.module.scss';

interface MarqueeProps {
  texts: string[];
  speed?: number; // Speed in pixels per second
}

const Marquee: React.FC<MarqueeProps> = ({ texts, speed = 60 }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const content = contentRef.current;
    if (!marquee || !content) return;

    const contentWidth = content.offsetWidth;
    const clone = content.cloneNode(true) as HTMLDivElement;
    marquee.appendChild(clone);

    let animationFrame: number;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
      const translateX = (elapsedTime * speed) % contentWidth; // Calculate position
      marquee.style.transform = `translateX(-${translateX}px)`;

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [speed, texts]);

  return (
    <div className={styles.wrapper}>
      <div ref={marqueeRef} className={styles.marquee}>
        <div ref={contentRef} className={styles.content}>
          {texts.map((text, index) => (
            <span key={index} className={styles.text}>
              {text}
              {index < texts.length - 1 && <span className={styles.separator}> | </span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
