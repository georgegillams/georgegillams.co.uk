import sendEmailVerificationEmail from '../auth/private/sendEmailVerificationEmail';
import { InvalidInputError } from 'server-utils/common/errors';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import { dbCreate, dbLoad } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import { hash } from 'server-utils/common/hash';
import { emailFingerprint, find } from 'server-utils/common/find';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
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

export default function create(req) {
  reqSecure(req, usersAllowedAttributes);
  return lockPromise('users', async () => {
    const authenticatedUser = await authentication(req);
    let userData = await dbLoad({ redisKey: 'users' });
    if (req.body.admin && (!authenticatedUser || !authenticatedUser.admin)) {
      throw UNAUTHORISED_WRITE;
    }

    // Verify Turnstile token for bot protection
    const turnstileResult = await verifyTurnstileToken(req.body.turnstileToken, req.ip || req.connection.remoteAddress);

    if (!turnstileResult.success) {
      throw new InvalidInputError('Bot verification failed. Please try again.');
    }

    // If a user already has the username, we cannot allow a new one to be created
    // This is safe against user-enumeration attacks because find uses constant-time comparison and this api is rate limited
    const { existingValue: userWithSameUname } = find(userData, req.body.uname, 'uname');
    const { existingValue: userWithSameEmail } = find(userData, emailFingerprint(req.body.email), 'emailFingerprint');
    if (userWithSameUname || userWithSameEmail) {
      throw new InvalidInputError('A user with that username or email already exists');
    }
    if (req.body.password) {
      req.body.hash = hash(req.body.password);
      req.body.password = null;
    }
    req.body.emailFingerprint = emailFingerprint(req.body.email);
    req.body.email = req.body.email.toLowerCase();
    req.body.emailVerified = false;
    const newUser = await dbCreate({ redisKey: 'users', authenticatedUser }, req);
    await sendEmailVerificationEmail(newUser);
    return { message: 'User created', newUser };
  });
}
