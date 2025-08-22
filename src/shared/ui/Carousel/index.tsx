import { useState, useEffect, useRef } from 'react';
import styles from './Carousel.module.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import SlideModal from '@ui/SlideModal';

interface CarouselProps {
  items: Project[];
}

interface Project {
  id: number;
  title: string;
  description?: string;
  image: string;
  images: string[];
  info: Info[];
}

interface Info {
  work: string;
  price: string;
}

const Carousel = ({ items }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      goToNext();
    }
    if (touchStart - touchEnd < -50) {
      goToPrev();
    }
  };

  const handleSlideClick = (item: Project) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    if (slidesRef.current) {
      slidesRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.slides} ref={slidesRef}>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.slide}
            onClick={() => handleSlideClick(item)}
          >
            <img className={styles.background} src={item.image} alt={item.title} />
            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              {item.description && <p className={styles.description}>{item.description}</p>}
            </div>
          </div>
        ))}
      </div>

      <LeftOutlined onClick={goToPrev} className={`${styles.control} ${styles.prev}`} />
      <RightOutlined onClick={goToNext} className={`${styles.control} ${styles.next}`} />

      <div className={styles.indicators}>
        {items.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <SlideModal isVisible={isModalVisible} project={selectedItem} onClose={handleModalClose} />
    </div>
  );
};

export default Carousel;
