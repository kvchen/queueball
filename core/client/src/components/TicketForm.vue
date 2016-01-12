<template lang="jade">
#ticket-form
  .container
    .row
      .one-half.column
        h2 Assignment
        select(id="assignment", v-model="ticket.assignment")
          option(class="placeholder" selected disabled value="") Assignment
          option(v-for="assignment in assignments", v-bind:value="assignment") {{ assignment.name }}

      .one-half.column
        h2 Question
        select(id="question", v-model="ticket.question")
          option(class="placeholder" selected disabled value="") Question
          option(v-for="question in questions", v-bind:value="question") {{ question }}

    .row
      h2 Description (&lt;140 chars)
      textarea(v-model="ticket.description")

    .row
      button(id="create-ticket", class="btn btn-primary", v-on:click="submit($event)") Submit

    .row
      div(class="error-message") {{ error }}

</template>


<script>
import store from '../store';

export default {
  name: 'TicketCreate',
  data() {
    return {
      store: store,
      error: '',
      ticket: {
        assignment: null,
        question: null,
        description: '',
        location: '',
      },
    };
  },
  computed: {
    assignments() {
      return this.store.assignments;
    },
    questions() {
      if (this.ticket.assignment) {
        return this.ticket.assignment.questions;
      }
      return [];
    }
  },
  methods: {
    async submit(event) {
      event.preventDefault();
      const response = await this.$http.post('/api/tickets', {
        assignmentId: this.ticket.assignmentId,
        question: this.ticket.question,
        description: this.ticket.description,
        location: this.ticket.location,
      });

      if (!response.data.ok) {
        this.error = response.data.error;
      }

      console.log(response.data);
    }
  },
}
</script>
