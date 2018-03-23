<template>
  <div>
    <x-header>提交体检预约申请</x-header>
    <group>
      <cell title="体检机构" value-align="left" readonly @click.native="showOr=true" is-link :value="PhaOrName"></cell>
      <cell title="体检日期" placeholder="请选择" value-align="left" is-link @click.native="showTime"  :value="ptime"></cell>
      <x-textarea title="预约说明" v-model="item.PhADescription" :max="100" placeholder="预约说明" :show-counter="true"  :rows="2"></x-textarea>
    </group>
    <div class="submit-box">
      <button @click='submit' class="round-big-btn" :disabled="item.PhAOrCode==='' || item.PPNID==''" >完成并提交</button>
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

      <popup v-model="showOr">
        <popup-header  title="选择机构" right-text='完成' @on-click-right='changeOr'></popup-header>
        <div class="pop-content">
          <checklist  :options="orinfoList" :max="1" @on-change='changePhAOrCode' :value="PhAOrCode"></checklist>
        </div>
      </popup>


    </div>

    

  </div>
</template>

<script>
import { Group, Cell, XHeader,Checklist, XTextarea, XInput, Selector, TransferDom, PopupHeader, Popup, Picker } from 'vux';
import {_appointmentServce} from '../../service/appointmentServices'
import {_userServices} from '../../service/userServices'
import checkPeople from '../staff-information/checkPeople'
export default {
  name: 'appointment-add-person',
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    XHeader,
    Checklist,
    XTextarea,
    XInput,
    Selector ,
    PopupHeader,
    Popup,
    Picker,
    checkPeople
  },
  created(){
    this.fetchData()
    // 机构列表
    // this.orinfoList = [{key:1, value:1},{key:2, value:2}]
  },
  data () {
    return {
      showpop: false,
      showOr: false,
      showPeople: false,
      PhaOrName: '',
      ptime:'',
      maxNumber: 0,
      timedatas: [],
      mytime: [],
      orinfoList: [],
      PhAOrCode: [],
      item: {
        phid: '',
        PhAOrCode: '',
        PPNID: '',
        PhADescription: '',
      }
    };
  },
  methods: {
    getPhid(val, length){
      console.log(val,this.item.phid);
      this.item.phid = val;
      this.showPeople = false;
    },
    submit(){
      let that = this;
      if(this.maxNumber < 1){
        return this.$vux.toast.show({
          text: "所选日期人员已满",
          type: 'warn',
          position: 'middle'
        });
      }
      // console.log(this.item)
      _appointmentServce.createAppointment(this.item)
      .then(data => {
        that.$vux.toast.show({
          text: "提交预约成功",
          type: 'success',
          position: 'middle'
        });
        that.$router.push({name: "appointment-list"});
      }).catch(err => console.log(err));


    },
    getTime() {
      this.item.PPNID = this.mytime[1].split(",")[0];
      this.ptime = this.mytime[0]+' '+ this.mytime[1].split(",")[1];
      this.maxNumber = this.mytime[1].split(",")[2];
      this.showpop = false
    },
    gettbsysorganize(){
      let that = this;
      alert(1)
      _appointmentServce.gettbsysorganize().then((data) => {
        console.log(data)
        if(data.AppendData.length != 0){
          let list = data.AppendData,
              arr = [],
              defaultVal = { "key": "", "value": "" };

          list.forEach(function(value, index, array1){
            if(value.OrId == data.Message) defaultVal = { "key": value.OrCode, "value": value.OrName };
            arr.push({
              "key": value.OrCode,
              "value": value.OrName
            });
          });
          
          that.orinfoList = [...arr];
          that.PhAOrCode[0] = defaultVal.key;
          that.PhAOrCode[1] = defaultVal.value;
          that.changeOr();
        }
      })
      .catch((err) => {console.log(err);})
    },
    changePhAOrCode(val,label){
      this.PhAOrCode[0] = val[0];
      this.PhAOrCode[1] = label[0]
    },
    changeOr(){
      let that = this;
      that.timedatas = [];
      let val = this.PhAOrCode;
      console.log(val);
      that.showOr = false;

      if(val[0] != ""){
        that.PhaOrName = val[1]
        that.item.PhAOrCode = val[0];
        that.showOr = false;
        that.ptime = '';
        that.item.PPNID = "";
        //根据体检机构获取预约剩余人数
        _appointmentServce.gettbphysicalpeoplenumber(val[0])
        .then((data) => {
          // console.log(data)
          if(!!data.AppendData && data.AppendData.length != 0){
            let list = data.AppendData;
            let arr = [];
            list.forEach(function(value, index, array1){
              let length = arr.length;
              if(value.Number !== value.UsedNumber) { // 余0不显示
                if(length != 0 && value.PPNDate == arr[length-1].parent){
                  arr.push({
                    name : ["全天","上午","下午"][value.PPNType]+"(余"+(value.Number-value.UsedNumber)+"/总"+value.Number+")",
                    value : value.PPNID+','+["全天","上午","下午"][value.PPNType]+','+(value.Number-value.UsedNumber),
                    parent : value.PPNDate
                  });
                }else{
                  arr.push({
                    name : value.PPNDate,
                    value : value.PPNDate,
                    parent : 0
                  });
                  arr.push({
                    name : ["全天","上午","下午"][value.PPNType]+"(余"+(value.Number-value.UsedNumber)+"/总"+value.Number+")",
                    value :  value.PPNID+","+["全天","上午","下午"][value.PPNType]+','+(value.Number-value.UsedNumber),
                    parent : value.PPNDate
                  })
                }
              };
            });
            that.timedatas = [...arr];
          }
        })
        .catch((err) => { console.log(err) })
      }

    },
    fetchData(){
      let that = this;
      that.gettbsysorganize();
      _userServices._getUserMsg().then(function(data1){
          that.item.phid = data1.UserID;
      }).catch(function(err){
        console.log(err, 2)
        
      });
      
    },
    showTime(){
      if(this.timedatas.length === 0){
        this.$vux.toast.show({
          text: "当前体检机构预约名额已满，请切换体检机构或明日再来预约",
          width: '12em',
          type: 'warn',
          position: 'middle',
          time: '3000'
        });
      }else{
        this.showpop=true
      }
    }
  },
  watch:{
    '$route'(to, from) {
      this.fetchData()
    }
  }
};
</script>

<style lang="less">
body[data-path=appointment-add-person]{
  .weui-cell__ft.vux-cell-align-left{
    padding-left: 1em;
  }
  .submit-box{
    margin: 2em 3em 0;
    .round-big-btn{
      background: #ebc650;
    }
  }
}

</style>
