import {getInfo, baseurl } from '../config/axois';

// 获取区域接口
var _getareas=(params={})=>getInfo(baseurl+'/employment/getareas',params,"get",true);

//根据AreId获取他的所有下级(不包括它本身)
var _getlistbyparentid = (params={})=>getInfo(baseurl+'/employment/getlistbyparentid',params,"get",true);

//根据AreId获取他的下一级区域(不包括它本身)
var _getlistbyareidone= (params={})=>getInfo(baseurl+'/employment/getlistbyareidone',params,"get",true);

//获取机构类型
var _gettbsysbasicdatabycode=(params={})=>getInfo(baseurl+'/employment/gettbsysbasicdatabycode',params,"get",true);

// 提交用户注册信息
var _editorganizeinfo = (params={}) => getInfo(baseurl + '/employment/editorganizeinfo2', params, "post", true);

//获取机构信息接口及机构状态
var _getorganizeinfo=(params={})=>getInfo(baseurl+'/employment/getorganizeinfo',params,"get",true);

// 获取机构信息
var _getorganizebycode=(areacode='')=>getInfo(baseurl+'/employment/getorganizebycode',{'areacode':areacode},"get",true);

export var employmentServices={
    _getareas,_getlistbyparentid,_getlistbyareidone,_gettbsysbasicdatabycode,_editorganizeinfo,_getorganizeinfo
}
