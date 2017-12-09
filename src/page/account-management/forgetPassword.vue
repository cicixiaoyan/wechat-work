<template>
  <div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux';

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      username: 'admin',
      password: '123'
    };
  }
};
</script>

<style lang="less">

</style>
