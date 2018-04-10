const express = require('express');
const bp = require('body-parser');
const app = express();
const knex = require('./knex.knex.js');

var users = require('./routes/users.js');
var products = require('./routes/products.js');
var cart = require('./routes/cart.js');

app.use(bp.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});
app.use('/users', users);
app.use('/products', products);
app.use('/cart', cart);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
