import paragraph from '@george-gillams/components/paragraph';
import styled from 'styled-components';
import { fontSizeMd } from '@george-gillams/components/constants/font';
import { breakpointMd, spacingLg } from '@george-gillams/components/constants/layout';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;

  @media (min-width: ${breakpointMd}) {
    flex-direction: row;
    text-align: left;
    margin-top: calc(2 * ${spacingLg});
  }
`;

export const Content = styled.div`
  width: 100%;
  flex-grow: 1;
  max-width: 25rem;
  margin-right: 0;

  @media (min-width: ${breakpointMd}) {
    max-width: 50%;
    margin-right: 0.5rem;
  }
`;

export const StyledParagraph = styled(paragraph)`
  font-size: ${fontSizeMd};
`;
