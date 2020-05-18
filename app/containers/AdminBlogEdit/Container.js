import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';

import Skeleton from './Skeleton';

import { PageTitle } from 'gg-components/Typography';
import { LoadingIndicator } from 'gg-components/LoadingIndicator';
import BlogsList from 'components/Blogs';
import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/Cards';
import { Button } from 'gg-components/Button';
import { CodeInline } from 'gg-components/Code';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'gg-components/Auth';
import { CreateBlogForm } from 'components/Forms';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

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
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
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
      <Fragment>
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
      </Fragment>
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
