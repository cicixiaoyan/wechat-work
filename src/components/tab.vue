<template>
  <div>
    <tabbar>
      <tabbar-item  link="../page/account-management/register" :selected="$route.path === '/app/register'">
        <img slot="icon" class="iconfont icon-tasklist">
        <span slot="label">体检</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon" class="iconfont icon-tasklist">
        <span slot="label" link="../page/appointment/add">审核</span>
      </tabbar-item>
      <tabbar-item link="../page/account-management/login">
        <img slot="icon" class="iconfont icon-tasklist">
        <span slot="label" >个人中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux';
export default {
  components: {
    Tabbar,
    TabbarItem
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
