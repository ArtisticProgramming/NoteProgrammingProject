var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');
var ctrlNote = require('../controllers/Note');

/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/:locationid/review/new', ctrlLocations.addReview);
router.post('/location/:locationid/review/new', ctrlLocations.doAddReview);

/* Other pages */
router.get('/about', ctrlOthers.about);
router.get('/test', ctrlOthers.test);
router.post('/test', ctrlOthers.doTest);

//Note Pages
router.get('/AddNote',ctrlNote.AddNote);
router.post('/PostAddNote',ctrlNote.PostAddNote);
router.get('/Notes',ctrlNote.Notes);

module.exports = router;
