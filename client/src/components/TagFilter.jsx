import React, { Component } from 'react';
import Tag, { TAG_TYPES } from './Tag';

import STYLES from './tag-filter.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class TagFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTags: [],
    };
  }

  render() {
    const { className, ...rest } = this.props;

    const outerClassName = [getClassName('tag-filter__outer')];
    if (className) {
      outerClassName.push(className);
    }

    return (
      <div className={outerClassName.join(' ')}>
        {Object.keys(TAG_TYPES).map(v => (
          <Tag className={getClassName('tag-filter__tag')} type={v} link />
        ))}
      </div>
    );
  }
}

export default TagFilter;
