// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
// import Home from './components/HelloFromVux'
import store from './store';
import routers from './router/routers';
import { ToastPlugin, ConfirmPlugin, AjaxPlugin, ConfigPlugin } from 'vux';
import VueBarcode from '@xkeshi/vue-barcode';
// import {baseIp} from './config/axois';

Vue.use(VueRouter);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);

Vue.use(AjaxPlugin);
Vue.prototype.$http.defaults.baseURL = 'http://192.168.0.42:10062';
Vue.component('barcode', VueBarcode);
// const routes = [{
//   path: '/',
//   component: Home
// }]

const router = new VueRouter({
    // mode: "history",
    routes: routers
});

Vue.use(ConfigPlugin, {
    $layout: 'VIEW_BOX' // global config for VUX
})

// simple history management
const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);
let isPush = false;
let endTime = Date.now();
let methods = ['push', 'go', 'replace', 'forward', 'back'];
document.addEventListener('touchend', () => {
    endTime = Date.now();
});
methods.forEach(key => {
    let method = router[key].bind(router);
    router[key] = function(...args) {
        isPush = true;
        method.apply(null, args);
    }
});

router.beforeEach(function(to, from, next) {
    let ua = window.navigator.userAgent.toLowerCase();
    /*
     ** 判断是否在微信中
     */
    // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //     // 在微信中
    // } else {
    //     // 不在微信中
    //     if (to.name != 'redirect') next({ path: '/app/redirect' });
    //     else next();
    // }

    /*
     ** 清除location.search   '?areId=7'
     */

    if (from.name === 'login' && !!window.localStorage.getItem('areId') && !!window.location.search) {
        window.location.href = '/#' + to.fullPath;
    }

    store.commit('updateLoadingStatus', { isLoading: true });

    /*
     ** 给每个页面添加pro,以便设置样式
     */

    let body = document.getElementsByTagName('body')[0];
    body.setAttribute('data-path', to.name);

    /*
     ** 清除浏览器判断
     */

    const toIndex = history.getItem(to.path);
    const fromIndex = history.getItem(from.path);
    // console.log(toIndex, fromIndex)
    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
            store.commit('updateDirection', { direction: 'forward' });
        } else {
            // 判断是否是ios左滑返回
            if (!isPush && (Date.now() - endTime) < 377) {
                store.commit('updateDirection', { direction: '' });
            } else {
                store.commit('updateDirection', { direction: 'reverse' });
            }
        }
    } else {
        ++historyCount;
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount);
        store.commit('updateDirection', { direction: 'forward' });
    }

    if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1];
        window.location.href = `http${url}`;
    } else {
        next()
    }
})

router.afterEach(function(to) {
    isPush = false;
    store.commit('updateLoadingStatus', { isLoading: false });
    if (process.env.NODE_ENV === 'production') {
        // ga && ga('set', 'page', to.fullPath)
        // ga && ga('send', 'pageview')
    }
})

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
export default new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box');