import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import {
  Paragraph,
  Section,
  SubSection,
  TextLink,
} from 'gg-components/dist/Typography';
import { CodeInline } from 'gg-components/dist/Code';
import { CopyButton } from 'gg-components/dist/Button';
import { GG_EMAIL } from 'helpers/constants';
import STYLES from './payments.scss';

const getClassName = cssModules(STYLES);

export default class PaymentsPage extends React.Component {
  render() {
    const { className, ...rest } = this.props;
    const classNames = [];

    if (className) {
      classNames.push(className);
    }

    return (
      <div className={classNames.join(' ')} {...rest}>
        <Helmet title="Payments" />
        <Section name="Send me money">
          <Paragraph>
            If you want to send me money, you can do so in a number of ways:
          </Paragraph>
          <SubSection name="Bank transfer">
            <Paragraph className={getClassName('payments__inline')}>
              <CodeInline>04-00-04</CodeInline>
              <CopyButton style={{ display: 'inline' }} text="040004" />{' '}
              <CodeInline>05339705</CodeInline>
              <CopyButton style={{ display: 'inline' }} text="05339705" />
            </Paragraph>
          </SubSection>
        </Section>
      </div>
    );
  }
}

PaymentsPage.propTypes = {
  className: PropTypes.string,
};
