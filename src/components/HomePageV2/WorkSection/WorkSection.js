import React from 'react';
import PropTypes from 'prop-types';

import { withScroll, cleanRestScrollProps } from '@george-gillams/components/ScrollContainer';
import { Paragraph } from '@george-gillams/components/Paragraph';
import { Section } from '@george-gillams/components/Section';
import TextLink from 'components/common/TextLink';
import Phones from './Phones';
import STYLES from './work-section.scss';
import { cssModules } from '@george-gillams/components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const WorkSection = props => {
  const { hasBeenMostlyInView, hasBeenFullyInView, className, ...rest } = props;

  cleanRestScrollProps(rest);

  return (
    <div className={getClassName('work-section__outer', className)} {...rest}>
      <div className={getClassName('work-section__content')}>
        <Section name="Work">
          <Paragraph className={getClassName('work-section__paragraph')}>
            I work on{' '}
            <TextLink hrefExternal href="https://backpack.github.io">
              Backpack
            </TextLink>{' '}
            for iOS and React at{' '}
            <TextLink hrefExternal href="https://www.skyscanner.net">
              Skyscanner
            </TextLink>{' '}
            .
            <br />
            I’m also an accessibility champion.
            <br />
            <TextLink href="/work">Learn more about my work</TextLink>
          </Paragraph>
        </Section>
      </div>
      <Phones
        hasBeenMostlyInView={hasBeenMostlyInView || hasBeenFullyInView}
        className={getClassName('work-section__graphic')}
      />
    </div>
  );
};

WorkSection.propTypes = {
  className: PropTypes.string,
  hasBeenMostlyInView: PropTypes.bool.isRequired,
  hasBeenFullyInView: PropTypes.bool.isRequired,
};

WorkSection.defaultProps = { className: null };

export default withScroll(WorkSection);
