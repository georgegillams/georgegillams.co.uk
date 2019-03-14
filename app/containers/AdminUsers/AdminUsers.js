import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LoadingIndicator from 'components/LoadingIndicator';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'components/Auth';
import { LoginForm } from 'components/Forms';
import Skeleton from './Skeleton';
import { CookiesOnly } from 'components/Sessions';
import generateCsv from './generateCsv';
import { downloadStringAsCsv } from 'helpers/clientOperations';

import 'containers/pages.scss';

const getClassName = c => c;

const downloadData = data => {
  const csv = generateCsv(data);
  downloadStringAsCsv('user_data.csv', csv);
};

export default class AdminUsers extends React.Component {
  componentDidMount = () => {
    this.props.loadUsers();
  };

  expandAll = () => {
    let allElements = document.getElementsByTagName('DIV');
    for (let i = 0; i < allElements.length; i += 1) {
      let element = allElements[i];
      if (element.textContent.includes('▶️ ')) {
        element.click();
      }
    }
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      cookiesAllowed,
      onCookiesAccepted,
      className,
      loadUsers,
      users,
      usersLoading,
      usersLoadedSuccess,
      usersLoadedError,
      requestMagicLinkForUser,
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
          setLoginRedirect={() => setLoginRedirect('admin/users')}
        >
          <Section name="Admin - users">
            <span>Users: </span>
            {users && users.length && <span>{users.length}</span>}
            <br />
            <br />
            {users && users.length && (
              <Fragment>
                <GGButton onClick={() => downloadData(users)} large>
                  Download user data
                </GGButton>
                <br />
                <br />
                <GGButton onClick={this.expandAll} large>
                  Expand all entities
                </GGButton>
              </Fragment>
            )}
            <br />
            <br />
            {users &&
              users.map &&
              users.map(u => (
                <APIEntity name="more" entityType="User" entity={u}>
                  <br />
                  <br />
                  <GGButton large onClick={() => requestMagicLinkForUser(u)}>
                    Login as user
                  </GGButton>
                </APIEntity>
              ))}
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Admin - users" />
        <CookiesOnly
          cookiesAccepted={cookiesAllowed}
          onAccept={onCookiesAccepted}
        />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={!cookiesAllowed || userLoading || usersLoading}
        >
          {page}
        </LoadingCover>
        <DebugObject debugTitle="Admin users" debugObject={{}} />
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
