<template>
  <div>
    <group>
      <cell is-link title="Simple" link="/component/tabbar-simple"></cell>
      <cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>
    </group>
    <tabbar>
      <tabbar-item>
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        <span slot="label">预约</span>
      </tabbar-item>
      <tabbar-item selected link="/login">
        <!-- <img slot="icon" src="../logo.png"> -->
        <span slot="label">人员</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <!-- <img slot="icon" src="../logo.png"> -->
        <span slot="label">设置</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Group, Cell, Tabbar, TabbarItem } from 'vux';
export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    };
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
