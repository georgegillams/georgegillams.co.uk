import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  isLoaded as isPaymentsLoaded,
  load as loadPayments,
} from 'redux/modules/payments';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { APIEntity, AdminOnly, Loading, TagFilter, Button } from 'components';
import {
  NON_EMOJI_REGEX,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
} from '../../utils/constants';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isPaymentsLoaded(getState())) {
        promises.push(dispatch(loadPayments()));
      }
      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    payments: state.payments ? state.payments.data : null,
    user: state.auth.user,
  }),
  dispatch => bindActionCreators({ loadPayments }, dispatch),
)
export default class Payments extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    payments: PropTypes.arrayOf(PropTypes.object),
    loadPayments: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = { selectedTags: [] };
  }

  componentDidMount = () => {
    this.interval = setInterval(
      this.reloadPaymentsIfNecessary,
      CHECK_FOR_NEW_CONTENT_INTERVAL,
    );
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadPaymentsIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadPayments();
    }
  };

  render() {
    const { user, payments, loadPayments, className, ...rest } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (!payments) {
      return null;
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Payments" />
        <AdminOnly user={user}>
          <div>
            {`Payments: ${payments.length}`}
            <br />
            <br />
            {payments &&
              payments.map(payment => (
                <div>
                  <APIEntity entityType="Payment" entity={payment} />
                  {`Amount ${payment.amount}`}
                  <br />
                  {`Account No ${payment.accountNumber}`}
                  <br />
                  {`Sort code ${payment.sortCode}`}
                  <br />
                  {`Monzo link ${payment.monzoMeLink}`}
                  <br />
                  <br />
                </div>
              ))}
          </div>
        </AdminOnly>
      </div>
    );
  }
}
