import styled from 'styled-components';
import { sectionFontSize } from '@george-gillams/components/constants/font';
import TextLink from 'components/common/TextLink';
import { backgroundColor, backgroundColorDarkMode } from '@george-gillams/components/constants/colors';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 10rem;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Content = styled.div`
  position: relative;
`;

export const StyledTextLink = styled(TextLink)`
  font-size: ${sectionFontSize};
`;

export const Cloud = styled.div`
  position: absolute;
  top: -400%;
  width: 20rem;
  height: 20rem;
  transform: rotate(20deg);
  transition: left 0.4s ease-in-out;
  background-color: ${backgroundColor};
  filter: blur(1.5rem);
  pointer-events: none;

  @media (prefers-color-scheme: dark) {
    background-color: ${backgroundColorDarkMode};
  }
`;
