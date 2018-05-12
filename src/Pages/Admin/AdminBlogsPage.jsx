import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import Section from '../../components/Section';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';
import AdminComments from './AdminComments';
import AdminPayment from './AdminPayment';
import AdminBlog from './AdminBlog';
import AdminNotifications from './AdminNotifications';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class AdminBlogsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publishedBlogs: [],
      allBlogs: [],
      pattern: '',
    };
  }

  componentDidMount() {
    const getBlogs = () => {
      if (this.props.apiKey !== '') {
        DatabaseFunctions.getBlogs('all', this.props.apiKey, [], result => {
          this.setState({ allBlogs: result });
        });
      }
      DatabaseFunctions.getBlogs('all', '', [], result => {
        this.setState({ publishedBlogs: result });
      });
    };

    getBlogs();
    setInterval(getBlogs, 2000);
  }

  render() {
    const { apiKey, className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    // const pageIdList = (
    //   <Section name="Page IDs">
    //     {this.state.pageIds.map(c => <div>{c}</div>)}
    //   </Section>
    // );

    return (
      <div>
        <Section name="Published blogs">
          {this.state.publishedBlogs.length > 0 ? (
            <div>
              {this.state.publishedBlogs.map(b => (
                <AdminBlog apiKey={apiKey} blog={b} />
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </Section>
        {this.state.allBlogs.length > 0 && (
          <Section name="All blogs">
            {this.state.allBlogs.map(b => (
              <AdminBlog apiKey={apiKey} blog={b} />
            ))}
          </Section>
        )}
        {apiKey !== '' && (
          <Button
            onClick={() => {
              DatabaseFunctions.addBlog(apiKey, result => {
                console.log(result);
                if (result && result.blog_id) {
                  this.props.history.push(
                    `/admin/blog-editor?id=${result.blog_id}`,
                  );
                }
              });
            }}
          >
            Add blog
          </Button>
        )}
      </div>
    );
  }
}

export default AdminBlogsPage;
