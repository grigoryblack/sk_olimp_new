import styles from './Services.module.scss';
import SplitTextAnimation from '@ui/SplitText';
import Cards from '@ui/ServicesContent';
import { SERVICE_CONFIG } from '@/widgets/Services/Services.config.ts';

const Services = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text={'Наши услуги'} size={2.4} />
        <p className={styles.description}>
          Мы&nbsp;предлагаем полный спектр услуг по&nbsp;ремонту и&nbsp;отделке квартир и&nbsp;коммерческих помещений:
          от&nbsp;разработки индивидуального проекта до&nbsp;финальной отделки. Мы&nbsp;учитываем все ваши
          пожелания и&nbsp;требования, чтобы создать уникальное пространство, отражающее ваш стиль.
        </p>
        <Cards cards={SERVICE_CONFIG} />
      </div>
    </section>
  );
};

export default Services;
