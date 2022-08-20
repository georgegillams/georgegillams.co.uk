import supportReducer from '../reducer';
import { loadPhotos } from '../actions';
import { initialState } from '../reducer';

describe('supportReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(supportReducer(undefined, {})).toEqual(state);
  });

  describe('loadPhotos actions', () => {
    it('should handle the action loadPhotos.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(supportReducer(state, loadPhotos.trigger())).toEqual(expectResult);
    });

    it('should handle the action loadPhotos.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        loadingPhotos: true,
      };

      expect(supportReducer(state, loadPhotos.request())).toEqual(expectResult);
    });

    it('should return the action loadPhotos.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        photos: [{ id: 'some-photo', name: 'photo1' }],
      };

      expect(supportReducer(state, loadPhotos.success({ photos: [{ id: 'some-photo', name: 'photo1' }] }))).toEqual(
        expectResult
      );
    });

    it('should return the action loadPhotos.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        loadPhotosError: 'some error',
      };

      expect(supportReducer(state, loadPhotos.failure('some error'))).toEqual(expectResult);
    });
  });
});
