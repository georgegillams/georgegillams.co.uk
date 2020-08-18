import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Paragraph } from 'gg-components/Paragraph';
import { Image } from 'gg-components/Image';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';

import STYLES from './about.scss';

const getClassName = cssModules(STYLES);

const Container = props => {
  const { className, ...rest } = props;

  return (
    <PageTitle
      name="Hey! I'm George."
      pageTitle="Home"
      className={getClassName('about__unpadded', 'about__centred', className)}
      {...rest}>
      <Paragraph>
        I&apos;m an open-source software engineer at{' '}
        <TextLink hrefExternal href="https://www.skyscanner.net/">
          Skyscanner
        </TextLink>
        . I am passionate about design, <TextLink href="/travel">travel</TextLink> and{' '}
        <TextLink href="/photography">photography</TextLink>, for which I have an insatiable hunger. When I&apos;m not
        internationally photobombing unsuspecting strangers I&apos;m based somewhere between Portsmouth and London.
        <br />
        <br />I enjoy getting outdoors and trying new things, and completed my 5th{' '}
        <TextLink href="/blog/tough-mudder">Tough Mudder</TextLink> in May 2018. I also try to squeeze in as much
        volunteering as I can, so you may find me dressed as a{' '}
        <TextLink hrefExternal href="https://helpforheroes.org.uk/">
          Help for Heroes
        </TextLink>{' '}
        bear, reviewing content for{' '}
        <TextLink hrefExternal href="https://b-eat.co.uk/">
          Beat
        </TextLink>
        .
        <br />
        <br />I recently got engaged to my wonderful fiancée while we were in{' '}
        <TextLink href="/travel/iceland-2018">Iceland</TextLink> 💍, and live with her and Tigger the cat.
      </Paragraph>
      <Image
        className={getClassName('about__image')}
        imgProps={{
          alt: 'Me',
        }}
        aspectX={3829}
        aspectY={2872}
        lightSrc="https://i.imgur.com/FLA0jkg.jpg"
        darkSrc="https://i.imgur.com/FLA0jkg.jpg"
      />
      <br />
      <Paragraph>
        This site is built in React and hosted on AWS. I use it to experiment with things, share stuff I&apos;ve figured
        out, and allow people to reach-out to me. So if you&apos;re interested in anything I do,{' '}
        <TextLink href="/contact">get in touch</TextLink>!
      </Paragraph>
    </PageTitle>
  );
};

Container.propTypes = {
  className: PropTypes.string,
};

Container.defaultProps = {
  className: null,
};

export default Container;
