//packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config(); 

//configs
const port = process.env.PORT;

//routes
const searchRouter = require('./routes/search');
const authRouter = require('./routes/auth');
const courtExpertsRouter = require('./routes/courtExperts');

//initiating express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//used routes
app.use('/', authRouter);
app.use('/search', searchRouter);
app.use('/courtExperts', courtExpertsRouter);

//http://localhost:3000
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

//starting the server
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})