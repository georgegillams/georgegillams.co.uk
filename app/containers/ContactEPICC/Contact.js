import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

import { Section, TextLink } from 'gg-components/dist/Typography';
import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/dist/Cards';
import {GGButton} from 'gg-components/dist/GGButton';
import { EPICC_EMAIL } from 'helpers/constants';

const getClassName = cssModules(STYLES);

export default class Contact extends Component {
  render() {
    return (
      <div
        className={[
          getClassName('pages__container'),
          getClassName('pages__container--centered'),
        ].join(' ')}
      >
        <Helmet title="Contact" />
        <Section name="Get in touch">
          If you experience any issues or have any questions, please contact us
          at:{' '}
          <TextLink href="mailto:epicc-conference@wessexccp.org">
            epicc-conference@wessexccp.org
          </TextLink>
          .
        </Section>
      </div>
    );
  }
}
