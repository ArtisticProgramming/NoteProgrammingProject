var mongoose = require('mongoose');
var noteClass = require('../../app_api/models/note');
var noteModel = mongoose.model('NoteModel', noteClass.NoteModelSchema, 'noteModel');


module.exports.AddNote = function (req, res) {
    tokenid = req.session.token;
    res.render("AddNote", { title: "Add Note " });
};

module.exports.PostAddNote = function (req, res) {
    // a document instance
    console.log("--------------------------------")

    console.log(req.body)
    console.log("Tags:")
    console.log(req.body.tags)
    let codes = req.body.code;
    let length = codes.length;

    var codesModel = [];
    for (i = 0; i < length; i++) {
        debugger;
        var model = {
            mainbody: codes[i].body,
            porgrammingStylelanguge: codes[i].codelang,
            description: codes[i].desc
        }
        codesModel.push(model);
    }
    var note = new noteModel({
        title: req.body.title,
        tags: req.body.tags,
        code: codesModel
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

    // noteModel.find().skip(perPage * page).limit(perPage)
    //     .then((doc) => {
    //         res.render("Notes", { title: "Notes", model: doc, count: count, perPage: perPage, currentPage: page + 1 });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    res.render("Notes");
};
module.exports.GetNotes = async function (req, res) {
    let page = req.query.page //req.param('page');
    let perPage = parseInt(req.query.perPage); 

    var count = await noteModel.count()
    page = Math.max(0, page - 1)

    title = ""
    if (req.param('title') !== undefined) {
        title = req.param('title');
    }

    noteModel.find({title: { $regex: '.*' + title + '.*' } })
        .skip(perPage * page).limit(perPage)
        .then((doc) => {
            res.send({ model: doc, count: count, perPage: perPage, currentPage: page });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.DeleteNote = async function (req, res) {
    let id = req.query.id //req.param('page');
    console.log(id );

    noteModel.findOneAndDelete({_id:id}) 
    .then((doc) => {
        console.log("success" );

        res.send({ message:"success" });
    })
    .catch((err) => {
        console.log(err);
    });
}
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

    res.render("Note", { title: "Note", model: mainModel });
};


module.exports.LoadMore = function (req, res) {

    noteModel.find()
        .then((doc) => {
            res.send(doc);
        })
        .catch((err) => {
            console.log(err);
        });

        
    req.send("");
}