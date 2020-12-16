import React from 'react';
import PropTypes from 'prop-types';

import { Paragraph } from 'gg-components/Paragraph';
import { Section } from 'gg-components/Section';
import TextLink from 'components/common/TextLink';
import STYLES from './life-section.scss';
import { cssModules } from 'gg-components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const LifeSection = props => {
  const { className, ...rest } = props;

  return (
    <div className={getClassName('life-section__outer', className)} {...rest}>
      <div className={getClassName('life-section__content')}>
        <Section name="Life">
          <Paragraph className={getClassName('life-section__paragraph')}>
            I love travel and photography, and occasionally write other stuff.
            <br />
            <TextLink href="/blog">Blog</TextLink>
            <br />
            <TextLink href="/travel">Travel</TextLink>
            <br />
            <TextLink href="/photography">Photography</TextLink>
          </Paragraph>
        </Section>
        <Paragraph className={getClassName('life-section__paragraph')}>
          I got engaged recently in Iceland, and live with my amazing fiancée and Tigger the cat.
        </Paragraph>
      </div>
    </div>
  );
};

LifeSection.propTypes = { className: PropTypes.string };

LifeSection.defaultProps = { className: null };

export default LifeSection;
