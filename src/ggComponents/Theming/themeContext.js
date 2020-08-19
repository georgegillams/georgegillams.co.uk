import React from 'react';

const THEMES = {
  none: 'none',
  allWhite: 'allWhite',
};

const ThemeContext = React.createContext(
  { theme: THEMES.none } // default value
);

const ThemeProvider = ThemeContext.Provider;

export default { ThemeContext, ThemeProvider, THEMES };
export { ThemeContext, ThemeProvider, THEMES };
