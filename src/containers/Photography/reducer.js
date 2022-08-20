import produce from 'immer';

import { loadPhotos } from './actions';

export const initialState = {
  photos: null,
  loadingPhotos: false,
  loadPhotosError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case loadPhotos.REQUEST:
        draft.loadingPhotos = true;
        draft.loadPhotosError = null;
        break;

      case loadPhotos.SUCCESS:
        draft.loadingPhotos = false;
        draft.photos = payload.photos;
        break;

      case loadPhotos.FAILURE:
        draft.loadingPhotos = false;
        draft.loadPhotosError = payload;
        break;
    }
  });

export default reducer;
