import _ from 'lodash';
import io from 'socket.io-client';

const socket = io.connect();
const store = {
  assignments: [],
  tickets: [],
  connectedUsers: [],
  currentUser: null,
};


socket.on('refresh_state', function refreshState(data) {
  console.log(data);
  store.assignments = data.assignments;
  store.tickets = data.tickets;
  store.connectedUsers = data.connectedUsers;
  store.currentUser = data.currentUser;
});


// Assignment handlers

socket.on('assignment_created', function addAssignment(assignment) {
  const idx = _.sortedIndex(store.assignments, assignment, 'dueAt');
  store.assignments.splice(idx, 0, assignment);
});

socket.on('assignment_updated', function updateAssignment(assignment) {
  const idx = _.findIndex(store.assignments, 'id', assignment.id);
  store.assignments[idx] = assignment;
});

socket.on('assignment_destroyed', function removeAssignment(id) {
  const idx = _.findIndex(store.assignments, 'id', id);
  store.assignments.splice(idx, 1);
});


// Ticket handlers

socket.on('ticket_created', function addTicket(ticket) {
  const idx = _.sortedIndex(store.tickets, ticket, 'openedAt');
  store.tickets.splice(idx, 0, ticket);
});

socket.on('ticket_updated', function updateTicket(ticket) {
  const idx = _.findIndex(store.tickets, 'id', ticket.id);
  store.tickets[idx] = ticket;
});

socket.on('ticket_destroyed', function removeTicket(id) {
  const idx = _.findIndex(store.assignments, 'id', id);
  store.tickets.splice(idx, 1);
});


// User handlers

socket.on('user_joined', function addUser(user) {
  const idx = _.sortedIndex(store.users, user, 'name');
  store.users.splice(idx, 0, user);
});

socket.on('user_left', function removeUser(id) {
  const idx = _.findIndex(store.users, 'id', id);
  store.tickets.splice(idx, 1);
});


export default store;
