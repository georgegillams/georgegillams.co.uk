import Button from 'components/common/Button';
import FeatureCard from 'components/common/FeatureCard';
import styled, { css } from 'styled-components';
import BlogCard from './BlogCard';
import { spacingLg } from '@george-gillams/components/constants/layout';

const cardStyles = props => css`
  display: inline-block;
  width: 100%;
  margin-bottom: ${spacingLg};
  box-sizing: border-box;

  ${props.withControls &&
  css`
    margin-bottom: 0.5rem;
  `}
`;

export const StyledFeatureCard = styled(FeatureCard)`
  ${props => cardStyles(props)}
`;

export const StyledBlogCard = styled(BlogCard)`
  ${props => cardStyles(props)}
`;

export const StyledButton = styled(Button)`
  margin-bottom: ${spacingLg};
  box-sizing: border-box;
`;
