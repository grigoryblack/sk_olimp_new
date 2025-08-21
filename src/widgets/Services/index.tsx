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
          Мы предлагаем полный спектр услуг по ремонту и отделке квартир и коммерческих помещений:
          от разработки индивидуального проекта до финальной отделки. Мы учитываем все ваши
          пожелания и требования, чтобы создать уникальное пространство, отражающее ваш стиль.
        </p>
        <Cards cards={SERVICE_CONFIG} />
      </div>
    </section>
  );
};

export default Services;
