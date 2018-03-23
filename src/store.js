import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 页面打开默认设置登录状态为否
        isLogin: false,
        // 保存登录信息
        userInfo: {
            'AccessToken': '',
            'RefreshToken': ''
        },
        // 用户未读消息条数
        message_count: 0,
        isLoading: false,
        direction: 'forward',
        demoScrollTop: 0,
        parmaCommon: 'h27EdZlBIm9R1ysOrDo1boC2KLlyuCRKNC8E7nO%2bcIo%3d',

        // parmaCommon: 'h27EdZlBIm9R1ysOrDo1boC2KLlyuCRKNC8E7nO+cIo='

        healthyCard: {},
        appointment: {},
        isPerson: false,
        cardKey: encodeURIComponent('h27EdZlBIm9R1ysOrDo1boC2KLlyuCRKNC8E7nO+cIo='),
        submitItem: {}
    },
    actions: {
        isLogin({ commit }) {
            commit('ISLOGIN');
        },
        signOut({ commit }) {
            commit('SIGNOUT');
        },
        setUserInfo({ commit }, userInfo) {
            commit('SETUSERINFO', userInfo);
        },
        setNotMessageCount({ commit }, count) {
            commit('SETNOTMESSAGECOUNT', count);
        },
        updateDemoPosition({ commit }, top) {
            commit({ type: 'updateDemoPosition', top: top });
        },
        async updateHealthyCard({ commit }, obj) {
            commit('updateHealthyCard', obj);
        },
        async updateIsPerson({ commit }, bol) {
            commit('updateIsPerson', bol);
        }
    },
    mutations: {
        // 设置登录
        ISLOGIN(state) {
            state.isLogin = true;
        },
        // 退出登录
        SIGNOUT(state) {
            state.isLogin = false;
        },
        // 设置登录用户信息
        SETUSERINFO(state, userInfo) {
            // state.userInfo.username = userInfo.username;
            // state.userInfo.photo = userInfo.phpto;
            // state.userInfo.uid = userInfo.uid;
            state.userInfo.AccessToken = userInfo.AccessToken;
            state.userInfo.RefreshToken = userInfo.RefreshToken;
        },
        // 设置未读消息条数
        SETNOTMESSAGECOUNT(state, count) {
            state.message_count = count;
        },
        updateDemoPosition(state, payload) {
            state.demoScrollTop = payload.top
        },
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        },
        updateDirection(state, payload) {
            state.direction = payload.direction
        },
        updateUserInfoAccesstoken(state, val) {
            state.userInfo.AccessToken = val;
        },
        updateUserInfoRefreshToken(state, val) {
            state.userInfo.RefreshToken = val;
        },

        updateHealthyCard(state, obj) {
            state.healthyCard = obj;
        },
        updateIsPerson(state, bol) {
            state.isPerson = bol;
        },
        updateAppointment(state, obj) {
            state.appointment = obj;
        },
        updateSubmitItem(state, obj) {
            state.submitItem = obj;
        }
    },
    getters: {
        gerParmaCommon(state) {
            return state.parmaCommon;
        },
        getLoginState(state) {
            return state.isLogin;
        },
        getUserInfo(state) {
            return state.userInfo;
        },
        getUserInfoAccesstoken(state) {
            return state.userInfo.AccessToken;
        },
        getUserInfoRefreshToken(state) {
            return state.userInfo.RefreshToken;
        },
        getNotMessageCount(state) {
            return state.message_count;
        },
        getHealthyCard(state) {
            return state.healthyCard;
        },
        getIsPerson(state) {
            return state.isPerson;
        },
        getAppointment(state) {
            return state.appointment;
        },
        getCardKey(state) {
            return state.cardKey;
        },
        getSubmitItem(state) {
            return state.submitItem;
        }
    }
})

export default store;