import styled from 'styled-components';

import FeatureCard from 'components/common/FeatureCard';
import { spacingBase } from '@george-gillams/components/constants/layout';
import { cardContainer } from '@george-gillams/webapp/utils/styles';

export const CardContainer = styled.div`
  ${cardContainer}
`;

export const StyledFeatureCard = styled(FeatureCard)`
  margin: 0 0.5rem ${spacingBase} 0.5rem;
`;
