import {
  CommentOutlined,
  FieldTimeOutlined,
  FileProtectOutlined,
  StarOutlined,
} from '@ant-design/icons';

import styles from './About.module.scss';

export const cardsData = [
  {
    icon: <StarOutlined className={styles.icon} />,
    description: 'Мы используем только проверенные материалы и современные технологии',
    text: 'Качество',
  },
  {
    icon: <FieldTimeOutlined className={styles.icon} />,
    description:
      'Мы соблюдаем сроки выполнения работ, чтобы вы могли наслаждаться обновленным пространством как можно скорее',
    text: 'Сроки',
  },
  {
    icon: <FileProtectOutlined className={styles.icon} />,
    description:
      'Мы уверены в качестве нашей работы и предоставляем гарантии на все выполненные услуги',
    text: 'Гарантия',
  },
  {
    icon: <CommentOutlined className={styles.icon} />,
    description: 'Каждый проект уникален, и мы тщательно подходим к каждому клиенту',
    text: 'Индивидуальный подход',
  },
];
