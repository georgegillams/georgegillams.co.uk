import React from 'react';

import Paragraph from '@george-gillams/components/paragraph';
import TextLink from 'components/common/TextLink';
import { Background, Inner, Wrapper } from './creative-commons.syles';

const CreativeCommons = props => {
  const { ...rest } = props;

  return (
    <Wrapper {...rest}>
      <Background />
      <Inner anchor={false} name="Copyright">
        <Paragraph>
          Most of my photos are licensed under{' '}
          <TextLink hrefExternal href="https://creativecommons.org/licenses/by-sa/3.0/">
            Creative Commons BY-SA 3.0
          </TextLink>
          .<br />
          If you are unsure about your right to use them please <TextLink href="/contact">contact me</TextLink>.
        </Paragraph>
      </Inner>
    </Wrapper>
  );
};

export default CreativeCommons;
