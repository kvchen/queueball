import Ticket from 'server/models/ticket';

export async function fetch(ctx, next) {
  const ticket = await Ticket.get(ctx.params.id);
  if (!ticket) {
    ctx.throw(404, 'No such ticket');
  }

  ctx.state.ticket = ticket;
  await next();
}


export async function get(ctx, next) {
  ctx.body.ticket = ctx.state.ticket;
  await next();
}


export async function getActive(ctx, next) {
  ctx.body.tickets = await Ticket.getActive();
  await next();
}


export async function create(ctx, next) {
  ctx.request.body.studentId = ctx.passport.user.get('id');
  ctx.body.ticket = await Ticket.create(ctx.request.body);

  await next();
}


export async function update(ctx, next) {
  ctx.body.ticket = await ctx.state.ticket.update(ctx.request.body);
  await next();
}


export async function destroy(ctx, next) {
  await ctx.state.ticket.destroy();
  await next();
}


export async function claim(ctx, next) {
  ctx.body.ticket = await ctx.state.ticket.update({
    status: 'claimed',
    assistantId: ctx.passport.user.get('id'),
    claimedAt: new Date(),
  });

  await next();
}


export async function release(ctx, next) {
  ctx.body.ticket = await ctx.state.ticket({
    status: 'open',
    assistantId: null,
    claimedAt: null,
  });

  await next();
}


export async function cancel(ctx, next) {
  ctx.body.ticket = await ctx.state.ticket.update({
    status: 'cancelled',
    assistantId: null,
    claimedAt: null,
    closedAt: null,
  });

  await next();
}


export async function reopen(ctx, next) {
  ctx.body.ticket = await ctx.state.ticket.update({
    status: 'open',
    assistantId: null,
    claimedAt: null,
    closedAt: null,
  });

  await next();
}


export async function expire(ctx, next) {
  ctx.body.ticket = await ctx.state.ticket.update({
    status: 'expired',
    assistantId: null,
    claimedAt: null,
    closedAt: null,
  });

  await next();
}
