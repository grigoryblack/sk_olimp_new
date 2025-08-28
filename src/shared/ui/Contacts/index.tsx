import styles from './Contacts.module.scss';
import { message } from 'antd';

const ContactsBlock = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const contacts = [
    {
      type: 'phone',
      value: '+7 (932) 112 28 58',
      href: 'tel:+79321122858',
    },
    {
      type: 'email',
      value: 'skolimp96@yandex.ru',
      href: 'mailto:skolimp96@yandex.ru',
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
