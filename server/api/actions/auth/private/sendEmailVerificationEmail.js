import crypto from 'crypto';

import { SITE_URL, EMAIL_VERIFICATION_ENABLED } from 'helpers/constants';
import {
  EMAIL_OUTER,
  EMAIL_LOGO_HEADER,
  EMAIL_HTML_BUTTON_STYLE,
  sendEmail,
  EMAIL_SENDER_ADDRESS,
  EMAIL_OUTER_END,
  FONT_SIZE_SM,
} from 'utils/emails';
import lockPromise from 'utils/lock';
import { datumCreate } from 'api/actions/datum';

export default function sendEmailVerificationEmail(user) {
  if (!EMAIL_VERIFICATION_ENABLED) {
    return Promise.resolve();
  }
  const now = new Date();
  const oneDaysTime = new Date(now.getTime() + 24 * 1000 * 60 * 60);
  const verificationLink = {
    userId: user.id,
    expiry: oneDaysTime,
    key: crypto.randomBytes(20).toString('hex'),
  };
  const emailVerificationLink = `${SITE_URL}/email-verification?token=${verificationLink.key}`;
  // Send the magic link URL to the email address of the user
  const email = {
    from: EMAIL_SENDER_ADDRESS,
    to: user.email,
    subject: 'Verify your email address',
    text: `Your email verification link is:
${emailVerificationLink}\n\nIt will expire ${oneDaysTime.toString()}`,
    html: `${EMAIL_OUTER}
  ${EMAIL_LOGO_HEADER}
  <tr>
    <td bgcolor="white" style="padding: 24px; text-align: center;">
      <p>
        Please verify your email address using the button below.
        <br><br><br>
        <a href="${emailVerificationLink}" style="${EMAIL_HTML_BUTTON_STYLE}">Click here to verify your email address.</a>
        <br><br><br>
        <p style="font-size: ${FONT_SIZE_SM};">
          This verification link will expire ${oneDaysTime.toString()}
        </p>
      </p>
    </td>
  </tr>
${EMAIL_OUTER_END}`,
  };

  return lockPromise('emailVerificationCodes', () =>
    datumCreate(
      { redisKey: 'emailVerificationCodes' },
      { body: verificationLink },
    ).then(() => sendEmail(email)),
  );
}