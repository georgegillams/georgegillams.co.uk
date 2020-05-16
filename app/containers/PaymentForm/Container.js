import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import { FormBuilder } from 'gg-components/FormBuilder';

import { PageTitle } from 'gg-components/Typography';
import { APIEntity } from 'gg-components/Auth';
import { Button } from 'gg-components/Button';
import { Checkbox } from 'gg-components/Checkbox';
import STYLES from 'containers/pages.scss';
import { EMAIL_REGEX, DECIMAL_REGEX } from 'helpers/constants';

const getClassName = cssModules(STYLES);

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { filterDeleted: true };
  }

  componentDidMount() {
    this.props.loadPayments();
  }

  render() {
    const {
      user,

      addPayment,
      addPaymentLoading,
      addPaymentSuccess,
      addPaymentErrored,

      payments,
      loadPayments,
      loadingPayments,
      loadPaymentsSuccess,
      loadPaymentsError,
      deletePayment,
      deletePaymentLoading,
      deletePaymentSuccess,
      deletePaymentError,

      className,
      ...rest
    } = this.props;

    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const isAdmin = user && user.admin;
    const showPayments = isAdmin && payments && payments.length > 0;

    let filteredPayments = payments;
    if (filteredPayments) {
      if (this.state.filterDeleted) {
        filteredPayments = filteredPayments.filter(x => !x.deleted);
      }
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <FormBuilder
          presubmitText="Your email will be used only to send a payment receipt."
          disabled={addPaymentLoading}
          entity={this.state.newPayment || {}}
          submitLabel="Continue to payment"
          formFields={[
            {
              id: 'amount',
              name: 'Amount (GBP)',
              show: true,
              validationRegex: DECIMAL_REGEX,
            },
            {
              id: 'email',
              name: 'Email',
              show: true,
              validationRegex: EMAIL_REGEX,
            },
          ]}
          onDataChanged={newPayment => {
            this.setState({ newPayment });
          }}
          onSubmit={() => {
            addPayment(this.state.newPayment);
          }}
        />
        {isAdmin && (
          <PageTitle name="Admin - payments">
            <Button
              onClick={() => {
                loadPayments();
              }}
            >
              Reload
            </Button>
            <br />
            <br />
            <Checkbox
              label="Show deleted"
              name="filterDeleted"
              checked={!this.state.filterDeleted}
              onChange={event => {
                this.setState({
                  filterDeleted: !event.target.checked,
                });
              }}
            />
            <br />
            <br />
            {showPayments &&
              filteredPayments.map(p => (
                <Fragment>
                  <APIEntity name="more" entityType="Payment" entity={p} />
                  <Button
                    destructive
                    onClick={() => {
                      deletePayment(p);
                    }}
                  >
                    Delete
                  </Button>
                </Fragment>
              ))}
          </PageTitle>
        )}
      </div>
    );
  }
}

PaymentForm.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blog: PropTypes.object,
  filter: PropTypes.func,
  paymentPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
};

PaymentForm.defaultProps = {
  user: null,
  loading: false,
  error: null,
  blog: null,
  filter: null,
  paymentPrefix: '',
  className: null,
};
