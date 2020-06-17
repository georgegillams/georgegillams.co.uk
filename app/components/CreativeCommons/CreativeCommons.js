import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Paragraph, TextLink, SubSection } from 'gg-components/Typography';

import STYLES from './creative-commons.scss';

const getClassName = cssModules(STYLES);

const CreativeCommons = props => {
  const { className, ...rest } = props;

  return (
    <div
      className={getClassName('creative-commons__wrapper', className)}
      {...rest}
    >
      <SubSection
        className={getClassName('creative-commons__inner')}
        anchor={false}
        name="Copyright"
      >
        <Paragraph>
          Most of my photos are licensed under{' '}
          <TextLink
            external
            href="https://creativecommons.org/licenses/by-sa/3.0/"
          >
            Creative Commons BY-SA 3.0{' '}
          </TextLink>
          .<br />
          If you are unsure about your right to use them please{' '}
          <TextLink to="/contact">contact me</TextLink>.
        </Paragraph>
      </SubSection>
    </div>
  );
};

CreativeCommons.propTypes = {
  className: PropTypes.string,
};

CreativeCommons.defaultProps = {
  className: null,
};

export default CreativeCommons;
