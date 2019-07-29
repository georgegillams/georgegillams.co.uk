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
import MoneyPot from 'components/MoneyPot';
import GGButton from 'gg-components/dist/GGButton';
import { Section, SubSection } from 'components/Typography';
import { LoadingCover } from 'components/Auth';
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
    const outerClassNameFinal = [getClassName('pages__container')];

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
      console.log(`monzoPotDisplayData`, monzoPotDisplayData);
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
              <GGButton
                onClick={() => {
                  this.loadPotData(password);
                }}
              >
                Reload
              </GGButton>
            )}
            <br />
            <br />
            {monzoPotDisplayData &&
              monzoPotDisplayData.map &&
              monzoPotDisplayData.map(pot => (
                <Fragment>
                  <MoneyPot
                    markerPosition={pot.percentageTimeElapsed}
                    className={getClassName('pages__degree-module')}
                    name={pot.name}
                    shortfall={pot.shortfall}
                    balance={pot.balance}
                    goalAmount={pot.goalAmount}
                    percentage={pot.percentageComplete}
                    filled
                  />
                  <SubSection noPadding noAnchor>
                    Last deposit:{' '}
                    {pot.transactionalData &&
                    pot.transactionalData.lastDepositAmount
                      ? `£${pot.transactionalData.lastDepositAmount / 100}`
                      : 'loading...'}
                  </SubSection>
                  <SubSection noPadding noAnchor>
                    Last withdrawal:{' '}
                    {pot.transactionalData &&
                    pot.transactionalData.lastWithdrawalAmount
                      ? `£${pot.transactionalData.lastWithdrawalAmount / 100}`
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
