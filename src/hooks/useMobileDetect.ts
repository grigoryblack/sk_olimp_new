import { useState, useEffect } from 'react';

const MOBILE_SIZE = 769;

/**
 * Хук для определения мобильного устройства по ширине экрана
 * @returns {boolean} true если ширина экрана меньше 768px (md breakpoint)
 */
const useMobileDetect = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < MOBILE_SIZE);
    };

    // Проверяем сразу при монтировании
    checkScreenSize();

    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', checkScreenSize);

    // Убираем слушатель при размонтировании
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile;
};

export default useMobileDetect;
