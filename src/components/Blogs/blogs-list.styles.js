import Button from 'components/common/Button';
import FeatureCard from 'components/common/FeatureCard';
import styled, { css } from 'styled-components';
import BlogCard from './BlogCard';

const cardStyles = props => css`
  display: inline-block;
  width: 100%;
  margin-bottom: 2rem;
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
  margin-bottom: 2rem;
  box-sizing: border-box;
`;
