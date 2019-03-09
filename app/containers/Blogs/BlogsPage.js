import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { LoadingCover } from 'components/Auth';
import BlogsList from 'components/Blogs';
import BlogListSkeleton from './BlogListSkeleton';
import 'containers/pages.scss';

const getClassName = c => c;

export default class BlogsPage extends React.Component {
  filteredBlogs = null;

  componentWillMount = () => {
    this.props.loadBlogs();
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
      loading,
      error,
      blogs,
      loadBlogs,
      filter,
      linkPrefix,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Blog" />
        <LoadingCover
          loadingSkeleton={BlogListSkeleton}
          loading={loading}
          error={error}
        >
          {this.filteredBlogs && (
            <BlogsList blogs={this.filteredBlogs} linkPrefix={linkPrefix} />
          )}
        </LoadingCover>
      </div>
    );
  }
}

BlogsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blogs: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
};
