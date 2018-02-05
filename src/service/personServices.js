import {getInfo, baseurl } from '../config/axois';

/*
// 设置个人资料
*/
var _updateuserinfo = (params={}) => getInfo(baseurl + '/personalinfo/updateuserinfo', params, "post", false);
/*
// 获取健康证信息
*/
var _getphysicalcard = (params={}) => getInfo(baseurl + '/personalinfo/getphysicalcard', params, "post", false);

export var _personServices = {
    _updateuserinfo, // 设置个人资料
    _getphysicalcard, // 获取健康证信息
}
