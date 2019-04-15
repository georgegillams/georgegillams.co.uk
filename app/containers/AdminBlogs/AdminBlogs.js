import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Card from 'bpk-component-card';
import { cssModules } from 'bpk-react-utils';
import { BlogCard } from 'components/Blogs';
import GGButton from 'components/GGButton';
import { Section } from 'components/Typography';
import FormBuilder from 'components/Forms';
import { ID_REGEX } from 'helpers/constants';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'components/Auth';
import Skeleton from './Skeleton';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class AdminBlogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newBlog: {} };
  }

  componentDidMount = () => {
    this.props.loadBlogs();
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      className,
      loadBlogs,
      blogs,
      blogsLoading,
      blogsLoadedSuccess,
      blogsLoadedError,
      createBlog,
      creatingBlog,
      deleteBlog,
      deletingBlog,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin/blog')}
        >
          <Section name="Admin - blog">
            <FormBuilder
              formFields={[
                {
                  id: 'requestedId',
                  name: 'Desired ID',
                  validationRegex: ID_REGEX,
                  show: true,
                  disabled: creatingBlog,
                },
              ]}
              entity={this.state.newBlog}
              submitLabel="Create blog"
              onSubmit={() => createBlog(this.state.newBlog.requestedId)}
              onDataChanged={newValue => {
                this.setState({ newBlog: newValue });
              }}
            />
            {blogs &&
              blogs.map &&
              blogs.map(b => (
                <Card style={{ marginBottom: '2rem' }}>
                  <APIEntity name="more" entityType="Blog" entity={b} />
                  <BlogCard linkPrefix="/admin/blog/edit" blog={b} />
                  <GGButton
                    large
                    destructive
                    disabled={deletingBlog}
                    onClick={() => deleteBlog(b)}
                  >
                    Delete
                  </GGButton>
                </Card>
              ))}
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Admin - blogs" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || (!blogs && blogsLoading)}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin blogs"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadBlogs,
            blogs,
            blogsLoading,
            blogsLoadedSuccess,
            blogsLoadedError,
          }}
        />
      </Fragment>
    );
  }
}

AdminBlogs.propTypes = {
  createBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  loadBlogs: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  setLoginRedirect: PropTypes.func.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  blogsLoadedError: PropTypes.object,
  blogsLoadedSuccess: PropTypes.bool,
  blogsLoading: PropTypes.bool,
  className: PropTypes.string,
  creatingBlog: PropTypes.bool,
  deletingBlog: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggingIn: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  userLoading: PropTypes.bool,
};

AdminBlogs.defaultProps = {
  blogs: null,
  blogsLoadedError: null,
  blogsLoadedSuccess: false,
  blogsLoading: false,
  className: null,
  creatingBlog: false,
  deletingBlog: false,
  error: null,
  loggingIn: false,
  user: null,
  userLoading: false,
};
