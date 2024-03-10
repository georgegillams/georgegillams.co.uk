import Button from 'components/common/Button';
import FeatureCard from 'components/common/FeatureCard';
import styled, { css } from 'styled-components';
import BookCard from './BookCard';
import { breakpointMd, spacingBase, spacingLg } from '@george-gillams/components/constants/layout';

const cardStyles = props => css`
  width: 100%;
  margin-top: ${spacingLg};
  box-sizing: border-box;

  @media (min-width: ${breakpointMd}) {
    margin-top: calc(${spacingBase} + ${spacingLg});
  }

  ${props.withControls &&
  css`
    margin-bottom: 1rem;
  `}
`;

export const StyledFeatureCard = styled(FeatureCard)`
  ${props => cardStyles(props)}
`;

export const StyledBookCard = styled(BookCard)`
  ${props => cardStyles(props)}
`;

export const StyledButton = styled(Button)`
  margin-bottom: ${spacingLg};
  box-sizing: border-box;
`;
