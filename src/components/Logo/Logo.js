import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LargeText, OuterContainer, StyledLink, StyledNextLink } from './logo.styles';
import withStyledTheme from '@george-gillams/components/styled-theming/with-styled-theme';

const Logo = props => {
  const { padding, animated, alwaysCentred, pride, theme, ...rest } = props;

  const LinkComponent = useMemo(() => (process.env.ENABLE_SOFT_LINKS ? StyledNextLink : StyledLink), []);

  return (
    <OuterContainer alwaysCentred={alwaysCentred} padding={padding} {...rest}>
      <LinkComponent href="/">
        <LargeText theme={theme} animated={animated} pride={pride} padding={padding} aria-label="Home page">
          G
        </LargeText>
      </LinkComponent>
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
