"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMagicLinkEmail = sendMagicLinkEmail;
exports.sendMagicLinkTicketEmail = sendMagicLinkTicketEmail;
exports.sendEmailVerificationEmail = sendEmailVerificationEmail;
exports.sendPaymentReceiptEmail = sendPaymentReceiptEmail;

var _emailHelpersGeneric = require("./emailHelpersGeneric");

var _constants = require("helpers/constants");

var primaryColor = '#44AEFF';
var primaryColorFaded = '#E5F4FF';
var imageHtml = '<img src="https://i.imgur.com/EBMKBux.png" style="width: 7rem;">';
var buttonStyle = 'background-color: #025ca2;padding: 0.6rem 1.2rem;color: white;border-radius: 0.25rem;text-decoration: none;';
var senderEmail = _constants.EMAIL_SENDER_EMAIL;

if (_constants.PROJECT_NAME === 'EPICC') {
  primaryColor = 'red';
  primaryColorFaded = 'red';
  imageHtml = _constants.EMAIL_IMAGE_HTML;
  buttonStyle = _constants.EMAIL_HTML_BUTTON_STYLE;
}

if (_constants.PROJECT_NAME === 'CGWEDDING') {
  primaryColor = '#008080';
  primaryColorFaded = '#BFDCDC';
  imageHtml = '<img src="https://i.imgur.com/ISUf6bC.png" style="width: 7rem;">';
}

var branding = {
  primaryColor: primaryColor,
  primaryColorFaded: primaryColorFaded,
  imageHtml: imageHtml
};

function sendMagicLinkEmail(userProfile, divertToAdmin, loginRedirect) {
  return (0, _emailHelpersGeneric.sendMagicLinkEmail)(userProfile, branding, buttonStyle, senderEmail, divertToAdmin, loginRedirect);
}

function sendMagicLinkTicketEmail(userProfile, ticketData, divertToAdmin) {
  return (0, _emailHelpersGeneric.sendMagicLinkTicketEmail)(userProfile, branding, buttonStyle, senderEmail, ticketData, divertToAdmin);
}

function sendEmailVerificationEmail(userProfile) {
  return (0, _emailHelpersGeneric.sendEmailVerificationEmail)(userProfile, branding, buttonStyle, senderEmail);
}

function sendPaymentReceiptEmail(payment, charge) {
  return (0, _emailHelpersGeneric.sendPaymentReceiptEmail)(payment, charge, branding, buttonStyle, senderEmail);
}
//# sourceMappingURL=emailHelpers.js.map