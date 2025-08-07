import styles from './About.module.scss';
import SplitTextAnimation from '../../shared/ui/SplitText';
import TiltedCard from '../../shared/ui/TiltedCard';
import { CheckOutlined, ClockCircleOutlined, MoneyCollectOutlined } from '@ant-design/icons';

const About = () => {
  const cardsData = [
    {
      icon: <ClockCircleOutlined className={styles.icon} />,
      text: 'Быстро',
    },
    {
      icon: <CheckOutlined className={styles.icon} />,
      text: 'Качественно',
    },
    {
      icon: <MoneyCollectOutlined className={styles.icon} />,
      text: 'Не дорого',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text={'Кто мы?'} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aut beatae dolor
          dolores officia voluptatibus. A aliquid aperiam, corporis deleniti, dolore ea eligendi
          fugit iste laborum molestiae non possimus repellat?
        </p>

        <h3>Почему выбирают нас?</h3>
        <div className={styles.cards}>
          {cardsData.map((card, index) => (
            <TiltedCard key={index}>
              <div className={styles.card}>
                {card.icon}
                <p>{card.text}</p>
              </div>
            </TiltedCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
