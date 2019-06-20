var mongoose = require('mongoose');
var testClass = require('../../models/test');
var TestModel = mongoose.model('TestModel', testClass.TestModelSchema, 'testModel');


module.exports.about = function (req, res) {
    res.render('generic-text', {
        title: 'About Loc8r',
        content: 'Loc8r was created to help people find places to sit down and get a bit of work done.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. Nullam sit amet interdum magna. Morbi quis faucibus nisi. Vestibulum mollis purus quis eros adipiscing tristique. Proin posuere semper tellus, id placerat augue dapibus ornare. Aenean leo metus, tempus in nisl eget, accumsan interdum dui. Pellentesque sollicitudin volutpat ullamcorper.\n\nSuspendisse tincidunt, lectus non suscipit pharetra, purus ipsum vehicula sapien, a volutpat mauris ligula vel dui. Proin varius interdum elit, eu porttitor quam consequat et. Quisque vitae felis sed ante fringilla fermentum in vitae sem. Quisque fermentum metus at neque sagittis imperdiet. Phasellus non laoreet massa, eu laoreet nibh. Pellentesque vel magna vulputate, porta augue vel, dapibus nisl. Phasellus aliquet nibh nec nunc posuere fringilla. Quisque sit amet dignissim erat. Nulla facilisi. Donec in sollicitudin ante. Cras rhoncus accumsan rutrum. Sed aliquet ligula dui, eget laoreet turpis tempor vitae.'
    });
};

module.exports.test = function (req, res) {
    // var test = mongoose.model('TestModel', testClass.TestModelSchema, 'testModel');
    TestModel.find({}, function (err, users) {
         console.log(users)
        res.render('test', {users: users} );
    });
   /// res.render("test", { model: "Hello" })
}

module.exports.doTest = function (req, res) {
    // console.log(req);


    // compile schema to model
    // var test = mongoose.model('TestModel', testClass.TestModelSchema, 'testModel');

    // a document instance
    var test = new TestModel({ email: req.body.email, password: req.body.password });

    // save model to database
    test.save(function (err, book) {
        if (err) return console.error(err);
        console.log(book.name + " saved to bookstore collection.");
    });

    res.render("test", { model: "Success" })
}

