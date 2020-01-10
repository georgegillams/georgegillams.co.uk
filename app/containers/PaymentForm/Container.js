import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import { FormBuilder } from 'gg-components/dist/FormBuilder';

import { APIEntity } from 'gg-components/dist/Auth';
import { Button } from 'gg-components/dist/Button';
import { Paragraph, Section, SubSection } from 'gg-components/dist/Typography';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Section name="Pay online">
          <FormBuilder
            disabled={addPaymentLoading}
            entity={this.state.newPayment || {}}
            submitLabel="Continue to payment"
            formFields={[
              { id: 'amount', name: 'Amount (GBP)', show: true },
              { id: 'email', name: 'Email', show: true },
            ]}
            onDataChanged={newPayment => {
              this.setState({ newPayment });
            }}
            onSubmit={() => {
              addPayment(this.state.newPayment);
            }}
          />
        </Section>
        {isAdmin && (
          <Section name="Admin - payments">
            <Button
              onClick={() => {
                loadPayments();
              }}
            >
              Reload
            </Button>
            {showPayments &&
              payments.map(p => (
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
          </Section>
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
