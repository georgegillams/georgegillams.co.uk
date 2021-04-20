import React from 'react';

import WorkBackpack from 'containers/Work/Backpack';
import LegacyCommonLayout, { LAYOUT_STYLES } from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout layout={LAYOUT_STYLES.prose}>
      <WorkBackpack {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
