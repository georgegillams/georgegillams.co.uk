import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import { LoadingCover } from 'gg-components/Auth';
import { CreativeCommons } from 'gg-components/CreativeCommons';

import Skeleton from './Skeleton';

import { BlogRenderer } from 'components/Typography';
import HelperFunctions from 'helpers/HelperFunctions';
import Comments from 'containers/Comments';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class BlogViewer extends React.Component {
  componentWillMount = () => {
    const blogId = this.props.match.params.id;
    this.props.loadBlog(blogId);
  };

  render() {
    const {
      user,
      match,
      blogId,
      blogs,
      blogLoading,
      blogLoadError,
      loadBlog,
      linkPrefix,
      className,
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container--prose')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    let blog = null;
    if (blogs && blogs[blogId]) {
      blog = blogs[blogId];
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <Helmet title="Blog" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={!blog}
          error={blogLoadError}
        >
          {blog && (
            <>
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
              <CreativeCommons />
            </>
          )}
        </LoadingCover>
      </div>
    );
  }
}

BlogViewer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  blogLoading: PropTypes.bool,
  blogLoadError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blogs: PropTypes.arrayOf(PropTypes.object),
  linkPrefix: PropTypes.string,
  className: PropTypes.string,
};

BlogViewer.defaultProps = {
  user: null,
  blogLoading: false,
  blogLoadError: null,
  blogs: null,
  linkPrefix: '',
  className: null,
};
