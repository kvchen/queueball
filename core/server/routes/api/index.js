import Router from 'koa-router';

import logger from 'server/lib/logger';
import assignments from 'server/routes/api/assignments';
import tickets from 'server/routes/api/tickets';
import 'server/routes/api/realtime';

const router = new Router();


async function formatResponse(ctx, next) {
  try {
    ctx.body = {};
    await next();
    ctx.body.ok = true;
  } catch (err) {
    logger.error(`${ ctx.method } ${ ctx.url }: ${ err.message }`);

    ctx.body = {
      ok: false,
      error: err.expose ? err.message : 'Server error',
    };
  }
}


router.use(formatResponse);

router.use('/tickets', tickets.routes());
router.use('/assignments', assignments.routes());

module.exports = router;
