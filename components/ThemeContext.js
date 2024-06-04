import React, { createContext, useState, useContext } from 'react';

const Theme = createContext();

export const useTheme = () => {
  const context = useContext(Theme);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Theme.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </Theme.Provider>
  );
};