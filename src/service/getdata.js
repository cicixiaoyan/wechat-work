import {getInfo} from '../config/axois';

const url = process.env.NODE_ENV === 'development' ? 'http://192.168.0.49:789' : '';
/*****************************************************/
/**************** acconunt-management ****************/
/*****************************************************/

/**
 * 登录接口
 * @param {} openId,username,password
 */
var login = (params) => getInfo(url + '/api/login', params, 'post');

/**
 * 注册接口
 * @param {}
 */
var register = (params) => getInfo(url + '/api/register', params, 'post');

/**
 * 忘记密码
 * @param {}
 */
var forgetPassword = (params) => getInfo(url + '/api/forgetPassword', params, 'post');

export {
    login,
    register,
    forgetPassword
};
