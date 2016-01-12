import Router from 'koa-router';

import can from 'server/middlewares/permissions';
import { loginRequired } from 'server/middlewares/helpers';
import * as assignments from 'server/middlewares/assignments';

const router = new Router();


// Fetch an assignment by id

router.get('/:id', assignments.fetch, assignments.get);


// Fetch all active assignments

router.get('/', assignments.getActive);


// Create a new assignment

router.post('/',
  loginRequired,
  can('create', 'assignment'),
  assignments.create);


// Update an assignment

router.put('/:id',
  loginRequired,
  assignments.fetch,
  can('update', 'assignment'),
  assignments.update);


// Delete an assignment

router.delete('/:id',
  loginRequired,
  assignments.fetch,
  can('destroy', 'assignment'),
  assignments.destroy);


module.exports = router;
