import React from 'react';
import PageTitle from 'components/common/PageTitle';

import PageContainer from 'components/common/PageContainer';
import Paragraph from '@george-gillams/components/paragraph';
import TextLink from '@george-gillams/components/text-link';
import { VStack } from 'components/common/Stacks';
import { spacingBase } from '@george-gillams/components/constants/layout';

const links = [
  { url: 'https://donation.dec.org.uk/ukraine-humanitarian-appeal', name: 'DEC Ukraine Humanitarian Appeal' },
  { url: 'https://www.redcross.org.uk/', name: 'Red Cross' },
  { url: 'https://www.beateatingdisorders.org.uk/', name: 'Beat' },
];

const Coffee = () => {
  return (
    <PageContainer bottomPadding>
      <PageTitle anchor={false} name="Buy me a coffee"></PageTitle>
      <Paragraph>
        Thanks for thinking of me and considering sending some cash my way. As a developer of free apps, I really
        appreciate people who want to pay me for my work.
      </Paragraph>
      <Paragraph>
        The world is kinda on fire right now though, so if you have spare cash, please consider sending it to one of
        these great causes instead:
      </Paragraph>
      <VStack style={{ marginTop: spacingBase }}>
        {links.map(link => (
          <TextLink href={link.url} hrefExternal key={link.url}>
            {link.name}
          </TextLink>
        ))}
      </VStack>
    </PageContainer>
  );
};

export default Coffee;
