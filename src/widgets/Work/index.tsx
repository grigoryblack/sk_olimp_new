import styles from './Work.module.scss';
import SplitTextAnimation from '../../shared/ui/SplitText';
import Carousel from '../../shared/ui/Carousel';

const Work = () => {
  const works = [
    {
      id: 1,
      title: 'Проект 1',
      description: 'Описание первого проекта',
      image: '/images/work1.jpg',
    },
    {
      id: 2,
      title: 'Проект 2',
      description: 'Описание второго проекта',
      image: '/images/work2.jpg',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text={'Наши работы'} size={2.4} />
        <Carousel items={works} />
      </div>
    </div>
  );
};

export default Work;
