<template>
  <div>
    <x-header>个人中心</x-header>
    <div class="personal-top">
      <img src="../../assets/logo.png" style="    width: 80px;background: #fff;border-radius: 50%;"/>
      <div>{{item.name}}</div>
    </div>
    <group>
      <!-- <cell title="机构名称" value-align="right" :value="item.name"></cell> -->
      <cell title="机构地址" value-align="right" :value="item.addr"></cell>
      <cell title="机构类型" value-align="right" :value="item.type"></cell>
      <!-- <x-textarea title="预约说明" :max="100" placeholder="预约说明" :show-counter="true"  :rows="2"></x-textarea> -->
    </group>
    <div class="submit-box">
      <button @click='quit' class="round-big-btn">退出登录</button>
    </div>

  </div>
</template>

<script>
import { Group, Cell, XHeader, XTextarea, XInput, Selector, TransferDom, PopupHeader, Popup, Picker } from 'vux';
import uploadImg from '../../components/uploadImg';
export default {
  name: 'personal-center',
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    XHeader,
    XTextarea,
    XInput,
    Selector ,
    PopupHeader,
    Popup, 
    Picker,
    uploadImg
  },
  computed :{
    // HospitalList() {
    //   return [{key: '1', value: '武侯区第一医院'}, {key: '2', value: '武侯区第二医院'}]
    // }
  },
  data () {
    return {
      item: {
        addr: '四川省成都市高新区',
        name: '成都市华西第四医院',
        type: 'IT'
      }
    };
  },
  methods: {
    quit(){
      console.log('退出登录');
    },
    getTime() {
      this.item.Time = this.mytime.join(" ");
      this.showpop = false
    }
  }
};
</script>

<style lang="less">
  .personal-top{
    text-align: center;
    padding-top: 2em;
    padding-bottom: 1em;
    background-color: #33cc99;
    color: #fff;
    div{
      font-size: large;
    }
  }

  .weui-cell__ft.vux-cell-align-left{
    padding-left: 1em;

  }
  .submit-box{
    margin: 2em 3em 0;
    .round-big-btn{
      background: #ebc650;
    }
  }
</style>
