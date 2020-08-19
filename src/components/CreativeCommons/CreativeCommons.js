import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'ggComponents/helpers/cssModules';
import { Paragraph } from 'ggComponents/Paragraph';
import { Subsection } from 'ggComponents/Subsection';
import TextLink from 'components/common/TextLink';

import STYLES from './creative-commons.module.scss';

const getClassName = cssModules(STYLES);

const CreativeCommons = props => {
  const { className, ...rest } = props;

  return (
    <div className={getClassName('creative-commons__wrapper', className)} {...rest}>
      <div className={getClassName('creative-commons__background')} />
      <Subsection className={getClassName('creative-commons__inner')} anchor={false} name="Copyright">
        <Paragraph>
          Most of my photos are licensed under{' '}
          <TextLink hrefExternal href="https://creativecommons.org/licenses/by-sa/3.0/">
            Creative Commons BY-SA 3.0
          </TextLink>
          .<br />
          If you are unsure about your right to use them please <TextLink href="/contact">contact me</TextLink>.
        </Paragraph>
      </Subsection>
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
