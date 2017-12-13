import { getInfo, baseurl } from '../config/axois';

// const var key = encodeURIComponent('h27EdZlBIm9R1ysOrDo1boC2KLlyuCRKNC8E7nO+cIo=');

export var _forgetPasswordService = {

    // 获取时间Key
    getcodeexpkey: () => {
        let key = encodeURIComponent('h27EdZlBIm9R1ysOrDo1boC2KLlyuCRKNC8E7nO+cIo=');
        return getInfo(baseurl + '/users/getcodeexpkey?key=' + key, {}, 'get', false);
    },

    // 获取验证码
    getVerifyCode: (phone, key) => {
        let newkey = encodeURIComponent(key);
        return getInfo(baseurl + '/users/sendcodefindpwd', { expkey: newkey, tel: phone }, 'post', false);
    },

    findpassword_step1: (mobile, codeMsdId, checkcode) => {
        let key = encodeURIComponent('h27EdZlBIm9R1ysOrDo1boC2KLlyuCRKNC8E7nO+cIo=');
        return getInfo(baseurl + '/users/findpassword_step1', { key: key, mobile: mobile, codemsg_id: codeMsdId, checkcode: checkcode }, 'post', false);
    },

    findpassword_step2: (secretid, secretcode, password, passwordrep) => {
        let key = encodeURIComponent('h27EdZlBIm9R1ysOrDo1boC2KLlyuCRKNC8E7nO+cIo=');
        secretcode = secretcode.split('|')[0];
        // console.log('secretcode = ', secretcode);
        let encodeSecretCode = encodeURIComponent(secretcode);
        return getInfo(baseurl + '/users/findpassword_step2', { key: key, secretid: secretid, secretcode: encodeSecretCode, password: password, passwordrep: passwordrep }, 'post', false);
    }

};