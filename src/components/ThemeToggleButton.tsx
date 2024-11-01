import React, { useContext } from 'react';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';
import ThemeContext from '../context/ThemeContext'; // Ensure this is the correct path

const ThemeToggleButton = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className='theme-toggle-button'
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem',
        color: theme === 'dark' ? 'white' : 'inherit',  // Set Sun icon to white in dark mode
      }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <RiMoonLine /> : <RiSunLine /> }
    </button>
  );
};

export default ThemeToggleButton;