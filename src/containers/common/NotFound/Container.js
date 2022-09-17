import React from 'react';
import PageContainer from 'components/common/PageContainer';
import Paragraph from '@george-gillams/components/paragraph';
import PageTitle from 'components/common/PageTitle';
import TextLink from 'components/common/TextLink';

const NotFound = props => {
  return (
    <PageContainer bottomPadding centred {...props}>
      <PageTitle name="Oops." pageTitle="404">
        <Paragraph>
          The page you&apos;re looking for doesn&apos;t exist, or you don&apos;t have permission to view it.
          <br />
          Maybe the <TextLink href={'/sitemap'}>site map</TextLink> can help
        </Paragraph>
      </PageTitle>
    </PageContainer>
  );
};

export default NotFound;
