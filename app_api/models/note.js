var mongoose = require('mongoose');

var NoteModelSchema = new mongoose.Schema({
  title: String,
  body: [String],
  tags: [String]
});

// Compile model from schema
mongoose.model('NoteModel', NoteModelSchema );