var mongoose = require('mongoose');
var noteClass = require('../../models/note');
var noteModel = mongoose.model('NoteModel', noteClass.NoteModelSchema, 'noteModel');
var BasicDataClass = require('../../models/basicData');
var BasicDataModel = mongoose.model('BasicDataModel', BasicDataClass.BasicDataSchema, 'basicDataModel');

var LINQ = require('node-linq').LINQ;
var path = require('path');

module.exports.AddNote = function (req, res) {
    tokenid = req.session.token;
    res.render("AddNote", { title: "Add Note " });
};

module.exports.PostAddNote = async function (req, res) {
    let codes = req.body.model.model;
    let length = codes.length;
    if (req.body.model.projectType.id == '$*NewTag*$') {
        AddBasicData(req.body.model.projectType.text, 1, req.session.profileId);
    }
    if (req.body.model.technologyType.id == '$*NewTag*$') {
        AddBasicData(req.body.model.technologyType.text, 2, req.session.profileId);
    }
    if (req.body.model.noteType.id == '$*NewTag*$') {
        AddBasicData(req.body.model.noteType.text, 3, req.session.profileId);
    }
    var codesModel = [];
    for (i = 0; i < length; i++) {
        debugger;
        var model = {
            mainbody: codes[i].mainbody,
            porgrammingStylelanguge: codes[i].lang,
            description: codes[i].desc
        }
        codesModel.push(model);
    }
    var note = new noteModel({
        title: req.body.model.title,
        userProfileId: req.session.profileId,
        projectName: req.body.model.projectType.text,
        Type: req.body.model.noteType.text,
        Technology: req.body.model.technologyType.text,
        bookMark: req.body.model.bookMark,
        code: codesModel
    });
    note.save(function (err, note) {
        if (err) return console.error(err);
        console.log(note)
        console.log(note.name + " saved to note collection.");
        res.send({ result: "success" })
    });
};

// -----------------------------------------------------------------------------
module.exports.Notes = async function (req, res) {
    console.log("profileId => ")
    console.log(req.session.profileId)
    res.render("Notes");
};


module.exports.GetNotes = async function (req, res) {
    let page = req.query.page //req.param('page');
    let perPage = parseInt(req.query.perPage);

    var count = await noteModel.count()
    page = Math.max(0, page - 1)

    var query = {
        userProfileId: req.session.profileId
    }

    title = ""
    if (req.param('title') !== undefined) {

        title = req.param('title');
    console.log(title)

        query.title = { $regex: '.*' + title + '.*', $options: 'i' }
    console.log(query)
         
    }

    bookMark = undefined
    if (req.param('bookMark') !== undefined) {
        bookMark = req.param('bookMark');
        query.bookMark = true;
    }

    bookMark
    // $options:'i' ==> it is for  Case-insensitive 
    console.log("--------------query-------------------")
    console.log(query)
    noteModel.find(query)
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
    console.log(id);

    noteModel.findOneAndDelete({ _id: id })
        .then((doc) => {
            console.log("success");

            res.send({ message: "success" });
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

    res.render("details", { title: "Note", model: mainModel });
};


module.exports.NoteList = function (req, res) {


    var files = ['test.txt', 'choni.txt', 'legacy.zip', 'secrets.txt', 'etc.rar'];
    var arr = new LINQ(files)
        .Where(function (file) { return file === 'secrets.txt'; })
        .OrderBy(function (file) { return file; })
        .ToArray();
    console.log("Aftre Filter")
    console.log(arr)


    let page = req.query.page //req.param('page');
    let perPage = parseInt(req.query.perPage);

    // var count = await noteModel.count()
    // page = Math.max(0, page - 1)

    // title = ""
    // if (req.param('title') !== undefined) {
    //     title = req.param('title');
    // }
    // // $options:'i' ==> it is for  Case-insensitive 
    // noteModel.find({title: { $regex: '.*' + title + '.*' ,$options:'i'} })
    //     .skip(perPage * page).limit(perPage)
    //     .then((doc) => {
    //         res.send({ model: doc, count: count, perPage: perPage, currentPage: page });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    res.render("noteList", { title: "Note", model: {} });
}


AddBasicData = function (text, type, profileId) {
    var basicData = new BasicDataModel({
        title: text,
        userProfileId: profileId,
        type: type
    });

    basicData.save(function (err, data) {
        if (err) return console.error(err);
        console.log("BasicData saved to note collection.");
    });
}