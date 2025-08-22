import styles from './Home.module.scss';
import Button from '../../shared/ui/Button';
import useMobileDetect from '../../hooks/useMobileDetect.ts';
import HomePromo from '../../assets/img/HomePage/preview.png';

const Home = () => {
  const isMobile = useMobileDetect();

  return (
    <header className={styles.wrapper}>
      <img className={styles.background} src={HomePromo} alt="sk-olimp" />

      <div className={styles.container}>
        <div className={styles.text__block}>
          <h1>СК «ОЛИМП»</h1>
          <p>Гарантия вашего спокойствия</p>
        </div>

        <div className={styles.buttons}>
          <Button size={isMobile ? 'M' : 'L'} id="count-payment" variant={'primary'}>
            Свяжитесь с нами!
          </Button>
          <Button size={isMobile ? 'M' : 'L'} id="count-payment" variant={'outlined'}>
            Рассчитать стоймость услуги
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Home;
