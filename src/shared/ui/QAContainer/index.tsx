import React, { useState } from 'react';
import styles from './FAQ.module.scss';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import useMobileDetect from '@/hooks/useMobileDetect.ts';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, title = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const isMobile = useMobileDetect();

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Определяем, сколько вопросов показывать
  const visibleItems = isMobile && !showAll ? items.slice(0, 6) : items;

  return (
    <div className={styles.faqContainer}>
      {title && <p>{title}</p>}
      <div className={styles.content}>
        {visibleItems.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={styles.question}
              onClick={() => toggleItem(index)}
              aria-expanded={openIndex === index}
            >
              <span className={styles.questionText}>{item.question}</span>
              <span className={styles.icon}>
                {openIndex === index ? <UpOutlined /> : <DownOutlined />}
              </span>
            </button>

            <div className={`${styles.answerContainer} ${openIndex === index ? styles.open : ''}`}>
              <div className={styles.answer}>{item.answer}</div>
            </div>
          </div>
        ))}
      </div>

      {isMobile && items.length > 6 && (
        <button className={styles.toggleButton} onClick={toggleShowAll}>
          {showAll ? 'Скрыть' : 'Показать все'}
        </button>
      )}
    </div>
  );
};

export default FAQ;