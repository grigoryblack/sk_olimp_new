import React from 'react';
import styles from './Cards.module.scss';

interface CardItem {
  title: string;
  description: string;
  img: string;
}

interface CardsProps {
  cards: CardItem[];
}

const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <div className={styles.cardsContainer}>
      {cards.map((card, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.content}>
            <div className={styles.textSection}>
              <h2 className={styles.title}>{card.title}</h2>
              <p className={styles.description}>{card.description}</p>
            </div>
            <div className={styles.imageSection}>
              <img
                src={card.img}
                alt={card.title}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;