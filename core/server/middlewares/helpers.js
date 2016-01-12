import logger from 'server/lib/logger';


export async function logRequests(ctx, next) {
  logger.debug(`${ ctx.method } ${ ctx.originalUrl }`);
  await next();
}


export async function loginRequired(ctx, next) {
  if (!ctx.isAuthenticated()) {
    ctx.throw(401, 'Not authenticated');
  }

  await next();
}
