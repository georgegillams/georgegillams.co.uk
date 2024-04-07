import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FormBuilder from '@george-gillams/components/form-builder';

const BookEditForm = props => {
  const { book, updateBook, submitLabel, ...rest } = props;

  const [editedBook, setUpdatedBook] = useState(book);

  useEffect(() => {
    setUpdatedBook(book);
  }, [book]);

  return (
    <FormBuilder
      test={process.env.NODE_ENV === 'test'}
      formFields={[
        {
          id: 'title',
          name: 'Title',
        },
        {
          id: 'author',
          name: 'Author',
        },
        {
          id: 'bookImage',
          name: 'Book image',
        },
        {
          id: 'recommendation',
          name: 'Recommendation',
        },
        {
          id: 'amazonLink',
          name: 'Amazon link',
        },
        {
          id: 'audibleLink',
          name: 'Audible link',
        },
        {
          id: 'status',
          name: 'Status',
          type: 'SELECT',
          options: [
            { value: 'toRead', name: 'Want to read' },
            { value: 'currentlyReading', name: 'Currently reading' },
            { value: 'using', name: 'Using' },
          ],
        },
      ]}
      entity={editedBook}
      onDataChanged={b => setUpdatedBook(b)}
      onSubmit={() => updateBook(editedBook)}
      submitLabel={submitLabel}
      {...rest}
    />
  );
};

BookEditForm.propTypes = {
  book: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
};

export default BookEditForm;
