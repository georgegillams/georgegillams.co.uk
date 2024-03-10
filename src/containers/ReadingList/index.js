import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadBooks, updateBook, deleteBook, createBook } from './actions';
import { selectState as selectAuthenticatorState } from 'containers/common/Authenticator/selectors';
import { selectState } from './selectors';
import ReadingList from './Container';

import injectSaga from 'client-utils/common/redux/inject-saga';
import injectReducer from 'client-utils/common/redux/inject-reducer';

import { KEY } from './constants';
import saga from './saga';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  authenticatorState: selectAuthenticatorState(),
  readingListState: selectState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadBooks: payload => dispatch(loadBooks(payload)),
    createBook: payload => dispatch(createBook(payload)),
    updateBook: payload => dispatch(updateBook(payload)),
    deleteBook: payload => dispatch(deleteBook(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: KEY, saga });
const withReducer = injectReducer({ key: KEY, reducer });

export default compose(withSaga, withReducer, withConnect, memo)(ReadingList);
