<template>
  <div>
    <x-header :left-options="{showBack: false}">个人中心</x-header>
    <div class="personal-top">
      <img src="../../assets/loginpic.png" style="width: 8em;background: #fff;padding:0.2em;border-radius: 50%;"/>
      <div>{{item.ULName}}</div>
    </div>
    <group>
      <!-- <cell title="机构名称" value-align="right" :value="item.name"></cell> -->
      <!-- <cell title="机构地址" value-align="right" :value="item.addr"></cell> -->
      <cell title="机构类型" value-align="right" :value="type"></cell>
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
import { _userServices } from '../../service/userServices';
import { employmentServices } from '../../service/EmploymentRegister';

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
  created(){
    let that = this;
    _userServices._getUserMsg().then(function(data){
      that.item = data;
      employmentServices._gettbsysbasicdatabycode().then((data1) => {
        console.log(data1)
        data1.AppendData.forEach(function(value,index, arr) {
          console.log(value)
          if(value.BDID == data.ULType) return that.type = value.Name;
        });
      }).catch(err1 => console.log(err1))
    }).catch(err => console.log(err));
  },
  data () {
    return {
      item: {ULName: ''},
      type: ''
    };
  },
  methods: {
    quit(){
      window.localStorage.clear();
      this.$router.push({name: 'login'});
    },
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
