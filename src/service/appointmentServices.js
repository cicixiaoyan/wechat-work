import { getInfo, baseurl } from '../config/axois';

export var _appointmentServce = {
    getAppointmentList: (pageindex, pagesize) => {
        return getInfo(baseurl + '/apiv1/users/login', { pagesize: pagesize, pageindex: pageindex }, 'post', true);
    }
};