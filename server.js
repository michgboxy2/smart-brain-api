const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
var compression = require('compression');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

console.log(process.env.POSTGRES_URI);
const db = knex({
  client: 'pg',

  // connection: process.env.POSTGRES_URI
  connection: {
    host : '192.168.1.102',
    user : 'sally',
    password : 'secret',
    database : 'smart-brain-docker'
  }
});

const app = express();

app.use(compression());

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req, res)=> { res.send('ITS WORKING finally finally') })
app.post('/test', (req, res) => {console.log(req.body);})
app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id',(req, res) => auth.requireAuth(req,res), (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/profile/:id',(req, res) => auth.requireAuth(req,res), (req, res) => {profile.handleProfileUpdate(req, res, db)})
app.put('/image', (req, res) => auth.requireAuth(req,res), (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl',(req, res) => auth.requireAuth(req,res), (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
