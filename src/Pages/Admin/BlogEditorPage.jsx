import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import querystring from 'querystring';
import BlogEditor from '../../components/BlogEditor';
import BlogPreview from '../../components/BlogPreview';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';

import STYLES from '../pages.scss';
import BS_STYLES from './blog-editor.scss';

const getClassName = className =>
  STYLES[className] || BS_STYLES[className] || 'UNKNOWN';

class BlogEditorPage extends React.Component {
  constructor() {
    super();

    this.state = {
      blog: null,
      apiKey: '',
    };
  }

  componentDidMount() {
    const location = `${window.location}`;
    if (location.split('?').length > 1) {
      const urlPropQueryString = location.split('?')[1];
      const props = querystring.parse(urlPropQueryString);
      if (props !== undefined) {
        const blogId = props.id;
        const getBlog = () => {
          DatabaseFunctions.getBlog(blogId, result => {
            this.setState({ blog: result });
          });
        };

        getBlog();
      }
    }
  }

  render() {
    if (!this.state.blog) {
      return null;
    }

    return (
      <div style={{ width: '100%' }}>
        <BpkInput
          className={getClassName('pages__card')}
          type={INPUT_TYPES.PASSWORD}
          id="apiKey"
          name="API Key"
          value={this.state.apiKey}
          onChange={event => this.setState({ apiKey: event.target.value })}
          placeholder="API Key"
        />
        <div className={getClassName('blog-editor')}>
          <BlogEditor
            className={getClassName('blog-editor__component')}
            elementClassName={getClassName(
              'blog-editor__component__editor-element',
            )}
            blog={this.state.blog}
            onBlogChanged={b => {
              this.setState({ blog: b });
            }}
          />
          <BlogPreview
            className={getClassName('blog-editor__component')}
            elementClassName={getClassName(
              'blog-editor__component__preview-element',
            )}
            blog={this.state.blog}
            light
            noAnchor
          />
        </div>
        <Button
          onClick={() => {
            DatabaseFunctions.updateBlog(
              this.state.apiKey,
              this.state.blog,
              result => {
                console.log(result);
              },
            );
          }}
          style={{ width: '100%' }}
        >
          Save changes
        </Button>
      </div>
    );
  }
}

export default BlogEditorPage;
