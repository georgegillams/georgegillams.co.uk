import React from 'react';
import PropTypes from 'prop-types';

import {
  ChildrenWrapper,
  ContentWrapper,
  StyledButton,
  StyledCard,
  StyledParagraph,
  StyledSubsection,
  TopWrapper,
} from './homepage-card.styles';
import { HP_CARD_LAYOUT } from './HomepageCard-constants';

const HomepageCard = props => {
  const { title, blurb, linkText, href, children, layout, ...rest } = props;

  return (
    <StyledCard
      padded={false}
      atomic={false}
      href={href}
      onClick={() => {
        window.location = href;
      }}
      {...rest}>
      <ContentWrapper layout={layout}>
        <TopWrapper>
          <StyledSubsection padding={false} name={title}>
            <StyledParagraph>{blurb}</StyledParagraph>
          </StyledSubsection>
          <StyledButton href={href}>{linkText}</StyledButton>
        </TopWrapper>
        <ChildrenWrapper layout={layout}>{children}</ChildrenWrapper>
      </ContentWrapper>
    </StyledCard>
  );
};

HomepageCard.propTypes = {
  title: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  layout: PropTypes.oneOf(Object.values(HP_CARD_LAYOUT)),
};

HomepageCard.defaultProps = {
  children: null,
  layout: HP_CARD_LAYOUT.AUTO,
};

export default HomepageCard;
