import React from 'react';

import ReadingList from 'containers/ReadingList';
import CommonLayout from 'components/common/CommonLayout';
import apiStructure from 'helpers/common/apiStructure';

const Page = props => {
  return (
    <CommonLayout>
      <ReadingList {...props} />
    </CommonLayout>
  );
};

Page.getInitialProps = async context => {
  const isServer = !!context.req;

  // On the client side, we'll just return nothing as we want to leave
  // loading the book up to redux once the container has mounted
  if (!isServer) {
    return {};
  }

  // Load book from API and pass to props.
  const requestUrl = apiStructure.loadBooks.fullPath;
  const ssrBooks = await fetch(requestUrl)
    .then(data => data.json())
    .then(result => result.books);

  return { ssrBooks }; // will be passed to the page component as props
};

Page.propTypes = {};

export default Page;
