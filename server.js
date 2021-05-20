//packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
require('dotenv').config(); 

//configs
const port = process.env.PORT;

//routes
const searchRouter = require('./routes/search');
const authRouter = require('./routes/auth');
const courtExpertsRouter = require('./routes/courtExperts');
const usersRouter = require('./routes/users');

//initiating express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret key',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge : 3600000 } //1 Hour
}));
app.use(passport.initialize());
app.use(passport.session());

//used routes
app.use('/search', searchRouter);
app.use('/courtExperts', courtExpertsRouter);
app.use('/users', usersRouter);
app.use('/', authRouter(passport));

//http://localhost:3000
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

//starting the server
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})