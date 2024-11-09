import React from 'react';

import Section from '@george-gillams/components/section';
import PageTitle from 'components/common/PageTitle';

import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import Paragraph from '@george-gillams/components/paragraph/paragraph';
import Button from 'components/common/Button';
import { BUTTON_SIZES } from '@george-gillams/components/button';
import { withScrollAnimation } from '@george-gillams/components/effects';
import { LOST_FOUND_FORM } from 'helpers/typeformConstants';
const SectionWithScroll = withScrollAnimation(Section);

const Luggage = () => {
  return (
    <PageContainer width={WIDTHS.default} bottomPadding>
      <PageTitle name="Luggage">
        <SectionWithScroll name="Have you found my bag?">
          <Paragraph>
            Thank you! 🙏 Please tap the button below to fill in a form and get my stuff back to me!
          </Paragraph>
          <br />
          <Paragraph>
            <Button size={BUTTON_SIZES.large} hrefExternal href={`${LOST_FOUND_FORM}#item=bag`}>
              I&#39;ve found your bag →
            </Button>
          </Paragraph>
        </SectionWithScroll>
      </PageTitle>
    </PageContainer>
  );
};

export default Luggage;
