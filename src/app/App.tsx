import React, { useState, useEffect } from 'react';
import styles from './app.module.scss';
import Home from '../widgets/Home';
import About from '../widgets/About';
import Work from '../widgets/Work';
import Contacts from '../widgets/Contact';
import Menu from '../shared/ui/Menu';
import DesktopMenu from '../shared/ui/DesktopMenu';
import useMobileDetect from '../hooks/useMobileDetect.ts';
import Services from '@/widgets/Services';
import QABlock from '@/widgets/QABlock';
import Marquee from '@ui/RunningText';

function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const isMobile = useMobileDetect();
  const currentMargin = isMobile ? 50 : 100;
  const announcements = [
    '| Ремонт под ключ от 18 000 ₽ за м²',
    'Разработка дизайн проекта от 1500 ₽ за м²',
    'Ремонт коммерческих помещений',
  ];

  const handleAnchorClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - currentMargin;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const sections = [
    { id: 'home', component: <Home handleAnchorClick={handleAnchorClick} /> },
    { id: 'runningText1', component: <Marquee texts={announcements} /> },
    { id: 'about', component: <About /> },
    { id: 'services', component: <Services /> },
    { id: 'runningText2', component: <Marquee texts={announcements} /> },
    { id: 'faq', component: <QABlock /> },
    { id: 'work', component: <Work /> },
    { id: 'runningText3', component: <Marquee texts={announcements} /> },
    { id: 'contacts', component: <Contacts /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollPosition / documentHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className={styles.scrollContainer}>
      <DesktopMenu handleAnchorClick={handleAnchorClick} scrollProgress={scrollProgress} />

      {sections.map((section, index) => (
        <div key={index} id={section.id}>
          {section.component}
        </div>
      ))}

      {isMobile && <Menu key="menu" handleAnchorClick={handleAnchorClick} />}
    </div>
  );
}

export default App;
