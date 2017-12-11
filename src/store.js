import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// 页面打开默认设置登录状态为否
		isLogin : false,
		// 保存登录信息
		userInfo : {
			// 'username' : '',
			// 'photo' : '',
			// 'uid' : '',
			'AccessToken' : '',
			'RefreshToken' : ''
		},
		// 用户未读消息条数
		message_count : 0,
		isLoading: false,
		direction: 'forward',
		demoScrollTop: 0,
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
		},
		updateDemoPosition (state, payload) {
			state.demoScrollTop = payload.top
		},
		updateLoadingStatus (state, payload) {
			state.isLoading = payload.isLoading
		},
		updateDirection (state, payload) {
			state.direction = payload.direction
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
			// state.userInfo.username = userInfo.username;
			// state.userInfo.photo = userInfo.phpto;
			// state.userInfo.uid = userInfo.uid;
			state.userInfo.AccessToken = userInfo.AccessToken;
			state.userInfo.RefreshToken = userInfo.RefreshToken;
		},
		// 设置未读消息条数
		SETNOTMESSAGECOUNT (state, count) {
			state.message_count = count;
		},
		updateDemoPosition ({commit}, top) {
			commit({type: 'updateDemoPosition', top: top})
		}
	},
	getters: {
		getLoginState (state) {
			return state.isLogin;
		},
		getUserInfo (state) {
			return state.userInfo;
		},
		getUserInfoAccesstoken(state, getters) {
			return getters.getUserInfo.AccessToken;
		},
		getUserInfoRefreshToken(state, getters) {
			return getters.getUserInfo.RefreshToken;
		},
		getNotMessageCount (state) {
			return state.message_count;
		}
	}
})

export default store;