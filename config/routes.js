const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { authenticate } = require('../auth/authenticate');

const Users = require('../users/users-model.js');

const jwtKey =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable';

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(user)
      console.log(saved)
      res.status(201).json({
        saved,
        token
      })
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function login(req, res) {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user)
        res.status(200).json({
          message: `Welcome ${user.username}, this is your id:${user.id} & check your pocket for a token, you're rich!`,
          subject: `${user.id}`,
          token
         
        });
      } else {
        res.status(401).json({ message: 'you shall not pass' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '12h'
  };

  return jwt.sign(payload, jwtKey, options)
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
