<template>
<div>
<x-header>忘记密码</x-header>
<div class="text-center">
<tab>
  <tab-item selected @on-item-click="onItemClick">1.验证手机号</tab-item>
  <tab-item @on-item-click="onItemClick">2.重置密码</tab-item>
  <tab-item @on-item-click="onItemClick" disabled="true">3.完成</tab-item>
</tab>
<div v-if="index" class="validate">
<div class="login-form">
    <div class="user has-btn">
      <label class="remark">手机号</label>
      <input type="number" placeholder="请输入手机号" maxlength="11" v-model="username">
      <a class="CheckCodeBtn" @click='getCheckCode' :disabled="username.length !== 11">获取验证码</a>
    </div>
    <div class="user has-btn">
      <label class="remark">验证码</label>
      <input  placeholder="请输入验证码"  type="password"  v-model="checkCode">
    </div>
    <button @click='validate' class="btn" :disabled="username==='' || checkCode==''" >下一步</button>
    </div>
</div>
<div v-else class="reset">
<div class="login-form">
    <div class="user">
      <label class="remark">选择账号</label>
      <input type="number" placeholder="请选择账号" v-model="mobile">
    </div>
    <div class="user">
      <label class="remark">新密码</label>
      <input  placeholder="请输入新密码"  type="password"  v-model="password">
    </div>
    <div class="user">
      <label class="remark">确认密码</label>
      <input  placeholder="请确认密码"  type="password" v-model="passwordRep">
    </div>
      <button @click='updatepassword' class="btn" :disabled="username===''|| password==='' || password !== passwordRep ">下一步</button>
    </div>
</div>
</div>
</div>
</template>
<i18n>
set bar-active-color:
  zh-CN: 设置bar颜色
</i18n>
<script>
import {XHeader,Tab, TabItem} from 'vux';
export default {
  name: 'forgetPassword',
  components: {
    XHeader,
    Tab,
    TabItem,

  },
  data () {
    return {
        index:true,
        username: '',
        checkCode: ''
    };
  },
  methods: {
        onItemClick (index)
        {

            console.log('on item click:', index),
            this.index = !this.index
              },
        validate()
        {

        },
        getCheckCode () {
          console.log('获取验证码');
        },
        updatepassword(){}

  }
};

</script>

<style lang="less">
  @import '../../style/common.less';
  body{
    background: #fff;
  }
  tab
  {

    .px2px(margin-left, 70);
    .px2px(margin-right, 70);
  }
  .login-form{
    .px2px(margin-left, 70);
    .px2px(margin-right, 70);
    // margin: 0 3.5rem;
    .btn
    {
      position: relative;
      color:#fff;
      background:#F3B467;
      .px2rem(border-radius, 10);
      .px2rem(height, 70);
      .px2rem(margin-top, 60);
      border:transparent;
      width:100%;

    }
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
      .remark{
        .px2px(font-size, 24);
        position: absolute;
        left: 0;
        color:#000;
        .px2rem(bottom, 16);
      }

      .CheckCodeBtn{
        position: absolute;
        right: 0;
        .px2rem(line-height, 52);
        .px2rem(padding-left, 20);
        .px2rem(padding-right, 20);
        .px2rem(border-radius, 40);
        .px2rem(bottom, 5);
        background: #fff;
        border:1px solid #3c9;
        display: inline-block;
        color: #000;
      }
      input{
        .px2rem(padding-bottom,0);
        .px2rem(margin-left,30);
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
