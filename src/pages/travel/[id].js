import React from 'react';
import PropTypes from 'prop-types';

import CSSHack from 'components/common/CSSHack';
import BlogRenderer from 'containers/BlogRenderer';
import LegacyCommonLayout, { LAYOUT_STYLES } from 'components/common/LegacyCommonLayout';
import blogPage from '../blog/[id]';
import FourOhFourPage from '../404';

const Page = props => {
  const { is404, ...rest } = props;
  if (is404) {
    return <FourOhFourPage {...rest} />;
  }

  return (
    <LegacyCommonLayout layout={LAYOUT_STYLES.proseCenter} bottomPadding={false}>
      <CSSHack pageName="travel/[id]" />
      <BlogRenderer blogSubcategory="Travel" linkPrefix={'/travel'} {...rest} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {
  is404: PropTypes.bool,
};

Page.defaultProps = {
  is404: false,
};

Page.getInitialProps = blogPage.getInitialProps;

Page.propTypes = {};

export default Page;
