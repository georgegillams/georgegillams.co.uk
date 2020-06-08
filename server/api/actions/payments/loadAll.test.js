#!/usr/bin/env node

import load from './loadAll.js';

test('returns error if not authenticated', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return load(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err.category).toBe('auth_error');
      expect(err.message).toBe('You are not authorised to read this resource');
    });
});
