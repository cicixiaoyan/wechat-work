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
        <input type="number" placeholder="请输入手机号" maxlength="11" v-model="username">
      </div>
      <div class="user has-btn">
        <span class="iconfont icon-mobilephone"></span>
        <a class="CheckCodeBtn" @click='getCheckCode' :disabled="username.length !== 11">获取验证码</a>
        <input  placeholder="请输入验证码"  type="password"  v-model="checkCode">
      </div>
      <div class="user">
        <span class="iconfont icon-mobilephone"></span>
        <input  placeholder="请输入密码"  type="password"  v-model="password">
      </div>
      <div class="user">
        <span class="iconfont icon-mobilephone"></span>
        <input  placeholder="请确认密码"  type="password"  v-model="passwordRep">
      </div>


      <button @click='register' class="round-big-btn" :disabled="username===''|| password==='' || password !== passwordRep || checkCode==''" >立即注册</button>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux';
export default {
  name: 'register',
  components: {
    XHeader
  },
  data () {
    return {
      username: '13155555555',
      password: '123456',
      passwordRep: '',
      checkCode: ''
    };
  },
  methods: {
    register () {
      console.log(123);
      this.$router.push({path: '/app/submit-information/add'});
    },
    getCheckCode () {
      console.log('获取验证码');
    }
  }
};
</script>


<style lang="less">
  @import '../../style/common.less';
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
      &.has-btn{
        .px2rem(padding-right, 80);
      }
      border-bottom: 1px solid #d4dce1;
      .px2px(font-size, 24);
      .px2rem(padding-left, 84);
      .px2rem(margin-bottom, 40);
      color: #3c9;
      position: relative;
      .iconfont{
        .px2px(font-size, 60);
        position: absolute;
        left: 0;
        bottom: 0;
      }

      .CheckCodeBtn{
        position: absolute;
        right: 0;
        .px2rem(line-height, 52);
        .px2rem(padding-left, 20);
        .px2rem(padding-right, 20);
        .px2rem(border-radius, 40);
        .px2rem(bottom, 16);
        background: #3c9;
        display: inline-block;
        color: #fff;
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

    }

    // .login{
    //   .px2rem(border-radius, 60);
    //   .px2rem(padding, 24);
    //   .px2rem(font-size, 32);

    //   background: #3c9;
    //   color: #fff;
    //   // border-radius: 3rem;
    //   // padding: 1.2rem;
    //   // font-size: 1.6rem;
    //   width: 100%;
    //   box-shadow: none;
    //   border: none;
    // }

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

