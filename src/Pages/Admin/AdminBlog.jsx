import React from 'react';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import BpkInput from 'bpk-component-input';
import Section from '../../components/Section';
import TextLink from '../../components/TextLink';
import SubSection from '../../components/SubSection';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class AdminBlog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { apiKey, blog, className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <SubSection name={`${blog.blogName}`}>
        {`${blog.blogId} ${blog.blogName} ${blog.publishedTimestamp}`}
        <br />
        <Button href={`/admin/blog-editor?id=${blog.blogId}`}>Edit blog</Button>
        {apiKey !== '' && (
          <Button
            destructive
            onClick={() => {
              DatabaseFunctions.deleteBlog(apiKey, blog.blogId, result => {
                console.log(result);
              });
            }}
          >
            Delete blog
          </Button>
        )}
      </SubSection>
    );
  }
}

export default AdminBlog;
