#!/usr/bin/env node

import downloadZip from './downloadZip.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { AuthError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';
import fs, { mkdirSync } from 'fs';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('images');
});

test('downloadZip as admin - returns function for zip download', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
  };

  mkdirSync('server/server_content/images', {
    recursive: true,
  });

  return createUsersWithSessions()
    .then(() => downloadZip(req))
    .then(result => {
      expect(result).toBeTruthy();
      expect(typeof result).toBe('function');
      return true;
    });
});

test('downloadZip non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
  };

  return createUsersWithSessions()
    .then(() => downloadZip(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});

test('downloadZip unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
  };

  return downloadZip(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});

test('downloadZip with non-existent images directory - throws error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
  };

  // Mock fs.existsSync to return false
  const originalExistsSync = fs.existsSync;
  fs.existsSync = jest.fn().mockReturnValue(false);

  return createUsersWithSessions()
    .then(() => downloadZip(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err.message).toContain('Images directory not found');
    })
    .finally(() => {
      // Restore original function
      fs.existsSync = originalExistsSync;
    });
});
