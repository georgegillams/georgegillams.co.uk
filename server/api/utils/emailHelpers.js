import {
  PROJECT_NAME,
  EMAIL_ADDRESS,
  EMAIL_IMAGE_HTML,
  EMAIL_HTML_BUTTON_STYLE,
  EMAIL_SENDER_EMAIL,
} from 'helpers/constants';
import {
  sendMagicLinkEmail as sendMLE,
  sendEmailVerificationEmail as sendEVE,
  sendPaymentReceiptEmail as sendPRE,
} from './emailHelpersGeneric';

let imageHtml =
  '<img src="https://i.imgur.com/Fvg8HXM.png" style="width: 7rem;">';
let buttonStyle =
  'background-color: #44aeff;padding: .9rem 1.2rem;color: white;border-radius: 2rem;text-decoration: none;';
let senderEmail = EMAIL_ADDRESS;

if (PROJECT_NAME === 'EPICC') {
  imageHtml = EMAIL_IMAGE_HTML;
  console.log(`imageHtml`, imageHtml);
  buttonStyle = EMAIL_HTML_BUTTON_STYLE;
}

export function sendMagicLinkEmail(userProfile, divertToAdmin) {
  return sendMLE(
    userProfile,
    imageHtml,
    buttonStyle,
    senderEmail,
    divertToAdmin,
  );
}

export function sendEmailVerificationEmail(userProfile) {
  return sendEVE(userProfile, imageHtml, buttonStyle, senderEmail);
}

export function sendPaymentReceiptEmail(userProfile, payment) {
  console.log(`ere`);
  return sendPRE(userProfile, payment, imageHtml, buttonStyle, senderEmail);
}
