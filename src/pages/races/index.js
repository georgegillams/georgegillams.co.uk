import React from 'react';

import Medals from 'containers/Medals';
import CommonLayout from 'components/common/CommonLayout';
import apiStructure from 'helpers/common/apiStructure';

const Page = props => {
  return (
    <CommonLayout>
      <Medals {...props} />
    </CommonLayout>
  );
};

Page.getInitialProps = async context => {
  const isServer = !!context.req;

  if (!isServer) {
    return {};
  }

  const requestUrl = apiStructure.loadMedals.fullPath;
  const ssrMedals = await fetch(requestUrl)
    .then(data => data.json())
    .then(result => result.medals);

  return { ssrMedals };
};

Page.propTypes = {};

export default Page;
