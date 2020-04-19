#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _signUp = _interopRequireDefault(require("./signUp.js"));

var _datum = require("./datum");

test('allows a user to be created', function (done) {
  var req = {
    body: {
      uname: 'user1',
      email: 'test-user1@georgegillams.co.uk'
    }
  };
  (0, _signUp["default"])(req).then(function (result) {
    expect(result.error).toBe(undefined);
    expect(result.errorMessage).toBe(undefined);
    expect(result.authorId).toBe(undefined);
    expect(result.email).toBe('test-user1@georgegillams.co.uk');
    expect(result.uname).toBe('user1');
    expect(result.id).toBeTruthy();
    expect(result.lastUpdatedTimestamp).toBeTruthy();
    expect(result.session).toBeTruthy();
    expect(result.timestamp).toBeTruthy();
    (0, _datum.datumLoadSingle)({
      redisKey: 'users',
      filter: function filter(u) {
        return u.id === result.id;
      }
    }).then(function (dbResult) {
      expect(dbResult.authorId).toBe(result.authorId);
      expect(dbResult.email).toBe(result.email);
      expect(dbResult.uname).toBe(result.uname);
      expect(dbResult.timestamp).toBe(result.timestamp);
      done();
    });
  });
});
test('returns error if username is taken', function (done) {
  var req = {
    body: {
      uname: 'user1',
      email: 'test-user2@georgegillams.co.uk'
    }
  };
  (0, _signUp["default"])(req).then(function (result) {})["catch"](function (result) {
    expect(result.error).toBe("invalid-request");
    expect(result.errorMessage).toBe("Username already taken.");
    expect(result.authorId).toBe(undefined);
    expect(result.email).toBe(undefined);
    expect(result.uname).toBe(undefined);
    expect(result.id).toBe(undefined);
    expect(result.lastUpdatedTimestamp).toBe(undefined);
    expect(result.session).toBe(undefined);
    expect(result.timestamp).toBe(undefined);
    done();
  });
});
test('returns error if email is taken', function (done) {
  var req = {
    body: {
      uname: 'user2',
      email: 'test-user1@georgegillams.co.uk'
    }
  };
  (0, _signUp["default"])(req).then(function (result) {})["catch"](function (result) {
    expect(result.error).toBe("invalid-request");
    expect(result.errorMessage).toBe("Email already taken.");
    expect(result.authorId).toBe(undefined);
    expect(result.email).toBe(undefined);
    expect(result.uname).toBe(undefined);
    expect(result.id).toBe(undefined);
    expect(result.lastUpdatedTimestamp).toBe(undefined);
    expect(result.session).toBe(undefined);
    expect(result.timestamp).toBe(undefined);
    done();
  });
});
//# sourceMappingURL=signUp.test.js.map