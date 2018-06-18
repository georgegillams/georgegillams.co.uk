import React from 'react';
import querystring from 'querystring';
import cookie from 'react-cookies';
import BlogRenderer from './../components/BlogRenderer';
import Comments from './../components/Comments';
import Loading from './../components/Loading';
import DatabaseFunctions from './../DatabaseFunctions';
import HelperFunctions from './../HelperFunctions';
import PageSwitchScroller from '../components/PageSwitchScroller';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class BlogViewerPage extends React.Component {
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
      const urlPropQueryString = location.split('?')[1].split('#')[0];
      const props = querystring.parse(urlPropQueryString);
      if (props !== undefined) {
        const blogId = props.id;
        const getBlog = () => {
          if (this.state.blog) {
            return;
          }
          DatabaseFunctions.getBlog(this.state.apiKey, blogId, result => {
            this.setState({ blog: result });
            // window.history.pushState(
            //   'userFriendlyUrl',
            //   'result.blogName',
            //   result.blogCardLink,
            // );
          });
        };

        const reloadCookies = () => {
          this.setState({
            loggedInAdmin: cookie.load('loggedInAdmin'),
          });
        };

        getBlog();
        reloadCookies();
        setInterval(getBlog, 2000);
        setInterval(reloadCookies, 2000);
      }
    }
  }

  render() {
    if (!this.state.blog) {
      return <Loading />;
    }

    return (
      <div id="greasy_blog_handle">
        <PageSwitchScroller />
        <BlogRenderer
          showEditLink={this.state.loggedInAdmin}
          centered={HelperFunctions.includes(
            this.state.blog.blogTags,
            'travel',
          )}
          blog={this.state.blog}
        />
        <Comments
          centered={HelperFunctions.includes(
            this.state.blog.blogTags,
            'travel',
          )}
          pageId={this.state.blog.blogId}
        />
      </div>
    );
  }
}
// elementClassName={elementClassNameFinal.join(' ')}

export default BlogViewerPage;
