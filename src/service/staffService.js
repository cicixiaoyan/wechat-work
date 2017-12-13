import { getInfo, baseurl } from '../config/axois';

export var _staffServce = {
    // 查询体检人员
    getphysicalinfo: (name) => {
        return getInfo(baseurl + '/employment/getphysicalinfo', { "PhName": name }, 'get', true);
    },
    // 添加体检人员
    creatphysicalinfo: (parma) => {
        // string phname  姓名
        // string phcardid   身份证 
        // string phtel  电话
        // string phunit 工作单位
        return getInfo(baseurl + '/employment/creatphysicalinfo', parma, 'get', true);
    },

    // 获取某个体检人员信
    editphysicalinfo: (id) => {
        return getInfo(baseurl + '/employment/editphysicalinfo', { "PhId": id }, 'post', true);
    },
    
    // 修改体检人员信息
    updatephysicalinfo: (parma) => {
        // model.phId	
        // query	string
        // model.ulid	
        // query	string
        // model.phName	
        // query	string
        // model.phSex	
        // query	string
        // model.phBirthDate	
        // query	date-time
        // model.phCardId	
        // query	string
        // model.phStatus	
        // query	integer
        // model.phTel	
        // query	string
        // model.phUnit	
        // query	string
        // model.isLeave
        return getInfo(baseurl + '/employment/updatephysicalinfo', parma, 'post', true);
    },

    // 删除体检人员信息
    deleteAppointment: () => {
        return getInfo(baseurl + '/employment/deletephysicalinfo', { "PhId": id }, 'post', true);
    },

    // 获取体检预约机构
    gettbsysorganize: () => {
        return getInfo(baseurl + '/employment/gettbsysorganize', {}, 'get', true);
    },

    // 是否默认选中
    defaultorganize: (id) => {
        return getInfo(baseurl + '/employment/defaultorganize', {"orid": id}, 'post', true);
    },
};