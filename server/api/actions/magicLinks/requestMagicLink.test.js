#!/usr/bin/env node

import { datumLoad } from '../datum';

import requestMagicLink from './requestMagicLink.js';

import { AuthError, NotFoundError } from 'utils/errors';
import {
  clearDatabaseCollection,
  createUsersWithSessions,
} from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('emails');
  clearDatabaseCollection('magiclinks');
});

test('request magic link for user - should succeed', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { email: 'nonAdminUser1@example.com' },
  };

  return createUsersWithSessions()
    .then(() => requestMagicLink(req))
    .then(result => {
      expect(result).toBeTruthy();
      expect(result.success).toBeTruthy();
      return true;
    })
    .then(
      () =>
        // Until the email helper is rewritten, emails are sent async and we do not wait
        new Promise(resolve => setTimeout(resolve, 200)),
    )
    .then(() => datumLoad({ redisKey: 'magiclinks' }))
    .then(magicLinks => {
      expect(magicLinks.length).toBe(1);
      expect(magicLinks[0].userId).toBe('nonAdminUser1');
      return true;
    })
    .then(() => datumLoad({ redisKey: 'emails' }))
    .then(emails => {
      expect(emails.length).toBe(1);
      expect(emails[0].to).toBe('nonAdminUser1@example.com');
      return true;
    });
});

test('request diverted magic link admin - should send email to admin account', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: { email: 'nonAdminUser1@example.com', divertToAdmin: true },
  };

  return createUsersWithSessions()
    .then(() => requestMagicLink(req))
    .then(result => {
      expect(result).toBeTruthy();
      expect(result.success).toBeTruthy();
      return true;
    })
    .then(
      () =>
        // Until the email helper is rewritten, emails are sent async and we do not wait
        new Promise(resolve => setTimeout(resolve, 200)),
    )
    .then(() => datumLoad({ redisKey: 'magiclinks' }))
    .then(magicLinks => {
      expect(magicLinks.length).toBe(1);
      expect(magicLinks[0].userId).toBe('nonAdminUser1');
      return true;
    })
    .then(() => datumLoad({ redisKey: 'emails' }))
    .then(emails => {
      expect(emails.length).toBe(1);
      expect(emails[0].to).toBe('g+diverted-to-admin@georgegillams.co.uk');
      return true;
    });
});

test('request diverted magic link non-admin - should throw auth error', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: { email: 'nonAdminUser1@example.com', divertToAdmin: true },
  };

  return createUsersWithSessions()
    .then(() => requestMagicLink(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      // Until the email helper is rewritten, emails are sent async and we do not wait
      new Promise(resolve => setTimeout(resolve, 200))
        .then(() => datumLoad({ redisKey: 'magiclinks' }))
        .then(magicLinks => {
          expect(magicLinks.length).toBe(0);
          return true;
        })
        .then(() => datumLoad({ redisKey: 'emails' }))
        .then(emails => {
          expect(emails.length).toBe(0);
          return true;
        }),
    );
});

test('request magic link non-existent-user - should throw error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { email: 'nonExistent@example.com' },
  };

  return createUsersWithSessions()
    .then(() => requestMagicLink(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    })
    .finally(() =>
      // Until the email helper is rewritten, emails are sent async and we do not wait
      new Promise(resolve => setTimeout(resolve, 200))
        .then(() => datumLoad({ redisKey: 'magiclinks' }))
        .then(magicLinks => {
          expect(magicLinks.length).toBe(0);
          return true;
        })
        .then(() => datumLoad({ redisKey: 'emails' }))
        .then(emails => {
          expect(emails.length).toBe(0);
          return true;
        }),
    );
});