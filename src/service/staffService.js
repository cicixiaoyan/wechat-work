import { getInfo, baseurl } from '../config/axois';

export var _staffServce = {
    // 查询体检人员
    getphysicalinfo: (name="") => {
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
        // model.ulid
        // model.phName
        // model.phSex
        // model.phBirthDate
        // model.phCardId
        // model.phStatus
        // model.phTel
        // model.phUnit
        // model.isLeave
        return getInfo(baseurl + '/employment/updatephysicalinfo', parma, 'post', true);
    },

    // 删除体检人员信息
    deleteAppointment: (id) => {
        return getInfo(baseurl + '/employment/deletephysicalinfo', { "PhId": id }, 'post', true);
    }
};
