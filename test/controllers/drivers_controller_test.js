const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
//express mocha and mongoose dont work perfectly
//so instead of requiring Driver, we do it this way:
const Driver = mongoose.model('driver');


describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', (done) => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com'})
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/drivers/id edits an existing driver', (done) =>{
    const driver = new Driver({email: 'testput@t.com', driving: false});

    driver.save().then(() => {
      request(app)
      .put(`/api/drivers/${driver._id}`)
      .send({ driving: true })
      .end(() => {
        Driver.findOne({ email: 'testput@t.com'})
          .then(driver => {
            assert(driver.driving === true);
            done();
          });
      });
    });
  });

  it('DELETE to /api/drivers/id deletes an existing driver', (done) => {
    const driver = new Driver ({email: 'testdelete@t.com', driving: false});

    driver.save().then(() => {
      request(app)
      .delete(`/api/drivers/${driver._id}`)
      .end(() => {
        Driver.findOne({ email: 'testdelete@t.com'})
          .then((driver) => {
            assert(driver === null);
            done();
          });
      });
    });
  });

  it('GET to /api/drivers finds drivers in location', done => {
    const seattleDriver = new Driver({
      email: 'seattle@t.com',
      geometry: {type: 'Point', coordinates:[-122.4759902, 47.6147628]}
    });
    const miamiDriver = new Driver({
      email: 'miami@t.com',
      geometry: {type: 'Point', coordinates: [-80.253, 25.791]}
    });

    Promise.all([ seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
            assert(response.body.length === 1);
            assert(response.body[0].obj.email === 'miami@t.com');
            done();
          });
      });
  });

});
