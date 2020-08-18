import { selectState, selectDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectSupport', () => {
  it('should select the initial state', () => {
    const mockedState = {};

    expect(selectDomain(mockedState)).toEqual(initialState);
  });

  it('should select the support state', () => {
    const state = {
      ...initialState,
      links: 'Some links',
    };

    const mockedState = {
      support: state,
    };

    const selectStateMock = selectState();

    expect(selectStateMock(mockedState)).toEqual(state);
  });
});
