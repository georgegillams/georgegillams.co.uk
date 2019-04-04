import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import { LoadingCover } from 'components/Auth';
import BlogsList from 'components/Blogs';
import BlogListSkeleton from './BlogListSkeleton';
import PAGE_STYLES from 'containers/pages.scss';
import STYLES from './blogs-page.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules({ ...PAGE_STYLES, ...STYLES }); // REGEX_REPLACED

export default class BlogsNav extends React.Component {
  render() {
    const {
      selected,
      className,
      match,
      location,
      history,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('blogs-page__navigation')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <BpkHorizontalNav className={outerClassNameFinal.join(' ')}>
        <BpkHorizontalNavItem
          name="Writing"
          selected={selected === 'Writing'}
          onClick={() => {
            history.push({ pathname: '/blog' });
          }}
        >
          Writing
        </BpkHorizontalNavItem>
        <BpkHorizontalNavItem
          name="Travel"
          selected={selected === 'Travel'}
          onClick={() => {
            history.push({ pathname: '/travel' });
          }}
        >
          Travel
        </BpkHorizontalNavItem>
      </BpkHorizontalNav>
    );
  }
}

BlogsNav.propTypes = {
  selected: PropTypes.string,
  className: PropTypes.string,
};
