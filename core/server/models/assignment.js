import bookshelf from 'server/lib/db';
import Promise from 'bluebird';
const Joi = Promise.promisifyAll(require('joi'));

import io from 'server/lib/socketio';
import logger from 'server/lib/logger';


const creationSchema = Joi.object().keys({
  name: Joi.string().required(),
  assignedAt: Joi.string().isoDate().required(),
  dueAt: Joi.string().isoDate().required(),
  questions: Joi.array().items(Joi.string()).required(),
});


const updateSchema = Joi.object().keys({
  name: Joi.string(),
  assignedAt: Joi.string().isoDate(),
  dueAt: Joi.string().isoDate(),
  questions: Joi.array().items(Joi.string()),
});


const Assignment = bookshelf.Model.extend({
  tableName: 'assignments',
  virtuals: {
    active() {
      const currentDate = new Date();
      return (this.get('assignedAt') <= currentDate) &&
             (currentDate < this.get('dueAt'));
    },
  },
  async update(attributes) {
    const sanitized = await Joi.validateAsync(attributes, updateSchema);
    await this.save(sanitized, { patch: true });

    io.emit('assignment_updated', this);
    logger.info(`Updated assignment "${ this.get('name') }"`);
    return this;
  },
  async destroy() {
    const name = this.get('name');
    const id = this.get('id');
    await this.destroy();

    io.emit('assignment_destroyed', id);
    logger.info(`Destroyed assignment "${ name }"`);
  },
}, {
  async get(id) {
    const assignment = await new this({ id }).fetch();
    return assignment;
  },
  async getActive() {
    const assignments = await this
      .query(function query(qb) {
        return qb
          .where('assignedAt', '<=', bookshelf.knex.fn.now())
          .andWhere('dueAt', '>', bookshelf.knex.fn.now())
          .orderBy('dueAt');
      })
      .fetchAll();

    return assignments.models;
  },
  async create(attributes) {
    const sanitized = await Joi.validateAsync(attributes, creationSchema);
    const assignment = await new this(sanitized).save();

    io.emit('assignment_created', assignment);
    logger.info(`Created new assignment "${ assignment.get('name') }"`);
    return assignment;
  },
});


module.exports = bookshelf.model('Assignment', Assignment);
