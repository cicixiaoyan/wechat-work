import {getInfo} from '../config/axois';

const url = process.env.NODE_ENV === 'development' ? 'http://192.168.0.42:10062' : '';
/*****************************************************/
/**************** acconunt-management ****************/
/*****************************************************/

/**
 * 登录接口
 * @param {} openId,username,password
 */
var Login = (params) => getInfo(url + 'apiv1/users/login', params);

/**
 * 注册接口
 * @param {}
 */
var register = (params) => getInfo(url + '/api/register', params);

/**
 * 忘记密码
 * @param {}
 */
var forgetPassword = (params) => getInfo(url + '/api/forgetPassword', params);

export {
    Login,
    register,
    forgetPassword
};
