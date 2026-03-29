import produce from 'immer';

import { loadMedals, deleteMedal, updateMedal, createMedal } from './actions';

export const initialState = {
  medals: null,
  loadingMedals: false,
  loadMedalsError: null,

  medalToCreate: null,
  creatingMedal: false,
  createMedalError: null,

  medalToUpdate: null,
  updatingMedal: false,
  updateMedalError: null,

  medalToDelete: null,
  deletingMedal: false,
  deleteMedalError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case loadMedals.REQUEST:
        draft.loadingMedals = true;
        draft.loadMedalsError = null;
        break;

      case loadMedals.SUCCESS:
        draft.loadingMedals = false;
        draft.medals = payload.medals;
        break;

      case loadMedals.FAILURE:
        draft.loadingMedals = false;
        draft.loadMedalsError = payload;
        break;

      case createMedal.TRIGGER:
        draft.medalToCreate = payload;
        break;

      case createMedal.REQUEST:
        draft.creatingMedal = true;
        draft.createMedalError = null;
        break;

      case createMedal.SUCCESS:
        draft.creatingMedal = false;
        break;

      case createMedal.FAILURE:
        draft.creatingMedal = false;
        draft.createMedalError = payload;
        break;

      case updateMedal.TRIGGER:
        draft.medalToUpdate = payload;
        break;

      case updateMedal.REQUEST:
        draft.updatingMedal = true;
        draft.updateMedalError = null;
        break;

      case updateMedal.SUCCESS:
        draft.updatingMedal = false;
        break;

      case updateMedal.FAILURE:
        draft.updatingMedal = false;
        draft.updateMedalError = payload;
        break;

      case deleteMedal.TRIGGER:
        draft.medalToDelete = payload;
        break;

      case deleteMedal.REQUEST:
        draft.deletingMedal = true;
        draft.deleteMedalError = null;
        break;

      case deleteMedal.SUCCESS:
        draft.deletingMedal = false;
        break;

      case deleteMedal.FAILURE:
        draft.deletingMedal = false;
        draft.deleteMedalError = payload;
        break;
    }
  });

export default reducer;
