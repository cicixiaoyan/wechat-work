<template>
  <div>
    <x-header :left-options="{showBack: false}">用户登陆 <a slot="right" @click='register'>注册</a></x-header>
    <div class="text-center">
      <img src="../../assets/logo.png" class="logo" title="logo"/>
      <div class="title">成都市从业人员体检预约平台</div>
    </div>
    <div class="login-form">
      <div class="user">
        <span class="iconfont icon-gerenxinxi"></span>
        <input type="text" @input="judgePhone" @blur="judgePhone" maxlength="20" placeholder="请输入手机号/用户名" v-model="mobile">
        <div class="validator-error" v-if="phoneInValid != ''">{{phoneInValid}}</div>
      </div>
      <div class="user">
        <span class="iconfont icon-mima"></span>
        <input  placeholder="请输入密码" minlength='20' @input type="password"  v-model="password">
      </div>
      <div class="remenber-password">
        <div >
          <!-- <label for="" @click='remenberChange'>
            <span class="iconfont icon-circle1" v-if="!remember"></span>
            <span class="iconfont icon-circle" v-if="remember"></span>
            <input  type="checkbox"  v-model="remember">记住密码
          </label>| -->
          <a @click='findPwd'>忘记密码?</a>
          </div>
      </div>
      <button @click='login' class="login" :disabled="mobile==='' || phoneInValid != '' || password===''" >登陆</button>
    </div>

    <div v-transfer-dom>
      <loading :show="showload" :text="loadtext"></loading>
    </div>
  </div>
</template>

<script>
import { XHeader, AjaxPlugin,Loading, TransferDomDirective as TransferDom } from 'vux';
import {_userServices} from '../../service/userServices';
export default {
  name: 'login',
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Loading
  },
  created(){
    let that = this;
    document.onkeydown = function(event){
      var ev = event || window.event || arguments.callee.caller.arguments[0];
      if (ev && ev.keyCode == 13) {
          if(that.mobile==='' || that.phoneInValid != '' || that.password==='') return;
          that.login();
      }
    };
  },
  data () {
    return {
      mobile: '',
      password: '',
      remember: false,
      phoneInValid: '',
      showload: false,
      loadtext: '登陆中'
    };
  },
  methods: {
    login () {
      // this.$router.push({name: 'register'});
      // ynkjd123456
      // ynk123456
      let that = this;
      that.showload = true;

      _userServices._userLogin({"username": this.mobile,"pwd": this.password}).then(function(data){
        if(data.ResultType == 0){
          that.loadtext = "登陆成功";
          //获取用户信息
          window.localStorage.setItem('AccessToken', data.AppendData["AccessToken"]);
          window.localStorage.setItem('RefreshToken', data.AppendData["RefreshToken"]);

          _userServices._getUserMsg().then(function(data1){
            that.showload = false;
             //已审核通过 转到 人员信息页面
            if(data1.ULAudtiStatus == 3){
              that.$router.push({name: 'staff-information-list'});
            }
            else if(data1.ULAudtiStatus == 1 || data1.ULAudtiStatus == 2){
              if(data1.ULAudtiStatus == 1){
                that.$router.push({name: 'submit-information-view', params: { 'read': false }});
              }else{
                that.$router.push({name: 'submit-information-view', params: { 'read': true }});
              }

            }
            else{
              that.$router.push({name: 'submit-information-add'});
            }


          }).catch(function(err){
            console.log(err, 2)
            that.showload = false;
          });

          that.$store.commit('ISLOGIN');
          that.$store.commit('updateUserInfoAccesstoken', data.AppendData["AccessToken"]);
          that.$store.commit('updateUserInfoRefreshToken', data.AppendData["RefreshToken"]);

        }else{
          that.showload = false;
        }
      }).catch(function(err){
        console.log(err, 1)
        that.showload = false;
      })
    },
    register() {
      this.$router.push({name: 'register'});
    },
    // remenberChange () {
    //   console.log(this.remenber);
    //   this.remenber = !this.remenber;
    // },
    findPwd(){
      this.$router.push({name: 'forgetPassword'});
    },
    judgePhone(){
      // if(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/.test(this.username)){
      //   this.phoneInValid = '';
      // }else{
      //   if(this.mobile.length == 0) return this.phoneInValid = '必填项';
      //   this.phoneInValid = '请输入合法的手机号码';
      // }
      if(this.mobile.length > 20){
        this.phoneInValid = '用户名最长为20位';
      }else if(this.mobile.length == 0){
        this.phoneInValid = '必填项';
      }else{
        this.phoneInValid = '';
      }

    },
  }
};
</script>

<style lang="less">
  @import '../../style/common.less';
  body[data-path=login]{
    background: #fff;


  }
    .logo{
    .px2rem(width, 200);
    .px2rem(height, 200);
    .px2rem(border-radius, 40);
    .px2rem(margin-top, 70);
    .px2rem(margin-bottom, 30);
    padding: 0.6em;
    background: #3c9;
    box-sizing: border-box;
  }

  .title{
    .px2px(font-size, 32);
    color: #3c9;
    .px2rem(margin-bottom, 90);
  }
  .login-form{
    .px2px(margin-left, 70);
    .px2px(margin-right, 70);
    // margin: 0 3.5rem;

    .user{
      border-bottom: 1px solid #d4dce1;
      // font-size: 1.2rem;
      .px2px(font-size, 24);
      .px2rem(padding-left, 84);
      .px2rem(margin-bottom, 40);
      // padding-left: 3rem;
      // margin-bottom: 2rem;
      color: #3c9;
      position: relative;
      .iconfont{
        .px2px(font-size, 60);
        // font-size: 3rem;
        position: absolute;
        left: 0;
        .px2px(top, -16);
      }
      input{
        .px2rem(padding-bottom, 10);
        .px2rem(height, 70);
        // height: 3.5rem;
        border: none;
        width: 100%;
        .px2px(font-size, 26);
        // font-size: 1.3rem;
        display: block;

        &:focus{
          outline: none;
        }
      }
      .validator-error{
        color: #f96868;
      }

    }

    .login{
      .px2rem(border-radius, 60);
      .px2rem(padding, 24);
      .px2rem(font-size, 32);
      .px2rem(margin-bottom, 10);

      background: #3c9;
      color: #fff;
      width: 100%;
      box-shadow: none;
      border: none;
    }

    .remenber-password{
      .px2px(font-size, 32);
      .px2rem(padding-bottom, 50);

      // font-size: 1.6rem;
      // padding-bottom: 2.5rem;
      text-align: right;
      color: #3c9;
      input{
        display: none;
      }

      .iconfont{
        .px2px(font-size, 40);
        // font-size: 2rem;
        vertical-align: middle;
      }
    }
  }


</style>
