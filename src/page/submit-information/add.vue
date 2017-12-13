<template>
  <div class="myapp">
    <x-header>提交机构信息</x-header>
    <div class="add-form">
      <group>
        <div class="mid-title">必填项</div>
        <x-input title="机构名称" placeholder="机构名称" v-model="item.uoname"></x-input>
        <selector title="机构类型"  v-model="item.ubusinesstype"  :options="tbsysbasicdatabycode" placeholder="请选择"></selector>
        <x-input title="执照代码" placeholder="执照代码" v-model="item.businessnumber"></x-input>
        <x-input title="所属区域" placeholder="所属区域"  @click.native="showArea=true"  v-model="item.arename"></x-input>
        <!-- <cell title="所属区域" text-left :value="item.arename" @click.native="showArea=true"></cell> -->
        <x-input title="经营地址" placeholder="经营地址" v-model="item.ubusinessaddress"></x-input>
        <div class="photo-item" style="text-align:right;">
          <span>身份证照</span>
          <uploadImg id='cardidimg' name="cardidimg" @onChange="fileChange" v-model="cardidimg" theme="light"></uploadImg>
        </div>
        <div class="photo-item" style="text-align:right;">
          <span>营业执照</span>
          <uploadImg id='licenceimg' name="licenceimg" v-model="licenceimg" theme="light"></uploadImg>
          <uploadImg v-if='licenceimg != []' id='licenceimg1' name="licenceimg1" v-model="licenceimg1" theme="light"></uploadImg>
        </div>

      </group>
      <group>
        <div class="mid-title" @click='Optionalshow'>
          选填项
          <span class="iconfont icon-add" v-if="!showOptional"></span>
          <span class="iconfont icon-tailor" v-if="showOptional"></span>
        </div>
        <div v-show="showOptional">
          <x-input title="法人" placeholder="法人" v-model="item.ulowman"></x-input>
          <x-input title="身份证号" placeholder="身份证号" v-model="item.ucardid"></x-input>
          <x-input title="联系电话" placeholder="电话" v-model="item.utel"></x-input>
          <x-input title="附加说明" placeholder="说明" v-model="item.uremark"></x-input>
          <div class="photo-item" style="text-align:right;">
            <span>营业执照</span>
            <uploadImg id='permitimg' name="permitimg" v-model="permitimg" theme="light"></uploadImg>
            <uploadImg v-if='permitimg != []' id='permitimg1' name="permitimg1" v-model="permitimg1" theme="light"></uploadImg>
          </div>
        </div>
      </group>


      <button @click='submit' class="round-big-btn">提交审核</button>

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
import { baseurl } from '../../config/axois';
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
        cardidimg:[],
        licenceimg:[],
        permitimg:[],
        ulaudtistatus:'',
        ulstatus:'',
        description:''
      },
      cardidimg:[],
      licenceimg:[],
      licenceimg1:[],
      permitimg:[],
      permitimg1:[],
      showOptional: false,
      showArea: false,
      areidList: [
        {
          name: "2017-7-7",
          value: "2017-7-7",
          parent: 0
        },
        {
          name: "上午",
          value: "上午",
          parent: "2017-7-7"
        },
        {
          name: "下午",
          value: "下午",
          parent: "2017-7-7"
        },
        {
          name: "2017-7-8",
          value: "2017-7-8",
          parent: 0
        },
        {
          name: "上午",
          value: "上午",
          parent: "2017-7-8"
        }
      ],
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
    this.getareas();
    this.gettbsysbasicdatabycode();
  },
  methods: {
    submit() {
      let formData = new FormData();
      formData.append('uname', this.item.uname);
      formData.append('usex', this.item.usex);
      formData.append('utel', this.item.utel);
      formData.append('ucardid', this.item.ucardid);
      formData.append('uoname', this.item.uoname);
      formData.append('areid', this.item.areid);
      formData.append('arename', this.item.arename);
      formData.append('ubusinessaddress', this.item.ubusinessaddress);
      formData.append('ubusinesstype', this.item.ubusinesstype);
      formData.append('ubusinesstypename', this.item.ubusinesstypename);
      formData.append('ulowman', this.item.ulowman);
      formData.append('uremark', this.item.uremark);
      formData.append('upicurl', this.item.upicurl);
      formData.append('ulaudtistatus', this.item.ulaudtistatus);
      formData.append('ulstatus', this.item.ulstatus);
      formData.append('description', this.item.description);

      formData.append('cardidimg', [...this.cardidimg, ...this.cardidimg1]);
      formData.append('licenceimg', [...this.licenceimg, ...this.licenceimg1]);
      formData.append('permitimg', this.permitimg);


      let header = {
        'Content-Type': 'multipart/form-data',
        'Authorization': "Bearer " +  window.localStorage.getItem('AccessToken')
      }

      this.$http.post(baseurl+'/employment/editorganizeinfo', formData, config).then((res) =>{
        console.log(data)
      }).catch((err) => {

      })
      // console.log(this.item)
      // employmentServices
      //   ._editorganizeinfo(this.item)
      //   .then(function(data) {
      //     if (data.ResultType == 0) {
      //       this.$router.push({ path: "/app/appointment/view" });
      //     }
      //   })
      //   .catch(function(err) {
      //     console.log(err, "err");
      //   });
    },
    fileChange(file, name){
      // this.item.cardidimg[0] = file;

    },
    Optionalshow() {
      console.log(this.showOptional);
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
        let parma = {"areid": val[0]}
        employmentServices._getlistbyparentid(parma)
        .then(function(data){
          let list = data.AppendData;
          if(list.length == 0){
            that.showArea = false;
            that.haschidren = false;
            that.item.areid = val[0];
            that.item.arename = label[0];
          }else{
            that.haschidren = true;
            list.forEach(function(value, index, array1){
              list[index].key = value.AreID;
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
      if(value){
        this.item.areid = value[0];
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
            list[index].key = value.Name;
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
            list[index].key = value.AreID;
            list[index].value = value.AreName;
          });
          that.objectList = list;
        }else{
        }
      })
    }
  }
};
</script>


<style lang="less">
  .router-view{
    background: #3c9;
  }

.myapp {
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
