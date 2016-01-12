export async function hasActive(ctx, next) {
  const tickets = await ctx.passport.user.activeTickets();

  if (tickets.length !== 0) {
    ctx.throw(403, 'Already holding an active ticket');
  }

  await next();
}
