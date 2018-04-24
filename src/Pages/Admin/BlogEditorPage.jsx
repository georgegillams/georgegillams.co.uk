import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import querystring from 'querystring';
import { Prompt } from 'react-router-dom';
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
      updateResult: null,
      dirty: false,
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

    let statusMessage = '';
    if (this.state.updateResult === undefined) {
      statusMessage = 'Blog was unable to be saved. Check the private API Key';
    } else if (this.state.updateResult) {
      statusMessage = `Blog ${this.state.updateResult.blog_id} saved!`;
    }

    return (
      <div style={{ width: '100%' }}>
        <BpkBannerAlert
          message={statusMessage}
          show={this.state.updateResult !== null}
          type={
            this.state.updateResult ? ALERT_TYPES.SUCCESS : ALERT_TYPES.ERROR
          }
          className={getClassName('pages__card')}
        />
        <BpkInput
          className={getClassName('pages__card')}
          type={INPUT_TYPES.PASSWORD}
          id="apiKey"
          name="API Key"
          value={this.state.apiKey}
          onChange={event => this.setState({ apiKey: event.target.value })}
          placeholder="API Key"
        />
        <Button
          disabled={!this.state.dirty}
          className={getClassName('pages__card')}
          onClick={() => {
            DatabaseFunctions.updateBlog(
              this.state.apiKey,
              this.state.blog,
              result => {
                this.setState({
                  dirty: result ? false : this.state.dirty,
                  updateResult: result,
                });
              },
            );
          }}
          style={{ width: '100%' }}
        >
          {this.state.dirty ? 'Save changes' : 'No changes to save'}
        </Button>
        <div className={getClassName('blog-editor')}>
          <BlogEditor
            className={getClassName('blog-editor__component')}
            elementClassName={getClassName(
              'blog-editor__component__editor-element',
            )}
            blog={this.state.blog}
            onBlogChanged={b => {
              this.setState({ dirty: true, blog: b });
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
        <Prompt
          when={this.state.dirty}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
      </div>
    );
  }
}

export default BlogEditorPage;
