import sendMagicLinkEmail from './private/sendMagicLinkEmail';
import magicLinksAllowedAttributes from './private/magicLinksAllowedAttributes';

import { dbLoad } from 'server-utils/common/database';
import { AuthError, NotFoundError, InvalidInputError } from 'server-utils/common/errors';
import { find } from 'server-utils/common/find';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';

const verifyTurnstileToken = async (token, remoteip) => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    // If no secret key is configured, skip verification (for development)
    return { success: true };
  }

  if (!token) {
    return { success: false, error: 'No Turnstile token provided' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteip) {
      formData.append('remoteip', remoteip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return { success: false, error: 'Verification failed' };
  }
};

export default async function getmagiclink(req) {
  reqSecure(req, magicLinksAllowedAttributes);
  const authenticatedUser = await authentication(req);

  // Verify Turnstile token for bot protection
  const turnstileResult = await verifyTurnstileToken(req.body.turnstileToken, req.ip || req.connection.remoteAddress);

  if (!turnstileResult.success) {
    throw new InvalidInputError('Bot verification failed. Please try again.');
  }

  const userData = await dbLoad({ redisKey: 'users' });
  const { existingValue: userProfile } = find(userData, req.body.email.toLowerCase(), 'email');
  if (!userProfile) {
    throw new NotFoundError("We couldn't find a profile matching that email");
  }
  const { divertToAdmin } = req.body;
  if (divertToAdmin && (!authenticatedUser || !authenticatedUser.admin)) {
    throw new AuthError('Only an admin user can request a login link for another user');
  }
  // Sent emails should be stored in a DB so that we can verify this has been called:
  await sendMagicLinkEmail(userProfile, divertToAdmin, req.body.loginRedirect);
  return { success: 'A magic link has been generated and sent to the email associated with your account' };
}
