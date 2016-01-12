import _ from 'lodash';


export default function can(action, itemType) {
  return async function modifyCheck(ctx, next) {
    const user = ctx.passport.user;
    const role = user.get('role');

    async function modifyAssignment() {
      // const assignment = ctx.state.assignment;

      if (!_.includes(['instructor', 'admin'], role)) {
        ctx.throw(403, 'Only instructors and admins can modify assignments');
      }
    }

    async function modifyTicket() {
      const ticket = ctx.state.ticket;
      const userId = user.get('id');
      const studentId = ticket.get('studentId');
      const assistantId = ticket.get('assistantId');
      const status = ticket.get('status');

      switch (action) {
        case 'claim':
          if (role !== 'assistant') {
            ctx.throw(403, 'Only assistants can claim tickets');
          } else if (status !== 'open') {
            ctx.throw(405, 'Ticket is not open');
          }
          break;
        case 'release':
          if (assistantId !== userId) {
            ctx.throw(403, 'Cannot release another assistant\'s ticket');
          } else if (status !== 'claimed') {
            ctx.throw(405, 'Ticket is not claimed');
          }
          break;
        case 'cancel':
          if (studentId !== userId) {
            ctx.throw(403, 'Cannot cancel another student\'s ticket');
          } else if (status !== 'open') {
            ctx.throw(405, 'Ticket is not open');
          }
          break;
        case 'reopen':
          if (studentId !== userId) {
            ctx.throw(403, 'Cannot reopen another student\'s ticket');
          } else if (!_.includes(['cancelled', 'expired'], status)) {
            ctx.throw(405, 'Ticket is not cancelled or expired');
          }
          break;
        default:
          ctx.throw(403, 'Cannot modify ticket');
      }
    }

    // Allow instructors and admins to perform any action

    if (_.includes(['instructor', 'admin'], user.get('role'))) {
      return next();
    }

    if (itemType === 'ticket') {
      await modifyTicket(user, ctx.state.ticket);
    } else if (itemType === 'assignment') {
      await modifyAssignment(user, ctx.state.assignment);
    }

    await next();
  };
}
