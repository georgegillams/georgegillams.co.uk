import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectBookList', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the books state', () => {
    const state = {
      ...initialState,
      books: 'Some books',
    };

    const mockedState = {
      ['reading-list']: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
