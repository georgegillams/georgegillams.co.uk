import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_TYPES } from '@george-gillams/components/button/constants';

import { StyledBookCard, StyledButton } from './books-list.styles';
import BookEditForm from './BookEditForm';
import Subsection from '@george-gillams/components/subsection';
import Paragraph from '@george-gillams/components/paragraph';

const BooksList = props => {
  const { admin, books, createBook, updateBook, deleteBook, linkPrefix, ...rest } = props;

  return (
    <div {...rest}>
      {books.map(book => (
        <div key={book.id}>
          <StyledBookCard
            key={`card_${book.id}`}
            id={book.id}
            book={book}
            linkPrefix={linkPrefix}
            withControls={!!deleteBook}
          />
          {updateBook && !book.deleted && <BookEditForm book={book} updateBook={updateBook} submitLabel="Save" />}
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
      {admin && (
        <>
          <Subsection name="Create new book">
            <Paragraph style={{ width: '100%' }}>
              <BookEditForm book={{}} updateBook={createBook} submitLabel="Create new book" />
            </Paragraph>
          </Subsection>
        </>
      )}
    </div>
  );
};

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkPrefix: PropTypes.string.isRequired,
  admin: PropTypes.bool,
  createBook: PropTypes.func,
  updateBook: PropTypes.func,
  deleteBook: PropTypes.func,
};

BooksList.defaultProps = {
  admin: false,
  createBook: null,
  updateBook: null,
  deleteBook: null,
};

export default BooksList;
