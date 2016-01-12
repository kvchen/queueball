// Creates users table

export function up(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('googleId').index();

    table.string('name');
    table.enum('role', ['student', 'assistant', 'instructor', 'admin'])
      .defaultTo('student');
  });
}

export function down(knex, Promise) {
  return knex.schema.dropTable('users');
}
