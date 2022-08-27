import React from 'react';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
import InfoCell, { INFO_CELL_STYLES } from '@george-gillams/components/info-cell';
import withScroll from '@george-gillams/components/scroll-container';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/Button';

import STYLES from './contact.scss';
import twitterLogo from './twitter.svg';
import linkedInLogo from './linkedin.svg';
import gurushotsLogo from './gurushots.svg';
import flickrLogo from './flickr.svg';
import githubLogo from './github.svg';
import emailLogo from './email.svg';
import unsplashLogo from './unsplash.svg';
import PageContainer, { WIDTHS } from 'components/common/PageContainer';

const InfoCellWithScroll = withScroll(InfoCell);

const getClassName = cssModules(STYLES);

const Contact = () => {
  return (
    <PageContainer width={WIDTHS.fullWidth} centred>
      <PageTitle name="Get in touch">
        <InfoCellWithScroll
          className={getClassName('contact__info-cell')}
          title="Twitter"
          content={
            <TextLink href="https://twitter.com/georgegillams" hrefExternal>
              See my profile on Twitter
            </TextLink>
          }
          aux={
            <div className={getClassName('contact__icon-image-container')}>
              <img className={getClassName('contact__icon-image')} src={twitterLogo} />
            </div>
          }
        />
        <InfoCellWithScroll
          className={getClassName('contact__info-cell')}
          cellStyle={INFO_CELL_STYLES.dark}
          title="Linkedin"
          content={
            <TextLink href="https://www.linkedin.com/in/george-gillams-37537077" hrefExternal>
              See my profile on Linkedin
            </TextLink>
          }
          aux={
            <div className={getClassName('contact__icon-image-container')}>
              <img className={getClassName('contact__icon-image')} src={linkedInLogo} />
            </div>
          }
        />
        <InfoCellWithScroll
          className={getClassName('contact__info-cell')}
          title="GitHub"
          content={
            <TextLink href="https://github.com/georgegillams" hrefExternal>
              See my profile on GitHub
            </TextLink>
          }
          aux={
            <div className={getClassName('contact__icon-image-container')}>
              <img
                className={getClassName('contact__icon-image', 'contact__icon-image--dark-invert')}
                src={githubLogo}
              />
            </div>
          }
        />
        <InfoCellWithScroll
          className={getClassName('contact__info-cell')}
          cellStyle={INFO_CELL_STYLES.dark}
          title="Email"
          content={
            <TextLink href="mailto:hello@georgegillams.co.uk" hrefExternal>
              Email hello@georgegillams.co.uk
            </TextLink>
          }
          aux={
            <div className={getClassName('contact__icon-image-container')}>
              <img className={getClassName('contact__icon-image')} src={emailLogo} />
            </div>
          }
        />
        <InfoCellWithScroll
          className={getClassName('contact__info-cell')}
          title="Flickr"
          content={
            <TextLink href="https://www.flickr.com/people/georgegillams" hrefExternal>
              See my profile on Flickr
            </TextLink>
          }
          aux={
            <div className={getClassName('contact__icon-image-container')}>
              <img className={getClassName('contact__icon-image')} src={flickrLogo} />
            </div>
          }
        />
        <InfoCellWithScroll
          className={getClassName('contact__info-cell')}
          cellStyle={INFO_CELL_STYLES.dark}
          title="Gurushots"
          content={
            <TextLink href="https://gurushots.com/georgegillams/photos" hrefExternal>
              See my profile on Gurushots
            </TextLink>
          }
          aux={
            <div className={getClassName('contact__icon-image-container')}>
              <img
                className={getClassName('contact__icon-image', 'contact__icon-image--dark-invert')}
                src={gurushotsLogo}
              />
            </div>
          }
        />
        <InfoCellWithScroll
          className={getClassName('contact__info-cell')}
          title="Unsplash"
          content={
            <TextLink href="https://unsplash.com/@georgegillams/" hrefExternal>
              See my profile on Unsplash
            </TextLink>
          }
          aux={
            <div className={getClassName('contact__icon-image-container')}>
              <img
                className={getClassName('contact__icon-image', 'contact__icon-image--dark-invert')}
                src={unsplashLogo}
              />
            </div>
          }
        />
        <br />
        <Button
          hrefExternal
          href="https://www.dropbox.com/s/aj9wjgotkldd18j/georgegillams.vcf?dl=1"
          className={getClassName('contact__button')}>
          Download contact (iOS)
        </Button>
        <br />
        <Button
          hrefExternal
          href="https://www.dropbox.com/s/k8hmxeh2qpjqx66/google.csv?dl=1"
          className={getClassName('contact__button')}>
          Download contact (Android)
        </Button>
      </PageTitle>
    </PageContainer>
  );
};

export default Contact;
