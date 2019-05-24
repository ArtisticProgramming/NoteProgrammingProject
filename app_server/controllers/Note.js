var mongoose = require('mongoose');
var noteClass = require('../../app_api/models/note');
var noteModel = mongoose.model('NoteModel', noteClass.NoteModelSchema, 'noteModel');


module.exports.AddNote = function (req, res) {

    res.render("AddNote",{title:"Add Note"});
};

module.exports.PostAddNote = function (req, res) {
    // a document instance
    console.log("--------------------------------")

    console.log(req.body)
    
    var note = new noteModel({ 
        title: req.body.title,
         body: req.body.body 
        });

    // save model to database
    note.save(function (err, note) {
        if (err) return console.error(err);
        console.log(note.name + " saved to note collection.");
    });


    res.render("AddNote",{title:"Add Note"});
};
// -----------------------------------------------------------------------------
module.exports.Notes = function (req, res) {

    res.render("Notes",{title:"Notes"});
};


