// Creates metrics table for times-series data

export function up(knex, Promise) {
  return knex.schema.createTable('metrics', (table) => {
    table.increments('id').primary();

    table.timestamp('timestamp');

    // Snapshot stats

    table.integer('students');
    table.integer('assistants');
    table.integer('instructors');

    table.integer('open');
    table.integer('claimed');
    table.integer('closed');
    table.integer('cancelled');
    table.integer('expired');

    // Windowed stats

    table.specificType('minWait', 'interval');
    table.specificType('maxWait', 'interval');
    table.specificType('averageWait', 'interval');
  });
}

export function down(knex, Promise) {
  return knex.schema.dropTable('metrics');
}
