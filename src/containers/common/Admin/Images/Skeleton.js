import React from 'react';
import { VStack } from 'components/common/Stacks';
import Subsection from '@george-gillams/components/subsection';
import Paragraph from '@george-gillams/components/paragraph';

const Skeleton = () => (
  <VStack>
    <Subsection name="Loading images..." anchor={false}>
      <Paragraph>Please wait while images are being loaded...</Paragraph>
    </Subsection>
  </VStack>
);

export default Skeleton;
