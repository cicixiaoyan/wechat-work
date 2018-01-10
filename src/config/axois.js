import Vue from 'vue';
import { AjaxPlugin, ToastPlugin } from 'vux';
import main from '../main';

var baseIp = process.env.NODE_ENV === 'development' ? 'http://192.168.0.73:10062' : 'http://192.168.0.73:10062';
var  baseurl = baseIp + '/apiv1';
var imgIp = process.env.NODE_ENV === 'development' ? 'http://192.168.0.73:10061' : 'http://192.168.0.73:10061';

function json2url (json) { //, isQueryToken
  var arr = [];
  var str = '';
  for (var i in json) {
    str = i + '=' + json[i];
    arr.push(str);
  }
  return arr.join('&');
}

let sucCallback = function(response, resolve, reject){
  if(response.status === 401){
    Vue.$vux.toast.show({
      text: "登陆已失效",
      type: 'warn',
      position: 'middle'
    });
    main.$router.push({name: 'login'});
    reject(response.state);
  }else{
    if(!!response.data.ResultType){
      if(response.data.ResultType ===0){
        resolve(response.data);
      }else{
        reject(response.data.Message);
        Vue.$vux.toast.show({
          text: response.data.Message,
          type: 'warn',
          position: 'middle'
        });
      }
    }else{
      resolve(response.data);         
    }       
  }
}

let errCallback = function(err, resolve){
  if(err.code == 'ECONNABORTED'){
    Vue.$vux.toast.show({
      text: "连接已超时",
      type: 'warn',
      position: 'middle'
    });
  }else{
    if (err.response.status == 401) {
      Vue.$vux.toast.show({
        text: "登陆已失效",
        type: 'warn',
        position: 'middle'
      });
      main.$router.push({name: 'login'});
    }else {
      Vue.$vux.toast.show({
        text: err.response.data.Message,
        type: 'warn',
        position: 'middle',
        time: 5000
      });
    }
  }
};

var getInfo = (url = '', data = {}, type = 'post', isQueryToken = true) => {
  var params = json2url(data); // , isQueryToken
  let headers = {};
  //[{"key":"Authorization","value":"Bearer 446fa8c9ef763b6b0b2b3f334f35b741","description":""}]
  if(!!window.localStorage.getItem('AccessToken') && isQueryToken){
    headers = {'Authorization': "Bearer " +  window.localStorage.getItem('AccessToken')}
  }
  return new Promise(function (resolve, reject) {
    if(type == 'get'){
      AjaxPlugin.$http(
        {
          method: type,
          url: url+'?'+params,
          headers: headers,
          timeout: 30000,
        }
      ).then(function(response) {
        sucCallback(response,resolve, reject);
      })
      .catch(function(err){
        errCallback(err,resolve, reject);          
        reject(err);
      });
    }else{
      AjaxPlugin.$http(
        {
          method: type,
          url: url,
          headers: headers,
          data: params,
          timeout: 30000,
        }
      ).then(function(response) {
        sucCallback(response,resolve, reject);
      })
      .catch(function(err){
        errCallback(err,resolve, reject);          
        reject(err);
      });
    }

  })
};
export { getInfo, baseurl, baseIp, imgIp };
