import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DebugObject from 'components/common/DebugObject';
import { BlogForm } from 'components/Forms';
import PageTitle from 'components/common/PageTitle';
import { AdminOnly } from 'components/common/Walls';

const CreateBlog = props => {
  const { createBlog, authenticatorState, blogCreateState, className } = props;

  const [newBlog, setNewBlog] = useState({ showInBlogsList: true });

  return (
    <>
      <DebugObject
        debugTitle="Blogs"
        debugObject={{
          createBlog,
          authenticatorState,
          blogCreateState,
          className,
        }}
      />
      <AdminOnly user={authenticatorState.user}>
        <PageTitle name="Create a new blog">
          <BlogForm
            onSubmit={() => {
              createBlog(newBlog);
            }}
            blog={newBlog || {}}
            submitLabel="Create blog"
            onDataChanged={setNewBlog}></BlogForm>
        </PageTitle>
      </AdminOnly>
    </>
  );
};

CreateBlog.propTypes = {
  blogCreateState: PropTypes.shape({
    creatingBlog: PropTypes.bool,
    blogCreateError: PropTypes.object,
  }),
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  createBlog: PropTypes.func.isRequired,
  className: PropTypes.string,
};

CreateBlog.defaultProps = {
  className: null,
};

export default CreateBlog;
