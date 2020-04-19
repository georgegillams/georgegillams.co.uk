"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMagicLinkEmail = sendMagicLinkEmail;
exports.sendEmailVerificationEmail = sendEmailVerificationEmail;
exports.sendPaymentReceiptEmail = sendPaymentReceiptEmail;

var _crypto = _interopRequireDefault(require("crypto"));

var _datum = require("../actions/datum");

var _nodemailer = _interopRequireDefault(require("./nodemailer"));

var _constants = require("helpers/constants");

var EMAIL_WIDTH = '600px';
var FONT_SIZE_SM = '18px';
var FONT_SIZE_BASE = '24px';

var emailOuter = function emailOuter(branding) {
  return "<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\">\n    <link href=\"https://fonts.googleapis.com/css?family=Quattrocento+Sans:400,700\" rel=\"stylesheet\" />\n  </head>\n  <body style=\"font-family: 'Quattrocento Sans', sans-serif; width: 100% !important; height: 100vh !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: -1px 0 0; padding: 0;\">\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" height=\"100%\" style=\"border: 0; border-collapse: collapse; font-size: ".concat(FONT_SIZE_BASE, "; width: 100%; margin: 0 auto;>\n      <tr style=\"align: center;\">\n        <td bgcolor=\"").concat(branding.primaryColorFaded, "\">\n          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border: 0; border-collapse: collapse; align: left; color: #1e1e1e; font-size: ").concat(FONT_SIZE_BASE, "; width: 100%; max-width: ").concat(EMAIL_WIDTH, "; margin: 0 auto;\">");
};

var EMAIL_OUTER_END = "</table>\n        </td>\n      </tr>\n    </table>\n  </body>\n</html>";

var emailLogoHeader = function emailLogoHeader(branding) {
  return "<tr>\n          <td bgcolor=\"".concat(branding.primaryColor, "\" style=\"padding: 24px; color: white; font-size: 32px;\">\n            <div style=\"text-align: center;\">\n              ").concat(branding.imageHtml, "\n            </div>\n          </td>\n        </tr>");
};

function sendMagicLinkEmail(userProfile, branding, buttonStyle, senderEmail, divertToAdmin, loginRedirect) {
  var now = new Date();
  var oneHoursTime = new Date(now.getTime() + 1 * 1000 * 60 * 60);
  var magicLink = {
    userId: userProfile.id,
    expiry: oneHoursTime,
    key: _crypto["default"].randomBytes(20).toString('hex')
  };
  (0, _datum.datumCreate)({
    redisKey: 'magiclinks'
  }, {
    body: magicLink
  });
  var magicLinkUrl = "".concat(_constants.SITE_URL, "/magic-login?token=").concat(magicLink.key);

  if (loginRedirect) {
    magicLinkUrl += "&redirect=".concat(loginRedirect);
  } // Send the magic link URL to the email address of the user


  _nodemailer["default"].sendMail({
    from: senderEmail,
    to: divertToAdmin ? 'g+diverted-to-admin@georgegillams.co.uk' : userProfile.email,
    subject: 'Your magic login link',
    text: "Your magic link is:\n".concat(magicLinkUrl, "\n\nIt will expire ").concat(oneHoursTime.toString()),
    html: "".concat(emailOuter(branding), "\n  ").concat(emailLogoHeader(branding), "\n  <tr>\n    <td bgcolor=\"white\" style=\"padding: 24px; text-align: center;\">\n      <p>\n        Tap the button below to login\n        <br><br><br>\n        <a href=\"").concat(magicLinkUrl, "\" style=\"").concat(buttonStyle, "\">Log in</a>\n        <br><br><br>\n        <p>\n          Once you're logged in, feel free to delete this email\n        </p>\n        <p style=\"font-size: ").concat(FONT_SIZE_SM, ";\">\n          Your single-use login link will expire ").concat(oneHoursTime.toString(), "\n        </p>\n      </p>\n    </td>\n  </tr>\n").concat(EMAIL_OUTER_END)
  }, function (error) {
    if (error) {
      return console.log(error);
    }
  });
}

function sendEmailVerificationEmail(userProfile, branding, buttonStyle, senderEmail) {
  if (!_constants.EMAIL_VERIFICATION_ENABLED) {
    return;
  }

  var now = new Date();
  var oneDaysTime = new Date(now.getTime() + 24 * 1000 * 60 * 60);
  var verificationLink = {
    userId: userProfile.id,
    expiry: oneDaysTime,
    key: _crypto["default"].randomBytes(20).toString('hex')
  };
  (0, _datum.datumCreate)({
    redisKey: 'emailVerificationCodes'
  }, {
    body: verificationLink
  });
  var emailVerificationLink = "".concat(_constants.SITE_URL, "/email-verification?token=").concat(verificationLink.key); // Send the magic link URL to the email address of the user

  _nodemailer["default"].sendMail({
    from: senderEmail,
    to: userProfile.email,
    subject: 'Verify your email address',
    text: "Your email verification link is:\n".concat(emailVerificationLink, "\n\nIt will expire ").concat(oneDaysTime.toString()),
    html: "".concat(emailOuter(branding), "\n  ").concat(emailLogoHeader(branding), "\n  <tr>\n    <td bgcolor=\"white\" style=\"padding: 24px; text-align: center;\">\n      <p>\n        Please verify your email address using the button below.\n        <br><br><br>\n        <a href=\"").concat(emailVerificationLink, "\" style=\"").concat(buttonStyle, "\">Click here to verify your email address.</a>\n        <br><br><br>\n        <p style=\"font-size: ").concat(FONT_SIZE_SM, ";\">\n          This verification link will expire ").concat(oneDaysTime.toString(), "\n        </p>\n      </p>\n    </td>\n  </tr>\n").concat(EMAIL_OUTER_END)
  }, function (error) {
    if (error) {
      return console.log(error);
    }
  });
}

function sendPaymentReceiptEmail(payment, charge, branding, buttonStyle, senderEmail) {
  var success = true;

  _nodemailer["default"].sendMail({
    from: senderEmail,
    to: payment.email,
    subject: 'Payment received',
    text: "Thank you for your recent payment of \xA3".concat(charge.amount / 100, "."),
    html: "".concat(emailOuter(branding), "\n        ").concat(emailLogoHeader(branding), "\n        <tr>\n          <td bgcolor=\"white\" style=\"padding: 24px 24px 0 24px;\">\n            <p>\n              Thank you for making an online payment.\n              <br><br>\n              Please find the receipt for this transaction below.\n            </p>\n          </td>\n        </tr>\n        <tr>\n          <td bgcolor=\"white\" style=\"padding: 0 24px 24px 24px; font-size: ").concat(FONT_SIZE_SM, ";\">\n            <hr/>\n            <p>\n              TRANSACTION RECEIPT FOR YOUR RECORDS:\n              <br>\n              Payment name: George Gillams - online payment ").concat(payment.id, "\n              <br>\n              Payment amount: \xA3").concat(charge.amount / 100, "\n              <br>\n              Payment method: ").concat(charge.payment_method_details.card.brand, "-").concat(charge.payment_method_details.card.last4, "\n              <br>\n              Transaction ID: ").concat(charge.id, "\n              <br>\n              Timestamp: ").concat(new Date(charge.created * 1000).toString(), "\n            </p>\n          </td>\n        </tr>\n      ").concat(EMAIL_OUTER_END)
  }, function (error) {
    if (error) {
      success = false;
      return console.log(error);
    }
  });

  return success;
}
//# sourceMappingURL=emailHelpersGeneric.js.map