var express = require('express');
var passport = require('passport');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');
var ctrlNote = require('../controllers/Note');
var ctrlBasicData= require('../controllers/BasicData');
var ctrlAuth = require('../controllers/auth');


function IsAuthenticated(req, res, next) {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.cookie('profileId', req.session.profileId );
        
        next();
    } else {
        res.cookie('token', '')
        res.cookie('profileId', '');

        next(res.redirect('/'))
    }
}
/* Locations pages */
 router.get('/', ctrlLocations.homelist);
// router.get('/location/:locationid', ctrlLocations.locationInfo);
// router.get('/location/:locationid/review/new', ctrlLocations.addReview);
// router.post('/location/:locationid/review/new', ctrlLocations.doAddReview);

/* Other pages */
router.get('/about', ctrlOthers.about);
router.get('/test', ctrlOthers.test);
router.post('/test', ctrlOthers.doTest);

//Google Auth
router.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));
router.get('/logout', ctrlAuth.LogOut);
router.get('/auth/google/redirect', passport.authenticate('google', {
    failureRedirect: '/'
}), ctrlAuth.Rdirect);


//Note Pages
router.get('/AddNote', IsAuthenticated, ctrlNote.AddNote);
router.post('/PostAddNote', IsAuthenticated, ctrlNote.PostAddNote);
router.get('/Notes', IsAuthenticated, ctrlNote.Notes);
router.get('/Note', IsAuthenticated, ctrlNote.Note);
router.get('/GetNotes', IsAuthenticated, ctrlNote.GetNotes);
router.get('/DeleteNote', IsAuthenticated, ctrlNote.DeleteNote);
router.get('/NoteList', IsAuthenticated, ctrlNote.NoteList);

//Basic Data
router.get('/GetProjectTypes', IsAuthenticated, ctrlBasicData.GetProjectTypes);
router.get('/GetTechnologies', IsAuthenticated, ctrlBasicData.GetTechnologies);
router.get('/GetSpecificSubject', IsAuthenticated, ctrlBasicData.GetSpecificSubject);
router.get('/GetNoteTypes', IsAuthenticated, ctrlBasicData.GetNoteTypes);

// router.post('/AddProjectType', IsAuthenticated, ctrlBasicData.AddProjectType);
// router.post('/AddTechnology', IsAuthenticated, ctrlBasicData.AddTechnology);
// router.post('/AddNoteType', IsAuthenticated, ctrlBasicData.AddNoteType);


router.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.cookie('profileId', req.session.profileId );
        res.render("locations-list", { title: "Note", model: req.session.token });
        

    } else {
        res.cookie('token', '')
        res.cookie('profileId', '');
       res.render("locations-list", { title: "Note", model: req.session.token });
    }
});



module.exports = router;
