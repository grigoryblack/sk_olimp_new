import styles from './CapitalRepair.module.scss';
import SplitTextAnimation from '@ui/SplitText';
import servicePic1 from '../../assets/img/Services/service_pic1.jpg';
import Button from '@ui/Button';

interface CapitalRepairProps {
  handleAnchorClick: (e: React.MouseEvent, id: string) => void;
}

const CapitalRepair = ({ handleAnchorClick }: CapitalRepairProps) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text={'Капитальный ремонт'} size={1.8} />

        <div className={styles.container__inner}>
          <img src={servicePic1} alt="servicePic1" className={styles.promo} />

          <div className={styles.info}>
            <p className={styles.title}>Услуги компании СК «ОЛИМП»</p>
            <p className={styles.description}>
              – Мы предлагаем недорогой капитальный ремонт «под ключ».
              <br />– Средняя стоимость ремонта начинается от <strong>8000 ₽ за м²</strong>, в
              зависимости от площади.
            </p>

            <p className={styles.title}>Смета на ремонт</p>
            <p className={styles.description}>
              – Наши профессионалы подготовят подробную смету, которая включает:
              <ul>
                <li>Список всех видов работ.</li>
                <li>Перечень черновых материалов.</li>
                <li>Объемы и расчетные цены.</li>
              </ul>
            </p>

            <p className={styles.title}>Преимущества работы с нами</p>
            <p className={styles.description}>
              – Экономия времени на планирование и организацию. <br />– Избежание непредвиденных
              расходов в процессе ремонта.
            </p>

            <div className={styles.footer__capital}>
              <p>Обращайтесь для качественного капитального ремонта вашей квартиры!</p>

              <Button
                className={styles.button}
                size={'M'}
                id="count-payment"
                variant={'primary'}
                onClick={(e) => handleAnchorClick(e, 'contacts')}
              >
                Заказать ремонт
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapitalRepair;
