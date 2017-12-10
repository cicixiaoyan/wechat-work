// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
// import Home from './components/HelloFromVux'
import store from './store';
import routers from './router/routers';
import { ToastPlugin, ConfirmPlugin } from 'vux';

Vue.use(VueRouter);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
// const routes = [{
//   path: '/',
//   component: Home
// }]

const router = new VueRouter({
  routes: routers
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');
