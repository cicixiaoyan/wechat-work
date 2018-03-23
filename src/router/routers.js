import App from '../App';
// const requireViewsAsync = name => resolve => require([`page/${name}.vue`], resolve); // eslint-disable-line
// const requireComponentsAsync = name => resolve => require([`components/${name}.vue`], resolve); // eslint-disable-line

export default [{
    path: '/',
    // name: 'app',
    component: App,
    redirect: '/app/redirect',
    children: [{
            path: '/app/redirect',
            name: 'redirect',
            component: function(resolve) {
                require(['../page/account-management/redirect'], resolve);
            }
        },
        {
            path: '/app/vscroll',
            name: 'vscroll',
            component: function(resolve) {
                require(['../components/vscroll'], resolve);
            }
        },
        {
            path: '/app/upload-img',
            name: 'uploadImg',
            component: function(resolve) {
                require(['../components/uploadImg'], resolve);
            }
        },
        {
            path: '/app/login',
            name: 'login',
            component: function(resolve) {
                require(['../page/account-management/login'], resolve);
            }
        },
        {
            path: '/app/forgetPassword',
            name: 'forgetPassword',
            component: function(resolve) {
                require(['../page/account-management/forgetPassword'], resolve);
            }
        },
        { // 注册
            path: '/app/register',
            name: 'register',
            component: function(resolve) {
                require(['../page/account-management/register'], resolve);
            }
        },
        { // 提交预约
            path: '/app/appointment/add/:phid',
            name: 'appointment-add',
            component: function(resolve) {
                require(['../page/appointment/add'], resolve);
            }
        },
        { // 提交预约--个人
            path: '/app/appointment/add-person',
            name: 'appointment-add-person',
            component: function(resolve) {
                require(['../page/appointment/add-person'], resolve);
            }
        },
        { // 提交个人资料
            path: '/app/submit-information/add-person',
            name: 'submit-information-add-person',
            component: function(resolve) {
                require(['../page/submit-information/add-person'], resolve);
            }
        },
        { // 预约列表
            path: '/tabbar/appointment/list',
            name: 'appointment-list',
            component: function(resolve) {
                require(['../page/appointment/list'], resolve);
            }
        },
        { // 个人预约 -- 列表
            path: '/tabbar/appointment/list-person',
            name: 'appointment-list-person',
            component: function(resolve) {
                require(['../page/appointment/list-person'], resolve);
            }
        },
        { // 个人预约 -- 详情
            path: '/app/appointment/view-person',
            name: 'appointment-view-person',
            component: function(resolve) {
                require(['../page/appointment/view-person'], resolve);
            }
        },
        { // 健康证关联列表
            path: '/tabbar/health-card/list-person',
            name: 'health-list-person',
            component: function(resolve) {
                require(['../page/health-card/list-person'], resolve);
            }
        },
        { // 健康证--详情
            path: '/app/health-card/view-person',
            name: 'health-view-person',
            component: function(resolve) {
                require(['../page/health-card/view-person'], resolve);
            }
        },
        { // 预约详情
            path: '/app/appointment/view/:id',
            name: 'appointment-view',
            component: function(resolve) {
                require(['../page/appointment/view'], resolve);
            }
        },
        { // 人员列表
            path: '/app/staff-information/view-list/:phaid/:showcancel',
            name: 'staff-information-view-list',
            component: function(resolve) {
                require(['../page/staff-information/view-list'], resolve);
            }
        },
        {
            path: '/app/staff-information/edit/:id/:read',
            name: 'staff-information-edit',
            component: function(resolve) {
                require(['../page/staff-information/edit'], resolve);
            }
        },
        {
            path: '/tabbar/staff-information/list',
            name: 'staff-information-list',
            component: function(resolve) {
                require(['../page/staff-information/list'], resolve);
            }
        },
        {
            path: '/app/staff-information/check/:phids',
            name: 'staff-information-check',
            component: function(resolve) {
                require(['../page/staff-information/check'], resolve);
            }
        },
        {
            path: '/app/submit-information/view/:read',
            name: 'submit-information-view',
            component: function(resolve) {
                require(['../page/submit-information/view'], resolve);
            }
        },
        {
            path: '/app/submit-information/add',
            name: 'submit-information-add',
            component: function(resolve) {
                require(['../page/submit-information/add'], resolve);
            }
        },
        {
            path: '/tabbar/personal-center',
            name: 'personal-center',
            component: function(resolve) {
                require(['../page/account-management/personal-center'], resolve);
            }
        }
    ]
}];