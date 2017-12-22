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
      <input type="number" @input='judgePhone' @focus='dirtyPhone=true'  placeholder="请输入手机号" maxlength="11"  v-model="username">
      <a class="CheckCodeBtn" @click='getCheckCode' :disabled="username.length !== 11 || !enableCheckBtn"><span v-html="checkCodeName"></span></a>
    </div>
    <div class="validator-error" v-if="!enableCheckBtn && dirtyPhone">{{phoneInValid}}</div>
    <div class="user has-btn">
      <label class="remark">验证码</label>
      <input  placeholder="请输入验证码" @focus='dirtyCode=true'   v-model="checkCode"/>
    </div>
    <div class="validator-error" v-if="checkCode.length!==6 && dirtyCode">请输入合法验证码</div>
  <button @click='validate' class="btn btn-disabled" :disabled="checkCode.length !==6 && username.length !=11 && phoneInValid=='' ">验证手机号</button>
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
      <input  placeholder="请输入新密码" @focus='dirtyPwd=true'  type="password"  v-model="password">
    </div>
    <div class="validator-error" v-if="password.length < 6 && dirtyPwd">密码不能小于6位</div>

    <div class="user">
      <label class="remark">确认密码</label>
      <input  placeholder="请确认密码" @focus='dirtyPwdRep=true' type="password" v-model="passwordRep">
    </div>
    <div class="validator-error" v-if="passwordRep.length < 6 && dirtyPwdRep">确认密码不能小于6位</div>
    <div class="validator-error" v-if="passwordRep.length >= 6 && (password != passwordRep) && dirtyPwdRep">两次密码不一致</div>

    <button @click='updatepassword' class="btn" :disabled="selected===''|| password.length <6 || password !== passwordRep" >设置密码</button>
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
      options: [],
      expkey: '',
      checkCodeName: '获取验证码',
      enableCheckBtn: false,
      dirtyPhone: false,
      phoneInValid: '',
      dirtyCode: false,
      passwordRep: '',
      dirtyPwdRep: false,
      dirtyPwd: false,
      password: '',
      passwordRep: ''
    };
  },
  created(){
    let that = this;
    _forgetPasswordService.getcodeexpkey(that.$store.state.parmaCommon).then(function(data){
          //绑定模型 expkey
        that.expkey = encodeURIComponent(data.AppendData);
    });

    document.onkeydown = function(event){
      var ev = event || window.event || arguments.callee.caller.arguments[0];
      if (ev && ev.keyCode == 13) {
        if(that.index == 0){
          if(that.checkCode.length !==6 && that.username.length != 11 && that.phoneInValid == '') return;
          that.validate();
        }else{
          if(that.selected===''|| that.password.length < 6 || that.password !== passwordRep) return;
          that.updatepassword();
        }
      }
    };
  },
  methods: {
    // onItemClick(index) {
    //   console.log("on item click:", index), (this.index = index);
    // },
    validate() {
      let that = this;
      if (this.msgcode.length > 5 && this.checkCode.length >= 6) {
        _forgetPasswordService
          .findpassword_step1(this.$store.state.parmaCommon,this.username, this.msgcode, this.checkCode)
          // .findpassword_step1(that.expkey,this.username, this.msgcode, this.checkCode)
          .then(data => {
            // 检查验证码是否正确
            if (data.ResultType == 0 && data.AppendData.status == 1) {
              that.validateResult = data.AppendData;
              let secretCodeArray = that.validateResult.listsecretcode;
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
              that.index = 1;

              // { "ResultType":0,
              //   "Message":"",
              //   "LogMessage":"",
              //   "AppendData":{
              //     "status":1,
              //     "secretId":"QDinAZ00CDnph3TeUzQZZhXN9qC35zAwreYCZMgXWU8v97M2hl9bQ7rtGvaqZ06w",
              //     "listsecretcode":["bwGIpRDwJMpyNZDmQRGBi9sDK6m+Ki0rMUaEgjxM9EFWfcRhCfg/UWvpaO2AHhMojLNxUSSrdZYq/JBSncGS4tIvjARSfFPz4U2Ejjlvqxw=|15608066283 "]
              //   }
              // }

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
      if(that.enableCheckBtn == false) return;
      _forgetPasswordService
        .getVerifyCode(this.username, that.expkey)
        .then(data => {

            this.msgcode = data.AppendData.msg_id;
            that.$vux.toast.show({
              text: "验证码发送成功",
              type: 'success',
              position: 'middle',
              time: 2000
            });
            that.expkey = encodeURIComponent(data.AppendData.expkey);
            that.msg_id = encodeURIComponent(data.AppendData.msg_id);
            let number = 60*3;
            that.dirtyPhone = false;
            that.enableCheckBtn = false;
            that.checkCodeName = "还剩<span style='color:#ff5722'>&nbsp;"+ number +"&nbsp;</span>S";
            let timer = window.setInterval(function growUp() {
              number -= 1;
              that.checkCodeName = "还剩<span style='color:#ff5722'>&nbsp;"+ number +"&nbsp;</span>S";
              if(number === 0){
                that.checkCodeName = "获取验证码";
                that.enableCheckBtn = true;
                window.clearInterval(timer);
              }
            }, 1000);
            // TODO : 进入验证码三分钟有效期倒计时
         
          // console.log("获取验证码的返回值 : ", response);
        });

      // console.log("手机 = ", this.username);
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
            this.$store.state.parmaCommon,
            secretId,
            this.selected,
            this.password,
            this.passwordRep
          )
          // .findpassword_step2(
          //   that.expkey,
          //   secretId,
          //   this.selected,
          //   this.password,
          //   this.passwordRep
          // )
          .then(result => {
            if (result.ResultType == 0) {
              // console.log("密码修改成功 = ", result);
              // alert("密码修改成功");
              // TODO : 跳转到成功页面
              that.$vux.toast.show({
                text: "重置密码成功",
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
    },
    judgePhone(){
      if(/^((13[0-9])|(14[5|7])|(15([0-9]))|(17([0-9]))|(18[0-9]))\d{8}$/.test(this.username)){
        this.phoneInValid = '';
        this.enableCheckBtn = true;
      }else{
        this.enableCheckBtn = false;
        if(this.username.length == 0) return this.phoneInValid = '手机号必填';
        this.phoneInValid = '请输入合法的手机号码';
      }
      // console.log(this.enableCheckBtn)
      // this.enableCheckBtn = true;
    },
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
      // .px2rem(padding-left, 84);
      .px2rem(margin-bottom, 40);
      padding-left: 4.5em;
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
        .px2rem(bottom, 10);
        background: #fff;
        border: 1px solid #3c9;
        display: inline-block;
        color: #000;
        &[disabled]{
          background: #ddd;
          color: #fff;
          border-color: #ddd;
        }
      }
      input, select {
        .px2rem(padding-bottom,0);
        .px2rem(height, 70);
        border: none;
        width: 100%;
        .px2px(font-size, 26);
        display: block;

        &:focus {
          outline: none;
        }
      }

    }

    .validator-error{
      position: relative;
      .px2rem(top, -20);
      color: red;
      left: 4.5em;
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
