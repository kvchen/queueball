import Knex from 'knex';
import Bookshelf from 'bookshelf';

import config from 'server/config';

const knex = new Knex(config.db);
const bookshelf = new Bookshelf(knex);

bookshelf.plugin('registry');
bookshelf.plugin('virtuals');

module.exports = bookshelf;
