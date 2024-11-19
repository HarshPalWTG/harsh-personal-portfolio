import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext'; // Ensure this is the correct path

const Logo = () => {
  const { theme } = useContext(ThemeContext);

  const logoSrc = theme === 'dark' ? '/white_logo.svg' : '/black_logo.svg';

  return <img src={logoSrc} alt="Logo" className="logo-image" />;
};

export default Logo;