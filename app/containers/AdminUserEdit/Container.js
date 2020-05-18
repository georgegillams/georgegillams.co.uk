import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';

import Skeleton from './Skeleton';

import { LoadingIndicator } from 'gg-components/LoadingIndicator';
import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/Cards';
import { Button } from 'gg-components/Button';
import { Section, SubSection, TextLink } from 'gg-components/Typography';
import { FormBuilder } from 'gg-components/FormBuilder';
import { CodeInline } from 'gg-components/Code';
import Ticket from 'components/Ticket';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'gg-components/Auth';
import { CreateUsertoeditForm } from 'components/Forms';
import STYLES from 'containers/pages.scss';
import { EMAIL_REGEX, USERNAME_REGEX } from 'helpers/constants';

const getClassName = cssModules(STYLES);

export default class AdminUsertoeditEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newUsertoedit: null };
  }

  componentDidMount = () => {
    const usertoeditId = this.props.id || this.props.match.params.id;
    this.props.loadUsers();
    this.setState({ usertoeditId });
  };

  render() {
    const {
      id,
      match,
      onUserUpdateSuccess,

      setLoginRedirect,
      user,
      userLoading,

      className,

      loadUsers,
      users,
      loadingUsers,
      loadUserSuccess,
      loadUserError,

      updateUsertoedit,
      updatingUsertoedit,
      updateUsertoeditSuccess,
      updateUsertoeditError,
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const usertoedit =
      users && users.filter(u => u.id === this.state.usertoeditId)[0];

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin/users')}
        >
          <Section name={`Edit user ${usertoedit && usertoedit.id}`}>
            <FormBuilder
              entity={this.state.newUsertoedit || usertoedit || {}}
              formFields={[
                {
                  id: 'name',
                  name: 'Name',
                  validationRegex: USERNAME_REGEX,
                  show: true,
                },
                {
                  id: 'uname',
                  name: 'Display name',
                  validationRegex: USERNAME_REGEX,
                  show: true,
                },
                {
                  id: 'email',
                  name: 'Email',
                  validationRegex: EMAIL_REGEX,
                  show: true,
                },
                {
                  id: 'admin',
                  name: 'Admin',
                  type: 'CHECKBOX',
                  show: true,
                },
              ]}
              submitLabel="Update user"
              onSubmit={() =>
                updateUsertoedit(this.state.newUsertoedit, onUserUpdateSuccess)
              }
              onDataChanged={newValue => {
                this.setState({ newUsertoedit: newValue });
              }}
              disabled={updatingUsertoedit || !this.state.newUsertoedit}
            />
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Admin - edit user" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || !users}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin usertoedit"
          debugObject={{
            id,
            match,
            onUserUpdateSuccess,
            setLoginRedirect,
            user,
            userLoading,
            className,
            users,
            loadUsers,
            loadingUsers,
            loadUserSuccess,
            loadUserError,
            updateUsertoedit,
            updatingUsertoedit,
            updateUsertoeditSuccess,
            updateUsertoeditError,
          }}
        />
      </Fragment>
    );
  }
}

AdminUsertoeditEdit.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
