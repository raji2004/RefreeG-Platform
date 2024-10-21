'use client'


import { useState, useEffect } from 'react';
import { Navbar, NavbarMedium, NavbarSmall } from './navbar';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

interface UserSession {
  
}

const ClientHome = ({ userSession }: { userSession?: string }) => {
  const size = useWindowSize();

  return (
    <div className="">
      <div>
        {size.width && size.width >= 1024 && <Navbar />}
        {size.width && size.width >= 860 && size.width < 1024 && <NavbarMedium />}
        {size.width && size.width < 860 && <NavbarSmall />}
      </div>
    </div>
  );
};

export default ClientHome;
