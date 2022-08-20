import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectPhotography', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the photography state', () => {
    const state = {
      ...initialState,
      photos: 'Some photos',
    };

    const mockedState = {
      photography: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
