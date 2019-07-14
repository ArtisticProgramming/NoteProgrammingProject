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
    if (req.body.model.specificSubject.id == '$*NewTag*$') {
        AddBasicData(req.body.model.specificSubject.text, 3, req.session.profileId);
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
        SpecificSubject: req.body.model.specificSubject.text,
        bookMark: req.body.model.bookMark,
        created: Date.now(),
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

// ---------------------------------------------------GetNotes-------------------------------------------

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

    bookMark = ""
    if (req.param('bookMark') !== undefined) {
        bookMark = req.param('bookMark');
        query.bookMark = true;
    }

    noteType = ""
    if (req.param('noteType') !== undefined) {
        noteType = req.param('noteType');
        query.Type = noteType;
    }

    projectName = ""
    if (req.param('projectName') !== undefined) {
        projectName = req.param('projectName');
        query.projectName = projectName;
    }

    technology = ""
    if (req.param('technology') !== undefined) {
        technology = req.param('technology');
        query.Technology = technology;
    }

    specificSubject = ""
    if (req.param('specificSubject') !== undefined) {
        specificSubject = req.param('specificSubject');
        query.SpecificSubject = specificSubject;
    }

    // $options:'i' ==> it is for  Case-insensitive 
    console.log("--------------query-------------------")
    console.log(query)
    noteModel.find(query).sort({ created: -1 })
        .skip(perPage * page).limit(perPage)
        .then((doc) => {
            res.send({ model: doc, count: count, perPage: perPage, currentPage: page });
        })
        .catch((err) => {
            console.log(err);
        });
};
// ----------------------------------------------------------------------------------------------

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
// ----------------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------------

module.exports.NoteList = function (req, res) {
    res.render("noteList", { title: "Note List", model: {} });
}

module.exports.GetNoteTree = async function (req, res) {
    var notes = [];
    notes = await noteModel.find().sort({ created: -1 }).select({_id:1, title: 1, Technology: 1 })

    let modelDto = []
    var parent = new LINQ(notes).OrderBy(function (note) { return note.Technology; }).Select(function (note) { return note.Technology; }).ToArray();
    var parentUniq = parent.filter((v, i, a) => a.indexOf(v) === i);
    parentUniq = parentUniq.filter(function (element) { return element !== undefined && element !== ''; });
    console.log(parentUniq);

    parentUniq.forEach(function (item, index) {
        var model = {  state: { expanded: true }  ,data: { icon: 'parent' }, text: item, children: [] }

        var chArray = new LINQ(notes)
            .Where(function (note) { return note.Technology == item; })
            .OrderBy(function (note) { return note.title; })
            .ToArray();
     
        chArray.forEach(element => {
            let chm={};
            chm.text = element.title;
            chm.id = element._id;
            chm.data= { icon: 'children' }
            model.children.push(chm);
        });
        console.log(model.children);

        modelDto.push(model)
    });
    res.send(modelDto);
}

// ----------------------------------------------------------------------------------------------
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