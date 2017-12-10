import { AjaxPlugin } from 'vux'
import { store } form '../store'
// function htttpRequest(url, params, cb) {
//     let dataStr = ''
//     for (let key in params) {
//         dataStr += key + '=' + params[key]
//     }
//     dataStr = dataStr.substr(0, dataStr.length - 1)

//     AjaxPlugin.$http.post(url, dataStr)
//         .then((response) => {
//             if (cb) cb(response.data)
//         })
// }
function json2url (json, isQueryToken) {
  if (!isQueryToken) {
    const accessToken = store.state.userInfo.accessToken;
    // const accessToken = window.localStorage.getItem('accessToken');
    json.accessToken = accessToken; // 每次请求都带上accessToken
    console.log(accessToken);
  }
  var arr = [];
  var str = '';
  for (var i in json) {
    str = i + '=' + json[i];
    arr.push(str);
  }
  return arr.join('&');
}

var getInfo = (url = '', data = {}, isQueryToken = true, type = 'post') => {
  var params = json2url(data, isQueryToken);
  if (type === 'get') {
    AjaxPlugin.$http.post(url, params);
  } else if (type === 'get') {
    return AjaxPlugin.$http.post(url, params);
  }
};

export { getInfo };
