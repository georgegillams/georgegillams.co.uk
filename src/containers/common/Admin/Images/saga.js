import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { selectState } from './selectors';
import { loadImages, createImage, removeImage, downloadImagesZip } from './actions';

export function* doLoadImages() {
  const requestURL = apiStructure.loadImages.fullPath;

  try {
    yield put(loadImages.request());

    const result = yield call(request, requestURL);

    if (result.error) {
      yield put(loadImages.failure(result));
    } else {
      yield put(loadImages.success(result));
    }
  } catch (err) {
    yield put(loadImages.failure(err));
  } finally {
    yield put(loadImages.fulfill());
  }
}

export function* doCreateImage() {
  const currentState = yield select(selectState());
  const { imageToCreate } = currentState;
  const requestURL = apiStructure.createImage.fullPath;

  try {
    yield put(createImage.request());

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('title', imageToCreate.title);
    formData.append('image', imageToCreate.image);

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header, let the browser set it with boundary for FormData
    });

    if (result.error) {
      yield put(createImage.failure(result));
    } else {
      yield put(createImage.success(result));
      yield put(loadImages.trigger());
    }
  } catch (err) {
    yield put(createImage.failure(err));
  } finally {
    yield put(createImage.fulfill());
  }
}

export function* doRemoveImage() {
  const currentState = yield select(selectState());
  const { imageToRemove } = currentState;
  const requestURL = apiStructure.deleteImage.fullPath;

  try {
    yield put(removeImage.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(imageToRemove),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(removeImage.failure(result));
    } else {
      yield put(removeImage.success(result));
      yield put(loadImages.trigger());
    }
  } catch (err) {
    yield put(removeImage.failure(err));
  } finally {
    yield put(removeImage.fulfill());
  }
}

export function* doDownloadImagesZip() {
  const requestURL = apiStructure.downloadImagesZip.fullPath;

  try {
    yield put(downloadImagesZip.request());

    // For file downloads, we need to handle the response differently
    const response = yield call(fetch, requestURL, {
      method: 'GET',
      credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Create blob and download
    const blob = yield call(() => response.blob());
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    yield put(downloadImagesZip.success());
  } catch (err) {
    yield put(downloadImagesZip.failure(err));
  } finally {
    yield put(downloadImagesZip.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(loadImages.TRIGGER, doLoadImages);
  yield takeLatest(createImage.TRIGGER, doCreateImage);
  yield takeLatest(removeImage.TRIGGER, doRemoveImage);
  yield takeLatest(downloadImagesZip.TRIGGER, doDownloadImagesZip);
}
