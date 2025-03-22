import produce from 'immer';

import {
  loadEndpoints,
  createEndpoint,
  removeEndpoint,
  updateEndpoint,
  loadNotifications,
  removeNotification,
} from './actions';

export const initialState = {
  webhookEndpoints: null,
  loading: false,
  loadError: null,

  webhookEndpointToCreate: null,
  creating: false,
  createError: null,

  webhookEndpointToUpdate: null,
  updating: false,
  updateError: null,

  webhookEndpointToRemove: null,
  removing: false,
  removeError: null,

  notifications: null,
  notificationsLoading: false,
  notificationsLoadError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case loadEndpoints.REQUEST:
        draft.loading = true;
        draft.loadError = null;
        break;

      case loadEndpoints.SUCCESS:
        draft.loading = false;
        draft.webhookEndpoints = payload;
        break;

      case loadEndpoints.FAILURE:
        draft.loading = false;
        draft.loadError = payload;
        break;

      case createEndpoint.TRIGGER:
        draft.webhookEndpointToCreate = payload;
        break;

      case createEndpoint.REQUEST:
        draft.creating = true;
        draft.createError = null;
        break;

      case createEndpoint.SUCCESS:
        draft.creating = false;
        break;

      case createEndpoint.FAILURE:
        draft.creating = false;
        draft.createError = payload;
        break;

      case updateEndpoint.TRIGGER:
        draft.webhookEndpointToUpdate = payload;
        break;

      case updateEndpoint.REQUEST:
        draft.updating = true;
        draft.updateError = null;
        break;

      case updateEndpoint.SUCCESS:
        draft.updating = false;
        break;

      case updateEndpoint.FAILURE:
        draft.updating = false;
        draft.updateError = payload;
        break;

      case removeEndpoint.TRIGGER:
        draft.webhookEndpointToRemove = payload;
        break;

      case removeEndpoint.REQUEST:
        draft.removing = true;
        draft.removeError = null;
        break;

      case removeEndpoint.SUCCESS:
        draft.removing = false;
        break;

      case removeEndpoint.FAILURE:
        draft.removing = false;
        draft.removeError = payload;
        break;

      case loadNotifications.TRIGGER:
        draft.webhookIdToLoadNotifications = payload;
        break;

      case loadNotifications.REQUEST:
        draft.notificationsLoading = true;
        draft.notificationsLoadError = null;
        break;

      case loadNotifications.SUCCESS:
        draft.notificationsLoading = false;
        draft.notifications = {
          ...draft.notifications,
          [draft.webhookIdToLoadNotifications]: payload.webhookNotifications,
        };
        break;

      case loadNotifications.FAILURE:
        draft.notificationsLoading = false;
        draft.notificationsLoadError = payload;
        break;

      case removeNotification.TRIGGER:
        draft.webhookIdToRemoveNotification = payload;
        break;

      case removeNotification.REQUEST:
        draft.removingNotification = true;
        draft.removeNotificationError = null;
        break;

      case removeNotification.SUCCESS:
        draft.removingNotification = false;
        break;

      case removeNotification.FAILURE:
        draft.removingNotification = false;
        draft.removeNotificationError = payload;
    }
  });

export default reducer;
