import styles from './DesktopMenu.module.scss';
import SKOlimp from '../../../assets/img/sk_olimp.png';
import useMobileDetect from '../../../hooks/useMobileDetect.ts';
import React from 'react';

interface MenuProps {
  handleAnchorClick: (e: React.MouseEvent, id: string) => void;
  scrollProgress: number;
}

const DesktopMenu = ({ handleAnchorClick, scrollProgress }: MenuProps) => {
  const isMobile = useMobileDetect();

  const menuItems = [
    { label: 'Главная', value: 'home' },
    { label: 'О нас', value: 'about' },
    { label: 'Услуги', value: 'services' },
    { label: 'Наши работы', value: 'work' },
    { label: 'Контакты', value: 'contacts' },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src={SKOlimp} alt="logo" className={styles.logo} />

        {!isMobile && (
          <nav>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.value}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAnchorClick(e, item.value);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }} />
      </div>
    </div>
  );
};

export default DesktopMenu;
