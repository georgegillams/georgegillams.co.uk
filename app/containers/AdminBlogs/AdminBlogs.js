import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LoadingIndicator from 'components/LoadingIndicator';
import BlogsList from 'components/Blogs';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
import Ticket from 'components/Ticket';
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

    this.state = { showTickets: false };
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
            {blogs &&
              blogs.map &&
              blogs.map(b => (
                <Fragment>
                  <APIEntity name="more" entityType="Blog" entity={b}>
                    {' '}
                  </APIEntity>
                  <BlogsList linkPrefix="/admin/blog/edit" blogs={[b]} />
                </Fragment>
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
          loading={userLoading || blogsLoading}
        >
          {page}
        </LoadingCover>
        <DebugObject debugTitle="Admin blogs" debugObject={{}} />
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