#!/usr/bin/env node

import load from './loadAll.js';

test('returns error if not authenticated', done => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };
  load(req)
    .then(() => {
      // The promise should not resolve
      expect(true).toBe(false);
      done();
    })
    .catch(err => {
      expect(err.category).toBe('auth_error');
      expect(err.message).toBe('You are not authorised to read this resource');
      done();
    });
});
