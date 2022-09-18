import styled from 'styled-components';
import Paragraph from '@george-gillams/components/paragraph';
import { spacingBase, spacingLg } from '@george-gillams/components/constants/layout';

export const Controls = styled.div`
  width: 100%;
  margin-top: ${spacingLg};
  margin-bottom: ${spacingBase};
`;

export const SupportError = styled(Paragraph)`
  display: inline-block;
  width: 100%;
  margin-bottom: ${spacingBase};
`;
