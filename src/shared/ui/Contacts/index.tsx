import styles from './Contacts.module.scss';
import { message } from 'antd';

const ContactsBlock = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const contacts = [
    {
      type: 'phone',
      value: '+7 (123) 456-78-90',
      href: 'tel:+71234567890',
    },
    {
      type: 'email',
      value: 'example@domain.com',
      href: 'mailto:example@domain.com',
    },
    {
      type: 'address',
      value: 'г. Москва, ул. Примерная, д. 10',
      href: 'https://yandex.ru/maps/?text=г. Москва, ул. Примерная, д. 10',
    },
  ];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    messageApi.open({
      type: 'success',
      content: `${type} скопирован!`,
    });
  };

  return (
    <div className={styles.contacts}>
      {contextHolder}
      <h2 className={styles.title}>Контакты</h2>

      <ul className={styles.list}>
        {contacts.map((contact, index) => (
          <li key={index} className={styles.item}>
            {contact.type === 'phone' && (
              <div className={styles.contact}>
                <span className={styles.icon}>📱</span>
                <a
                  href={contact.href}
                  className={styles.link}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCopy(contact.value, 'Телефон');
                  }}
                >
                  {contact.value}
                </a>
              </div>
            )}

            {contact.type === 'email' && (
              <div className={styles.contact}>
                <span className={styles.icon}>✉️</span>
                <a
                  href={contact.href}
                  className={styles.link}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCopy(contact.value, 'E-mail');
                  }}
                >
                  {contact.value}
                </a>
              </div>
            )}

            {contact.type === 'address' && (
              <div className={styles.contact}>
                <span className={styles.icon}>📍</span>
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {contact.value}
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsBlock;
