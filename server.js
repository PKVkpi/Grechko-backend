//packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
require('dotenv').config(); 

//configs
const port = process.env.PORT;

//routes
const positionsRouter = require('./routes/positions');
const authRouter = require('./routes/auth');
const courtExpertsRouter = require('./routes/courtExperts');
const usersRouter = require('./routes/users');

//initiating express
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(session({
  secret: 'secret key',
  saveUninitialized: true,
  resave: false
  // cookie: {secure: false}
  // cookie: { maxAge : 3600000 } //1 Hour
}));
app.use(passport.initialize());
app.use(passport.session());

//used routes
app.use('/positions', positionsRouter);
app.use('/courtExperts', courtExpertsRouter);
app.use('/users', usersRouter);
app.use('/', authRouter);

//http://localhost:3000
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

//starting the server
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})