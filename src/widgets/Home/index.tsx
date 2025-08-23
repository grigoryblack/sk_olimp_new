import styles from './Home.module.scss';
import Button from '../../shared/ui/Button';
import useMobileDetect from '../../hooks/useMobileDetect.ts';
import HomePromo from '../../assets/img/HomePage/preview.png';

interface HomeProps {
  handleAnchorClick: (e: React.MouseEvent, id: string) => void;
}

const Home = ({ handleAnchorClick }: HomeProps) => {
  const isMobile = useMobileDetect();

  return (
    <header className={styles.wrapper}>
      <img className={styles.background} src={HomePromo} alt="sk-olimp" />

      <div className={styles.container}>
        <div className={styles.text__block}>
          <h1>
            Сделаем&nbsp;ремонт Вашей&nbsp;мечты <br/> от <strong>18 000 ₽/м²</strong>
          </h1>
          <p><strong>СК «ОЛИМП»</strong> — гарантия&nbsp;вашего&nbsp;спокойствия</p>
        </div>

        <div className={styles.buttons}>
          <Button
            size={isMobile ? 'M' : 'L'}
            id="count-payment"
            variant={'primary'}
            onClick={(e) => handleAnchorClick(e, 'contacts')}
          >
            Свяжитесь с нами!
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Home;
