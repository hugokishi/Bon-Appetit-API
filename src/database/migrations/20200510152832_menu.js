
exports.up = function(knex) {
    return knex.schema.createTable('menu', function(table){
        table.increments();
        table.string('menuname').notNullable();
        table.string('price').notNullable();
        table.string('comments').notNullable();
        table.string('restaurant_id').notNullable();
        table.foreign('restaurant_id').references('id').inTable('restaurant');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('menu');
};
