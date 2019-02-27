const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const ejs = require('ejs');

//Mongo DB connection 
const { mongoURI, SECRET } = require('./config/keys');

//During production port is provided by enviroment variable
const PORT = process.env.PORT || 5000;

//passport config
require('./config/passport')(passport);

//Express inicialization 
const app = express();

//Set View Engile, default folder "views"
app.set('view engine', 'ejs');
//change delimiter
ejs.delimiter = '?'; 

//Setting public folder 
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Session Middleware
app.use(session({
  secret: SECRET,
  resave: true,
  saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//importing routes 
const root = require('./routes/root');
//Defining routes
app.use('/', root);


mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  })
  .catch(err => console.error(err));

