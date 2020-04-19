#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _deleteEntity = _interopRequireDefault(require("./deleteEntity.js"));

var _datum = require("./datum");

test('returns error if not admin', function (done) {
  (0, _datum.datumCreate)({
    redisKey: 'users'
  }, {
    body: {
      requestedId: 'user5',
      name: 'George'
    }
  }).then(function () {
    var req = {
      cookies: {},
      headers: {},
      body: {
        collectionName: 'users',
        id: 'user5'
      }
    };
    (0, _deleteEntity["default"])(req).then(function (result) {})["catch"](function (result) {
      expect(result.error).toBe('auth');
      expect(result.errorMessage).toBe('You are not authorised to write to this resource');
      (0, _datum.datumLoadSingle)({
        redisKey: 'users',
        filter: function filter(u) {
          return u.id === 'user5';
        }
      }).then(function (dbResult) {
        expect(dbResult).toBeTruthy();
        expect(dbResult.name).toBe('George');
        done();
      });
    });
  });
});
test('returns error if item is not already marked for deletion', function (done) {
  (0, _datum.datumCreate)({
    redisKey: 'emails'
  }, {
    body: {
      requestedId: 'email2',
      to: 'address@example.com',
      message: 'Hi'
    }
  }).then(function () {
    var req = {
      cookies: {},
      headers: {
        apikey: 'asdfghjkl'
      },
      body: {
        collectionName: 'users',
        id: 'user5'
      }
    };
    (0, _deleteEntity["default"])(req).then(function (result) {})["catch"](function (result) {
      expect(result.error).toBe('wrong-input');
      expect(result.errorMessage).toBe('Only deleted entities can be permanently removed.');
      (0, _datum.datumLoadSingle)({
        redisKey: 'users',
        filter: function filter(u) {
          return u.id === 'user5';
        }
      }).then(function (userDbResult) {
        expect(userDbResult).toBeTruthy();
        expect(userDbResult.name).toBe('George');
        (0, _datum.datumLoadSingle)({
          redisKey: 'emails',
          resolveIfNotFound: true,
          filter: function filter(u) {
            return u.id === 'email2';
          }
        }).then(function (emailDbResult) {
          expect(emailDbResult).toBeTruthy();
          expect(emailDbResult.message).toBe('Hi');
          done();
        });
      });
    });
  });
});
test('allows permanent deletion of deletedItem if admin', function (done) {
  (0, _datum.datumCreate)({
    redisKey: 'users'
  }, {
    body: {
      requestedId: 'user6',
      name: 'Geoff',
      deleted: true
    }
  }).then(function () {
    var req = {
      cookies: {},
      headers: {
        apikey: 'asdfghjkl'
      },
      body: {
        collectionName: 'users',
        id: 'user6'
      }
    };
    (0, _deleteEntity["default"])(req).then(function (result) {
      console.log("result", result);
      expect(result).toBe(undefined);
      (0, _datum.datumLoadSingle)({
        redisKey: 'users',
        resolveIfNotFound: true,
        filter: function filter(u) {
          return u.id === 'user6';
        }
      }).then(function (user6DbResult) {
        expect(user6DbResult).toBe(undefined);
        (0, _datum.datumLoadSingle)({
          redisKey: 'emails',
          resolveIfNotFound: true,
          filter: function filter(e) {
            return e.id === 'email2';
          }
        }).then(function (emailDbResult) {
          expect(emailDbResult).toBeTruthy();
          expect(emailDbResult.message).toBe('Hi');
          (0, _datum.datumLoadSingle)({
            redisKey: 'users',
            filter: function filter(u) {
              return u.id === 'user5';
            }
          }).then(function (user5DbResult) {
            expect(user5DbResult).toBeTruthy();
            expect(user5DbResult.name).toBe('George');
            done();
          });
        });
      });
    });
  });
});
//# sourceMappingURL=deleteEntity.test.js.map