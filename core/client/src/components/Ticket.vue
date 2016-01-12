<template lang="jade">
.row.ticket
  .one-third.column
    p {{ ticket.assignment.name }}
  .two-thirds.column
    p {{ ticket.question }}
    p(v-if="isStudent") I'm a student
</template>


<script lang="babel">
import store from '../store';

export default {
  name: 'Ticket',
  data() {
    return { store };
  },
  props: {
    ticket: Object,
    id: Number,
  },
  computed: {
    isStudent() {
      return this.store.currentUser.id === this.studentId;
    },
    isAssistant() {
      return this.store.currentUser.id === this.assistantId;
    },
  },
}
</script>
