#!/usr/bin/env node

import create from './create.js';

import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';
import { AuthError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('images');
});

test('create image as admin - adds data to collection', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      title: 'Test Image',
    },
    files: {
      image: {
        name: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        mv: jest.fn().mockResolvedValue(undefined),
      },
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(result => {
      expect(result).toBeTruthy();
      expect(result.title).toBe('Test Image');
      expect(result.filename).toBeTruthy();
      expect(result.mimeType).toBe('image/jpeg');
      expect(result.originalName).toBe('test.jpg');
      expect(result.size).toBe(1024);
      return true;
    });
});

test('create image non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      title: 'Test Image',
    },
    files: {
      image: {
        name: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        mv: jest.fn().mockResolvedValue(undefined),
      },
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});

test('create image unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      title: 'Test Image',
    },
    files: {
      image: {
        name: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        mv: jest.fn().mockResolvedValue(undefined),
      },
    },
  };

  return create(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});

test('create image without file - throws validation error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      title: 'Test Image',
    },
    files: {},
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err.message).toContain('No image file provided');
    });
});

test('create image without title - throws validation error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {},
    files: {
      image: {
        name: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        mv: jest.fn().mockResolvedValue(undefined),
      },
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err.message).toContain('Title is required');
    });
});

test('create image with invalid file type - throws validation error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      title: 'Test Image',
    },
    files: {
      image: {
        name: 'test.txt',
        mimetype: 'text/plain',
        size: 1024,
        mv: jest.fn().mockResolvedValue(undefined),
      },
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err.message).toContain('Only JPEG and PNG images are allowed');
    });
});
