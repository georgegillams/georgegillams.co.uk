import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_TYPES } from '@george-gillams/components/button/constants';

import { StyledBookCard, StyledButton, StyledFeatureCard } from './books-list.styles';
import BookEditForm from './BookEditForm';

const BooksList = props => {
  const { admin, books, updateBook, deleteBook, linkPrefix, ...rest } = props;

  return (
    <div {...rest}>
      {admin && <StyledFeatureCard title="Add a new book" href="/create-book" />}
      {books.map(book => (
        <div key={book.id}>
          <StyledBookCard key={`card_${book.id}`} book={book} linkPrefix={linkPrefix} withControls={!!deleteBook} />
          {updateBook && !book.deleted && <BookEditForm book={book} updateBook={updateBook} />}
          {deleteBook && (
            <StyledButton
              key={`delete_button_${book.id}`}
              buttonType={BUTTON_TYPES.destructive}
              onClick={() => deleteBook(book.id)}
              disabled={book.deleted}>
              Delete book
            </StyledButton>
          )}
        </div>
      ))}
    </div>
  );
};

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkPrefix: PropTypes.string.isRequired,
  admin: PropTypes.bool,
  updateBook: PropTypes.func,
  deleteBook: PropTypes.func,
};

BooksList.defaultProps = {
  admin: false,
  updateBook: null,
  deleteBook: null,
};

export default BooksList;
