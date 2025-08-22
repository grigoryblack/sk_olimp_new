import { Modal } from 'antd';
import styles from './SlideModal.module.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';

interface SlideModalProps {
  isVisible: boolean;
  project: Project | null;
  onClose: () => void;
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

const SlideModal = ({ isVisible, project, onClose }: SlideModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const currentImagesCount = project?.images.length || 0;

  const slidesRef = useRef<HTMLDivElement>(null);

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === currentImagesCount - 1 ? 0 : prevIndex + 1));
  };

  const goToPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? currentImagesCount - 1 : prevIndex - 1));
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

  useEffect(() => {
    if (slidesRef.current) {
      slidesRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const handleTouchCancel = () => {
    setCurrentIndex(0);
    setTouchStart(0);
    setTouchEnd(0);
    onClose();
  };

  return (
    project && (
      <Modal
        width="680px"
        centered
        title={project.title}
        open={isVisible}
        onCancel={handleTouchCancel}
        footer={null}
      >
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div
              className={styles.carousel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className={styles.slides} ref={slidesRef}>
                {project.images.map((image, index) => (
                  <div key={index} className={styles.slide}>
                    <img className={styles.background} src={image} alt={String(index)} />
                  </div>
                ))}
              </div>

              <LeftOutlined onClick={goToPrev} className={`${styles.control} ${styles.prev}`} />
              <RightOutlined onClick={goToNext} className={`${styles.control} ${styles.next}`} />

              <div className={styles.indicators}>
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>

            <p className={styles.subtitle}>Информация по проекту:</p>

            <div className={styles.description}>
              <div className={styles.description__item}>
                <p>{project.description}</p>
              </div>
              {project?.info?.map((info, index) => (
                <div key={index} className={styles.description__item}>
                  <p>
                    {info.work} - <strong>{info.price}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default SlideModal;
