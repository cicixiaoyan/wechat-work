<template>
  <div>
    <x-header>用户登陆</x-header>
    <div class="text-center">
      <img src="../../assets/logo.png" class="logo" title="logo"/>
      <div class="title">从业人员健康体检信息大数据平台</div>
    </div>
    <div class="login-form">
      <div class="user">
        <span class="iconfont icon-mobilephone"></span>
        <input type="number" @input="judgePhone" @blur="judgePhone" maxlength="11" placeholder="请输入手机号" v-model="mobile">
        <div class="validator-error" v-if="phoneInValid != ''">{{phoneInValid}}</div>
      </div>
      <div class="user">
        <span class="iconfont icon-mobilephone"></span>
        <input  placeholder="请输入登录" maxlength='6' @input type="password"  v-model="password">
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

      <button @click='login' class="login" :disabled="mobile===''|| password===''" >登陆</button>
    </div>
  </div>
</template>

<script>
import { XHeader, AjaxPlugin } from 'vux';
import { Login } from '../../service/getdata';
export default {
  name: 'login',
  components: {
    XHeader
  },
  data () {
    return {
      mobile: '13155555555',
      password: '123456',
      remember: false,
      phoneInValid: ''
    };
  },
  methods: {
    login () {
      this.$router.push({name: 'register'});
      // let that = this;
      // let data = Login({username:'ynkjd123456',pwd:"ynk123456"});
      // if(data){
      //   window.localStorage.setItem('userInfo', data.AppendData);
      //   this.$router.push({name: 'register'});
      // }
    },
    // remenberChange () {
    //   console.log(this.remenber);
    //   this.remenber = !this.remenber;
    // },
    findPwd(){
      this.$router.push({path: '/app/forgetPassword'});
    },
    judgePhone(){
      if(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/.test(this.username)){
        this.phoneInValid = '';
      }else{
        if(this.mobile.length == 0) return this.phoneInValid = '手机号必填';
        this.phoneInValid = '请输入合法的手机号码';
      }

    },
  }
};
</script>

<style lang="less">
  @import '../../style/common.less';
  body{
    background: #fff;
  }
  .logo{
    .px2rem(width, 200);
    .px2rem(height, 200);
    .px2rem(border-radius, 40);
    .px2rem(margin-top, 70);
    .px2rem(margin-bottom, 30);
    background: green;
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
