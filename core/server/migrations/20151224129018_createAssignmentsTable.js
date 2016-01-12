// Creates assignments and questions table

export function up(knex, Promise) {
  return knex.schema.createTable('assignments', (table) => {
    table.increments('id').primary();

    table.string('name');
    table.timestamp('assignedAt');
    table.timestamp('dueAt');

    table.specificType('questions', 'varchar[]');
  });
}

export function down(knex, Promise) {
  return knex.schema.dropTable('assignments');
}
