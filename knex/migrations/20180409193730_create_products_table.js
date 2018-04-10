exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', table => {
    table.increments();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.integer('inventory').notNullable();
    table.decimal('price', 8, 2).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
