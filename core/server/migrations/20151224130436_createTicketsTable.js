// Creates tickets table

export function up(knex, Promise) {
  return knex.schema.createTable('tickets', (table) => {
    table.increments('id').primary();

    table.timestamp('openedAt').defaultTo(knex.fn.now());
    table.timestamp('claimedAt');
    table.timestamp('closedAt');

    table.enum('status', ['open', 'claimed', 'closed', 'cancelled', 'expired'])
      .defaultTo('open').index();

    table.string('location');
    table.string('question');
    table.text('description');
    table.integer('rating');

    table.integer('assignmentId').references('assignments.id');
    table.integer('studentId').references('users.id');
    table.integer('assistantId').references('users.id');
  });
}

export function down(knex, Promise) {
  return knex.schema.dropTable('tickets');
}
