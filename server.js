const express = require('express');
const session = require('express-session');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const pkg = require('./package');
const config = require('./server/db/config');
const index = require('./server/router/index');
const user = require('./server/router/user');

console.log(config.url)
const db = mongoose.connect(config.url);


db.connection.on('error', function(error) {
  console.log('数据库连接失败：'+ error);
});

db.connection.on('open', function(error) {
  console.log('--------数据库连接成功----------');
});

mongoose.Promise = global.Promise;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(favicon(__dirname + '/src/assets/favicon.ico'));

app.use(express.static('dist'));

app.use(session({
  secret: 'usersession',
  key: 'usersession',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000,
  },
}));

app.use('/', index);
app.use('/api', user);


app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`);
});
