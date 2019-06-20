var mongoose = require('mongoose');

var BasicDataSchema = new mongoose.Schema({
  userProfileId: String,
  title: String,
  type:Number
});

// Compile model from schema
mongoose.model('BasicDataModel', BasicDataSchema );