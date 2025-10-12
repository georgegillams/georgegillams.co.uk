import produce from 'immer';

import { loadImages, createImage, removeImage, downloadImagesZip } from './actions';

export const initialState = {
  images: null,
  loading: false,
  loadError: null,

  imageToCreate: null,
  creating: false,
  createError: null,

  imageToRemove: null,
  removing: false,
  removeError: null,

  downloadingZip: false,
  downloadZipError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case loadImages.REQUEST:
        draft.loading = true;
        draft.loadError = null;
        break;

      case loadImages.SUCCESS:
        draft.loading = false;
        draft.images = payload.images;
        break;

      case loadImages.FAILURE:
        draft.loading = false;
        draft.loadError = payload;
        break;

      case createImage.TRIGGER:
        draft.imageToCreate = payload;
        break;

      case createImage.REQUEST:
        draft.creating = true;
        draft.createError = null;
        break;

      case createImage.SUCCESS:
        draft.creating = false;
        break;

      case createImage.FAILURE:
        draft.creating = false;
        draft.createError = payload;
        break;

      case createImage.FULFILL:
        draft.imageToCreate = null;
        break;

      case removeImage.TRIGGER:
        draft.imageToRemove = payload;
        break;

      case removeImage.REQUEST:
        draft.removing = true;
        draft.removeError = null;
        break;

      case removeImage.SUCCESS:
        draft.removing = false;
        break;

      case removeImage.FAILURE:
        draft.removing = false;
        draft.removeError = payload;
        break;

      case removeImage.FULFILL:
        draft.imageToRemove = null;
        break;

      case downloadImagesZip.REQUEST:
        draft.downloadingZip = true;
        draft.downloadZipError = null;
        break;

      case downloadImagesZip.SUCCESS:
        draft.downloadingZip = false;
        break;

      case downloadImagesZip.FAILURE:
        draft.downloadingZip = false;
        draft.downloadZipError = payload;
        break;
    }
  });

export default reducer;
