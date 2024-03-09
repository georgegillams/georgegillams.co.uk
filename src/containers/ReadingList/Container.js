import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DebugObject from 'components/common/DebugObject';
import LoadingCover from '@george-gillams/components/loading-cover';

import ReadingListSkeleton from './ReadingListSkeleton';

import Head from 'next/head';
import appConfig from 'helpers/appConfig';
import { StyledPageContainer } from './container.styles';
import { ScrollAnimationWrapper } from '@george-gillams/components/effects';
import BooksList from 'components/Books';

const ReadingList = props => {
  const { ssrBooks, loadBooks, updateBook, deleteBook, authenticatorState, readingListState } = props;

  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let booksToRender = readingListState.books || ssrBooks;

  const admin = authenticatorState.user && authenticatorState.user.admin;

  return (
    <>
      <StyledPageContainer>
        <DebugObject
          debugTitle="Books"
          debugObject={{
            loadBooks,
            deleteBook,
            readingListState,
          }}
        />
        <Head>
          <title>{`Reading list - ${appConfig.projectTitle}`}</title>
        </Head>
        <LoadingCover
          loadingSkeleton={ReadingListSkeleton}
          loading={!booksToRender}
          error={!!readingListState.loadBooksError}>
          <>
            {booksToRender && (
              <ScrollAnimationWrapper>
                <BooksList
                  admin={admin}
                  books={booksToRender}
                  updateBook={admin ? updateBook : null}
                  deleteBook={admin ? deleteBook : null}
                />
              </ScrollAnimationWrapper>
            )}
          </>
        </LoadingCover>
      </StyledPageContainer>
    </>
  );
};

ReadingList.propTypes = {
  loadBooksError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // eslint-disable-next-line react/forbid-prop-types
  ssrBooks: PropTypes.arrayOf(PropTypes.object),
  readingListState: PropTypes.shape({
    books: PropTypes.arrayOf(PropTypes.object),
    loadBooksError: PropTypes.object,
  }),
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  loadBooks: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
};

ReadingList.defaultProps = {
  loadBooksError: false,
  ssrBooks: null,
};

export default ReadingList;
