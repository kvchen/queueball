import bookshelf from 'server/lib/db';
import Ticket from 'server/models/ticket';


const User = bookshelf.Model.extend({
  tableName: 'users',

  opened() {
    return this.hasMany('Ticket', 'studentId');
  },
  claimed() {
    return this.hasMany('Ticket', 'assistantId');
  },

  toJSON() {
    return this.omit(this.serialize(), 'googleId');
  },
  async activeTickets() {
    const id = this.get('id');

    const tickets = await Ticket
      .query(function getActiveTickets(qb) {
        return qb.where('studentId', id)
          .orWhere('assistantId', id)
          .whereIn('status', ['open', 'claimed']);
      })
      .fetchAll();

    return tickets.models;
  },
});

module.exports = bookshelf.model('User', User);
