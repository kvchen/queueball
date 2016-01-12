import bookshelf from 'server/lib/db';


const Metric = bookshelf.Model.extend({
  tableName: 'metrics',
});


module.exports = bookshelf.model('Metric', Metric);
