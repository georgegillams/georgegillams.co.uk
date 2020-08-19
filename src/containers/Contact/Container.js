import React from 'react';
import { cssModules } from 'ggComponents/helpers/cssModules';
import { InfoCell, INFO_CELL_STYLES } from 'ggComponents/InfoCell';
import withScroll from 'ggComponents/ScrollContainer/withScroll.js';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/Button';

import STYLES from './contact.module.scss';
import twitterLogo from './twitter.svg';
import linkedInLogo from './linkedin.svg';
import gurushotsLogo from './gurushots.svg';
import flickrLogo from './flickr.svg';
import githubLogo from './github.svg';
import emailLogo from './email.svg';

const InfoCellWithScroll = withScroll(InfoCell);

const getClassName = cssModules(STYLES);

const Contact = () => {
  return (
    <PageTitle name="Get in touch">
      <InfoCellWithScroll
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
        title="GitHub"
        content={
          <TextLink href="https://github.com/georgegillams" hrefExternal>
            See my profile on GitHub
          </TextLink>
        }
        aux={
          <div className={getClassName('contact__icon-image-container')}>
            <img className={getClassName('contact__icon-image', 'contact__icon-image--dark-invert')} src={githubLogo} />
          </div>
        }
      />
      <InfoCellWithScroll
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
  );
};

export default Contact;
