import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import BpkInput, { INPUT_TYPES, CLEAR_BUTTON_MODES } from 'bpk-component-input';
import { cssModules } from 'bpk-react-utils';
import { associate } from 'helpers/objects';

import Skeleton from './Skeleton';

import HelperFunctions from 'helpers/HelperFunctions';
import {MoneyPot} from 'gg-components/dist/MoneyPot';
import {Button} from 'gg-components/dist/Button';
import { Section, SubSection } from 'gg-components/dist/Typography';
import { LoadingCover } from 'gg-components/dist/Auth';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class MonzoPots extends React.Component {
  loadPotData = password => {
    this.props.loadMonzo(password);
    this.props.loadTransactions(password);
  };

  render() {
    const {
      loadMonzo,
      loadTransactions,
      password,
      monzoPots,
      loading,
      transactionsLoading,
      success,
      transactions,
      loadTransactionsSuccess,
      loadTransactionsError,
      error,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    let monzoPotDisplayData = monzoPots;
    if (monzoPots && monzoPots.map && transactions && transactions.map) {
      monzoPotDisplayData = associate(
        monzoPots,
        transactions,
        'name',
        'name',
        'transactionalData',
      );
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="My monzo pots" />
        <Section>
          <Section name="Monzo pot tracking 💳">
            {!monzoPotDisplayData && (
              <BpkInput
                id="password"
                className={getClassName('pages__component')}
                type={INPUT_TYPES.password}
                name="password"
                value={password}
                onChange={event => {
                  this.loadPotData(event.target.value);
                }}
                placeholder="Password"
                clearButtonMode={CLEAR_BUTTON_MODES.whileEditing}
                clearButtonLabel="Clear"
                onClear={() => this.setState({ password: '' })}
              />
            )}
            {monzoPotDisplayData && monzoPotDisplayData.map && (
              <Button
                onClick={() => {
                  this.loadPotData(password);
                }}
              >
                Reload
              </Button>
            )}
            <br />
            <br />
            {monzoPotDisplayData &&
              monzoPotDisplayData.map &&
              monzoPotDisplayData.map(pot => (
                <Fragment>
                  <MoneyPot
                    name={pot.name}
                    balance={pot.balance}
                    goalAmount={pot.goalAmount}
                    markerPosition={
                      pot.percentageExpected > 0 ? pot.percentageExpected : null
                    }
                    shortfall={pot.shortfall}
                    className={getClassName('pages__degree-module')}
                  />
                  <SubSection noPadding anchor={false}>
                    Last deposit:{' '}
                    {pot.transactionalData && pot.transactionalData.lastDeposit
                      ? `£${pot.transactionalData.lastDeposit.amount / 100} - ${
                          pot.transactionalData.lastDeposit.time
                        }`
                      : 'loading...'}
                  </SubSection>
                  <SubSection noPadding anchor={false}>
                    Last withdrawal:{' '}
                    {pot.transactionalData &&
                    pot.transactionalData.lastWithdrawal
                      ? `£${pot.transactionalData.lastWithdrawal.amount /
                          100} - ${pot.transactionalData.lastWithdrawal.time}`
                      : 'loading...'}
                  </SubSection>
                  <br />
                  <br />
                </Fragment>
              ))}
          </Section>
        </Section>
      </div>
    );
  }
}

MonzoPots.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blog: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
};

MonzoPots.defaultProps = {
  user: null,
  loading: false,
  error: null,
  blog: null,
  filter: null,
  linkPrefix: '',
  className: null,
};
