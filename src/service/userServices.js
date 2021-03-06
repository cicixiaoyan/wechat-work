import { getInfo, baseurl } from '../config/axois';

/*
//用户登录
*/
var _userLogin = (params = {}) => getInfo(baseurl + '/users/login', params, 'post', false);
/*
//用户注册--企业
*/
var _userRegister = (params = {}) => getInfo(baseurl + '/users/register', params, 'post', false);
/*
//用户注册--个人
*/
var _userRegisterPerson = (params = {}) => getInfo(baseurl + '/users/personregister', params, 'post', false);
/*
获取用户信息
*/
var _getUserMsg = (params = {}) => getInfo(baseurl + '/users/getinfo', params, 'post', true);
/*
//获取验证码时间戳
*/
var _getCodeExpkey = (params = {}) => getInfo(baseurl + '/users/getcodeexpkey', params, 'get', false);
/*
//注册发送验证码
*/
var _sendCodeRegister = (params = {}) => getInfo(baseurl + '/users/sendcode', params, 'post', false);

/*
 **退出登录
 */
var _logout = () => getInfo(baseurl + '/users/logout', {}, 'post', true);

export var _userServices = {
    _userLogin, // 用户登录
    _userRegister, // 用户注册--公司
    _userRegisterPerson, // 用户注册--个人
    _getUserMsg, // 获取用户信息（系统业务）
    _getCodeExpkey, // 获取验证码时间戳
    _sendCodeRegister, // 发送注册验证码
    _logout
};