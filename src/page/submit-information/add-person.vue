<template>
  <div class="myapp">
    <x-header :left-options="{showBack: false}">提交个人信息</x-header>
    <scroll class="scroll-normal" :on-refresh="onRefresh" refreshLayerColor='#fff' loadingLayerColor='#fff'>
    <div class="add-form">
      <group>
        <div>
          <x-input title="姓名&emsp;&emsp;" :max="10" placeholder="姓名" v-model="item.uname"></x-input>
          <div v-if="item.uname>10" class="valid-err">最多输入10位</div>
          <x-input title="身份证号" @on-change="getIdcValid" :max="18" :min="15" placeholder="身份证号" v-model="item.ucardid"></x-input>
          <div v-if="!idcValid" class="valid-err">请输入合法的身份证号码</div>
          <!-- <x-input title="联系电话" @on-change="getTelValid" is-type="china-mobile" :max="11" :min="11" placeholder="电话" v-model="item.utel"></x-input>
          <div v-if="!telValid" class="valid-err">请输入合法的电话号码</div>
          <x-input title="附加说明" :max="200" placeholder="说明" v-model="item.uremark"></x-input> -->
        </div>
      </group>


      <button @click='submit' :disabled="item.uoname == '' || item.ubusinesstype == '' || item.businessnumber == '' ||
            item.areid == ''  ||  !idcValid || !telValid || item.ubusinessaddress==''"
      class="round-big-btn">提交审核</button>
      <div v-transfer-dom>
        <loading :show="showload" text="提交资料中"></loading>
      </div>
    </div>
    </scroll>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XInput, Selector, Picker,Flexbox, Checklist,Loading,
 FlexboxItem,  PopupHeader, Popup, TransferDom } from 'vux';
import scroll from "../../components/scroll";
import { baseurl } from '../../config/axois';
import uploadImg from '../../components/uploadImg';
// import {_getlistbyparentid, _gettbsysbasicdatabycode} from '../../service/getdata';
import {employmentServices} from '../../service/EmploymentRegister';
import {IdentityCodeValid} from '../../utils/idc-valid';
import {_personServices} from '../../service/personServices';
import {_userServices} from '../../service/userServices';

export default {
  name: "submit-information-add-person",
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    uploadImg,
    XInput,
    Cell,
    Group,
    Selector,
    Picker,
    PopupHeader,
    Popup,
    Flexbox,
    FlexboxItem,
    Checklist,
    Loading,
    scroll
  },
  data() {
    return {
      item: {
        uname: '',
        ucardid: ""
      },
      idcValid: true,
      telValid: true,
    };
  },
  computed: {
  },
  created(){
    this.start();
  },
  methods: {
    submit() {
      // console.log(this.item);
      this.showload = true;
      let that = this;
      _personServices
        ._updateuserinfo(this.item)
        .then(function(data) {
          that.showload = false;
          if (data.ResultType == 0) {
            that.$vux.toast.show({
              text: "提交信息成功",
              type: 'success',
              position: 'middle'
            });
            that.$router.replace({ name: "appointment-list-person"});
          }
        })
        .catch(function(err) {
          that.showload = false;
          console.log(err, "err");
        });
    },
    onRefresh(done){
      this.start();
      setTimeout(() => {
        done(); //必须有
      }, 1500);
    },
    getIdcValid(value){
      // var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if((this.item.ucardid.length == 15 || this.item.ucardid.length==18) && IdentityCodeValid(this.item.ucardid)){
        this.idcValid = true;
      }else{
        if(this.item.ucardid.length !== 0) this.idcValid = false;
      }
    },
    getTelValid(value){
      var reg = /^((13[0-9])|(14[5|7])|(15([0-9]))|(17[0-9])|(18[0-9]))\d{8}$/;
      if((this.item.utel.length==11) && reg.test(this.item.utel)){
        this.telValid = true;
      }else{
        if(this.item.utel.length !== 0) this.telValid = false;
      }
    },
    start(){
      if(!!window.localStorage.getItem('areId')) this.areid = window.localStorage.getItem('areId');
      this.showload = false;
      let that = this;
      _userServices._getUserMsg().then(function(data1){
        if(data1.ULAudtiStatus == 0){
          if(that.read) that.$router.replace({name: 'submit-information-add-person'});
        }else if(data1.ULAudtiStatus == 3){
          that.$router.replace({name: 'appointment-list-person'});
        }
      }).catch(function(err){
        console.log(err)
      });
    }
  }
};
</script>


<style lang="less">
body[data-path=submit-information-add-person]{
  background: #3c9;
  /* cell样式更改 */
  .vux-label{
    color: #878f98;
    width: 5em;
  }
  .weui-cell__ft{
    color: #333;
  }

  .myapp {
    .valid-err{
      text-align: center;
      font-size: small;
      color: red;
    }
    .add-form {
      margin: 28/72*1rem;
      > div {
        background: #fff;
        border-radius: 0.2rem;
        .weui-cells {
          border-radius: 0.2rem;
        }
      }
      .round-big-btn {
        background: #fff;
        color: #3c9;
        margin-top: 0.5rem;
        &[disabled]{
          background: #ccc;
          color: cornsilk;
        }
      }

      .weui-cells__title {
        padding-top: 0.333rem;
        padding-bottom: 0.333rem;
      }

      .mid-title {
        padding: 0.29rem 0.2rem;
        background: #f5f2f2;
        color: #4caf50;
        position: relative;
        >span{
          border-left: .2em solid #3c9;
          padding-left: .3em;
        }
        .iconfont {
          position: absolute;
          right: 0.1rem;
        }
      }
    }
    .weui-label {
      color: #878f98;
    }

    .photo-item {
      position: relative;
      padding: 1em 1em 1em 0.138rem;
      > span {
        color: #999;
        position: absolute;
        left: 0.417rem;
        top: 50%;
        transform: translateY(-50%);
        text-align: left;
      }

      &::before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #e5e5e5;
        color: #e5e5e5;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        left: 15px;
      }
    }
  }
}
</style>
