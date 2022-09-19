import styled from 'styled-components';
import paragraph from '@george-gillams/components/paragraph';
import { fontSizeMd } from '@george-gillams/components/constants/font';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  text-align: left;
`;

export const StyledParagraph = styled(paragraph)`
  font-size: ${fontSizeMd};
`;
