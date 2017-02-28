const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//geojson
const PointSchema = new Schema ({
  type: { type: String, default: 'Point'},
  coordinates: { type: [Number], index: '2dsphere'} //array of numbers
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: PointSchema
});

const Driver = mongoose.model('driver', DriverSchema);
module.exports = Driver;
