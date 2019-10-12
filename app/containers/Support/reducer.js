import { fromJS } from 'immutable';

import {
  LOAD_LINKS,
  LOAD_LINKS_SUCCESS,
  LOAD_LINKS_ERROR,
  ADD_LINK,
  ADD_LINK_SUCCESS,
  ADD_LINK_ERROR,
  DELETE_LINK,
  DELETE_LINK_SUCCESS,
  DELETE_LINK_ERROR,
} from './constants';

const initialState = fromJS({
  links: null,
  loadingLinks: false,
  loadLinksSuccess: false,
  loadLinksError: false,
  addLinkLoading: false,
  addLinkSuccess: false,
  addLinkError: false,
  deleteLinkLoading: false,
  deleteLinkSuccess: false,
  deleteLinkError: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LINKS:
      return state.set('loadingLinks', true).set('loadLinksError', false);
    case LOAD_LINKS_SUCCESS:
      return state
        .set('loadingLinks', false)
        .set('links', action.links)
        .set('loadLinksSuccess', true);
    case LOAD_LINKS_ERROR:
      return state
        .set('loadLinksError', action.loadLinksError)
        .set('loadingLinks', false)
        .set('loadLinksSuccess', false);

    case ADD_LINK:
      return state
        .set('linkDefinition', action.linkDefinition)
        .set('addLinkLoading', true)
        .set('addLinkError', false);
    case ADD_LINK_SUCCESS:
      return state.set('addLinkLoading', false).set('addLinkSuccess', true);
    case ADD_LINK_ERROR:
      return state
        .set('addLinkError', action.addLinkError)
        .set('addLinkLoading', false)
        .set('addLinkSuccess', false);

    case DELETE_LINK:
      return state
        .set('linkId', action.linkId)
        .set('deleteLinkLoading', true)
        .set('deleteLinkError', false);
    case DELETE_LINK_SUCCESS:
      return state
        .set('deleteLinkLoading', false)
        .set('deleteLinkSuccess', true);
    case DELETE_LINK_ERROR:
      return state
        .set('deleteLinkError', action.deleteLinkError)
        .set('deleteLinkLoading', false)
        .set('deleteLinkSuccess', false);
    default:
      return state;
  }
}

export default appReducer;
