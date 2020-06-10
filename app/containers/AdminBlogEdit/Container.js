import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { PageTitle } from 'gg-components/Typography';
import { DebugObject, AdminOnly, LoadingCover } from 'gg-components/Auth';

import Skeleton from './Skeleton';

import { CreateBlogForm } from 'components/Forms';

export default class AdminBlogEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newBlog: null };
  }

  componentDidMount = () => {
    const blogId = this.props.match.params.id;
    if (blogId) {
      this.props.loadBlog(blogId);
    }
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,

      className,

      loadBlog,
      updateBlog,
      createBlog,
      blog,
      loadingBlog,
      loadBlogSuccess,
      loadBlogError,
      updatingBlog,
      updateBlogSuccess,
      updateBlogError,
      creatingBlog,
      createBlogSuccess,
      createBlogError,
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin/blog')}
        >
          <PageTitle
            link={{ to: '/admin/blog', text: 'Blogs' }}
            name="Admin - blog"
          >
            <CreateBlogForm
              disabled={updatingBlog || creatingBlog || !this.state.newBlog}
              blog={this.state.newBlog || blog || {}}
              onDataChanged={n => this.setState({ newBlog: n })}
              onSubmit={() => {
                if (blog) {
                  updateBlog(this.state.newBlog);
                } else {
                  createBlog(this.state.newBlog);
                }
              }}
              submitLabel={blog ? 'Update blog' : 'Create blog'}
            />
          </PageTitle>
        </AdminOnly>
      </div>
    );

    return (
      <>
        <Helmet title="Admin - blog" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || loadingBlog}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin blog"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadBlog,
            updateBlog,
            createBlog,
            blog,
            loadingBlog,
            loadBlogSuccess,
            loadBlogError,
            updatingBlog,
            updateBlogSuccess,
            updateBlogError,
            creatingBlog,
            createBlogSuccess,
            createBlogError,
          }}
        />
      </>
    );
  }
}

AdminBlogEdit.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
