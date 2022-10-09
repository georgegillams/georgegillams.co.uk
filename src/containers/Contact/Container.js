import React from 'react';

import { INFO_CELL_STYLES } from '@george-gillams/components/info-cell';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';

import twitterLogo from './twitter.svg';
import linkedInLogo from './linkedin.svg';
import gurushotsLogo from './gurushots.svg';
import flickrLogo from './flickr.svg';
import githubLogo from './github.svg';
import emailLogo from './email.svg';
import unsplashLogo from './unsplash.svg';
import formLogo from './form.svg';
import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import { IconImage, ImageIconContainer, StyledInfoCellWithScroll } from './contact.styles';

const Contact = () => {
  return (
    <PageContainer width={WIDTHS.fullWidth} centred>
      <PageTitle name="Get in touch">
        <StyledInfoCellWithScroll
          title="Form"
          content={
            <TextLink href="https://form.typeform.com/to/WJSWmnKh" hrefExternal>
              Fill in my contact form
            </TextLink>
          }
          aux={
            <ImageIconContainer>
              <IconImage invertInDarkMode src={formLogo} />
            </ImageIconContainer>
          }
        />
        <StyledInfoCellWithScroll
          cellStyle={INFO_CELL_STYLES.dark}
          title="Twitter"
          content={
            <TextLink href="https://twitter.com/georgegillams" hrefExternal>
              See my profile on Twitter
            </TextLink>
          }
          aux={
            <ImageIconContainer>
              <IconImage src={twitterLogo} />
            </ImageIconContainer>
          }
        />
        <StyledInfoCellWithScroll
          title="Linkedin"
          content={
            <TextLink href="https://www.linkedin.com/in/george-gillams-37537077" hrefExternal>
              See my profile on Linkedin
            </TextLink>
          }
          aux={
            <ImageIconContainer>
              <IconImage src={linkedInLogo} />
            </ImageIconContainer>
          }
        />
        <StyledInfoCellWithScroll
          cellStyle={INFO_CELL_STYLES.dark}
          title="GitHub"
          content={
            <TextLink href="https://github.com/georgegillams" hrefExternal>
              See my profile on GitHub
            </TextLink>
          }
          aux={
            <ImageIconContainer>
              <IconImage invertInDarkMode src={githubLogo} />
            </ImageIconContainer>
          }
        />
        <StyledInfoCellWithScroll
          title="Email"
          content={
            <TextLink href="mailto:hello@georgegillams.co.uk" hrefExternal>
              Email hello@georgegillams.co.uk
            </TextLink>
          }
          aux={
            <ImageIconContainer>
              <IconImage invertInDarkMode src={emailLogo} />
            </ImageIconContainer>
          }
        />
        <StyledInfoCellWithScroll
          cellStyle={INFO_CELL_STYLES.dark}
          title="Flickr"
          content={
            <TextLink href="https://www.flickr.com/people/georgegillams" hrefExternal>
              See my profile on Flickr
            </TextLink>
          }
          aux={
            <ImageIconContainer>
              <IconImage src={flickrLogo} />
            </ImageIconContainer>
          }
        />
        <StyledInfoCellWithScroll
          title="Gurushots"
          content={
            <TextLink href="https://gurushots.com/georgegillams/photos" hrefExternal>
              See my profile on Gurushots
            </TextLink>
          }
          aux={
            <ImageIconContainer>
              <IconImage invertInDarkMode src={gurushotsLogo} />
            </ImageIconContainer>
          }
        />
        <StyledInfoCellWithScroll
          cellStyle={INFO_CELL_STYLES.dark}
          title="Unsplash"
          content={
            <TextLink href="https://unsplash.com/@georgegillams/" hrefExternal>
              See my profile on Unsplash
            </TextLink>
          }
          aux={
            <ImageIconContainer>
              <IconImage invertInDarkMode src={unsplashLogo} />
            </ImageIconContainer>
          }
        />
      </PageTitle>
    </PageContainer>
  );
};

export default Contact;
