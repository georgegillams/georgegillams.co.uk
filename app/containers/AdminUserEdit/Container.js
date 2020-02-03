import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import { LoadingIndicator } from 'gg-components/dist/LoadingIndicator';
import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/dist/Cards';
import { Button } from 'gg-components/dist/Button';
import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import { FormBuilder } from 'gg-components/dist/FormBuilder';
import { CodeInline } from 'gg-components/dist/Code';
import Ticket from 'components/Ticket';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'gg-components/dist/Auth';
import { CreateUsertoeditForm } from 'components/Forms';
import STYLES from 'containers/pages.scss';
import { EMAIL_REGEX, UNAME_REGEX } from 'helpers/constants';

const getClassName = cssModules(STYLES);

export default class AdminUsertoeditEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newUsertoedit: null };
  }

  componentDidMount = () => {
    const usertoeditId = this.props.match.params.id;
    if (usertoeditId) {
      this.props.loadUsertoedit(usertoeditId);
    }
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,

      className,

      loadUsertoedit,
      updateUsertoedit,
      usertoedit,
      loadingUsertoedit,
      loadUsertoeditSuccess,
      loadUsertoeditError,
      updatingUsertoedit,
      updateUsertoeditSuccess,
      updateUsertoeditError,
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin/usertoedit')}
        >
          <Section name={`Admin - user ${usertoedit && usertoedit.id}`}>
            <FormBuilder
              entity={this.state.usertoedit || usertoedit || {}}
              formFields={[
                {
                  id: 'name',
                  name: 'Name',
                  validationRegex: UNAME_REGEX,
                  show: true,
                },
                {
                  id: 'uname',
                  name: 'Display name',
                  validationRegex: UNAME_REGEX,
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
                {
                  id: 'emailVerified',
                  name: 'Email verified',
                  type: 'CHECKBOX',
                  show: true,
                },
              ]}
              submitLabel="Update user"
              onSubmit={() => updateUsertoedit(this.state.usertoedit)}
              onDataChanged={newValue => {
                this.setState({ usertoedit: newValue });
              }}
              disabled={updatingUsertoedit || !this.state.usertoedit}
            />
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Admin - usertoedit" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || loadingUsertoedit}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin usertoedit"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadUsertoedit,
            updateUsertoedit,
            usertoedit,
            loadingUsertoedit,
            loadUsertoeditSuccess,
            loadUsertoeditError,
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
