import React from 'react';
import PropTypes from 'prop-types';

import { Paragraph } from 'gg-components/Paragraph';
import TextLink from 'components/common/TextLink';
import STYLES from './about-section.scss';
import { cssModules } from 'gg-components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const LifeSection = props => {
  const { className, ...rest } = props;

  return (
    <div className={getClassName('about-section__outer', className)} {...rest}>
      <div className={getClassName('about-section__content')}>
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
        <TextLink href="/contact">Get in touch</TextLink>
      </div>
    </div>
  );
};

LifeSection.propTypes = { className: PropTypes.string };

LifeSection.defaultProps = { className: null };

export default LifeSection;
