import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'ggComponents/helpers/cssModules';
import Button from 'components/common/Button';

import STYLES from './blogs-nav.module.scss';

const getClassName = cssModules(STYLES);

const BlogsNav = props => {
  const { selected, ...rest } = props;

  return (
    <div {...rest}>
      <Button
        white={selected !== 'Writing'}
        href="/blog"
        className={getClassName('blogs-nav__writing')}
        aria-selected={selected === 'Writing' ? 'true' : null}
        role="tab">
        Writing
      </Button>
      <Button
        aria-selected={selected === 'Travel' ? 'true' : null}
        role="tab"
        white={selected !== 'Travel'}
        href="/travel">
        Travel
      </Button>
    </div>
  );
};

BlogsNav.propTypes = {
  selected: PropTypes.string,
  className: PropTypes.string,
};

BlogsNav.defaultProps = {
  selected: 'Writing',
  className: null,
};

export default BlogsNav;
