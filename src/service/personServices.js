import { getInfo, baseurl } from '../config/axois';

/*
// 设置个人资料
*/
var _updateuserinfo = (params = {}) => getInfo(baseurl + '/personalinfo/updateuserinfo', params, 'post', true);
/*
// 获取健康证信息
*/
var _getphysicalcard = (params = {}) => getInfo(baseurl + '/personalinfo/getphysicalcard', params, 'get', true);
/*
// 获取预约关联信息
*/
var _getinfo = () => getInfo(baseurl + '/personalinfo/getinfo', {}, 'get', true);
/*
获取用户信息
*/
var _getUserMsg = () => getInfo(baseurl + '/users/getinfo', {}, 'post', true);


/*
获取健康证key
*/
var _setcardid = (cardid = '') => getInfo(baseurl + '/select/setcardid?cardid=' + cardid, { 'cardid': cardid }, 'post', true);
/*
通过key获取健康证详情
*/
var _selectcardid = (parma = {}) => getInfo(baseurl + '/select/selectcardid', parma, 'get', true);
export var _personServices = {
    _updateuserinfo, // 设置个人资料
    _getphysicalcard, // 获取健康证信息
    _getinfo, // 获取预约关联信息
    _getUserMsg, // 获取用户信息
    _setcardid,
    _selectcardid
};