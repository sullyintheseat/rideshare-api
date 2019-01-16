require('dotenv').config();
const cfg = require('config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const fs = require('fs');
const app = express();
const useragent = require('express-useragent');
const cookieParser = require('cookie-parser');


// establish db connection and pass to other classes to share
const dbPath = process.env.MONGODB_URI;
const db = mongoose.connection;

mongoose.connect(dbPath, { useNewUrlParser: true } );

db.on('error', console.error);
db.once('connected', function() { console.log(`${dbPath}`);});

db.once('open', function() {
	fs.readdirSync('./controllers').forEach(function(file) {
        if (file.substr(-3) === '.js' && file.substr(-7) !== 'spec.js') {
          require('./controllers/' + file).controller(app);
        }
    });
});

var xPolicy			    = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Credentials" ,"true");
	//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, X-CSRF-TOKEN");
  	next();
};
app.use(xPolicy);

app.use(useragent.express());

app.set('port', process.env.PORT || aport);

app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.text({ type: 'text/html' }))

app.use(cookieParser());

app.all('*', function(req, res, next){ req.syspath = __dirname; next();});
app.all('*', function(req, res, next){ req.db	= db; next();});
//app.all('*', function(req, res, next){ req.email 	= mail;	next();});

app.use((req, res, next) => {
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
        return res.sendStatus(204);
    }; 
    return next();
});

const PORT = process.env.PORT || aport;
let server;
startServer = () => {
  server = app.listen(PORT);
  server.on('listening', () => {
    console.log('Server running on port:', PORT);
  });
}
if (process.env.MONGODB_URI) {
  const dbOptions = { keepAlive: 300000, connectTimeoutMS: 30000, useNewUrlParser: true };
    mongoose.set('useCreateIndex', true)
  mongoose.connect(process.env.MONGODB_URI, dbOptions);
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('db connected');
    startServer();
  });
} else {
  console.log('No DB connection configured');
  startServer();
}