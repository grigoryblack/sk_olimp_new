import { useState } from 'react';
import styles from './Contacts.module.scss';

const Contacts = () => {
  const [copied, setCopied] = useState<string | null>(null);

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
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={styles.contacts}>
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
                    handleCopy(contact.value, 'phone');
                  }}
                >
                  {contact.value}
                </a>
                {copied === 'phone' && <span className={styles.copyAlert}>Скопировано!</span>}
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
                    handleCopy(contact.value, 'email');
                  }}
                >
                  {contact.value}
                </a>
                {copied === 'email' && <span className={styles.copyAlert}>Скопировано!</span>}
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
                  onClick={() => handleCopy(contact.value, 'address')}
                >
                  {contact.value}
                </a>
                {copied === 'address' && <span className={styles.copyAlert}>Скопировано!</span>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
