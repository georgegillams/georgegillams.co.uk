#!/usr/bin/env node

import { datumCreate } from '../datum';

import loadSummary from './loadSummary.js';

import { AuthError } from 'helpers/Errors';
import { clearDatabaseCollection } from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('analytics');
});

const createSomeValues = () => {
  const analytic1 = {
    type: 'type1',
    url: 'url1',
    utm_source: 'urmSource1',
    utm_medium: 'urmMedium1',
    browser: 'browser1',
    browserVersion: 'version1',
    os: 'os1',
    disallowedAttribute: 'disallowed',
  };

  const analytic2 = {
    type: 'type2',
    url: 'url2',
    utm_source: 'urmSource2',
    utm_medium: 'urmMedium2',
    browser: 'browser2',
    browserVersion: 'version2',
    os: 'os2',
    disallowedAttribute: 'disallowed',
  };

  const analytic3 = {
    type: 'type1',
    url: 'url1',
    utm_source: 'urmSource1',
    utm_medium: 'urmMedium1',
    browser: 'browser1',
    browserVersion: 'version1',
    os: 'os1',
    disallowedAttribute: 'disallowed',
  };

  return datumCreate({ redisKey: 'analytics' }, { body: analytic1 })
    .then(() => datumCreate({ redisKey: 'analytics' }, { body: analytic2 }))
    .then(() => datumCreate({ redisKey: 'analytics' }, { body: analytic3 }));
};

test('load summary analytics admin', () => {
  const req = {
    cookies: {},
    headers: { apikey: 'asdfghjkl' },
    body: {},
  };

  return createSomeValues()
    .then(() => loadSummary(req))
    .then(results => {
      expect(results.analytics.length).toBe(2);
      expect(results.analytics[0].browser).toBe('browser1');
      expect(results.analytics[0].url).toBe('url1');
      return true;
    })
    .catch(err => {
      throw err;
    });
});

test('load summary analytics unauthenticated', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(loadSummary(req))
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
    });
});
