import {
  LOAD_GTS_LATEST,
  LOAD_GTS_LATEST_SUCCESS,
  LOAD_GTS_LATEST_ERROR,
} from './constants';

export function loadGtsLatest() {
  return {
    type: LOAD_GTS_LATEST,
  };
}

export function gtsLatestLoaded(gtsLatest) {
  return {
    type: LOAD_GTS_LATEST_SUCCESS,
    gtsLatest,
  };
}

export function gtsLatestLoadingError(error) {
  return {
    type: LOAD_GTS_LATEST_ERROR,
    error,
  };
}
