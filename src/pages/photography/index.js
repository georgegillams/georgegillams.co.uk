import React from 'react';

import Photography from 'containers/Photography';
import CommonLayout from 'components/common/CommonLayout';
import apiStructure from 'helpers/common/apiStructure';

const Page = props => {
  return (
    <CommonLayout>
      <Photography {...props} />
    </CommonLayout>
  );
};

Page.getInitialProps = async context => {
  const isServer = !!context.req;

  // On the client side, we'll just return nothing as we want to leave
  // loading the photos up to redux once the container has mounted
  if (!isServer) {
    return {};
  }

  // Load photos from API and pass to props.
  const requestUrl = new URL(apiStructure.loadShowcaseImages.fullPath);
  const reCache = context.req.query['re-cache'] === 'true';
  if (reCache) {
    requestUrl.searchParams.append('re-cache', 'true');
  }

  const ssrPhotos = await fetch(requestUrl.toString())
    .then(data => data.json())
    .then(result => result.photos);

  return { ssrPhotos }; // will be passed to the page component as props
};

Page.propTypes = {};

export default Page;
