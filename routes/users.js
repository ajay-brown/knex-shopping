var express = require('express');
var router = express.Router();
const knex = require('../knex/knex.js');
const JSON = require('circular-json');

// const IdList = knex
//   .select('id')
//   .from('users')
//   .then(data => {
//     return data;
//   })
//   .then(data => {
//     console.log(data);
//     console.log(2);
//     return JSON.stringify(data);
//   });

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

  knex //checking for repeating
    .select('email')
    .from('users')
    .where('email', propEmail)
    .then(
      data => {
        if (data) {
          //functional
          console.log('user exists');
          res.status(400).json({ message: 'User Already Exists' });
        } else {
          console.log('creatingnewuser');
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
              res.status(400).json({ message: 'Error' });
            });
        }
      }
      //    }
    );
});

router.put('/:id/forgot-password', (req, res) => {
  let userId = req.params.id;
  let reqPw = req.body.password;
  console.log(reqPw);
  knex
    .select()
    .from('users')
    .where('id', userId)
    .update('password', reqPw)
    .then(() => {
      let grabUsers = knex
        .select()
        .from('users')
        .where('id', userId);
      return grabUsers;
    })
    .then(grabUsers => {
      console.log(grabUsers);
      res.status(200).json({ message: 'New Password Created!' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: 'Error, user does not exist' });
    });
});

router.delete('/:id', (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  knex
    .select()
    .from('users')
    .where('id', userId)
    .delete()
    .then(() => {
      let grabUsers = knex.select().from('users');
      return grabUsers;
    })
    .then(grabUsers => {
      console.log(grabUsers);
      res.status(200).json({ message: `user id: ${userId} deleted` });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: 'User Id not found' });
    });
});

module.exports = router;
