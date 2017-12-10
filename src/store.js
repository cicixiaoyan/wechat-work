import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// 页面打开默认设置登录状态为否
		isLogin : false,
		// 保存登录信息
		userInfo : {
			'username' : '',
			'photo' : '',
			'uid' : '',
			'accesstoken' : ''
		},
		// 用户未读消息条数
		message_count : 0,

	},
	actions: {
		isLogin({commit}) {
			commit('ISLOGIN');
		},
		signOut({commit}) {
			commit('SIGNOUT');
		},
		setUserInfo({commit}, userInfo) {
			commit('SETUSERINFO', userInfo);
		},
		setNotMessageCount({commit}, count) {
			commit('SETNOTMESSAGECOUNT', count);
		}
	},
	mutations: {
		// 设置登录
		ISLOGIN (state) {
			state.isLogin = true;
		},
		// 退出登录
		SIGNOUT (state) {
			state.isLogin = false;
		},
		// 设置登录用户信息
		SETUSERINFO (state, userInfo) {
			state.userInfo.username = userInfo.username;
			state.userInfo.photo = userInfo.phpto;
			state.userInfo.uid = userInfo.uid;
			state.userInfo.accesstoken = userInfo.accesstoken;
		},
		// 设置未读消息条数
		SETNOTMESSAGECOUNT (state, count) {
			state.message_count = count;
		},
	},
	getters: {
		getLoginState (state) {
			return state.isLogin;
		},
		getUserInfo (state) {
			return state.userInfo;
		},
		getUserInfoAccesstoken(state, getters) {
			return getters.getUserInfo.accesstoken;
		},
		getNotMessageCount (state) {
			return state.message_count;
		}
	}
})

export default store;
