import {
  REQUEST_MAGIC_LINK_FOR_USER,
  RESEND_PAYMENT_RECEIPT,
  SEND_TICKET_EMAIL,
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR,
} from './constants';

export function loadUsers() {
  return {
    type: LOAD_USERS,
  };
}

export function requestMagicLinkForUser(user) {
  return {
    type: REQUEST_MAGIC_LINK_FOR_USER,
    magicLinkUser: user,
  };
}

export function resendPaymentReceipt(user) {
  return {
    type: RESEND_PAYMENT_RECEIPT,
    paymentReceiptUser: user,
  };
}

export function sendTicketEmail(user) {
  return {
    type: SEND_TICKET_EMAIL,
    emailTicketUser: user,
  };
}

export function loadUsersSuccess(users) {
  return {
    type: LOAD_USERS_SUCCESS,
    users,
  };
}

export function loadUsersError(error) {
  return {
    type: LOAD_USERS_ERROR,
    error,
  };
}
