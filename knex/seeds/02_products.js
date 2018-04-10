exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('products').insert([
        {
          id: 1,
          title: 'Coffee Beans',
          description: 'Whole coffee beans',
          inventory: 5,
          price: 5.2
        },
        {
          id: 2,
          title: 'Ground Coffee',
          description: 'Ground coffee beans',
          inventory: 10,
          price: 11.2
        },
        {
          id: 3,
          title: 'Instant Coffee',
          description: 'Just add water',
          inventory: 100,
          price: 2.2
        }
      ]);
    });
};
