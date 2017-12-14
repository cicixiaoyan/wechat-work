<template>
  <div class="myapp">
    <x-header>提交机构信息</x-header>
    <div class="wait" v-if="read"><span class="iconfont icon-shenhezhong"></span>资料审核中，请稍后再来。。。</div>
    <div class="wait" v-if="!read"><span class="iconfont icon-fail"></span>审核失败！{{item.Description}}</div>
    
    <div class="add-form">
      <group>
        <div class="mid-title"><span>必填项</span></div>
        <x-input title="机构名称" :readonly='read' required :min="2"  :max="50" placeholder="机构名称" v-model="item.uoname"></x-input>
        <selector title="机构类型" direction="left" :readonly='read' required  v-model="item.ubusinesstype"  :options="tbsysbasicdatabycode" placeholder="请选择"></selector>
        <x-input title="执照代码" :readonly='read' required :max="30" placeholder="营业执照统一社会信用代码" v-model="item.businessnumber"></x-input>
        <x-input title="所属区域" :readonly='read' :disabled="read" required placeholder="所属区域"  @click.native="!read?showArea=true:''"  v-model="item.arename"></x-input>
        <!-- <cell title="所属区域" text-left :value="item.arename" @click.native="showArea=true"></cell> -->
        <x-input title="经营地址" :readonly='read' required :max="200" placeholder="经营地址" v-model="item.ubusinessaddress"></x-input>
        <div class="photo-item" style="text-align:right;">
          <span>身份证正面照<br><span style="font-size:small;color:red;">(必须原件)</span></span>
          <uploadImg :readonly='read' id='cardidimg' name="cardidimg" :imgSrc='cardidimg' @onChange="cardidimgChange" v-model="cardidimg" theme="light"></uploadImg>
        </div>
        <div class="photo-item" style="text-align:right;">
          <span>营业执照<br><span style="font-size:small;color:red;">(必须原件)</span></span>
          <uploadImg :readonly='read'  @onChange='licenceimgChange' :imgSrc="licenceimg" id='licenceimg' name="licenceimg" v-model="licenceimg" theme="light"></uploadImg>
          <uploadImg :readonly='read'  @onChange='licenceimgChange1' :imgSrc="licenceimg1" v-if='licenceimg.length!==0' id='licenceimg1' name="licenceimg1" v-model="licenceimg1" theme="light"></uploadImg>
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
          <x-input title="法人&emsp;&emsp;" :readonly='read':max="10" placeholder="法人" v-model="item.ulowman"></x-input>
          <x-input title="身份证号" :readonly='read' :max="18" :min="15" placeholder="身份证号" v-model="item.ucardid"></x-input>
          <x-input title="联系电话" :readonly='read' is-type="china-mobile" :max="11" :min="11" placeholder="电话" v-model="item.utel"></x-input>
          <x-input title="附加说明" :readonly='read' :max="200" placeholder="说明" v-model="item.uremark"></x-input>
          <div class="photo-item" style="text-align:right;">
            <span>营业执照<br><span style="font-size:small;;color:red;">(必须原件)</span></span>
            <uploadImg :readonly='read' @onChange='permitimgChange' :imgSrc="permitimg" id='permitimg' name="permitimg" v-model="permitimg" theme="light"></uploadImg>
            <uploadImg :readonly='read' @onChange='permitimgChange1' :imgSrc="permitimg1" v-if='permitimg.length != 0' id='permitimg1' name="permitimg1" v-model="permitimg1" theme="light"></uploadImg>
          </div>
        </div>
      </group>


      <button v-if='!read' @click='submit' :disabled="item.uoname == '' || item.ubusinesstype == '' || item.businessnumber == '' ||
            item.areid == '' || cardidimg.length == 0 || licenceimg.length == 0"
      class="round-big-btn">提交审核</button>

      <div v-transfer-dom>
        <popup v-model="showArea">
          <popup-header :left-text="haschidren?'返回上一级':''" @on-click-left="haschidren = false" right-text="" title="区域选择"></popup-header>
          <div class="pop-content">
            <checklist v-if="!haschidren"   :options="objectList" :max="1" :value="objectListValue" @on-change="changeArea"></checklist>
            <checklist v-if="haschidren"  :options="objectList1" :max="1" :value="objectListValue1" @on-change="changeArea1"></checklist>
          </div>
        </popup>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XInput, Selector, Picker,Flexbox, Checklist,
 FlexboxItem,  PopupHeader, Popup, TransferDom } from 'vux';
import { imgIp } from '../../config/axois';
import uploadImg from '../../components/uploadImg';
// import {_getlistbyparentid, _gettbsysbasicdatabycode} from '../../service/getdata';
import {employmentServices} from '../../service/EmploymentRegister';
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
    Checklist
  },
  data() {
    return {
      read: true,
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
        cardidimg: [],
        licenceimg: [],
        permitimg: [],
        ulaudtistatus:'',
        ulstatus:'',
        description:''
      },
      cardidimg:'',
      licenceimg:"",
      licenceimg1: '',
      permitimg:'',
      permitimg1:'',
      showOptional: false,
      showArea: false,
      tbsysbasicdatabycode: [],
      objectListValue: [],
      objectList: [],
      haschidren: false,
      objectListValue1: [],
      objectList1: [],
      // gettbsysbasicdatabycode: []
    };
  },
  computed: {
  },
  created(){
    let that = this;
    this.read = this.$route.params.read=="true" ? true :false;
    employmentServices._getorganizeinfo().then((data) => {
      that.item = data.AppendData;
      that.cardidimg = imgIp+that.item.cardidimg[0]
      that.licenceimg = imgIp+that.item.licenceimg[0];
      that.licenceimg1 = !!that.item.licenceimg[1]?imgIp+that.item.licenceimg[1]:'';
      that.permitimg = !!that.item.permitimg[0]?imgIp+that.item.permitimg[0]:'';
      that.permitimg1 = !!that.item.permitimg[1]?imgIp+that.item.permitimg[1]:'';
       console.log(that.cardidimg,that.licenceimg,);
    }).catch(err => console.log(err))
    this.getareas();
    this.gettbsysbasicdatabycode();
  },
  methods: {
    submit() {
      let that = this;
      if(this.cardidimg !== imgIp+this.item.cardidimg[0])
        this.item.cardidimg =  encodeURIComponent(this.cardidimg); 
      else this.item.cardidimg = ""

      if(this.licenceimg === imgIp + this.item.licenceimg[0]){
        this.item.licenceimg = ''
      }else{
        if(this.item.licenceimg.length == 2){
          if(this.licenceimg1 === imgIp+this.item.licenceimg[1]){
            this.item.licenceimg = encodeURIComponent(this.licenceimg)
          }else{
            this.item.licenceimg = encodeURIComponent(this.licenceimg+'|'+this.licenceimg1)
          }
        }else{
          if(this.licenceimg.length !== 0){
            this.item.licenceimg = encodeURIComponent('|'+this.licenceimg1)
          }else{
            this.item.licenceimg = encodeURIComponent(this.licenceimg);
          }
          
        }
      }

      if(this.item.permitimg.length == 0){
        this.item.permitimg = encodeURIComponent(this.permitimg+"|"+this.permitimg1);
      }else{
        if(this.permitimg === imgIp + this.item.permitimg[0]){
          this.item.permitimg = ''
        }else{
          if(this.item.permitimg.length == 2){
            if(this.permitimg1 === imgIp+this.item.permitimg[1]){
              this.item.permitimg = encodeURIComponent(this.permitimg)
            }else{
              this.item.permitimg = encodeURIComponent(this.permitimg+'|'+this.permitimg1)
            }
          }else{
            if(this.licenceimg.length !== 0){
              this.item.permitimg = encodeURIComponent('|'+this.permitimg)
            }else{
              this.item.permitimg = encodeURIComponent(this.permitimg);
            }
          }
        }
      }



      employmentServices
        ._editorganizeinfo(this.item)
        .then(function(data) {
          if (data.ResultType == 0) {
            that.$router.push({ name: "submit-information-view", params: {read: true}});
          }
        })
        .catch(function(err) {
          console.log(err, "err");
        });
    },
    cardidimgChange(file, name){
      this.cardidimg = file;
    },
    licenceimgChange(file, name){
      this.licenceimg = file;
    },
    licenceimgChange1(file, name){
      this.licenceimg1 = file;
    },
    permitimgChange(file, name){
      this.permitimg = file;
    },
    permitimgChange1(file, name){
      this.permitimg1 = file;
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
        if(data.ResultType === 0){
          let list = data.AppendData;
          list.forEach(function(value, index, array1){
            list[index].key = value.BDID;
            list[index].value = value.Value;
          });
          that.tbsysbasicdatabycode = list;
        }else{

        }
      })
    },
    getareas(){
      var that = this;
      return employmentServices._getareas().then(function(data){
        if(data.ResultType === 0){
          let list = data.AppendData;
          list.forEach(function(value, index, array1){
            list[index].key = [value.AreID, value.AreCode].toString();
            list[index].value = value.AreName;
          });
          console.log(list)
          that.objectList = list;
        }else{
        }
      })
    }
  }
};
</script>


<style lang="less">
  body{
    background: #3c9;
  }

.myapp {
  .wait{
    color: yellow;
    text-align: center;
    font-size: 1.2em;
    .iconfont{
      font-family: 30px;
    }
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
</style>
