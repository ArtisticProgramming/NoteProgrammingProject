var mongoose = require('mongoose');
// var BasicDataTypeEnum = require('../../utility/BasicDataTypeEnum');

var BasicDataClass = require('../../models/basicData');
var BasicDataModel = mongoose.model('BasicDataModel', BasicDataClass.BasicDataSchema, 'basicDataModel');

var LINQ = require('node-linq').LINQ;
var path = require('path');

// module.exports.AddProjectType = function (req, res) {
//     var body=req.body;
//     var projectType = new projectTypeModel({
//         title: body.title,
//         userProfileId: req.session.profileId,
//         type:1
//     });

//     projectType.save(function (err, projectType) {
//         if (err) return console.error(err);
//         console.log(projectType.name + " saved to note collection.");
//     });
// };


// module.exports.AddTechnology = function (req, res) {
//     var body=req.body;
//     var projectType = new projectTypeModel({
//         title: body.title,
//         userProfileId: req.session.profileId,
//         type:2
//     });

//     projectType.save(function (err, projectType) {
//         if (err) return console.error(err);
//         console.log(projectType.name + " saved to note collection.");
//     });
// };

// module.exports.AddNoteType = function (req, res) {
//     var body=req.body;
//     var projectType = new projectTypeModel({
//         title: body.title,
//         type:3
//     });

//     projectType.save(function (err, projectType) {
//         if (err) return console.error(err);
//         console.log(projectType.name + " saved to note collection.");
//     });
// };



module.exports.GetProjectTypes = function (req, res) {
    query = ""
    if (req.param('query') !== undefined) {
        query = req.param('query');
    }

    BasicDataModel.find({title: { $regex: '.*' + query + '.*' ,$options:'i'},
                           userProfileId:req.session.profileId, type:1 })
        .then((doc) => {
            var model = ConvertBasicDataToDTO(doc);
            res.send({ model: model});
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.GetTechnologies = function (req, res) {
      query = ""
    if (req.param('query') !== undefined) {
        query = req.param('query');
    }
    
    BasicDataModel.find({title: { $regex: '.*' + query + '.*' ,$options:'i'},
                           userProfileId:req.session.profileId, type:2})
        .then((doc) => {
            var model = ConvertBasicDataToDTO(doc);
            res.send({ model: model});
        })
        .catch((err) => {
            console.log(err);
        });

};
// --------------------------------------------Specific_Subject------------------------------------
module.exports.GetSpecificSubject = function (req, res) {
    query = ""
  if (req.param('query') !== undefined) {
      query = req.param('query');
  }
  
  BasicDataModel.find({title: { $regex: '.*' + query + '.*' ,$options:'i'},
                         userProfileId:req.session.profileId, type:3})
      .then((doc) => {
          var model = ConvertBasicDataToDTO(doc);
          res.send({ model: model});
      })
      .catch((err) => {
          console.log(err);
      });

};

// --------------------------------------------Note_Types------------------------------------

module.exports.GetNoteTypes= function (req, res) {
    query = ""
  if (req.param('query') !== undefined) {
      query = req.param('query');
  }
  
  BasicDataModel.find({title: { $regex: '.*' + query + '.*' ,$options:'i'},
                         type:4})
      .then((doc) => {
          var model = ConvertBasicDataToDTO(doc);
          res.send({ model: model});
      })
      .catch((err) => {
          console.log(err);
      });

};






function ConvertBasicDataToDTO(basicData){
    let dtoModel= [];
    basicData.forEach(function (model, index) {
       var dto = {
        text: model.title,
        id: model._id,
      }
      dtoModel.push(dto);
    });
    return dtoModel;
  }
