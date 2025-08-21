import styles from './Services.module.scss';
import SplitTextAnimation from '@ui/SplitText';
import Cards from '@ui/ServicesContent';
import { SERVICE_CONFIG } from '@/widgets/Services/Services.config.ts';

const Services = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text={'Наши услуги'} size={2.4} />
        <Cards cards={SERVICE_CONFIG} />
      </div>
    </section>
  );
};

export default Services;
