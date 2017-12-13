import {getInfo, baseurl} from '../config/axois';

/*****************************************************/
/**************** acconunt-management ****************/
/*****************************************************/

/**
 * 获取区域
 * @param {} openId,username,password
 */
var _getlistbyparentid = (params={}) => getInfo(baseurl + '/employment/getlistbyparentid', params, "get", true);


/**
 * 获取机构类型
 * @param {} openId,username,password
 */
var _gettbsysbasicdatabycode = (params={}) => getInfo(baseurl + '/employment/gettbsysbasicdatabycode', params, "get", true);





export {
    _getlistbyparentid,
    _gettbsysbasicdatabycode

};
