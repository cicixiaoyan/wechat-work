<template>
  <div class="myapp">
    <x-header :left-options="{showBack: false}">提交机构信息</x-header>
    <scroll class="scroll-normal" :on-refresh="onRefresh" refreshLayerColor='#fff' loadingLayerColor='#fff'>
    <div class="add-form">
      <group>
        <div class="mid-title"><span>必填项</span></div>
        <x-input title="机构名称" required :min="2"  :max="50" placeholder="机构名称" v-model="item.uoname"></x-input>
        <selector title="机构类型" required ref='ubusinesstype'  v-model="item.ubusinesstype" :value-map="['BDID','Value']" :options="tbsysbasicdatabycode" placeholder="请选择"></selector>
        <x-input title="执照代码" required :max="30" placeholder="营业执照统一社会信用代码" v-model="item.businessnumber"></x-input>
        <!-- <x-input title="所属区域"  required placeholder="所属区域"  @click.native="showArea=true"  v-model="item.arename"></x-input> -->
        <cell title="所属区域" is-link value-align='left' placeholder="所属区域" :value="item.arename||'请选择'" @click.native="showArea=true"></cell>
        <x-input title="经营地址" required :max="200" placeholder="经营地址" v-model="item.ubusinessaddress"></x-input>
        <div class="photo-item" style="text-align:right;">
          <span>身份证正面照<br><span style="font-size:small;color:red;">(必须原件)</span></span>
          <uploadImg id='cardidimg' name="cardidimg" :imgSrc="cardidimg" @onChange="cardidimgChange" v-model="cardidimg" theme="light"></uploadImg>
        </div>
        <div class="photo-item" style="text-align:right;">
          <span>营业执照<br><span style="font-size:small;color:red;">(必须原件)</span></span>
          <uploadImg  @onChange='licenceimgChange' id='licenceimg' :imgSrc="licenceimg" name="licenceimg" v-model="licenceimg" theme="light"></uploadImg><br/>
          <uploadImg @onChange='licenceimgChange1' v-if='licenceimg.length!==0' :imgSrc="licenceimg1" id='licenceimg1' name="licenceimg1" v-model="licenceimg1" theme="light"></uploadImg>
        </div>
      </group>

      <group>
        <div class="mid-title" @click='Optionalshow'>
          <span>选填项
          <span class="iconfont icon-iconfontplatformentrance" v-if="!showOptional"></span>
          <span class="iconfont icon-down1" v-if="showOptional"></span>
          </span>
        </div>
        <div v-show="showOptional">
          <x-input title="法人&emsp;&emsp;" :max="10" placeholder="法人" v-model="item.ulowman"></x-input>
          <div v-if="item.ulowman>10" class="valid-err">最多输入10位</div>
          <x-input title="身份证号" @on-change="getIdcValid" :max="18" :min="15" placeholder="身份证号" v-model="item.ucardid"></x-input>
          <div v-if="!idcValid" class="valid-err">请输入合法的身份证号码</div>
          <x-input title="联系电话" @on-change="getTelValid" is-type="china-mobile" :max="11" :min="11" placeholder="电话" v-model="item.utel"></x-input>
          <div v-if="!telValid" class="valid-err">请输入合法的电话号码</div>
          <x-input title="附加说明" :max="200" placeholder="说明" v-model="item.uremark"></x-input>
          <div class="photo-item" style="text-align:right;">
            <span>卫生许可<br><span style="font-size:small;;color:red;">(必须原件)</span></span>
            <uploadImg  @onChange='permitimgChange' id='permitimg' :imgSrc="permitimg" name="permitimg" v-model="permitimg" theme="light"></uploadImg><br>
            <uploadImg @onChange='permitimgChange1' v-if='permitimg.length != 0' :imgSrc="permitimg1" id='permitimg1' name="permitimg1" v-model="permitimg1" theme="light"></uploadImg>
          </div>
        </div>
      </group>


      <button @click='submit' :disabled="item.uoname == '' || item.ubusinesstype == '' || item.businessnumber == '' ||
            item.areid == '' || cardidimg.length == 0 || licenceimg.length == 0 || !idcValid || !telValid || item.ubusinessaddress==''"
      class="round-big-btn">提交审核</button>

      <div v-transfer-dom>
        <popup v-model="showArea">
          <popup-header :left-text="haschidren?'返回上一级':''" @on-click-left="haschidren = false" right-text="" title="区域选择"></popup-header>
          <div class="pop-content">
            <checklist v-show="!haschidren"   :options="objectList" :max="1" :value="objectListValue" @on-change="changeArea"></checklist>
            <checklist v-if="haschidren"  :options="objectList1" :max="1" :value="objectListValue1" @on-change="changeArea1"></checklist>
          </div>
        </popup>
      </div>

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
import {_userServices} from '../../service/userServices';
export default {
  name: "submit-information-add",
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
        uname:"",
        usex:'',
        utel:'',
        ucardid: '',
        uoname:'',
        areid:'',
        arename:'',
        ubusinessaddress:'',
        ubusinesstype:'',
        ubusinesstypename:'',
        ulowman:'',
        businessnumber:'',
        uremark:'',
        upicurl:'',
        cardidimg: '',
        licenceimg: '',
        permitimg: '',
        ulaudtistatus:'',
        ulstatus:'',
        description:'',
        showload: false
      },
      cardidimg:'',
      licenceimg:'',
      licenceimg1:'',
      permitimg:'',
      permitimg1:'',
      showOptional: false,
      showArea: false,
      tbsysbasicdatabycode: [],
      objectListValue: [],
      objectListValue1: [],
      objectList: [],
      idcValid: true,
      telValid: true,
      haschidren: false,
      objectList1: [],
      areid:'',
      isSubmit: false
      // gettbsysbasicdatabycode: []
    };
  },
  computed: {
  },
  created(){
    this.start();
  },
  methods: {
    submit() {
      this.showload = true;
      let that = this;
      that.item.ubusinesstypename = that.$refs['ubusinesstype'].getFullValue()[0].Name;
      console.log(this.item);
      employmentServices
        ._editorganizeinfo(this.item)
        .then(function(data) {
          that.showload = false;
          if (data.ResultType == 0) {
            that.$vux.toast.show({
              text: "提交信息成功",
              type: 'success',
              position: 'middle'
            });
            that.isSubmit = true;
            that.$router.replace({ name: "submit-information-view", params: {read: 'true'}});
          }
        })
        .catch(function(err) {
          that.showload = false;
          this.isSubmit = false;
          console.log(err, "err");
        });
    },
    onRefresh(done){
      this.start();
      setTimeout(() => {
        done(); //必须有
      }, 1500);
    },
    cardidimgChange(file, name){
      this.cardidimg = file;
      this.item.cardidimg =  encodeURIComponent(file);
    },
    licenceimgChange(file, name){
      this.licenceimg = file;
      if(this.licenceimg1.length > 10) this.item.licenceimg = encodeURIComponent(file+"|"+this.licenceimg1);
      else this.item.licenceimg = encodeURIComponent(file)
    },
    licenceimgChange1(file, name){
      this.licenceimg1 = file;
      this.item.licenceimg = encodeURIComponent(this.licenceimg+"|"+file);
    },
    permitimgChange(file, name){
      this.permitimg = file;
      if(this.permitimg1.length > 10) this.item.permitimg = encodeURIComponent(file+"|"+this.permitimg1);
      else this.item.permitimg = encodeURIComponent(file)
    },
    permitimgChange1(file, name){
      this.permitimg1 = file;
      this.item.permitimg = encodeURIComponent(this.permitimg+"|"+file);
    },
    Optionalshow() {
      this.showOptional = !this.showOptional;
    },
    changeAreid(){

    },
    set(){
      this.showArea = false;
    },
    changeArea(val, label){
      let that = this;
      if(val.length !== 0){
        if(that.areid != ''){
            that.showArea = false;
            that.haschidren = false;
            that.item.areid = val[0];
            that.item.arename = label[0];
        }else{
          let values =  val[0].split(",");
          let parma = {"areid": values[0]}
          employmentServices._getlistbyparentid(parma)
          .then(function(data){
            let list = data.AppendData;
            if(list.length == 0){
              that.showArea = false;
              that.haschidren = false;
              that.item.areid = values[1];
              that.item.arename = label[0];
            }else{
              that.haschidren = true;
              that.showArea = true;
              list.forEach(function(value, index, array1){
                list[index].key = [value.AreID, value.AreCode].join(",");
                list[index].value = value.AreName;
              });
              that.objectList1 = list;
            }
          })
          .catch(function(){

          })
        }

      }

    },
    changeArea1(value, label){
      if(value.length != 0){
        let values =  value[0].split(",");
        this.item.areid = values[1];
        this.item.arename = label[0];
        this.showArea = false;
        this.haschidren = true;
      }
    },
    gettbsysbasicdatabycode() {
      var that = this;
      return employmentServices._gettbsysbasicdatabycode().then(function(data){
        let list = data.AppendData;
        that.tbsysbasicdatabycode = list;
      }).catch(err => console.log(err))
    },
    getareas(){
      var that = this;
      if(that.areid != ''){ // 存在areaId 
        let params = {"areid": that.areid};
        return employmentServices._getlistbyareidone(params).then(function(data){
          let list = data.AppendData;
          list.forEach(function(value, index, array1){
            list[index].key = value.AreCode
            list[index].value = value.AreName;
          });
          that.objectList = list;
        }).catch(err => console.log(err));

      }else{ // 不存在areaId 
        return employmentServices._getareas().then(function(data){
          let list = data.AppendData;
          list.forEach(function(value, index, array1){
            list[index].key = [value.AreID, value.AreCode].toString();
            list[index].value = value.AreName;
          });
          that.objectList = list;

        }).catch(err => console.log(err));

      }
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
        if(data1.ULAudtiStatus == 1){
          if(that.read) that.$router.replace({name: 'submit-information-view', params: { 'read': false }});
        }else if(data1.ULAudtiStatus == 2){
          if(!that.read)  that.$router.replace({name: 'submit-information-view', params: { 'read': true }});
        }else if(data1.ULAudtiStatus == 3){
          that.$router.replace({name: 'staff-information-list'});
        }
      }).catch(function(err){
        console.log(err)
      });

      if (this.$store.getters.getSubmitItem){
        
        this.item = this.$store.getters.getSubmitItem;
        this.cardidimg = !!this.item.cardidimg?decodeURIComponent(this.item.cardidimg):'';
        this.licenceimg = !!this.item.licenceimg?decodeURIComponent(this.item.licenceimg):'';
        console.log(this.cardidimg, this.licenceimg);
        this.licenceimg1 = !!this.item.licenceimg1?decodeURIComponent(this.item.licenceimg1):'';
        this.permitimg = !!this.item.permitimg?decodeURIComponent(this.item.permitimg):'';
        this.permitimg1 = !!this.item.permitimg1?decodeURIComponent(this.item.permitimg1):'';
        if(this.areid != ''){
          this.objectListValue[0] = this.item.areid;
          this.objectListValue[1] = this.item.arename;
        }
        console.log(this.item);
      }

      this.getareas();
      this.gettbsysbasicdatabycode();

    }
  },
  beforeDestroy(){
    if (!this.isSubmit){

      this.$store.commit('updateSubmitItem', this.item);
    }
  }
};
</script>


<style lang="less">
body[data-path=submit-information-add]{
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
