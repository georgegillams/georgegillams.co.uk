import paragraph from '@george-gillams/components/paragraph';
import styled from 'styled-components';
import Phones from './Phones';
import { fontSizeMd } from '@george-gillams/components/constants/font';
import { breakpointMd } from '@george-gillams/components/constants/layout';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  text-align: center;

  @media (min-width: ${breakpointMd}) {
    flex-direction: row;
    text-align: left;
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

export const Graphic = styled(Phones)`
  width: 100%;
  flex-grow: 1;
  max-width: 25rem;
  margin-left: 0;

  @media (min-width: ${breakpointMd}) {
    max-width: 50%;
    margin-left: 0.5rem;
  }
`;

export const StyledParagraph = styled(paragraph)`
  font-size: ${fontSizeMd};
`;
