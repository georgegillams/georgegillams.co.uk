import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router-dom';
import Tag, { TAG_TYPES } from './Tag';
import HelperFunctions from '../HelperFunctions';

import STYLES from './tag-filter.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class TagFilter extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    if (HelperFunctions.includes(`${this.props.location.search}`, 'filter')) {
      const valuesString = `${this.props.location.search}`.split('=')[1];
      const selectedTagsOnLoad = [];
      valuesString.split('+').forEach(s => {
        selectedTagsOnLoad.push(s);
      });
      this.props.onSelectedTagsChanged(selectedTagsOnLoad);
    }
  };

  toggle = tagType => {
    const newSelectedTags = JSON.parse(JSON.stringify(this.props.selectedTags));
    if (HelperFunctions.includes(newSelectedTags, tagType)) {
      newSelectedTags.splice(newSelectedTags.indexOf(tagType), 1);
    } else {
      newSelectedTags.push(tagType);
    }
    this.props.onSelectedTagsChanged(newSelectedTags);
    this.updateUrl(newSelectedTags);
  };

  updateUrl = selectedTags => {
    if (!this.props.history) {
      return;
    }
    const filterEnabled = selectedTags.length !== 0;
    if (filterEnabled) {
      this.props.history.push(`/blog?filter=${selectedTags.join('+')}`);
    } else {
      this.props.history.push('/blog');
    }
  };

  render() {
    const {
      className,
      selectedTags,
      onSelectedTagsChanged,
      history,
      ...rest
    } = this.props;

    const outerClassName = [getClassName('tag-filter__outer')];
    if (className) {
      outerClassName.push(className);
    }

    const filterEnabled = selectedTags.length !== 0;

    return (
      <div className={outerClassName.join(' ')}>
        {Object.keys(TAG_TYPES).map(v => (
          <Tag
            disabled={
              filterEnabled && !HelperFunctions.includes(selectedTags, v)
            }
            className={getClassName('tag-filter__tag')}
            type={v}
            onClick={() => {
              this.toggle(v);
            }}
          />
        ))}
      </div>
    );
  }
}

TagFilter.propTypes = {
  onSelectedTagsChanged: PropTypes.func.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  history: PropTypes.func,
};

TagFilter.defaultProps = {
  className: null,
  history: null,
};

export default TagFilter;
