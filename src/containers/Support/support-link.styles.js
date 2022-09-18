import styled from 'styled-components';
import Button from 'components/common/Button';
import Paragraph from '@george-gillams/components/paragraph';
import { spacingBase } from '@george-gillams/components/constants/layout';

export const StyledParagraph = styled(Paragraph)`
  display: inline-block;
  width: 100%;
  margin-bottom: ${spacingBase};
`;

export const DeleteButton = styled(Button)`
  margin-bottom: ${spacingBase};
`;
