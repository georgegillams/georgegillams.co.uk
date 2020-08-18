import React from 'react';

import WorkBackpack from 'containers/Work/Backpack';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.prose}>
      <WorkBackpack {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
