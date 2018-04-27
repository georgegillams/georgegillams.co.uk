import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkInput from 'bpk-component-input';
import BpkTextArea from 'bpk-component-textarea';
import { withRouter } from 'react-router-dom';
import BpkCheckBox from 'bpk-component-checkbox';
import TagFilter from './TagFilter';

import STYLES from './article-date.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const TagFilterRoutable = withRouter(TagFilter);

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

  onBlogTagsChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogTags = event.target.value.split(' ');
    this.props.onBlogChanged(newBlog);
  };

  onBlogHeroImageChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogHeroImage = event.target.value;
    this.props.onBlogChanged(newBlog);
  };

  onBlogImageChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogImage = event.target.value;
    this.props.onBlogChanged(newBlog);
  };

  onBlogImageBorderColorChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogImageBorderColor = event.target.value;
    this.props.onBlogChanged(newBlog);
  };

  onBlogBannerColorChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogBannerColor = event.target.value;
    this.props.onBlogChanged(newBlog);
  };

  onBlogCardLinkChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogCardLink = event.target.value;
    this.props.onBlogChanged(newBlog);
  };

  onBlogPublishedChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogPublished = event.target.checked;
    this.props.onBlogChanged(newBlog);
  };

  onBlogShowInBlogsListChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogShowInBlogsList = event.target.checked;
    this.props.onBlogChanged(newBlog);
  };

  onBlogCardLightChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogCardLight = event.target.checked;
    this.props.onBlogChanged(newBlog);
  };

  onBlogCardDateChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogCardDate = event.target.value;
    this.props.onBlogChanged(newBlog);
  };

  onBlogContentChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogContent = event.target.value;
    this.props.onBlogChanged(newBlog);
  };

  onBlogBibtexChanged = event => {
    const newBlog = JSON.parse(JSON.stringify(this.props.blog));
    newBlog.blogBibtex = event.target.value;
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
        <BpkInput
          className={elementClassNameFinal.join(' ')}
          id="blogCardImage"
          name="Blog card image"
          value={blog.blogImage}
          onChange={this.onBlogImageChanged}
          placeholder="Blog card image"
        />
        <BpkInput
          className={elementClassNameFinal.join(' ')}
          id="blogCardHeroImage"
          name="Blog card hero image"
          value={blog.blogHeroImage}
          onChange={this.onBlogHeroImageChanged}
          placeholder="Blog card hero image"
        />
        <BpkInput
          className={elementClassNameFinal.join(' ')}
          id="blogCardDate"
          name="Blog card date"
          value={blog.blogCardDate}
          onChange={this.onBlogCardDateChanged}
          placeholder="Blog card date"
        />
        <BpkCheckBox
          className={elementClassNameFinal.join(' ')}
          label="lightCard"
          name="lightCard"
          checked={blog.blogCardLight}
          onChange={this.onBlogCardLightChanged}
        />
        <BpkInput
          className={elementClassNameFinal.join(' ')}
          id="blogCardLink"
          name="Blog card link"
          value={blog.blogCardLink}
          onChange={this.onBlogCardLinkChanged}
          placeholder="Blog card link"
        />
        <BpkInput
          className={elementClassNameFinal.join(' ')}
          id="blogBanneColor"
          name="Blog banner color"
          value={blog.blogBannerColor}
          onChange={this.onBlogBannerColorChanged}
          placeholder="Blog banner color"
        />
        <BpkInput
          className={elementClassNameFinal.join(' ')}
          id="blogCardImageBorderColor"
          name="Blog card image border color"
          value={blog.blogImageBorderColor}
          onChange={this.onBlogImageBorderColorChanged}
          placeholder="Blog card image border color"
        />
        <BpkCheckBox
          className={elementClassNameFinal.join(' ')}
          label="published"
          name="published"
          checked={blog.blogPublished}
          onChange={this.onBlogPublishedChanged}
        />
        <br />
        <BpkCheckBox
          className={elementClassNameFinal.join(' ')}
          label="showInBlogsList"
          name="showInBlogsList"
          checked={blog.blogShowInBlogsList}
          onChange={this.onBlogShowInBlogsListChanged}
        />
        <BpkInput
          className={elementClassNameFinal.join(' ')}
          id="blogTags"
          name="Blog tags"
          value={blog.blogTags ? blog.blogTags.join(' ') : 'photography'}
          onChange={this.onBlogTagsChanged}
          placeholder="Blog tags"
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
        <BpkTextArea
          className={elementClassNameFinal.join(' ')}
          id="blogBibtex"
          name="Blog bibtex"
          value={blog.blogBibtex}
          onChange={this.onBlogBibtexChanged}
          placeholder="Blog bibtex"
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
