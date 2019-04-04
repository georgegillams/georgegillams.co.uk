import React from 'react';
import { withRouter } from 'react-router';
import BpkThemeProvider from 'bpk-theming';
import { themeAttributes as hnThemeAttributes } from 'bpk-component-horizontal-nav';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { LoadingCover } from 'components/Auth';
import BlogsList from 'components/Blogs';
import BlogListSkeleton from './BlogListSkeleton';
import BlogsNav from './BlogsNav';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';

const getClassName = cssModules(STYLES);

const BlogsNavWR = withRouter(BlogsNav);

export default class BlogsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  filteredBlogs = null;

  componentWillMount = () => {
    this.props.loadBlogs();
  };

  getTextColor = () => {
    const element = document.getElementById('app-wrapper');
    const style = window.getComputedStyle(element);
    return style.getPropertyValue('color');
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
      selectedNav,
      filter,
      linkPrefix,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const textColor = this.getTextColor();

    const theme = {
      horizontalNavLinkColor: textColor,
      horizontalNavLinkHoverColor: textColor,
      horizontalNavLinkActiveColor: '#44aeff',
      horizontalNavLinkSelectedColor: '#44aeff',
      horizontalNavBarSelectedColor: '#44aeff',
    };

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Blog" />
        <BpkThemeProvider
          theme={theme}
          themeAttributes={[...hnThemeAttributes]}
        >
          <BlogsNavWR className={getClassName("pages__component")} selected={selectedNav} />
        </BpkThemeProvider>
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
