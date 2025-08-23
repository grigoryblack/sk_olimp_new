import { useRef, useEffect, useState } from 'react';
import styles from './About.module.scss';
import SplitTextAnimation from '../../shared/ui/SplitText';
import TiltedCard from '../../shared/ui/TiltedCard';
import { cardsData } from '@/widgets/About/About.config.tsx';

const About = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = cardsContainerRef.current;

    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isHovered) {
        e.preventDefault();
        e.stopPropagation();

        container.scrollLeft += e.deltaY;

        return false;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isHovered]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text={'Кто мы?'} />

        <p>
          <strong>СК «Олимп»</strong> — команда профессионалов с&nbsp;многолетним опытом в&nbsp;сфере ремонта
          и&nbsp;строительства. Наша компания объединяет архитекторов, дизайнеров, инженеров и мастеров,
          которые работают вместе, чтобы гарантировать безупречный результат.
          <br /> <br />
          Мы стремимся создать идеальное пространство для жизни и работы, предоставляя
          высококачественные услуги ремонта под ключ. <br />
          <strong>Наша цель </strong>— превратить ваши мечты в&nbsp;реальность, обеспечивая комфорт
          и&nbsp;стиль в&nbsp;каждом проекте.
        </p>

        <h3>Почему выбирают нас?</h3>

        <div
          className={styles.cards}
          ref={cardsContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {cardsData.map((card, index) => (
            <TiltedCard key={index}>
              <div className={styles.card}>
                {card.icon}
                <p className={styles.title}>{card.text}</p>
                <p className={styles.description}>{card.description}</p>
              </div>
            </TiltedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
