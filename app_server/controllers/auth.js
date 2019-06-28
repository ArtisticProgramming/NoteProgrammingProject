var mongoose = require('mongoose');
var userClass = require('../../models/user');
var userModel = mongoose.model('UserModel', userClass.UserModelSchema, 'userModel');


module.exports.Rdirect = async function (req, res) {
    console.log(req.user)
    req.session.token = req.user.token;
    req.session.profileId = req.user.profile.id;
    console.log("__________________________________________________________")
    console.log(req.user.profile.photos)
    console.log("__________________________________________________________")

    const result = await userModel.findOne({ id: req.user.profile.id }).select("_id").lean();
    console.log("Result === " + result)
    if (result == null) {

        var user = new userModel({
            id: req.user.profile.id,
            name: req.user.profile.name.givenName,
            familyName: req.user.profile.name.familyName,
            photos: req.user.profile._json.picture,
            provider: req.user.profile.provider
        });

        // save model to database
        user.save(function (err, user) {

            if (err) return console.error(err);
            console.log(note.name + " saved to note collection.");
        });
    }
    res.redirect('/Notes');
}

module.exports.LogOut = function (req, res) {
    req.logout();
    req.session = null;
    res.redirect('/');
}


