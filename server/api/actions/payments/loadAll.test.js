#!/usr/bin/env node

import { datumLoadSingle, datumCreate, datumUpdate } from '../datum';

import load from './loadAll.js';

test('returns error if not authenticated', done => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };
  load(req)
    .then(result => {})
    .catch(result => {
      expect(result.error).toBe('auth');
      expect(result.errorMessage).toBe(
        'You are not authorised to read this resource',
      );
      done();
    });
});
