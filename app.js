var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./graphql');
const connectMongo = require('./mongo-connector');
const cors = require('cors')
const apolloUploadExpress = require('apollo-upload-server').apolloUploadExpress;
const multer = require('multer');
const { execute, subscribe } = require('graphql');
const http = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws')
require('dotenv').config();


var index = require('./routes/index');
var users = require('./routes/users');

const start = async () => {
    const mongo = await connectMongo();
    var app = express();
    app.use(cors());

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));


    app.use('/', index);
    app.use('/users', users);
    app.use(multer({ storage: multer.memoryStorage() }).any());
    app.use('/graphql', bodyParser.json(), apolloUploadExpress(/* Options */), graphqlExpress({ context: { mongo }, schema }));
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        // subscriptionsEndpoint: '/subscriptions'
        subscriptionsEndpoint: `ws://localhost:3000/subscriptions`
    }));
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    // app.listen(3000)
    // return app
    const ws = http.createServer(app);
    ws.listen(3000, () => {
        new SubscriptionServer({
            execute,
            subscribe,
            schema
        }, {
                server: ws,
                path: '/subscriptions',
            });
    });
}

// module.exports = start;

start();
