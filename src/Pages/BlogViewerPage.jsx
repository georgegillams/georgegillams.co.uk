import React from 'react';
import querystring from 'querystring';
import Funnies from 'funnies';
import { BpkExtraLargeSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import SubSection from './../components/SubSection';
import BlogRenderer from './../components/BlogRenderer';
import Comments from './../components/Comments';
import DatabaseFunctions from './../DatabaseFunctions';

const funnies = new Funnies();
import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

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

        getBlog();
        setInterval(getBlog, 2000);
      }
    }
  }

  render() {
    if (!this.state.blog) {
      return (
        <SubSection noAnchor style={{ textAlign: 'center' }} name="Loading...">
          {funnies.message()}
          <br />
          <br />
          <BpkExtraLargeSpinner large type={SPINNER_TYPES.dark} />
        </SubSection>
      );
    }

    return (
      <div>
        <BlogRenderer blog={this.state.blog} />
        <Comments pageId={this.state.blog.blogId} />
      </div>
    );
  }
}
// elementClassName={elementClassNameFinal.join(' ')}

export default BlogEditorPage;
