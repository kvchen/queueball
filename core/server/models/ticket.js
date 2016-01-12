import _ from 'lodash';
import Promise from 'bluebird';
const Joi = Promise.promisifyAll(require('joi'));

import Assignment from 'server/models/assignment';

import bookshelf from 'server/lib/db';
import io from 'server/lib/socketio';
import logger from 'server/lib/logger';


const creationSchema = Joi.object().keys({
  location: Joi.string().required(),
  question: Joi.string().required(),
  assignmentId: Joi.number().integer().required(),
  studentId: Joi.number().integer().required(),
});


const updateSchema = Joi.object().keys({
  openedAt: Joi.string().isoDate(),
  claimedAt: Joi.string().isoDate().allow(null),
  closedAt: Joi.string().isoDate().allow(null),

  status: Joi.string().valid(
    ['open', 'claimed', 'closed', 'cancelled', 'expired']
  ),

  location: Joi.string(),
  question: Joi.string(),
  rating: Joi.number().integer(),

  assignmentId: Joi.number().integer(),
  studentId: Joi.number().integer(),
  assistantId: Joi.number().integer().allow(null),
});


const Ticket = bookshelf.Model.extend({
  tableName: 'tickets',

  assignment() {
    return this.belongsTo('Assignment', 'assignmentId');
  },
  student() {
    return this.belongsTo('User', 'studentId');
  },
  assistant() {
    return this.belongsTo('User', 'assistantId');
  },

  async update(attributes) {
    await Joi.validateAsync(attributes, updateSchema);

    this.save(attributes, { patch: true })
      .refresh({ withRelated: ['student', 'assistant'] });

    logger.info(`Updated ticket ${ this.get('id') }`);
    io.emit('ticket_updated', this);
    return this;
  },
  async destroy() {
    const id = this.get('id');
    await this.destroy();

    logger.info(`Destroyed ticket ${ id }`);
    io.emit('ticket_destroyed', id);
  },
}, {
  async get(id) {
    await Joi.validateAsync(id, Joi.number().integer());
    return new Ticket({ id })
      .fetch({
        withRelated: ['student', 'assistant', 'assignment'],
      });
  },
  async getActive() {
    const tickets = await Ticket.query(qb => {
      return qb.whereIn('status', ['open', 'claimed'])
        .orderBy('openedAt');
    })
    .fetchAll({
      withRelated: ['student', 'assistant', 'assignment'],
    });

    return tickets;
  },
  async create(attributes) {
    const sanitized = await Joi.validateAsync(attributes, creationSchema);
    const { question, assignmentId } = sanitized;

    const assignment = await Assignment.get(assignmentId);
    if (!assignment) {
      throw new Error('No such assignment');
    }

    const questions = assignment.get('questions');
    if (!_.includes(questions, question)) {
      throw new Error(`Assignment "${ assignment.get('name') }" does not have question "${ question }}"`);
    }

    const ticket = await new this(sanitized).save();
    await ticket.refresh({
      withRelated: ['student', 'assistant'],
    });

    logger.info(`Created new ticket ${ ticket.get('id') }`);
    io.emit('ticket_created', ticket);
    return ticket;
  },
});


module.exports = bookshelf.model('Ticket', Ticket);
