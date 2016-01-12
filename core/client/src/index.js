// Global resouce imports

require('normalize.css');
require('./assets/styles/index.styl');


// Import Vue and associated plugins

import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import Validator from 'vue-validator';

Vue.config.debug = true;
Vue.use(Router);
Vue.use(Resource);
Vue.use(Validator);


// Import components

import HeaderBar from './components/HeaderBar.vue';
import TicketForm from './components/TicketForm.vue';
import TicketList from './components/TicketList.vue';
import Ticket from './components/Ticket.vue';

Vue.component('header-bar', HeaderBar);
Vue.component('ticket-form', TicketForm);
Vue.component('ticket-list', TicketList);
Vue.component('ticket', Ticket);


// Import filters

import { fromNow } from './filters';

Vue.filter('fromNow', fromNow);


// Define the root-level app

const app = new Vue({
  el: '#app',
});
