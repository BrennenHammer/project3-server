var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose')
var cors = require('cors')

var userRouter = require('./routes/users');
var authRouter = require("./routes/auth")
var addpostsRouter = require('./routes/addposts')
var subscribersRoute = require('./routes/subscribers')
var feedRouter = require('./routes/feed')
var photoRouter = require('./routes/photo')
var profileRouter = require('./routes/profile');
var userprofileRouter = require('./routes/userprofile')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(
    cors({
      origin: [process.env.REACT_APP_URI]  // <== URL of our future React app
    })
  );

// app.use(
//     cors()
//   );

app.use('/users', userRouter);
app.use('/addposts', addpostsRouter);
app.use('/auth', authRouter);
app.use('/subscribers', subscribersRoute);
app.use('/feed', feedRouter);
app.use('/photo', photoRouter);
app.use('/profile', profileRouter);
app.use('/userprofile', userprofileRouter)

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = app;
