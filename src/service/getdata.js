import {getInfo, baseurl} from '../config/axois';

/*****************************************************/
/**************** acconunt-management ****************/
/*****************************************************/

/**
 * 登录接口
 * @param {} openId,username,password
 */
var Login = (params) => getInfo(baseurl + '/apiv1/users/login', params, "post", false);

/**
 * 注册接口
 * @param {}
 */
var register = (params) => getInfo(baseurl + '/api/register', params);

/**
 * 忘记密码
 * @param {}
 */
var forgetPassword = (params) => getInfo(baseurl + '/api/forgetPassword', params);



export {
    Login,
    register,
    forgetPassword
};
