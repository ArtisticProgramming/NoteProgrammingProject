var mongoose = require('mongoose');

var UserModelSchema = new mongoose.Schema({
  id: Number,
  name: String,
  familyName: String,
  photos: [String],
  provider:String,
});

// Compile model from schema
mongoose.model('UserModel', UserModelSchema );