import produce from 'immer';

import { loadLinks, createLink, deleteLink } from './actions';

export const initialState = {
  links: null,
  loadingLinks: false,
  loadLinksError: null,

  linkToCreate: null,
  creatingLink: false,
  createLinkError: null,

  linkToDelete: null,
  deletingLink: false,
  deleteLinkError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case loadLinks.REQUEST:
        draft.loadingLinks = true;
        draft.loadLinksError = null;
        break;

      case loadLinks.SUCCESS:
        draft.loadingLinks = false;
        draft.links = payload.supportMessages;
        break;

      case loadLinks.FAILURE:
        draft.loadingLinks = false;
        draft.loadLinksError = payload;
        break;

      case createLink.TRIGGER:
        draft.linkToCreate = payload;
        break;

      case createLink.REQUEST:
        draft.creatingLink = true;
        draft.createLinkError = null;
        break;

      case createLink.SUCCESS:
        draft.creatingLink = false;
        break;

      case createLink.FAILURE:
        draft.creatingLink = false;
        draft.createLinkError = payload;
        break;

      case deleteLink.TRIGGER:
        draft.linkToDelete = payload;
        break;

      case deleteLink.REQUEST:
        draft.deletingLink = true;
        draft.deleteLinkError = null;
        break;

      case deleteLink.SUCCESS:
        draft.deletingLink = false;
        break;

      case deleteLink.FAILURE:
        draft.deletingLink = false;
        draft.deleteLinkError = payload;
        break;
    }
  });

export default reducer;
