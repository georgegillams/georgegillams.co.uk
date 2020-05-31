#!/usr/bin/env node

import { datumLoadSingle, datumCreate } from '../datum';

import deleteEntity from './deleteEntity.js';

test('returns error if not admin', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      collectionName: 'users',
      id: 'user5',
    },
  };

  return datumCreate(
    { redisKey: 'users' },
    { body: { requestedId: 'user5', name: 'George' } },
  )
    .then(() => deleteEntity(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err.category).toBe('auth_error');
      expect(err.message).toBe(
        'You are not authorised to write to this resource',
      );
    })
    .finally(() =>
      datumLoadSingle({
        redisKey: 'users',
        filter: u => u.id === 'user5',
      }).then(dbResult => {
        expect(dbResult).toBeTruthy();
        expect(dbResult.name).toBe('George');
        return true;
      }),
    );
});

test('returns error if item is not already marked for deletion', done => {
  datumCreate(
    { redisKey: 'emails' },
    {
      body: { requestedId: 'email2', to: 'address@example.com', message: 'Hi' },
    },
  ).then(() => {
    const req = {
      cookies: {},
      headers: { apikey: 'asdfghjkl' },
      body: {
        collectionName: 'users',
        id: 'user5',
      },
    };
    deleteEntity(req)
      .then(() => {
        // The promise should not resolve
        expect(true).toBe(false);
        done();
      })
      .catch(result => {
        expect(result.error).toBe('wrong-input');
        expect(result.errorMessage).toBe(
          'Only deleted entities can be permanently removed.',
        );

        datumLoadSingle({
          redisKey: 'users',
          filter: u => u.id === 'user5',
        }).then(userDbResult => {
          expect(userDbResult).toBeTruthy();
          expect(userDbResult.name).toBe('George');
          datumLoadSingle({
            redisKey: 'emails',
            resolveIfNotFound: true,
            filter: u => u.id === 'email2',
          }).then(emailDbResult => {
            expect(emailDbResult).toBeTruthy();
            expect(emailDbResult.message).toBe('Hi');
            done();
          });
        });
      });
  });
});

test('allows permanent deletion of deletedItem if admin', done => {
  datumCreate(
    { redisKey: 'users' },
    {
      body: { requestedId: 'user6', name: 'Geoff', deleted: true },
    },
  ).then(() => {
    const req = {
      cookies: {},
      headers: { apikey: 'asdfghjkl' },
      body: {
        collectionName: 'users',
        id: 'user6',
      },
    };
    deleteEntity(req).then(result => {
      expect(result).toBe(undefined);

      datumLoadSingle({
        redisKey: 'users',
        resolveIfNotFound: true,
        filter: u => u.id === 'user6',
      }).then(user6DbResult => {
        expect(user6DbResult).toBe(undefined);
        datumLoadSingle({
          redisKey: 'emails',
          resolveIfNotFound: true,
          filter: e => e.id === 'email2',
        }).then(emailDbResult => {
          expect(emailDbResult).toBeTruthy();
          expect(emailDbResult.message).toBe('Hi');
          datumLoadSingle({
            redisKey: 'users',
            filter: u => u.id === 'user5',
          }).then(user5DbResult => {
            expect(user5DbResult).toBeTruthy();
            expect(user5DbResult.name).toBe('George');
            done();
          });
        });
      });
    });
  });
});
