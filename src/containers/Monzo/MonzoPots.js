/* eslint-disable */
import React from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import {
  isLoaded as isCommentsLoaded,
  load as loadComments,
  create as createComment,
} from 'redux/modules/comments';
import {
  Section,
  SubSection,
  TextLink,
  Comments,
  MoneyPot,
  NotificationComp,
  NOTIFICATION_TYPES,
} from '../../components';
import { CommentArea } from 'containers';
import { cssModules } from 'bpk-react-utils';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

class MonzoPots extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      potData: null,
      lastFilled: -1,
      filled: [],
    };
  }

  componentDidMount = () => {
    fetch('https://www.georgegillams.co.uk/api/monzoPots').then(response => {
      response
        .json()
        .then(data => {
          this.setState({ potData: data });
        })
        .catch(error => {
          console.log(error);
        });
    });

    const updateNextValue = () => {
      if (!this.state.potData) {
        return;
      }

      const valueToSet = this.state.lastFilled + 1;
      const filledCopy = JSON.parse(JSON.stringify(this.state.filled));
      filledCopy[valueToSet] = true;
      this.setState({ lastFilled: valueToSet, filled: filledCopy });
    };

    setTimeout(() => {
      setInterval(updateNextValue, 100);
    }, 2000);
  };

  render() {
    const { className, ...rest } = this.props;

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="My monzo pots" />
        <Section>
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            style={{ maxWidth: '5rem' }}
            altText="Monzo bank"
            width={1}
            height={1}
            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Monzo_logo.svg/200px-Monzo_logo.svg.png"
          />
          <br />
          <Section name="Monzo pot tracking 💳">
            {this.state.potData &&
              this.state.potData.map((pot, index) => (
                <MoneyPot
                  markerPosition={pot.percentageTimeElapsed}
                  className={getClassName('pages__degree-module')}
                  name={pot.name}
                  balance={pot.balance}
                  goalAmount={pot.goalAmount}
                  percentage={pot.percentageFilled}
                  filled={this.state.filled[index]}
                />
              ))}
          </Section>
        </Section>
      </div>
    );
  }
}

export default MonzoPots;