import React from 'react';
import PropTypes from 'prop-types';

import Paragraph from '@george-gillams/components/paragraph';
import TextLink from 'components/common/TextLink';
import STYLES from './about-section.scss';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
import withScroll, { cleanRestScrollProps } from '@george-gillams/components/scroll-container';
import ContactLink from './ContactLink';

const getClassName = cssModules(STYLES);

const LifeSection = props => {
  const { scrollPositionVh, className, ...rest } = props;

  cleanRestScrollProps(rest);

  return (
    <div className={getClassName('about-section__outer', className)} {...rest}>
      <Paragraph className={getClassName('about-section__paragraph')}>
        This site is built in{' '}
        <TextLink hrefExternal href="https://reactjs.org/">
          React
        </TextLink>{' '}
        and{' '}
        <TextLink hrefExternal href="https://redux.js.org/">
          Redux
        </TextLink>{' '}
        taking advantage of{' '}
        <TextLink hrefExternal href="https://nextjs.org/">
          Next.js
        </TextLink>
        . I serve it from an EC2 container on{' '}
        <TextLink hrefExternal href="https://aws.amazon.com/">
          AWS
        </TextLink>
        . I use it to experiment with things, share stuff I&apos;ve figured out, and allow people to contact me.
      </Paragraph>
      <ContactLink scrollPosition={scrollPositionVh} />
    </div>
  );
};

LifeSection.propTypes = { scrollPositionVh: PropTypes.number.isRequired, className: PropTypes.string };

LifeSection.defaultProps = { className: null };

export default withScroll(LifeSection);
