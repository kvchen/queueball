import Router from 'koa-router';

import { loginRequired } from 'server/middlewares/helpers';
import can from 'server/middlewares/permissions';
import * as tickets from 'server/middlewares/tickets';
import * as users from 'server/middlewares/users';

const router = new Router();


// Fetch all active (open and claimed) tickets

router.get('/', tickets.getActive);

// Fetch a ticket by id

router.get('/:id', tickets.fetch, tickets.get);

// Create a new ticket

router.post('/',
  loginRequired, can('create', 'ticket'),
  users.hasActive, tickets.create);

// Delete a ticket

router.delete('/:id',
  loginRequired,
  tickets.fetch,
  can('destroy', 'ticket'),
  tickets.destroy);

// Convenience methods for claiming and unclaiming a ticket

router.put('/:id/claim',
  loginRequired,
  users.hasActive,
  tickets.fetch,
  can('claim', 'ticket'),
  tickets.claim);

router.delete('/:id/claim',
  loginRequired,
  tickets.fetch,
  can('release', 'ticket'),
  tickets.release);

// Convenience methods for cancelling and reopening a ticket

router.put('/:id/cancel',
  loginRequired,
  tickets.fetch,
  can('cancel', 'ticket'),
  tickets.cancel);

router.delete('/:id/cancel',
  loginRequired,
  tickets.fetch,
  can('reopen', 'ticket'),
  tickets.reopen);


module.exports = router;
