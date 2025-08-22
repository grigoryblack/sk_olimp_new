import React, { useState } from 'react';
import styles from './Cards.module.scss';
import useMobileDetect from '@/hooks/useMobileDetect.ts';

interface CardItem {
  title: string;
  description: string;
  img: string;
}

interface CardsProps {
  cards: CardItem[];
}

const Cards: React.FC<CardsProps> = ({ cards }) => {
  const isMobile = useMobileDetect();
  const [showAll, setShowAll] = useState(false);

  const visibleCards = isMobile && !showAll ? cards.slice(0, 1) : cards;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className={styles.cardsContainer}>
      {visibleCards.map((card, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.content}>
            <div className={styles.textSection}>
              <h2 className={styles.title}>{card.title}</h2>
              <p className={styles.description}>{card.description}</p>
            </div>
            <div className={styles.imageSection}>
              <img src={card.img} alt={card.title} className={styles.image} />
            </div>
          </div>
        </div>
      ))}

      {isMobile && cards.length > 1 && (
        <button
          className={styles.toggleButton}
          onClick={toggleShowAll}
        >
          {showAll ? 'Скрыть' : `Показать еще ${cards.length - 1}`}
        </button>
      )}
    </div>
  );
};

export default Cards;