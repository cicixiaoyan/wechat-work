import {getInfo, baseurl } from '../config/axois';

// 查询体检人员
var _getphysicalinfo=(params={})=>getInfo(baseurl+'/employment/getphysicalinfo',params,"get",true);

//添加体检人员

var _creatphysicalinfo = (params={})=>getInfo(baseurl+'/employment/creatphysicalinfo',params,"post",true);

//修改体检人员信息
var _updatephysicalinfo= (params={})=>getInfo(baseurl+'/employment/updatephysicalinfo',params,"post",true);

//离职体检人员信息
var _deletephysicalinfo=(params={})=>getInfo(baseurl+'/employment/deletephysicalinfo',params,"post",true);

//复职体检人员
var _recoverphysicalinfo = (params={}) => getInfo(baseurl + '/employment/recoverphysicalinfo', params, "post", true);



export var PhysicalInfoServices={
    _getphysicalinfo,_creatphysicalinfo,_updatephysicalinfo,_deletephysicalinfo,_recoverphysicalinfo
}