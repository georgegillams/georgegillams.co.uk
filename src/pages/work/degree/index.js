import React from 'react';

import WorkDegree from 'containers/Work/Degree';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.prose}>
      <WorkDegree {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
