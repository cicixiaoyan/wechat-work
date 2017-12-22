<template>
  <div>
    <x-header>用户注册</x-header>
    <div class="text-center">
      <img src="../../assets/logo.png" class="logo" title="logo"/>
      <div class="title">从业人员健康体检信息大数据平台</div>
    </div>
    <div class="login-form">
      <div class="user">
        <span class="iconfont icon-yonghuming"></span>
        <input type="number"  @input="judgePhone" @blur="judgePhone" @focus='dirtyPhone=true' placeholder="请输入手机号" maxlength="11" v-model="username">
        <div class="validator-error" v-if="!enableCheckBtn && dirtyPhone">{{phoneInValid}}</div>
      </div>

      <div class="user has-btn">
        <span class="iconfont icon-shenfenzhenghao"></span>
        <span class="CheckCodeBtn" @click='getCheckCode' :disabled="username.length !== 11 || !enableCheckBtn"><span v-html="checkCodeName"></span></span>
        <input  placeholder="请输入验证码"  @focus='dirtyCode=true' maxlength='6' type="number"  v-model="code">
        <div class="validator-error" v-if="code.length!==6 && dirtyCode">请输入合法验证码</div>
      </div>
      <div class="user">
        <span class="iconfont icon-mima"></span>
        <input  placeholder="请输入密码" @focus='dirtyPwd=true' minlength="6" maxlength='20' type="password"  v-model="pwd">
        <div class="validator-error" v-if="pwd.length<6 && dirtyPwd">密码最少6位</div>
      </div>
      <div class="user">
        <span class="iconfont icon-mima"></span>
        <input  placeholder="请确认密码" @focus='dirtyPwdRep=true' minlength="6" maxlength='20'  type="password"  v-model="pwdRep">
        <div class="validator-error" v-if="pwdRep != pwd && dirtyPwdRep">两次密码必须相同</div>
        <div class="validator-error" v-if="pwdRep == '' && dirtyPwdRep">确认密码必填</div>
      </div>


      <button @click='register' class="round-big-btn" :disabled="username===''|| pwd==='' || pwd !== pwdRep || code==''" >立即注册</button>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux';
import {_userServices} from '../../service/userServices';
export default {
  name: 'register',
  components: {
    XHeader
  },
  data () {
    return {
      username: '',
      pwd: '',
      pwdRep: '',
      code: '',
      msg_id: '',
      ip: '',
      dirtyPhone: false,
      dirtyPwd: false,
      dirtyPwdRep: false,
      dirtyCode: false,
      checkCodeName: '获取验证码',
      enableCheckBtn: false,
      phoneInValid: '',
      expkey:''
    };
  },
  created(){

 //获取验证码时间戳返回值  //需要隐藏显示变量 expkey
//       {
//      "ResultType": 0,
//      "Message": "",
//       "LogMessage": "",
//      "AppendData": "gHz+B39B8Fyb0XGllCuwaIlFv8QGP2CeW0wKxnbvlK7qfylPt3YYqYMK81sQDZ3A" //expkey
// }
    let that = this;
    _userServices._getCodeExpkey({key:this.$store.state.parmaCommon}).then(function(data){
          //绑定模型 expkey
        that.expkey = encodeURIComponent(data.AppendData);
    });

  },
  methods: {
    judgePhone(){
      if(/^((13[0-9])|(14[5|7])|(15([0-9]))|(17([0-9]))|(18[0-9]))\d{8}$/.test(this.username)){
        // 后台验证是否为已注册
        // this.phoneInValid = '改手机号已存在';
        this.enableCheckBtn = true;
        this.phoneInValid = '';
      }else{
        this.enableCheckBtn = false;
        if(this.username.length == 0) return this.phoneInValid = '手机号必填';
        this.phoneInValid = '请输入合法的手机号码';
      }
      
    },

    register () {
    //点击注册
      let that = this;
      _userServices._userRegister(
        {username:this.username,pwd:this.pwd,tel:this.username,code:this.code,msg_id:this.msg_id}
        )
      .then(function(data){
          //注册返回值  //注册成功到登录 失败提示 Message
          // {
          //   "ResultType": 1,
          //   "Message": "验证码无效",
          //   "LogMessage": "",
          //   "AppendData": null
          // }
        if(data.ResultType == 0){
          that.$vux.toast.show({
            text: "注册成功",
            type: 'success',
            position: 'middle',
            time: 2000
          });
          that.$router.push({name: "login"});
        }
      }).catch(function(err){
        console.log(err);

      });
      // this.$router.push({path: '/app/submit-information/add'});
    },
    getCheckCode () {
      let that = this;
      if(that.enableCheckBtn == false) return;
      _userServices._sendCodeRegister({expkey:this.expkey,tel:this.username}).then(function(data){
      //绑定模型 expkey 、msg_id  只要失败就提示 Message
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

      }).catch(function(err){

        console.log(err);
      });



    }
  }
};
</script>


<style lang="less">
  @import '../../style/common.less';
  body[data-path=register]{
    background: #fff;

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
          .px2px(top, -16);
        }

        .CheckCodeBtn{
          position: absolute;
          right: 0;
          .px2rem(line-height, 52);
          .px2rem(border-radius, 40);
          .px2rem(top, 10);
          width: 6.5em;
          text-align: center;
          background: #3c9;
          display: inline-block;
          color: #fff;
          &[disabled]{
            background: #bbb;
            pointer-events: none;
          }
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
  }


</style>
