#!/usr/bin/env node

import load from './load.js';
import { datumLoadSingle, datumCreate, datumUpdate } from '../datum';

test('returns error if not authenticated', done => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };
  load(req).then(result => {
    expect(result.error).toBe('authentication');
    done();
  });
});