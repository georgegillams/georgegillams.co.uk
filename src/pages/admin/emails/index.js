import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Emails from 'containers/common/Admin/Emails';
import FlexLayout from 'components/common/FlexLayout';

const Page = props => {
  return (
    <FlexLayout>
      <Emails {...props} />
    </FlexLayout>
  );
};

Page.propTypes = {};

export default Page;
