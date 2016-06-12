var express = require('express');
var port = process.env.PORT || 3000;
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser= require('body-parser');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo/es5')(session);
var serveStatic = require('serve-static');
var error_handler = require('./config/error-handler');
var redirect = require('./config/redirect');
var app = express();
var favicon = require('serve-favicon');

var dbUrl = 'mongodb://localhost/imooc';
mongoose.connect(dbUrl);

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(bodyParser());
//app.use(multipart());
//app.use(cookieParser());
app.use(session({
    secret: 'imooc',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.locals.moment = require('moment');

app.use(redirect());
app.use(error_handler());

var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
    app.set('showStackError', true);
    app.use(morgan(':method :url :status'))
    app.locals.pretty = true;
    mongoose.set('debug', true);
}
require('./config/routes')(app);



app.listen(port);

console.log('服务启动成功，正在监听 %s 端口。 ' , port);


