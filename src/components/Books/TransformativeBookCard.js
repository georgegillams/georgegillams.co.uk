import React from 'react';
import PropTypes from 'prop-types';

import { Author, CoverImage, Description, LinkWrapper, Title, Wrapper } from './transformative-book-card.styles';
import TextLink from 'components/common/TextLink';

const TransformativeBookCard = props => {
  const { book, ...rest } = props;
  const { title: bookTitle, author, bookImage, description, amazonLink, audibleLink } = book;

  let title = bookTitle || 'Untitled book';

  let imageAltText = `Book cover for ${title}`;
  if (author) {
    imageAltText = `${imageAltText} by ${author}`;
  }

  const showLinks = amazonLink || audibleLink;

  return (
    <Wrapper {...rest}>
      {bookImage && <CoverImage lightSrc={bookImage} darkSrc={bookImage} imgProps={{ alt: imageAltText }} />}
      <Title>{title}</Title>
      {author && <Author>By {author}</Author>}
      {description && <Description>{description}</Description>}
      {showLinks && (
        <LinkWrapper>
          {amazonLink && (
            <TextLink hrefExternal href={amazonLink} aria-label="View on Amazon">
              Amazon
            </TextLink>
          )}
          {audibleLink && (
            <TextLink hrefExternal href={audibleLink} aria-label="View on Audible">
              Audible
            </TextLink>
          )}
        </LinkWrapper>
      )}
    </Wrapper>
  );
};

TransformativeBookCard.propTypes = {
  book: PropTypes.object.isRequired,
};

export default TransformativeBookCard;
