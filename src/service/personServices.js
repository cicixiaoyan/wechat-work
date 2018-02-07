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
export var _personServices = {
    _updateuserinfo, // 设置个人资料
    _getphysicalcard, // 获取健康证信息
    _getinfo, // 获取预约关联信息
    _getUserMsg // 获取用户信息
};