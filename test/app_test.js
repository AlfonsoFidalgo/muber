const assert = require('assert');
const request = require('supertest');
const app = require('../app')

describe('The express app', () => {
  it('handles a GET req to /api', (done) => {
    request(app)
      .get('/api') //GET req to api
      .end((err, response) => {
        assert(response.body.hi === 'there');
        done();
      });
  });
});
