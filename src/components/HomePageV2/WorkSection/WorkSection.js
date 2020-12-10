import React from 'react';
import PropTypes from 'prop-types';

import { Paragraph } from 'gg-components/Paragraph';
import { Section } from 'gg-components/Section';
import TextLink from 'components/common/TextLink';
import Phones from './Phones';
import STYLES from './work-section.scss';
import { cssModules } from 'gg-components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const WorkSection = props => {
  const { className, ...rest } = props;

  return (
    <div className={getClassName('work-section__outer', className)}>
      <div className={getClassName('work-section__content')}>
        <Section name="Work" {...rest}>
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
      <Phones className={getClassName('work-section__graphic')} />
    </div>
  );
};

WorkSection.propTypes = { className: PropTypes.string };

WorkSection.defaultProps = { className: null };

export default WorkSection;
