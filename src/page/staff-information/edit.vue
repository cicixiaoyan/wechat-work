<template>
  <div>
    <x-header>员工详情<a slot="right" v-if="!read && item.phName==='' && !icdValid && !phoneValid" @click='edit' >保存</a></x-header>
    <group>
      <x-input title="姓名" require text-align="right" v-model="item.phName" :readonly='read' placeholder='姓名'></x-input>
      <div class="validerror" v-if="item.phName > 18 && !read">
        姓名不能大于8位
      </div>
      <x-input title="身份证号" @on-change="testIcd"  require  text-align="right" placeholder='身份证号' v-model="item.phCardId" :readonly='read'></x-input>
      <div class="validerror" v-if="!icdValid && !read">
        请输入合法的身份证号
      </div>
      <x-input title="电话号码" @on-change="textPhone" require  text-align="right" placeholder='电话号码' v-model="item.phTel" :disabled='read' :placeholder='phoneholder'></x-input>
      <div class="validerror" v-if="!phoneValid && !read">
        请输入合法的手机号
      </div>
      <x-input title="所在机构" require  text-align="right" v-model="item.phUnit" :readonly='read' :placeholder="uonameholder"></x-input>
    </group>
  </div>
</template>

<script>
import { Group, XInput, XHeader } from 'vux';
import { IdCardTo } from '../../utils/idc';
import {_staffServce} from '../../service/staffService';
export default {
  name: "staff-information-edit",
  components: {
    Group,
    XInput,
    XHeader
  },
  created(){
    this.read = this.$route.params.read=="true" ? true :false;
    if(this.read){
       this.phoneholder = "";
       this.uonameholder = "";
    }
    // 获取详情
    // _staffServce.editphysicalinfo(this.$route.params.id)
    // .then((data) => {
    //   let 
    // }).catch(err => console.log(err))

  },
  computed: {
    item(){

      console.log(this.read)
      return {

      }
    }
  },
  data () {
    return {
      phoneholder: '电话号码',
      uonameholder: '机构名称',
      icdValid: true,
      phoneValid: true,
      read: false,
      item: {
        phId:'',
        ulid:'',
        phName:"",
        phSex:"",
        phBirthDate:"",
        phCardId:"",
        phStatus:"",
        phTel:"",
        phUnit:"",
        isLeave:""
      }
    };
  },
  methods: {
    testIcd(){
      var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if((this.item.phCardId.length == 15 || this.item.phCardId.length==18) && reg.test(this.item.icd)){
        this.icdValid = true;
        this.item.age = IdCardTo(this.item.phCardId, 3);
        this.item.phSex = IdCardTo(this.item.phCardId, 2);

      }else{
        this.icdValid = false;
      }
    },
    textPhone(){
      let reg = /^((13[0-9])|(14[5|7])|(15([0-9]))|(17[0-9])|(18[0-9]))\d{8}$/;
      if(reg.test(this.item.phTel)){
        this.phoneValid = true;
      }else{
        this.phoneValid = false;
      }
    },
    edit(){
      let that = this;
      // 保存
      _staffServce.updatephysicalinfo(this.item)
      .then((data) => {
        that.$vux.toast.show({
            text: data.Message,
            type: "success",
            position: "middle"
          });
      }).catch(err => console.log(err))
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
