let express = require('express');
let app = express();
let mongoose = require('mongoose');
let routes = require('./routes/router');
let logger = require('morgan');
require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds137581.mlab.com:37581/macrocozm_hn_db`, { useNewUrlParser: true })
    .then(() => {
        console.log('mongo db connected');
        startServer();
    }).catch((err) => {
        console.log(err);
        console.log('Error connecting to mongo db');
    });

app.use('/', routes);
app.use(logger('dev'));
var startServer = function () {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

module.exports = app;