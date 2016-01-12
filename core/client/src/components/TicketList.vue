<template lang="jade">
#ticket-view(:class="{ cleared: !tickets.length }")
  - var n = 0
  while n < 100
    ticket(v-for="ticket in tickets",
           :ticket="ticket",
           track-by="id")
    - n++
</template>


<script lang="babel">
import store from '../store';

module.exports = {
  name: 'TicketView',
  data() {
    return store;
  },
}
</script>
