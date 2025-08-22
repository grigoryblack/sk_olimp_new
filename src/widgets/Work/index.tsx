import styles from './Work.module.scss';
import SplitTextAnimation from '../../shared/ui/SplitText';
import Carousel from '../../shared/ui/Carousel';
import { WORKS } from '@/widgets/Work/Work.config.tsx';
import { useState } from 'react';
import SlideModal from '@ui/SlideModal';

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

const Work = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);

  const handleSlideClick = (item: Project) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text={'Наши работы'} size={2.4} />
        <div className={styles.content}>
          <Carousel items={WORKS} />
          <div className={styles.list}>
            {WORKS.map((item) => (
              <div className={styles.list__item}>
                {item.title}
                <p onClick={() => handleSlideClick(item)}>Подробнее</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SlideModal isVisible={isModalVisible} project={selectedItem} onClose={handleModalClose} />
    </div>
  );
};

export default Work;
