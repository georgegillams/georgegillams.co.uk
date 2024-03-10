import React from 'react';
import PropTypes from 'prop-types';

import { bpkColorMonteverde } from '@george-gillams/components/constants/colors';

import { Author, CoverImage, LinkWrapper, Recommendation, Status, Title, Wrapper } from './book-card.styles';
import TextLink from 'components/common/TextLink';

const STATUS_READABLE_MAPPING = {
  toRead: 'Want to read',
  currentlyReading: 'Reading now',
  using: 'Read',
};

const STATUS_COLOR_MAPPING = {
  toRead: null,
  currentlyReading: 'orange',
  using: bpkColorMonteverde,
};

const formatStatus = status => {
  return STATUS_READABLE_MAPPING[status] || STATUS_READABLE_MAPPING.toRead;
};

const formatRecommendation = recommendation => `My rating: ${recommendation}/10`;

const colorForStatus = status => {
  return STATUS_COLOR_MAPPING[status] || STATUS_COLOR_MAPPING.toRead;
};

const BookCard = props => {
  const { book, ...rest } = props;
  const { title: bookTitle, author, bookImage, status, recommendation, amazonLink, audibleLink } = book;

  let title = bookTitle || 'Untitled book';
  if (book.deleted) {
    title += ' (DELETED)';
  }

  let imageAltText = `Book cover for ${title}`;
  if (author) {
    imageAltText = `${imageAltText} by ${author}`;
  }

  const showLinks = amazonLink || audibleLink;

  return (
    <Wrapper notRead={!status || status === 'toRead'} {...rest}>
      <Title>{title}</Title>
      {author && <Author>By {author}</Author>}
      {bookImage && <CoverImage lightSrc={bookImage} darkSrc={bookImage} imgProps={{ alt: imageAltText }} />}
      <Status color={colorForStatus(status)}>{formatStatus(status)}</Status>
      {recommendation && <Recommendation>{formatRecommendation(recommendation)}</Recommendation>}
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

BookCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  book: PropTypes.object.isRequired,
};

export default BookCard;
