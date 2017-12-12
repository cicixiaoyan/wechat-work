import App from '../App';
// const requireViewsAsync = name => resolve => require([`page/${name}.vue`], resolve); // eslint-disable-line
// const requireComponentsAsync = name => resolve => require([`components/${name}.vue`], resolve); // eslint-disable-line

export default [
  {
    path: '/',
    // name: 'app',
    component: App,
    redirect: '/app/forgetPassword',
    children: [
      {
        path: '/app/tab',
        name: 'tab',
        component: function (resolve) {
          require(['../components/tab'], resolve);
        }
      },      {
        path: '/app/upload-img',
        name: 'uploadImg',
        component: function (resolve) {
          require(['../components/uploadImg'], resolve);
        }
      },
      {
        path: '/app/login',
        name: 'login',
        component: function (resolve) {
          require(['../page/account-management/login'], resolve);
        }
      },
      {
        path: '/app/forgetPassword',
        name: 'forgetPassword',
        component: function (resolve) {
          require(['../page/account-management/forgetPassword'], resolve);
        }
      },
      {
        path: '/app/register',
        name: 'register',
        component: function (resolve) {
          require(['../page/account-management/register'], resolve);
        }
      },
      {
        path: '/app/appointment/add',
        name: 'appointment-add',
        component: function (resolve) {
          require(['../page/appointment/add'], resolve);
        }
      },
      {
        path: '/app/appointment/list',
        name: 'appointment-list',
        component: function (resolve) {
          require(['../page/appointment/list'], resolve);
        }
      },
      {
        path: '/app/appointment/view/:id',
        name: 'appointment-view',
        component: function (resolve) {
          require(['../page/appointment/view'], resolve);
        }
      },
      {
        path: '/app/staff-information/add',
        name: 'staff-information-add',
        component: function (resolve) {
          require(['../page/staff-information/add'], resolve);
        }
      },
      {
        path: '/app/staff-information/edit',
        name: 'staff-information-edit',
        component: function (resolve) {
          require(['../page/staff-information/edit'], resolve);
        }
      },
      {
        path: '/app/staff-information/list',
        name: 'staff-information-list',
        component: function (resolve) {
          require(['../page/staff-information/list'], resolve);
        }
      },
      {
        path: '/app/submit-information/add',
        name: 'submit-information-add',
        component: function (resolve) {
          require(['../page/submit-information/add'], resolve);
        }
      },
      {
        path: '/app/submit-information/view',
        name: 'submit-information-view',
        component: function (resolve) {
          require(['../page/submit-information/view'], resolve);
        }
      }
    ]
  }
];
