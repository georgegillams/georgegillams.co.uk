import React from 'react';
import PropTypes from 'prop-types';
import Text, { SIZES } from '@george-gillams/components/text';
import { OptionText, TFAnswerLetter, TFOptionLink, TFOptionsWrapper, TFWrapper } from './fake-typeform.styles';

const indexToLetter = index => {
  return String.fromCharCode(65 + index);
};

const FakeTypeform = props => {
  const { questionTitle, links, ...rest } = props;
  return (
    <TFWrapper {...rest}>
      <Text size={SIZES.md}>1. {questionTitle}</Text>
      <TFOptionsWrapper>
        {links.map((link, index) => {
          return (
            <TFOptionLink href={link.href} key={link.text}>
              <TFAnswerLetter>{indexToLetter(index)}</TFAnswerLetter>
              <OptionText>{link.text}</OptionText>
            </TFOptionLink>
          );
        })}
      </TFOptionsWrapper>
    </TFWrapper>
  );
};

FakeTypeform.propTypes = {
  questionTitle: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
};

FakeTypeform.defaultProps = {
  links: [],
};

export default FakeTypeform;
