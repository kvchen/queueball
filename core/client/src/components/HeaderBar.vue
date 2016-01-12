<template lang="jade">
.header-bar
  .container
    nav
      a CS61A
      a(href="http://cs61a.org/office-hours.html") Schedule
      a(class="u-pull-right", v-if="currentUser") {{ currentUser.name }}
</template>


<script>
import store from '../store';

export default {
  name: 'HeaderBar',
  data() {
    return {
      store
    }
  },
  computed: {
    currentUser() {
      return this.store.currentUser;
    }
  },
}
</script>
