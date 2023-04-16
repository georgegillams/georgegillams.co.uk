import React from 'react';
import PageContainer from 'components/common/PageContainer';
import PageTitle from 'components/common/PageTitle';
import Paragraph from '@george-gillams/components/paragraph';

import Subsection from '@george-gillams/components/subsection';
import { withScrollAnimation } from '@george-gillams/components/effects';
const SubsectionWithScroll = withScrollAnimation(Subsection);

const AppPrivacyPolicy = () => {
  return (
    <PageContainer bottomPadding>
      <PageTitle name="App privacy policy">
        <SubsectionWithScroll name="Data and analytics">
          <Paragraph>
            My apps don&#39;t collect any data from your device. Any information the apps save is stored locally on your
            device. They don&#39;t even collect any analytics. I may add analytics to my apps in the future to
            understand how they are used and help prioritise features, but I will never collect or sell your personal
            data.
          </Paragraph>
        </SubsectionWithScroll>
        <SubsectionWithScroll name="Cookies">
          <Paragraph>
            None of my apps have any reason to store cookies or session information. So they don&#39;t.
          </Paragraph>
        </SubsectionWithScroll>
        <SubsectionWithScroll name="Version">
          <Paragraph>This is version 1 of my app privacy policy.</Paragraph>
        </SubsectionWithScroll>
      </PageTitle>
    </PageContainer>
  );
};

export default AppPrivacyPolicy;
