import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';
import NewWindow from '../Icons/new-window';
import { THEMES } from '../Theming';

import STYLES from './text-link.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const TextLink = React.forwardRef((props, ref) => {
  const { light, href, hrefExternal, className, textClassName, children, onClick, theme, ...rest } = props;

  const classNameFinal = [getClassName('text-link')];
  classNameFinal.push(getClassName('text-link--text-link'));
  classNameFinal.push(getClassName('text-link--no-padding'));
  if (light) {
    classNameFinal.push(getClassName('text-link--light'));
    classNameFinal.push(getClassName('text-link--light--text-link'));
  }
  if (theme === THEMES.allWhite) {
    classNameFinal.push(getClassName('text-link--text-link--all-white'));
  }
  classNameFinal.push(getClassName('text-link--inline'));
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <a
      href={href}
      rel={hrefExternal ? 'noopener noreferrer' : null}
      target={hrefExternal ? '_blank' : null}
      className={classNameFinal.join(' ')}
      onClick={onClick}
      ref={ref}
      {...rest}>
      {children}
      {hrefExternal && (
        <div className={getClassName('text-link__icon-container')}>
          <NewWindow className={getClassName('text-link__icon')} />
        </div>
      )}
    </a>
  );
});

TextLink.propTypes = {
  onClick: PropTypes.func,
  light: PropTypes.bool,
  children: PropTypes.node,
  href: PropTypes.string,
  hrefExternal: PropTypes.bool,
  textClassName: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.string,
};

TextLink.defaultProps = {
  onClick: null,
  light: false,
  href: null,
  hrefExternal: false,
  children: null,
  textClassName: null,
  className: null,
  theme: null,
};

export default TextLink;
