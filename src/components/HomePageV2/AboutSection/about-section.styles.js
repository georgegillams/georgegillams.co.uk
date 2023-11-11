import styled from 'styled-components';
import paragraph from '@george-gillams/components/paragraph';
import { fontSizeMd } from '@george-gillams/components/constants/font';
import { spacingLg } from '@george-gillams/components/constants/layout';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding-top: ${spacingLg};
`;

export const StyledParagraph = styled(paragraph)`
  font-size: ${fontSizeMd};
  text-align: center;
`;
