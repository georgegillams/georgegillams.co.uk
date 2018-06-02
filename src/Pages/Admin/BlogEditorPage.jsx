import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import cookie from 'react-cookies';
import querystring from 'querystring';
import { Prompt } from 'react-router-dom';
import BlogEditor from '../../components/BlogEditor';
import BlogPreview from '../../components/BlogPreview';
import Button from '../../components/Button';
import Section from '../../components/Section';
import Tag, { TAG_TYPES } from '../../components/Tag';
import ArticleCard from '../../components/ArticleCard';
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
      loggedInSession: cookie.load('loggedInSession'),
      updateResult: null,
      dirty: false,
    };
  }

  // TODO PERIODICALLY UPDATE loggedInSession COOKIE

  componentDidMount() {
    const location = `${window.location}`;
    if (location.split('?').length > 1) {
      const urlPropQueryString = location.split('?')[1];
      const props = querystring.parse(urlPropQueryString);
      if (props !== undefined) {
        const blogId = props.id;
        const getBlog = () => {
          if (this.state.blog) {
            return;
          }
          DatabaseFunctions.getBlog(
            this.state.loggedInSession,
            blogId,
            result => {
              if (result && result.length === undefined) {
                this.setState({ blog: result });
              }
            },
          );
        };

        const reloadCookies = () => {
          this.setState({
            loggedInSession: cookie.load('loggedInSession'),
          });
        };

        getBlog();
        setInterval(getBlog, 2000);
        setInterval(reloadCookies, 2000);
      }
    }
  }

  render() {
    let statusMessage = '';
    if (this.state.updateResult === undefined) {
      statusMessage =
        'Blog was unable to be saved. Check you are logged in properly';
    } else if (this.state.updateResult) {
      statusMessage = `Blog ${this.state.updateResult.blog_id} saved!`;
    }

    const datePublished = new Date(
      this.state.blog ? 1000 * this.state.blog.publishedTimestamp : null,
    );

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
        {this.state.blog && (
          <Button
            disabled={!this.state.dirty}
            className={getClassName('pages__card')}
            onClick={() => {
              DatabaseFunctions.updateBlog(
                this.state.loggedInSession,
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
        )}
        {this.state.blog && (
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
        )}
        <Prompt
          when={this.state.dirty}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        {this.state.blog && (
          <Section name="This is what the blog card will look like!">
            <ArticleCard
              day={datePublished.getDate()}
              month={datePublished.getMonth()}
              className={getClassName('pages__card')}
              fillImageSrc={this.state.blog.blogHeroImage}
              imageSrc={this.state.blog.blogImage}
              linkUrl={null}
              title={this.state.blog.blogName}
              imageBorder={
                this.state.blog.blogImageBorderColor
                  ? this.state.blog.blogImageBorderColor
                  : null
              }
              bannerColor={
                this.state.blog.blogBannerColor
                  ? this.state.blog.blogBannerColor
                  : null
              }
              light={this.state.blog.blogCardLight}
              autoTallLayout
            >
              {this.state.blog &&
                this.state.blog.blogTags &&
                this.state.blog.blogTags.map(t => <Tag type={t} />)}{' '}
            </ArticleCard>
          </Section>
        )}
      </div>
    );
  }
}

export default BlogEditorPage;
