var Index = require('../app/controllers/index'); 
var Movie = require('../app/controllers/movie'); 
var User = require('../app/controllers/user'); 
var Comment = require('../app/controllers/comment'); 
var Catetory = require('../app/controllers/catetory');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function(app) {
    //pre handle user
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    })

    //index page
    app.get('/', Index.index);


    //signup
    app.post('/user/signup', User.signup);
    //signin
    app.post('/user/signin', User.signin);
    //logout
    app.get('/logout', User.logout);
    //signin
    app.get('/signin', User.showSignin);
    //signup
    app.get('/signup', User.showSignup);
    //userlist
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);
    app.delete('/admin/user/list', User.signinRequired, User.adminRequired, User.del);
    app.get('/admin/user/update/:id', User.signinRequired, User.adminRequired, User.update);
    app.post('/user/modify', User.signinRequired, User.adminRequired, User.modify);


    //movie detail
    app.get('/movie/:id', Movie.detail);
    //admin new page
    app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
    //admin update page
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
    //admin post movie
    app.post('/admin/movie', multipartMiddleware, User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save);
    //list movie
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);
    //delete movie
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del);


    //comment
    app.post('/user/comment', User.signinRequired, Comment.save);
    
    //catetory
    app.get('/admin/catetory/new', User.signinRequired, User.adminRequired, Catetory.new);
    app.post('/admin/catetory', User.signinRequired, User.adminRequired, Catetory.save);
    app.get('/admin/catetory/list', User.signinRequired, User.adminRequired, Catetory.list);
    
    //results
    app.get('/results', Index.search);
}

