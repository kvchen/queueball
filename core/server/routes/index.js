import Router from 'koa-router';

import api from 'server/routes/api';
import auth from 'server/routes/auth';

const router = new Router();


router.use('/api', api.routes());
router.use('/auth', auth.routes());

// Render the main view

router.get('/', async (ctx, next) => {
  ctx.render('index.jade');
  await next();
});

module.exports = router;
