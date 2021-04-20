import React from 'react';

import WorkSideProjects from 'containers/Work/SideProjects';
import LegacyCommonLayout, { LAYOUT_STYLES } from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout layout={LAYOUT_STYLES.prose}>
      <WorkSideProjects {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
