import React, { useState, useEffect } from 'react';
import styles from './app.module.scss';
import Home from '../widgets/Home';
import About from '../widgets/About';
import Work from '../widgets/Work';
import Contacts from '../widgets/Contact';
import Menu from '../shared/ui/Menu';
import DesktopMenu from '../shared/ui/DesktopMenu';
import useMobileDetect from '../hooks/useMobileDetect.ts';

function App() {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const isMobile = useMobileDetect();
  const currentMargin = isMobile ? 50 : 100;

  const sections = [
    { id: 'home', component: <Home /> },
    { id: 'about', component: <About /> },
    { id: 'work', component: <Work /> },
    { id: 'contacts', component: <Contacts /> },
  ];

  const handleAnchorClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - currentMargin; // Отступ 100px от верха
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionHeights = sections.map((_, index) => {
        const element = document.getElementById(sections[index].id);
        return element ? element.offsetTop - currentMargin : 0; // Учитываем отступ 100px
      });

      let current = 0;
      for (let i = 0; i < sectionHeights.length; i++) {
        if (scrollPosition >= sectionHeights[i]) {
          current = i;
        }
      }
      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className={styles.scrollContainer}>
      <DesktopMenu handleAnchorClick={handleAnchorClick} />

      {sections.map((section, index) => (
        <div
          key={index}
          id={section.id}
        >
          {section.component}
        </div>
      ))}

      <div className={styles.progressIndicator}>
        {sections.map((section, index) => (
          <a
            key={index}
            href={`#${section.id}`}
            onClick={(e) => handleAnchorClick(e, section.id)}
            className={`${styles.indicatorDot} ${index === currentSection ? styles.active : ''}`}
          />
        ))}
      </div>

      {isMobile && <Menu key="menu" handleAnchorClick={handleAnchorClick} />}
    </div>
  );
}

export default App;