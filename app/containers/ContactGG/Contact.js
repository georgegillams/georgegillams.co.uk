import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/dist/Cards';
import { Section, SubSection } from 'gg-components/dist/Typography';
import { Button } from 'gg-components/dist/Button';
import { GG_EMAIL } from 'helpers/constants';

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
          <div
            style={{ paddingTop: '1rem' }}
            className={getClassName('pages__compact-card-container')}
          >
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/nmkJVkO.png"
              href="https://www.fb.com/georgegillams"
              title="Facebook"
            />
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/2x6do1x.png"
              href="https://www.linkedin.com/in/george-gillams-37537077"
              title="Linkedin"
            />
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/54unoGD.png"
              href={`mailto:${GG_EMAIL}`}
              title="Email"
            >
              <Section>{GG_EMAIL}</Section>
            </ArticleCard>
          </div>
          <br />
          <br />
          <Button
            hrefExternal
            href="https://www.dropbox.com/s/aj9wjgotkldd18j/georgegillams.vcf?dl=1"
          >
            Download contact (iOS)
          </Button>
          <br />
          <br />
          <Button
            hrefExternal
            href="https://www.dropbox.com/s/k8hmxeh2qpjqx66/google.csv?dl=1"
          >
            Download contact (Android)
          </Button>
          <br />
          <br />
          <SubSection
            className={getClassName('pages__card')}
            anchor={false}
            name="Alternatively find me on WhatsApp or Signal"
          />
        </Section>
      </div>
    );
  }
}
