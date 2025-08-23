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
    description: 'Мы используем только проверенные материалы и\u00A0современные технологии',
    text: 'Качество',
  },
  {
    icon: <FieldTimeOutlined className={styles.icon} />,
    description:
      'Мы соблюдаем сроки выполнения работ, чтобы вы\u00A0могли наслаждаться обновленным пространством как\u00A0можно скорее',
    text: 'Сроки',
  },
  {
    icon: <FileProtectOutlined className={styles.icon} />,
    description:
      'Мы уверены в\u00A0качестве нашей работы и\u00A0предоставляем гарантии на\u00A0все выполненные услуги',
    text: 'Гарантия',
  },
  {
    icon: <CommentOutlined className={styles.icon} />,
    description: 'Каждый проект уникален, и\u00A0мы тщательно подходим к\u00A0каждому клиенту',
    text: 'Индивидуальный подход',
  },
];