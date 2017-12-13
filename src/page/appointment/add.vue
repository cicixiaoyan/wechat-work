<template>
  <div>
    <x-header>提交体检预约申请</x-header>
    <group>
      <selector title="机构名称" v-model="item.Hospital"  :options="HospitalList"
        @on-change='changeOrid' placeholder="请选择"></selector>
      <cell title="体检日期" value-align="left" is-link @click.native="showpop=true" :is-loading="!item.Time" :value="item.Time"></cell>
      <cell title="成员列表" value-align="left" :value="item.Number+'人'" is-link :link="{name:'staff-information-list'}"></cell>
      <x-textarea title="预约说明" :max="100" placeholder="预约说明" :show-counter="true"  :rows="2"></x-textarea>
    </group>
    <div class="submit-box">
      <button @click='submit' class="round-big-btn" :disabled="item.Hospital===''|| item.Number===0|| item.Time==''" >完成并提交</button>
    </div>

    <div v-transfer-dom>
      <popup v-model="showpop" position="bottom">
        <popup-header left-text="取消" right-text="完成" title="日期选择"
        @on-click-left="showpop = false"
        @on-click-right="getTime"></popup-header>
        <div class="pop-content">
          <picker :data='timedatas' :columns="2" v-model='mytime'></picker>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
import { Group, Cell, XHeader, XTextarea, XInput, Selector, TransferDom, PopupHeader, Popup, Picker } from 'vux';
import {_appointmentServce} from '../../service/appointmentServices'
export default {
  name: 'appointment-add',
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
    Picker
  },
  computed :{

  },
  created(){
    // 机构列表
    _appointmentServce.gettbsysorganize().then((data) => {
      let list = data.AppendData;
      list.forEach(function(value, index, array1){
        list[index].key = value.AreID;
        list[index].value = value.AreName;
        this.HospitalList = list;
      });
    })
    .catch((err) => {console.log(err);})
  },
  data () {
    return {
      showpop: false,
      timedatas: [
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
        },
      ],
      mytime: [],
      HospitalList: [{key: '1', value: '武侯区第一医院'}, {key: '2', value: '武侯区第二医院'}],
      item: {
        Status: '1',
        Hospital: '成都市华西第四医院',
        Number: '30',
        Listparma: '123',
        Time: '2017-04-04 上午',
        Description: '批准申请',
      }
    };
  },
  methods: {
    submit(){
      console.log('提交');
    },
    getTime() {
      this.item.Time = this.mytime.join(" ");
      this.showpop = false
    },
    changeOrid(value, label) {
      // 根据体检机构获取预约剩余人数
      _appointmentServce.gettbphysicalpeoplenumber(value)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => { console.log(err) })
    }
  }
};
</script>

<style lang="less">
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
