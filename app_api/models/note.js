var mongoose = require('mongoose');

var CodeNoteModelSchema = new mongoose.Schema({
  description: String,
  porgrammingStylelanguge: String,
  mainbody: String

});
var NoteModelSchema = new mongoose.Schema({
  title: String,
  code: [CodeNoteModelSchema],
  tags: [String]
});


// Compile model from schema
mongoose.model('NoteModel', NoteModelSchema );