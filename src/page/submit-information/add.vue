<template>
  <div class="myapp">
    <x-header>编辑机构信息</x-header>
    <div class="add-form">
      <group>
        <div class="mid-title">必填项</div>
        <x-input title="机构名称" v-model="uoname"></x-input>
        <x-input title="执照代码" v-model="businessnumber"></x-input>
        <x-input title="机构类型" v-model="ubusinesstype"></x-input>
        <x-input title="所属区域" v-model="areid"></x-input>
        <x-input title="经营地址" v-model="ubusinessaddress"></x-input>
        <x-input title="身份证照" @click.native v-model="cardidimg0"></x-input>
        <!-- <x-input title="营业执照" v-model="licenceimg0"></x-input> -->
        <!-- 文档：https://github.com/waynecz/vue-img-inputer -->
        <div style="text-align:right;"><uploadImg :id='licenceimg0' name="licenceimg0" v-model="licenceimg0" theme="light"></uploadImg></div>
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
          <x-input title="卫生许可" v-model="permitimg0"></x-input>
        </div>
      </group>


      <button @click='submit' class="round-big-btn"  >提交审核</button>

    </div>
  </div>
</template>

<script>
import { XHeader, Group, XInput } from 'vux';
import uploadImg from '../../components/uploadImg'

export default {
  name: 'submit-information-add',
  components: {
    XHeader,
    uploadImg,
    XInput ,
    Group
  },
  data () {
    return {
      uoname: '13155555555',
      businessnumber: '123456',
      ubusinesstype: '',
      ubusinessaddress: '',
      areid: '',
      ulowman:'',
      cardidimg0: '',
      licenceimg0: '',
      ucardid: '',
      utel: '',
      uremark: '',
      permitimg0: '',
      showOptional: false
    };
  },
  methods: {
    submit () {
      this.$router.push({path: '/app/appointment/list'});
    },
    Optionalshow() {
      console.log(this.showOptional);
      this.showOptional = !this.showOptional;
    }
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

  }




</style>
