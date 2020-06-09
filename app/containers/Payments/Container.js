import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import {
  Paragraph,
  SubSection,
  TextLink,
  PageTitle,
} from 'gg-components/Typography';
import { CodeInline } from 'gg-components/Code';
import { CopyButton } from 'gg-components/Button';

import STYLES from './payments.scss';

import PaymentForm from 'containers/PaymentForm';

const getClassName = cssModules(STYLES);

export default class PaymentsPage extends React.Component {
  render() {
    const { className } = this.props;
    const classNames = [];

    if (className) {
      classNames.push(className);
    }

    return (
      <div className={classNames.join(' ')}>
        <Helmet title="Payments" />
        <PageTitle name="Send me money">
          <PaymentForm />
        </PageTitle>
      </div>
    );
  }
}

PaymentsPage.propTypes = {
  className: PropTypes.string,
};
