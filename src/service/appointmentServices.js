import { getInfo, baseurl } from '../config/axois';

export var _appointmentServce = {
    // 根据体检机构获取预约剩余人数
    gettbphysicalpeoplenumber: (code) => { // 机构code
        return getInfo(baseurl + '/employment/gettbphysicalpeoplenumber', { code: code }, 'get', true);
    },
    // 查询体检预约列表
    getAppointmentList: (pageindex, pagesize) => {
        return getInfo(baseurl + '/employment/gettbphysicalappointment', { pagesize: pagesize, pageindex: pageindex }, 'get', true);
    },
    // 提交体检预约
    createAppointment: () => {
        // tmodel.phAid
        // query	string
        // tmodel.phid
        // query	string
        // tmodel.phaorcode
        // query	integer
        // tmodel.phadescription
        // query	string
        // tmodel.ppnid
        return getInfo(baseurl + '/employment/creattbphysicalappointment', { parma }, 'post', true);
    },

    // 重新提交体检预约
    edittbphysicalappointment: (parma) => { // 同提交
        return getInfo(baseurl + '/employment/edittbphysicalappointment', { parma }, 'post', true);
    },
    // 删除
    deleteAppointment: () => {
        return getInfo(baseurl + '/employment/deletetbphysicalappointment', {}, 'post', true);
    },

    // 获取体检预约机构
    gettbsysorganize: () => {
        return getInfo(baseurl + '/employment/gettbsysorganize', {}, 'get', true);
    },

    // 是否默认选中
    defaultorganize: (id) => {
        return getInfo(baseurl + '/employment/defaultorganize', {"orid": id}, 'post', true);
    },

    // 根据预约申请记录主键查询体检预约人员详细信息
    getappointmentdetailbyphaid: (id) => { // 预约申请记录主键
        return getInfo(baseurl + '/employment/getappointmentdetailbyphaid', { "phaid": id }, 'get', true);
    },

};
