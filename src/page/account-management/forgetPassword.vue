<template>
<div>
<x-header>忘记密码</x-header>
<div class="text-center">
  <img src="../../assets/logo.png" class="logo" title="logo"/>
  <div class="title">成都市从业人员体检预约平台</div>
</div>
<div>
  <flow>

    <flow-state state="1" title="开始" is-done></flow-state>
    <flow-line  tip="进行中" :is-done='step0'></flow-line>

    <flow-state state="2" title='验证手机号' :is-done='step0'></flow-state>
    <flow-line v-if='step0' tip="进行中"></flow-line>
    <flow-line v-if='!step0'></flow-line>

    <flow-state state="3" title="重置密码" ></flow-state>
  </flow>
<div v-if="index == 0" class="validate">
<div class="login-form">
    <div class="user has-btn">
      <label class="remark">手机号</label>
      <input type="number" placeholder="请输入手机号" maxlength="11"  v-model="username">
      <a class="CheckCodeBtn" @click='getCheckCode'>获取验证码</a>
    </div>
    <div class="user has-btn">
      <label class="remark">验证码</label>
      <input  placeholder="请输入验证码"  type="password"  v-model="checkCode">
    </div>
    <button @click='validate' class="btn btn-disabled" :disabled="username==='' || checkCode==''">验证手机号</button>
    </div>
</div>
<div v-else-if="index == 1" class="reset">
<div class="login-form">
    <div class="user">
      <label class="remark">选择账号</label>
      <!-- <input type="number" placeholder="请选择账号" v-model="mobile"> -->
      <select v-model="selected">
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
      </select>
    </div>
    <div class="user">
      <label class="remark">新密码</label>
      <input  placeholder="请输入新密码"  type="password"  v-model="password">
    </div>
    <div class="user">
      <label class="remark">确认密码</label>
      <input  placeholder="请确认密码"  type="password" v-model="passwordRep">
    </div>
      <button @click='updatepassword' class="btn" :disabled="mobile===''|| password==='' || password !== passwordRep" >设置密码</button>
    </div>
</div>
</div>

</div>
</template>
<script>
import { XHeader, Flow, FlowLine, FlowState  } from "vux";
import { _forgetPasswordService } from "../../service/forgetPasswordService";

export default {
  name: "forgetPassword",
  components: {
    XHeader,
    Flow,
    FlowLine,
    FlowState
  },
  data() {
    return {
      step0: false,
      index: 0,
      username: "",
      checkCode: "",
      msgcode: "",
      validateResult: null,
      selected: "",
      options: [{ text: "成都同心用朔技有限公司", value: "uoso" }]
    };
  },
  methods: {
    onItemClick(index) {
      console.log("on item click:", index), (this.index = index);
    },
    validate() {
      let that = this;
      if (this.msgcode.length > 5 && this.checkCode.length >= 6) {
        _forgetPasswordService
          .findpassword_step1(this.username, this.msgcode, this.checkCode)
          .then(data => {
            // 检查验证码是否正确
            if (data.ResultType == 0 && data.AppendData.status == 1) {
              that.validateResult = data.AppendData;
              let secretCodeArray = this.validateResult.listsecretcode;
              that.options = [];
              secretCodeArray.forEach(element => {
                that.options.push({
                  text: element.split("|")[1],
                  value: element.split("|")[0]
                });
              });
              // alert("验证通过,请点击重置密码页设置您的新密码");
              // TODO : 跳转
              that.step0 = true;
            } else {
              that.$vux.toast.show({
                text: "验证码错误",
                type: 'warn',
                position: 'middle'
              });
              // alert("验证码错误");
            }
          });
      } else {
        that.$vux.toast.show({
          text: "请输入手机号并且获取验证码",
          type: 'warn',
          position: 'middle'
        });
        // alert("请输入手机号并且获取验证码");
      }
    },
    getCheckCode() {
      let that = this;
      _forgetPasswordService.getcodeexpkey().then(datetimekey => {
        if (
          datetimekey.ResultType == 0 &&
          typeof datetimekey.AppendData == "string"
        ) {
          let key = datetimekey.AppendData;
          _forgetPasswordService
            .getVerifyCode(this.username, key)
            .then(response => {
              if (response.ResultType == 0) {
                this.msgcode = response.AppendData.msg_id;
                // TODO : 进入验证码三分钟有效期倒计时
              } else {
                that.$vux.toast.show({
                  text: response.Message,
                  type: 'warn',
                  position: 'middle'
                });
                // console.log("获取验证码失败", response.Message);
                // alert(response.Message);
              }
              // console.log("获取验证码的返回值 : ", response);
            });
        }
      });

      console.log("手机 = ", this.username);
    },
    updatepassword() {
      let that = this;
      // console.log("密码修改, ", this.validateResult);
      // 点了修改密码后

      if (this.validateResult != null) {
        if (this.selected == null || this.selected.length < 5) {
          this.$vux.toast.show({
            text: "请选择账号",
            type: 'warn',
            position: 'middle'
          });
          // alert("请选择账号");
          return;
        }

        let secretId = this.validateResult.secretId;
        let status = this.validateResult.status;
        this.mobile = "";

        _forgetPasswordService
          .findpassword_step2(
            secretId,
            this.selected,
            this.password,
            this.passwordRep
          )
          .then(result => {
            if (result.ResultType == 0) {
              // console.log("密码修改成功 = ", result);
              // alert("密码修改成功");
              // TODO : 跳转到成功页面
              that.$vux.toast.show({
                text: "密码修改成功",
                type: 'warn',
                position: 'middle'
              });
              that.$router.push({name: 'login'});
              // alert("密码修改成功");
            }
          });
      } else {
        that.$vux.toast.show({
          text: "获取失败",
          type: 'warn',
          position: 'middle'
        });
        // alert("获取失败");
      }
    }
  }
};
</script>

<style lang="less">
@import "../../style/common.less";
body[data-path=forgetPassword] {
  background: #fff;
  [class^="weui-wepay-flow__title-"],
  [class*=" weui-wepay-flow__title-"]{
    .px2px(font-size, 24);
  }

  .weui-wepay-flow, .weui-wepay-flow-auto{
        // padding: 0 40px 56px;
      .px2rem(padding, 80);
      .px2rem(padding-top, 0);
      .px2rem(padding-bottom, 110);
  }
  .weui-wepay-flow__li_done .weui-wepay-flow__title-bottom{
    color: #555;
  }

  [class^="weui-wepay-flow__info-"],
  .weui-wepay-flow__process,
  .weui-wepay-flow__li_done .weui-wepay-flow__state{
    background-color: #3c9;
  }

  .logo {
    .px2rem(width, 200);
    .px2rem(height, 200);
    .px2rem(border-radius, 40);
    .px2rem(margin-top, 70);
    .px2rem(margin-bottom, 30);
    padding: 0.6em;
    background: #3c9;
    box-sizing: border-box;
  }

  .title {
    .px2px(font-size, 32);
    color: #3c9;
    .px2rem(margin-bottom, 90);
  }

  .login-form {
    .px2px(margin-left, 70);
    .px2px(margin-right, 70);
    // margin: 0 3.5rem;
    .btn {
      position: relative;
      color: #fff;
      background: #f3b467;
      .px2rem(border-radius, 10);
      .px2rem(height, 70);
      .px2rem(margin-top, 60);
      border: transparent;
      width: 100%;
    }
    .user {
      &.has-btn {
        .px2rem(padding-right, 80);
      }
      border-bottom: 1px solid #d4dce1;
      .px2px(font-size, 24);
      .px2rem(padding-left, 84);
      .px2rem(margin-bottom, 40);
      color: #3c9;
      position: relative;
      .remark {
        .px2px(font-size, 24);
        position: absolute;
        left: 0;
        color: #000;
        .px2rem(bottom, 16);
      }

      .CheckCodeBtn {
        position: absolute;
        right: 0;
        .px2rem(line-height, 52);
        .px2rem(padding-left, 20);
        .px2rem(padding-right, 20);
        .px2rem(border-radius, 40);
        .px2rem(bottom, 5);
        background: #fff;
        border: 1px solid #3c9;
        display: inline-block;
        color: #000;
      }
      input {
        .px2rem(padding-bottom,0);
        .px2rem(margin-left,30);
        .px2rem(height, 70);
        // height: 3.5rem;
        border: none;
        width: 100%;
        .px2px(font-size, 26);
        // font-size: 1.3rem;
        display: block;

        &:focus {
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

    .remenber-password {
      .px2px(font-size, 32);
      .px2rem(padding-bottom, 50);

      // font-size: 1.6rem;
      // padding-bottom: 2.5rem;
      text-align: right;
      color: #3c9;
      input {
        display: none;
      }

      .iconfont {
        .px2px(font-size, 40);
        // font-size: 2rem;
        vertical-align: middle;
      }

      .btn-disabled {
        background: red;
      }
    }
  }
}
</style>
