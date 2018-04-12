var express = require('express');
var router = express.Router();
const knex = require('../knex/knex.js');
const JSON = require('circular-json');

router.get('/:id', (req, res) => {
  let userId = parseInt(req.params.id);
  knex
    .select()
    .from('users')
    .where('id', userId)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/login', (req, res) => {
  let userEmail = req.body.email;
  let userPw = req.body.password;
  knex
    .select()
    .from('users')
    .where('email', userEmail)
    .andWhere('password', userPw)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Incorrect password' });
      res.status(500).json({ message: 'Incorrect password' });
    });
});

router.post('/register', (req, res) => {
  let propEmail = req.body.email;
  let propPw = req.body.password;
  knex('users')
    .insert([{ email: propEmail, password: propPw }])
    .then(() => {
      let grabUsers = knex
        .select()
        .from('users')
        .where('email', propEmail);
      return grabUsers;
    })
    .then(grabUsers => {
      console.log(grabUsers);
      res.status(200).json(grabUsers);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: 'User Already Exists' });
    });
});

module.exports = router;
