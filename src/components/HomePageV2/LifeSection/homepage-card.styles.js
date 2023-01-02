import styled, { css } from 'styled-components';
import { breakpointMd, spacingBase } from '@george-gillams/components/constants/layout';
import { fontSizeMd } from '@george-gillams/components/constants/font';
import Paragraph from '@george-gillams/components/paragraph';
import Card from '@george-gillams/components/card';
import subsection from '@george-gillams/components/subsection';
import Button from 'components/common/Button';
import { HP_CARD_LAYOUT } from './HomepageCard-constants';

export const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  ${props =>
    props.layout === HP_CARD_LAYOUT.ROW &&
    css`
      flex-direction: row;
    `}

  ${props =>
    props.layout === HP_CARD_LAYOUT.AUTO &&
    css`
      @media (min-width: ${breakpointMd}) {
        flex-direction: row;
      }
    `}
`;

export const TopWrapper = styled.div`
  padding: ${spacingBase};
`;

export const StyledParagraph = styled(Paragraph)`
  font-size: ${fontSizeMd};
`;

export const StyledSubsection = styled(subsection)``;

const getLinearGradient = direction => css`
  mask-image: linear-gradient(
    to ${direction === HP_CARD_LAYOUT.ROW ? 'right' : 'bottom'},
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 25%
  );
`;

export const ChildrenWrapper = styled.div`
  flex-grow: 1;
  ${getLinearGradient(HP_CARD_LAYOUT.COLUMN)}

  ${props => props.layout === HP_CARD_LAYOUT.ROW && getLinearGradient(HP_CARD_LAYOUT.ROW)}

  ${props =>
    props.layout === HP_CARD_LAYOUT.AUTO &&
    css`
      @media (min-width: ${breakpointMd}) {
        ${getLinearGradient(HP_CARD_LAYOUT.ROW)}
      }
    `}
`;

export const StyledButton = styled(Button)`
  margin-top: ${spacingBase};
`;
