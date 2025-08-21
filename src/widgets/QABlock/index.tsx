import styles from './QABlock.module.scss';
import SplitTextAnimation from '@ui/SplitText';
import FAQ from '@ui/QAContainer';
import { allFAQ } from '@/widgets/QABlock/FAQ.config.ts';

const QABlock = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <SplitTextAnimation text={'Частые вопросы'} size={2.2} color="white" />

        <FAQ items={allFAQ} />
      </div>
    </section>
  );
};

export default QABlock;
