import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectBlogList', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the blogs state', () => {
    const state = {
      ...initialState,
      blogs: 'Some blogs',
    };

    const mockedState = {
      ['blog-list']: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
