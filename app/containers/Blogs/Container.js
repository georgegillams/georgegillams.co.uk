import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';

import BlogListSkeleton from './BlogListSkeleton';
import BlogsNav from './BlogsNav';

import { DebugObject, LoadingCover } from 'gg-components/Auth';
import BlogsList from 'components/Blogs';
import { CreativeCommons } from 'gg-components/CreativeCommons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class BlogsPage extends React.Component {
  filteredBlogs = null;

  componentWillMount = () => {
    this.props.loadBlogs();
  };

  getTextColor = () => {
    try {
      const element = document.getElementById('app-wrapper');
      const style = window.getComputedStyle(element);
      return style.getPropertyValue('color');
    } catch (err) {
      return '#1e1e1e';
    }
  };

  componentWillReceiveProps = newProps => {
    if (newProps.blogs) {
      this.filteredBlogs = newProps.blogs;
      if (this.props.filter) {
        this.filteredBlogs = this.filteredBlogs.filter(this.props.filter);
      }
    }
  };

  render() {
    const {
      loadingBlogs,
      loadBlogsError,
      blogs,
      loadBlogs,
      selectedNav,
      filter,
      linkPrefix,
      className,
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const textColor = this.getTextColor();

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <DebugObject
          debugTitle="Blogs"
          debugObject={{
            loadingBlogs,
            blogs,
            loadBlogs,
            loadBlogsError,
            selectedNav,
            filter,
            linkPrefix,
            className,
          }}
        />
        <Helmet title="Blog" />
        <BlogsNav
          className={getClassName('pages__component')}
          style={{ marginTop: '1rem' }}
          selected={selectedNav}
        />
        <LoadingCover
          loadingSkeleton={BlogListSkeleton}
          loading={loadingBlogs || !blogs}
          error={loadBlogsError}
        >
          <Fragment>
            {this.filteredBlogs && (
              <BlogsList blogs={this.filteredBlogs} linkPrefix={linkPrefix} />
            )}
            <CreativeCommons />
          </Fragment>
        </LoadingCover>
      </div>
    );
  }
}

BlogsPage.propTypes = {
  loadingBlogs: PropTypes.bool,
  loadBlogsError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blogs: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
};
