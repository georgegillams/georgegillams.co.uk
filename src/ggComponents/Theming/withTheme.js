import React, { useContext } from 'react';

import { ThemeContext } from './themeContext';

const withTheme = Component => {
  const ThemedComponent = props => {
    const { theme } = useContext(ThemeContext);
    return <Component theme={theme} {...props} />;
  };

  return ThemedComponent;
};

export default { withTheme };
export { withTheme };
