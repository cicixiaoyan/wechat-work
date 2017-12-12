import Vue from 'vue';
import { AjaxPlugin, ToastPlugin } from 'vux';

function json2url (json) { //, isQueryToken
  var arr = [];
  var str = '';
  for (var i in json) {
    str = i + '=' + json[i];
    arr.push(str);
  }
  return arr.join('&');
}

var getInfo = (url = '', data = {}, isQueryToken = true, type = 'post') => {
  var params = json2url(data); // , isQueryToken
  let headers = {};
  if(!!window.localStorage.getItem('userInfo') && isQueryToken){
    let headers = {'Authorization': "Bearer" + window.localStorage.getItem('userInfo').AccessToken}
  }
  if (type === 'get') {
    return AjaxPlugin.$http.get(url, params, {headers: header});
  } else if (type === 'get') {
    return AjaxPlugin.$http.post(url, params ,
      {headers: headers}
    ).then(function(response) {
      if(response.ResultType !== 0){
          Vue.$vux.toast.show({
            text: response.Message,
            type: 'warn',
            position: 'middle'
          });
      }else{
        return response;
      }
      // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    })
    .catch(function(err){
      if(parseInt(err) == '401'){
        Vue.$router.push({path: '/app/login'});
      }else{
        Vue.$vux.toast.show({
          text: err,
          type: 'warn',
          position: 'middle'
        });
      }
    });
  }
};




// AjaxPlugin.$http.post("/apiv1/users/login",
// "username=ynkjd123456&pwd=ynk123456",
// {
// headers: {
//   // Authorization: "Bearer" + user.access_token
// }
// }
// ).then(function(response) {
// if(response.ResultType == 0){
//   // response.AppendData
//   that.$vux.toast.show({
//     text: '登陆成功',
//     type: 'success',
//     position: 'middle',
//     time: '5000000'
//   });
//   that.$store.state.setUserInfo({commit}, response.AppendData); // 保存AccessToken\RefreshToken
// }else{
//   that.$vux.toast.show({
//     text: '登陆失败',
//     type: 'warn',
//     position: 'middle',
//     time: '5000000'
//   });
// }
// }).catch(function(err){
// console.log(err);
// })

export { getInfo };
