import {getInfo, baseurl } from '../config/axois';

/*
//用户登录
*/
var _userLogin = (params={}) => getInfo(baseurl + '/users/login', params, "post", false);
/*
//用户注册
*/
var _userRegister = (params={}) => getInfo(baseurl + '/users/register', params, "post", false);
/*
获取用户信息
*/
var _getUserMsg=(params={})=>getInfo(baseurl+'/users/getinfo',params, "post", true);
/*
//获取验证码时间戳
*/
var _getCodeExpkey=(params={})=>getInfo(baseurl+'/users/getcodeexpkey',params, "get", false); 
/*
//注册发送验证码
*/
var _sendCodeRegister=(params={})=>getInfo(baseurl+'/users/sendcode',params, "post", false); 




export var _userServices= {
    _userLogin, //用户登录
    _userRegister,//用户注册
     _getUserMsg,//获取用户信息（系统业务）
    _getCodeExpkey,//获取验证码时间戳
    _sendCodeRegister//发送注册验证码
}
  
