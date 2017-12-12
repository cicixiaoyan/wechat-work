import {getInfo, baseurl } from '../config/axois';

/*
//用户登录
*/
var _userLogin = (params) => getInfo(baseurl + '/users/login', params, "post", false);

/*
//用户注册
*/
var _userRegister = (params) => getInfo(baseurl + '/users/register', params, "post", false);


// /*
// //找回密码 第一步
// */
// var _findpwdStep1 = (params) => getInfo(baseurl + '/users/findpassword_step1', params, "post", false);


// /*
// //找回密码 第二步
// */
// var _findpwdStep2 = (params) => getInfo(baseurl + '/users/findpassword_step2', params, "post", false);

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




export  {

    _userLogin,
    _userRegister,
    // _findpwdStep1,
    // _findpwdStep2,
     _getUserMsg,
    _getCodeExpkey,
    _sendCodeRegister

}
  
