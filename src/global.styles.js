import {
  backgroundColor,
  backgroundColorDarkMode,
  notBlack,
  notBlackDarkMode,
  primaryColor,
} from '@george-gillams/components/constants/colors';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { quattrocento } from './quattrocento.styles';
import { spacingLg, navigationBarHeight } from '@george-gillams/components/constants/layout';

export default createGlobalStyle`
 ${normalize}

 ${quattrocento}

::selection {
  background-color: ${primaryColor};
  color: white;
}

// This makes box-sizing conform to the more-convenient IE standard.
// See https://stackoverflow.com/a/4698091/6029750
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 1;
}

html {
  /* Ensures that anchor links take the user slightly further down the page to allow for the nav bar height */
  scroll-padding-top: calc(${navigationBarHeight} + ${spacingLg});
  scroll-behavior: smooth;
}

body {
  background-color: ${backgroundColor};
  color: ${notBlack};
  font-family: 'Quattrocento Sans', -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', Arial, sans-serif;

  @media (prefers-color-scheme: dark) {
    background-color: ${backgroundColorDarkMode};
    color: ${notBlackDarkMode};
  }
}

body.fontLoaded {
  font-family: 'Quattrocento Sans', -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', Arial, sans-serif;
}

#app {
  min-width: 100%;
  min-height: 100%;
}
`;
