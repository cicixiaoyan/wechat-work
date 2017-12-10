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
        <input type="number" placeholder="请输入用户名" v-model="mobile">
      </div>
      <div class="user">
        <span class="iconfont icon-mobilephone"></span>
        <input  placeholder="请输入登录"  type="password"  v-model="password">
      </div>
      <div class="remenber-password">
        <div @click='remenberChange'>
          <span class="iconfont icon-circle1" v-if="!remenber"></span>
          <span class="iconfont icon-circle" v-if="remenber"></span>
          <input  type="checkbox"  v-model="remenber">记住密码
        </div>
      </div>

      <button @click='login' class="login" :disabled="mobile===''|| password===''" >登陆</button>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux';

export default {
  name: 'login',
  components: {
    XHeader
  },
  data () {
    return {
      mobile: '13155555555',
      password: '123456',
      remenber: false
    };
  },
  methods: {
    login () {
      console.log(1);
      this.$router.push({path: '/app/register'});
    },
    remenberChange () {
      console.log(this.remenber);
      this.remenber = !this.remenber;
    }
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
        bottom: 0;
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

    .login{
      .px2rem(border-radius, 60);
      .px2rem(padding, 24);
      .px2rem(font-size, 32);

      background: #3c9;
      color: #fff;
      // border-radius: 3rem;
      // padding: 1.2rem;
      // font-size: 1.6rem;
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
