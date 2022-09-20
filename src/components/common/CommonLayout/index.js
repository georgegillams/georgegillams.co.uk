import React from 'react';
import PropTypes from 'prop-types';

import Footer from 'components/footer2';
import { StyledMainWrapper } from './common-layout.styles';

const CommonLayout = props => {
  const { children, ...rest } = props;

  return (
    <>
      <StyledMainWrapper {...rest}>{children}</StyledMainWrapper>
      <Footer />
    </>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommonLayout;
