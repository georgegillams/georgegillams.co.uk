import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import STYLES from './tag.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

export const TAG_TYPES = {
  tech: 'tech',
  travel: 'travel',
  photography: 'photography',
  events: 'events',
  security: 'security',
};

const tagTypeClassNames = {
  [TAG_TYPES.tech]: getClassName('tag--tech'),
  [TAG_TYPES.travel]: getClassName('tag--travel'),
  [TAG_TYPES.photography]: getClassName('tag--photography'),
  [TAG_TYPES.events]: getClassName('tag--events'),
  [TAG_TYPES.security]: getClassName('tag--security'),
};

const tagText = {
  [TAG_TYPES.tech]: 'Tech',
  [TAG_TYPES.travel]: 'Travel',
  [TAG_TYPES.photography]: 'Photography',
  [TAG_TYPES.events]: 'Events',
  [TAG_TYPES.security]: 'Security',
};

class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = { hovering: false };
  }

  render() {
    const { className, type, children, link, ...rest } = this.props;

    const outerClassNameFinal = [getClassName('tag__outer')];
    if (className) {
      outerClassNameFinal.push(className);
    }

    const tagClassName = [getClassName('tag__inner')];
    const angleClassName = [getClassName('tag__inner-triangle')];
    if (type) {
      tagClassName.push(tagTypeClassNames[type]);
      angleClassName.push(tagTypeClassNames[type]);
    }

    if (this.state.hovering && link) {
      tagClassName.push(getClassName('tag__inner--hovered'));
      angleClassName.push(getClassName('tag__inner-triangle--hovered'));
    }

    const tagComponent = (
      <div
        className={outerClassNameFinal.join(' ')}
        onMouseEnter={() => {
          this.setState({ hovering: true });
        }}
        onMouseLeave={() => {
          this.setState({ hovering: false });
        }}
        {...rest}
      >
        <div className={angleClassName.join(' ')} />
        <div className={tagClassName.join(' ')}>{`${tagText[type]}`}</div>
        <div className={getClassName('tag__inner-hole')} />
      </div>
    );

    if (link) {
      return (
        <NavLink
          className={getClassName('tag__inner--link')}
          to={`/blog?filter=${type}`}
        >
          {tagComponent}
        </NavLink>
      );
    }

    return tagComponent;
  }
}

Tag.propTypes = {
  link: PropTypes.bool,
  type: PropTypes.oneOf(TAG_TYPES),
  className: PropTypes.string,
  children: PropTypes.node,
};

Tag.defaultProps = {
  link: false,
  tagType: null,
  className: null,
  children: null,
};

export default Tag;
