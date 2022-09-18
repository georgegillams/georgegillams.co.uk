import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { LargeText, OuterContainer, StyledLink } from './logo.styles';
import withStyledTheme from '@george-gillams/components/styled-theming/with-styled-theme';

const Logo = props => {
  const { padding, animated, alwaysCentred, pride, theme, ...rest } = props;

  return (
    <OuterContainer alwaysCentred={alwaysCentred} padding={padding} {...rest}>
      <Link href="/">
        <StyledLink href="/">
          <LargeText theme={theme} animated={animated} pride={pride} padding={padding} aria-label="Home page">
            G
          </LargeText>
        </StyledLink>
      </Link>
    </OuterContainer>
  );
};

Logo.propTypes = {
  theme: PropTypes.object,
  padding: PropTypes.bool,
  animated: PropTypes.bool,
  pride: PropTypes.bool,
  alwaysCentred: PropTypes.bool,
};

Logo.defaultProps = {
  theme: {},
  padding: true,
  animated: false,
  pride: false,
  alwaysCentred: false,
};

export default withStyledTheme(Logo);
