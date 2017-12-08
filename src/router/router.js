
import App from '../App';

export default [
  {
    path: '/',
    name: 'app',
    component: App,
    children: [
      {
        path: '',
        component: function (resolve) {
          require(['../page/account-management/login'], resolve);
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
      }
    ]
  }
];
