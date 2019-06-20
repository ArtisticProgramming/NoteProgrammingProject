var mongoose = require('mongoose');

var TestModelSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Compile model from schema
mongoose.model('TestModel', TestModelSchema );