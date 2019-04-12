import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { LoadingCover } from 'components/Auth';
import { BlogRenderer } from 'components/Typography';
import HelperFunctions from 'helpers/HelperFunctions';
import Skeleton from './Skeleton';
import Comments from 'containers/Comments';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class BlogViewer extends React.Component {
  componentWillMount = () => {
    const blogId = this.props.match.params.id;
    this.props.setBlogId(blogId);
    this.props.loadBlog();
  };

  render() {
    const {
      user,
      match,
      setBlogId,
      loading,
      error,
      blog,
      loadBlog,
      linkPrefix,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [
      getClassName('pages__container'),
      getClassName('pages__container--prose'),
    ];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Blog" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={loading}
          error={error}
        >
          {blog && (
            <Fragment>
              <BlogRenderer
                showEditLink={user && user.admin}
                centered={
                  blog.tags
                    ? HelperFunctions.includes(blog.tags, 'travel')
                    : false
                }
                blog={blog}
              />
              <Comments pageId={blog.id} />
            </Fragment>
          )}
        </LoadingCover>
      </div>
    );
  }
}

BlogViewer.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blog: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
};

BlogViewer.defaultProps = {
  user: null,
  loading: false,
  error: null,
  blog: null,
  filter: null,
  linkPrefix: '',
  className: null,
};
