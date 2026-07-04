import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BUTTON_TYPES } from '@george-gillams/components/button/constants';

import {
  AdminActions,
  StyledBookCard,
  StyledButton,
  StyledTransformativeBookCard,
  TransformativeCardsGrid,
} from './books-list.styles';
import BookEditForm from './BookEditForm';
import Modal from '@george-gillams/components/modal';
import Subsection from '@george-gillams/components/subsection';
import Paragraph from '@george-gillams/components/paragraph';

const BooksList = props => {
  const { admin, books, createBook, updateBook, deleteBook, ...rest } = props;
  const [editingBook, setEditingBook] = useState(null);

  const transformativeBooks = books.filter(book => book.transformative === 'transformative');

  return (
    <div {...rest}>
      {transformativeBooks.length > 0 && (
        <Subsection name="Transformative books">
          <TransformativeCardsGrid>
            {transformativeBooks.map(book => (
              <StyledTransformativeBookCard key={`transformative_${book.id}`} book={book} />
            ))}
          </TransformativeCardsGrid>
        </Subsection>
      )}
      <Subsection name="All books">
        {books.map(book => (
          <div key={book.id}>
            <StyledBookCard
              key={`card_${book.id}`}
              id={book.id}
              book={book}
              withControls={!!(updateBook || deleteBook)}
            />
            {(updateBook || deleteBook) && (
              <AdminActions>
                {updateBook && !book.deleted && (
                  <StyledButton key={`edit_button_${book.id}`} onClick={() => setEditingBook(book)}>
                    Edit
                  </StyledButton>
                )}
                {deleteBook && (
                  <StyledButton
                    key={`delete_button_${book.id}`}
                    buttonType={BUTTON_TYPES.destructive}
                    onClick={() => deleteBook(book.id)}
                    disabled={book.deleted}>
                    Delete book
                  </StyledButton>
                )}
              </AdminActions>
            )}
          </div>
        ))}
      </Subsection>
      {admin && (
        <Subsection name="Create new book">
          <Paragraph style={{ width: '100%' }}>
            <BookEditForm book={{}} updateBook={createBook} submitLabel="Create new book" />
          </Paragraph>
        </Subsection>
      )}
      <Modal
        open={!!editingBook}
        onClose={() => setEditingBook(null)}
        title={editingBook ? `Edit ${editingBook.title || 'book'}` : 'Edit book'}>
        {editingBook && (
          <BookEditForm
            book={editingBook}
            updateBook={updatedBook => {
              updateBook(updatedBook);
              setEditingBook(null);
            }}
            submitLabel="Save"
          />
        )}
      </Modal>
    </div>
  );
};

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
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
