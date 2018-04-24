import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Section from './Section';
import BpkInput from 'bpk-component-input';
import BpkTextArea from 'bpk-component-textarea';

import STYLES from './article-date.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class BlogEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onBlogNameChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogName = event.target.value;
    this.props.onBlogChanged(newBlog);
  };

  onBlogContentChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogContent = event.target.value;
    this.props.onBlogChanged(newBlog);
  };

  render() {
    const { blog, className, elementClassName, ...rest } = this.props;

    const classNameFinal = [getClassName('article-date__date')];
    if (className) {
      classNameFinal.push(className);
    }
    const elementClassNameFinal = [getClassName('pages__card')];
    if (elementClassName) {
      elementClassNameFinal.push(elementClassName);
    }

    return (
      <div
        className={classNameFinal.join(' ')}
        style={{ backgroundColor: 'darkgray' }}
      >
        <BpkInput
          className={elementClassNameFinal.join(' ')}
          id="blogName"
          name="Blog name"
          value={blog.blogName}
          onChange={this.onBlogNameChanged}
          placeholder="Blog name"
        />
        <BpkTextArea
          style={{ minHeight: '45rem' }}
          className={elementClassNameFinal.join(' ')}
          id="blogContent"
          name="Blog content"
          value={blog.blogContent}
          onChange={this.onBlogContentChanged}
          placeholder="Blog content"
        />
      </div>
    );
  }
}

BlogEditor.propTypes = {
  blog: PropTypes.object.isRequired,
  className: PropTypes.string,
};

BlogEditor.defaultProps = {
  className: null,
};

export default BlogEditor;
