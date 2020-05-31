
exports.up = function(knex) {
    return knex.schema.createTable('restaurant', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').unique();
        table.string('password').notNullable();
        table.decimal('telephone').notNullable();
        table.string('street').notNullable();
        table.string('number').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('cnpj').notNullable();
        table.string('category').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('restaurant');
};
