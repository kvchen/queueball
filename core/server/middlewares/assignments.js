import Assignment from 'server/models/assignment';


export async function fetch(ctx, next) {
  const assignment = await Assignment.get(ctx.params.id);
  if (!assignment) {
    ctx.throw(404, 'No such assignment');
  }

  ctx.state.assignment = assignment;
  await next();
}


export async function get(ctx, next) {
  ctx.body.assignment = ctx.state.assignment;
  await next();
}


export async function getActive(ctx, next) {
  ctx.body.assignments = await Assignment.getActive();
  await next();
}


export async function create(ctx, next) {
  ctx.body.assignment = await Assignment.create(ctx.request.body);
  await next();
}


export async function update(ctx, next) {
  ctx.body.assignment = await ctx.state.assignment.update(ctx.request.body);
  await next();
}


export async function destroy(ctx, next) {
  ctx.body.assignment = await ctx.state.assignment.destroy();
  await next();
}
