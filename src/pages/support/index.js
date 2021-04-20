import React from 'react';

import Support from 'containers/Support';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <Support {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
