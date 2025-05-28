import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('light');

  useEffect(() => {
    // Detect system preference on initial load
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('themeName');

    if (savedTheme) {
      setThemeName(savedTheme);
    } else {
      setThemeName(darkMediaQuery.matches ? 'dark' : 'light');
    }

    // Listen to system preference changes
    const handleChange = (e) => {
      setThemeName(e.matches ? 'dark' : 'light');
    };

    darkMediaQuery.addEventListener('change', handleChange);

    return () => {
      darkMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    const name = themeName === 'dark' ? 'light' : 'dark';
    localStorage.setItem('themeName', name);
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider value={[{ themeName, toggleTheme }]}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ThemeProvider, ThemeContext };
