<template>
  <div>
    <group title="cell demo">
      <x-input title="手机号" v-model="username"></x-input>
      <x-input title="密码" v-model="password"></x-input>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux';

export default {
  name: 'forgetPassword',
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
