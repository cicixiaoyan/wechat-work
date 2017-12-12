<template>
  <div>
    <x-header>员工详情<a slot="right" v-if="!read && item.username==='' && !icdValid && !phoneValid" @click='edit' >保存</a></x-header>
    <group>
      <x-input title="姓名" require text-align="right" v-model="item.username" :readonly='read' placeholder='姓名'></x-input>
      <div class="validerror" v-if="item.username > 8 && !read">
        姓名不能大于8位
      </div>
      <x-input title="身份证号" @on-change="testIcd"  require  text-align="right" placeholder='身份证号' v-model="item.icd" :readonly='read'></x-input>
      <div class="validerror" v-if="!icdValid && !read">
        请输入合法的身份证号
      </div>
      <x-input title="性别"  text-align="right" v-model="item.sex" placeholder='性别'  readonly></x-input>
      <x-input title="年龄"  text-align="right" v-model="item.age" placeholder='年龄' readonly></x-input>
      <!-- <x-input title="电话号码" @on-change="textPhone" require  text-align="right" placeholder='电话号码' v-model="item.phone" :disabled='read' :placeholder='phoneholder'></x-input> -->
      <div class="validerror" v-if="!phoneValid && !read">
        请输入合法的手机号
      </div>
      <x-input title="所在机构" require  text-align="right" v-model="item.uoname" :readonly='read' :placeholder="uonameholder"></x-input>
    </group>
  </div>
</template>

<script>
import { Group, XInput, XHeader } from 'vux';
import { IdCardTo } from '../../utils/idc';
export default {
  name: "staff-information-edit",
  components: {
    Group,
    XInput,
    XHeader
  },
  computed: {
    // read(){
    //   let bol = this.$route.params.read=="true" ? true :false;
    //   if(bol){
    //      this.phoneholder = "";
    //      this.uonameholder = "";
    //   }
    //   console.log(bol)
    //   return bol;
    // },
    item(){
      this.read = this.$route.params.read=="true" ? true :false;
      if(this.read){
         this.phoneholder = "";
         this.uonameholder = "";
      }
      console.log(this.read)
      return {
        username: '',
        icd:'',
        age: '',
        sex: '',
        phone: '',
        uoname: ''
      }
    }
  },
  data () {
    return {
      phoneholder: '电话号码',
      uonameholder: '机构名称',
      icdValid: true,
      phoneValid: true,
      read: false
    };
  },
  methods: {
    testIcd(){
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if((this.item.icd.length == 15 || this.item.icd.length==18) && reg.test(this.item.icd)){
        this.icdValid = true;
        this.item.age = IdCardTo(this.item.icd, 3);
        this.item.sex = IdCardTo(this.item.icd, 2);

      }else{
        this.icdValid = false;
      }
    },
    textPhone(){
      let reg = new RegExp("^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$");
      if(reg.test(this.item.phone)){
        this.phoneValid = true;
      }else{
        this.phoneValid = false;
      }
    },
    edit(){
      console.log('保存')
    }
  }
};
</script>

<style lang="less">
  .validerror{
    font-size: small;
    text-align: center;
    color: red;
  }
</style>
