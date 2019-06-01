var mongoose = require('mongoose');
var noteClass = require('../../app_api/models/note');
var noteModel = mongoose.model('NoteModel', noteClass.NoteModelSchema, 'noteModel');


module.exports.AddNote = function (req, res) {
    tokenid=req.session.token;
    res.render("AddNote", { title: "Add Note " });
};

module.exports.PostAddNote = function (req, res) {
    // a document instance
    console.log("--------------------------------")

    console.log(req.body)
    console.log("Tags:")
    console.log(req.body.tags)

    var note = new noteModel({
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags
    });

    // save model to database
    note.save(function (err, note) {
        if (err) return console.error(err);
        console.log(note.name + " saved to note collection.");
    });


    res.render("AddNote", { title: "Add Note" });
};
// -----------------------------------------------------------------------------
module.exports.Notes = async function (req, res) {
    var page =1;
    if(req.param('page')!==undefined)
    {
         page=req.param('page');
    }
    var count = await noteModel.count()
    var perPage = 4   , page = Math.max(0,page-1)
     
    noteModel.find().skip(perPage * page) .limit(perPage)
        .then((doc) => {
            res.render("Notes", { title: "Notes", model: doc , count:count , perPage :perPage, currentPage:page+1 });
        })
        .catch((err) => {
            console.log(err);
        });

    // res.render("Notes",{title:"Notes"});
};

 module.exports.Note = async function (req, res) {
    var id = req.query.id;
    // console.log(id)

    var ObjectId = require('mongoose').Types.ObjectId;
    ////First way with promiss and then
    // var mo = noteModel.findById({ _id: new ObjectId(id) })
    // mo.then((doc) => {
    //     //mainModel = doc;
    //     //res.render("Note", { title: "Note", model: mainModel });
    //     console.log("inside Promis 1")
    // })
    // .catch((err) => {
    //     console.log(err);
    // });
    ////Seconde way with promiss and await
    var mainModel = await noteModel.findById({ _id: new ObjectId(id) })
    console.log(mainModel)
    console.log("outside Promisss")
    res.render("Note", { title: "Note", model: mainModel });
};


module.exports.LoadMore = function (req, res) {

    noteModel.find()
        .then((doc) => {
            res.send( doc );
        })
        .catch((err) => {
            console.log(err);
        });

    req.send("");
}