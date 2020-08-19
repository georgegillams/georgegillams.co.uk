import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import STYLES from './tag.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export const TAG_TYPES = {
  tech: 'tech',
  travel: 'travel',
  photography: 'photography',
  events: 'events',
  security: 'security',
};

const tagTypeClassNames = {
  [TAG_TYPES.tech]: 'tag--tech',
  [TAG_TYPES.travel]: 'tag--travel',
  [TAG_TYPES.photography]: 'tag--photography',
  [TAG_TYPES.events]: 'tag--events',
  [TAG_TYPES.security]: 'tag--security',
};

const tagText = {
  [TAG_TYPES.tech]: 'Tech',
  [TAG_TYPES.travel]: 'Travel',
  [TAG_TYPES.photography]: 'Photography',
  [TAG_TYPES.events]: 'Events',
  [TAG_TYPES.security]: 'Security',
};

const Tag = props => {
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);

  const { className, disabled, ariaLabel, type, children, onClick, link, ...rest } = props;

  const outerClassNameFinal = [getClassName('tag__outer')];
  if (className) {
    outerClassNameFinal.push(className);
  }

  const tagClassName = [getClassName('tag')];
  if (type) {
    tagClassName.push(getClassName(tagTypeClassNames[type]));
  }

  if ((hovering || focused) && (link || onClick)) {
    tagClassName.push(getClassName('tag--hovered'));
  }

  if (disabled) {
    outerClassNameFinal.push(getClassName('tag--disabled'));
  }

  const tagComponent = <span className={tagClassName.join(' ')}>{`${tagText[type]}`}</span>;

  if (link) {
    return (
      <a role="button" aria-label={ariaLabel} className={outerClassNameFinal.join(' ')} to={`/blog?filter=${type}`}>
        {tagComponent}
      </a>
    );
  }
  if (onClick) {
    return (
      <div
        role="button"
        aria-label={ariaLabel}
        onKeyPress={onClick}
        onMouseEnter={() => {
          setHovering(true);
        }}
        tabIndex="0"
        onFocus={() => {
          setFocused(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onClick={onClick}
        className={outerClassNameFinal.join(' ')}
        {...rest}>
        {tagComponent}
      </div>
    );
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      {tagComponent}
    </div>
  );
};

Tag.propTypes = {
  disabled: PropTypes.bool,
  link: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(TAG_TYPES),
  className: PropTypes.string,
  children: PropTypes.node,
  ariaLabel: PropTypes.string.isRequired,
};

Tag.defaultProps = {
  disabled: false,
  link: false,
  onClick: null,
  type: null,
  className: null,
  children: null,
};

export default Tag;
