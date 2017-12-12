<template>
  <div class="myapp">
    <x-header>编辑机构信息</x-header>
    <div class="add-form">
      <group>
        <div class="mid-title">必填项</div>
        <x-input title="机构名称" v-model="uoname"></x-input>
        <selector title="机构类型" v-model="ubusinesstype"  :options="gettbsysbasicdatabycode" placeholder="请选择"></selector>
        <x-input title="执照代码" v-model="businessnumber"></x-input>

        <!-- <x-input title="所属区域" v-model="areid"></x-input> -->
        <!-- <picker :data='areidList'  :columns="3" v-model='areid' @on-change='changeAreid'></picker> -->
        <!-- <popup-picker title="所属区域" :columns="2"  :data="areidList" v-model="areid"  placeholder="请选择"></popup-picker> -->
        <x-input title="经营地址" v-model="ubusinessaddress"></x-input>
        <!-- 文档：https://github.com/waynecz/vue-img-inputer -->
        <div class="photo-item" style="text-align:right;">
          <span>身份证照</span>
          <uploadImg :inputId='cardidimg' name="cardidimg" v-model="cardidimg" theme="light"></uploadImg>
        </div>
        <div class="photo-item" style="text-align:right;">
          <span>营业执照</span>
          <uploadImg :inputId='licenceimg' name="licenceimg" v-model="licenceimg" theme="light"></uploadImg>
        </div>

      </group>

      <group>
        <div class="mid-title" @click='Optionalshow'>
          选填项
          <span class="iconfont icon-add" v-if="!showOptional"></span>
          <span class="iconfont icon-tailor" v-if="showOptional"></span>
        </div>
        <div v-show="showOptional">
          <x-input title="法人" v-model="ulowman"></x-input>
          <x-input title="身份证号" v-model="ucardid"></x-input>

          <x-input title="联系电话" v-model="utel"></x-input>
          <x-input title="附加说明" v-model="uremark"></x-input>
          <div class="photo-item" style="text-align:right;">
            <span>营业执照</span>
            <uploadImg :inputId='permitimg' name="permitimg" v-model="permitimg" theme="light"></uploadImg>
          </div>
        </div>
      </group>


      <button @click='submit' class="round-big-btn"  >提交审核</button>

    </div>
  </div>
</template>

<script>
import { XHeader, Group, XInput, Selector, Picker, PopupPicker } from 'vux';
import uploadImg from '../../components/uploadImg'

export default {
  name: 'submit-information-add',
  components: {
    XHeader,
    uploadImg,
    XInput ,
    Group,
    Selector,
    Picker,
    PopupPicker
  },
  data () {
    return {
      uoname: '13155555555',
      businessnumber: '123456',
      ubusinesstype: '',
      ubusinessaddress: '',
      areid: '',
      ulowman:'',
      cardidimg: '',
      licenceimg: '',
      permitimg:'',
      ucardid: '',
      utel: '',
      uremark: '',
      showOptional: false,
      areidList: [
        {
          name: '2017-7-7',
          value: '2017-7-7',
          parent: 0
        },
        {
          name: '上午',
          value: '上午',
          parent: "2017-7-7"
        },
        {
          name: '下午',
          value: '下午',
          parent: "2017-7-7"
        },
        {
          name: '2017-7-8',
          value: '2017-7-8',
          parent: 0
        },
        {
          name: '上午',
          value: '上午',
          parent: "2017-7-8"
        }
      ]
      // gettbsysbasicdatabycode: []
    };
  },
  computed: {
    gettbsysbasicdatabycode(){
      let list = [
        {
          "BDID": 2,
          "ParentID": 1,
          "Name": "食品生产经营",
          "Value": "食品生产经营",
          "Code": "101001"
        },
        {
          "BDID": 3,
          "ParentID": 1,
          "Name": "乳制品生产",
          "Value": "乳制品生产",
          "Code": "101002"
        }
      ]

      list.forEach(function(value, index, array1){
        list[index].key = value.Name;
        list[index].value = value.Value;
      });
      return  list;
    },
    // areidList(){
    //   let list = [
    //     {
    //       "AreID": 26,
    //       "ParentId": 7,
    //       "AreName": "红牌楼街道",
    //       "AreCode": 5501
    //     },
    //     {
    //       "AreID": 27,
    //       "ParentId": 7,
    //       "AreName": "双楠街道",
    //       "AreCode": 5502
    //     }
    //   ];
    //   list.forEach(function(value, index, array1){
    //     list[index].name = value.AreName;
    //     list[index].parent = 0;
    //     list[index].value = value.AreID;
    //     list.push({
    //       "AreID": 26,
    //       "ParentId": 7,
    //       "AreName": "红牌楼街道",
    //       "AreCode": 5501,
    //       "name": '1',
    //       "value": '1',
    //       "parent": value.AreID
    //     })
    //   });
    //   console.log(list);
    //   return list;
    // }
  },

  methods: {
    submit () {
      this.$router.push({path: '/app/appointment/list'});
    },
    Optionalshow() {
      console.log(this.showOptional);
      this.showOptional = !this.showOptional;
    },
    changeAreid(){

    },
    onShowAre(){},
    onHideAre(){}
  }
};
</script>


<style lang="less">
  body{
    background: #3c9;
  }

  .myapp{
    .add-form{
      margin: 28/72*1rem;
      > div{
        background: #fff;
        border-radius: .2rem;
        .weui-cells{
          border-radius: .2rem;
        }
      }
      .round-big-btn{
        background: #fff;
        color: #3c9;
        margin-top: .5rem;
      }


      .weui-cells__title{
        padding-top: 0.333rem;
        padding-bottom: 0.333rem;
      }

      .mid-title{
        padding: 0.29rem .2rem;
        background: #f5f2f2;
        color: #4CAF50;
        position: relative;
        .iconfont{
          position: absolute;
          right: .1rem;
        }
      }

    }
    .weui-label{
      color: #878f98;
    }

    .photo-item{
      position: relative;
      padding: 1em 1em 1em 0.138rem;
      > span{
        color: #999;
        position: absolute;
        left: 0.417rem;
        top: 50%;
        transform: translateY(-50%);
      }

      &::before{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #E5E5E5;
        color: #E5E5E5;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        left: 15px;

      }
    }

  }




</style>
