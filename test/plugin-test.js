/**
 * @file test/plugins-test.js
 * @author graeme@converse.ai
 *
 * Generated by the converse-cli tool for use with the Converse AI
 * Plugins SDK. https://developers.converse.ai/
 *
 * IMPORTANT: THIS FILE IS AUTO GENERATED, CHANGES MAY BE OVERRIDDEN!
 */

const request     = require('supertest');
const expect      = require('chai').expect;
const server      = require('./lib/express');

after(function (done) {
  server.close(done);
});

describe('Hello World', function () {

  it('Responds to /', function(done) {
    request(server)
      .get('/')
      .set('X_CONVERSE_APP_TOKEN', require('../app-token'))
      .expect(200, done);
  })

  it('404 everything else', function(done) {
    request(server)
      .get('/foo/bar')
      .set('X_CONVERSE_APP_TOKEN', require('../app-token'))
      .expect(404, done);
  });

  it('Error for no body', function(done) {
    request(server)
      .post('/')
      .set('X_CONVERSE_APP_TOKEN', require('../app-token'))
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('status').to.equal(1);
        done();
      });
  });

  it('Error for no event on body', function(done) {
    request(server)
      .post('/')
      .send({})
      .set('X_CONVERSE_APP_TOKEN', require('../app-token'))
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('status').to.equal(1);
        done();
      });
  });

  it('Success for `PING` event', function(done) {
    request(server)
      .post('/')
      .send({event: 'PING'})
      .set('X_CONVERSE_APP_TOKEN', require('../app-token'))
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('status').to.equal(0);
        done();
      });
  });
});
