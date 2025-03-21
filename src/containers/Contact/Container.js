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
import facebookLogo from './facebook.svg';
import instagramLogo from './instagram.svg';
import formLogo from './form.svg';
import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import { IconImage, ImageIconContainer, InfoCellContainer, Spacer, StyledInfoCellWithScroll } from './contact.styles';
import { CONTACT_FORM } from 'helpers/typeformConstants';

const Contact = () => {
  return (
    <PageContainer width={WIDTHS.fullWidth} centred>
      <PageTitle name="Get in touch" style={{ width: '100%' }}>
        <Spacer />
        <InfoCellContainer>
          <StyledInfoCellWithScroll
            title="Form"
            content={
              <TextLink href={CONTACT_FORM} hrefExternal>
                Fill in my contact form
              </TextLink>
            }
            aux={
              <ImageIconContainer>
                <IconImage invertInDarkMode src={formLogo.src} />
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
                <IconImage invertInDarkMode src={twitterLogo.src} />
              </ImageIconContainer>
            }
          />
          <StyledInfoCellWithScroll
            title="Facebook"
            content={
              <TextLink href="https://www.facebook.com/profile.php?id=100073681786600" hrefExternal>
                See my profile on Facebook
              </TextLink>
            }
            aux={
              <ImageIconContainer>
                <IconImage src={facebookLogo.src} />
              </ImageIconContainer>
            }
          />
          <StyledInfoCellWithScroll
            cellStyle={INFO_CELL_STYLES.dark}
            title="Instagram"
            content={
              <TextLink href="https://www.instagram.com/georgegillams/" hrefExternal>
                See my profile on Instagram
              </TextLink>
            }
            aux={
              <ImageIconContainer>
                <IconImage src={instagramLogo.src} />
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
                <IconImage src={linkedInLogo.src} />
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
                <IconImage invertInDarkMode src={githubLogo.src} />
              </ImageIconContainer>
            }
          />
          <StyledInfoCellWithScroll
            title="Email"
            content={
              <TextLink href="mailto:hello@georgegillams.co.uk" hrefExternal>
                hello@georgegillams.co.uk
              </TextLink>
            }
            aux={
              <ImageIconContainer>
                <IconImage invertInDarkMode src={emailLogo.src} />
              </ImageIconContainer>
            }
          />
          <StyledInfoCellWithScroll
            cellStyle={INFO_CELL_STYLES.dark}
            title="Flickr"
            content={
              <TextLink href="https://www.flickr.com/photos/georgegillams" hrefExternal>
                See my profile on Flickr
              </TextLink>
            }
            aux={
              <ImageIconContainer>
                <IconImage src={flickrLogo.src} />
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
                <IconImage invertInDarkMode src={gurushotsLogo.src} />
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
                <IconImage invertInDarkMode src={unsplashLogo.src} />
              </ImageIconContainer>
            }
          />
        </InfoCellContainer>
      </PageTitle>
    </PageContainer>
  );
};

export default Contact;
