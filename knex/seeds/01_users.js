exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, email: 'user1@gmail.com', password: 'user1' },
        { id: 2, email: 'user2@gmail.com', password: 'user2' },
        { id: 3, email: 'user3@gmail.com', password: 'user3' }
      ]);
    });
};
