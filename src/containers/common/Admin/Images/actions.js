import { createRoutine } from 'redux-saga-routines';

import { LOAD_IMAGES, CREATE_IMAGE, REMOVE_IMAGE, DOWNLOAD_IMAGES_ZIP } from './constants';

export const loadImages = createRoutine(LOAD_IMAGES);
export const createImage = createRoutine(CREATE_IMAGE);
export const removeImage = createRoutine(REMOVE_IMAGE);
export const downloadImagesZip = createRoutine(DOWNLOAD_IMAGES_ZIP);

export function mapDispatchToProps(dispatch) {
  return {
    loadImages: () => dispatch(loadImages()),
    createImage: data => dispatch(createImage(data)),
    removeImage: data => dispatch(removeImage(data)),
    downloadImagesZip: () => dispatch(downloadImagesZip()),
  };
}
