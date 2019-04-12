import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Card from 'bpk-component-card';
import LoadingIndicator from 'components/LoadingIndicator';
import { BlogCard } from 'components/Blogs';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
import FormBuilder from 'components/Forms';
import Ticket from 'components/Ticket';
import { ID_REGEX } from 'helpers/constants';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'components/Auth';
import Skeleton from './Skeleton';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';

const getClassName = cssModules(STYLES);

export default class AdminUsers extends React.Component {
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
              submitLabel={'Create blog'}
              onSubmit={() => createBlog(this.state.newBlog.requestedId)}
              onDataChanged={newValue => {
                this.setState({ newBlog: newValue });
              }}
            />
            {blogs &&
              blogs.map &&
              blogs.map(b => (
                <Card style={{ marginBottom: '2rem' }}>
                  <APIEntity name="more" entityType="Blog" entity={b}>
                    {' '}
                  </APIEntity>
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

AdminUsers.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
