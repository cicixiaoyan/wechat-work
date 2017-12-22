<template>
  <div>
    <x-header>提交体检预约申请</x-header>
    <group>
      <cell title="体检机构" value-align="left" readonly @click.native="showOr=true" is-link :value="PhaOrName"></cell>
      <cell title="体检日期" placeholder="请选择" value-align="left" is-link @click.native="showTime"  :value="ptime"></cell>
      <cell title="体检人员" value-align="left" @click.native="showPeople=true" :value="pnumber+'人'" is-link ></cell>
      <x-textarea title="预约说明" v-model="item.PhADescription" :max="100" placeholder="预约说明" :show-counter="true"  :rows="2"></x-textarea>
    </group>
    <div class="submit-box">
      <button @click='submit' class="round-big-btn" :disabled="item.PhAOrCode===''|| pnumber===0|| item.PPNID==''" >完成并提交</button>
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

      <popup v-model="showPeople" height='100%'>
        <popup-header left-text='取消' style="border-bottom: 4px solid #3c9;" @on-click-left='showPeople=false' title="选择人员" right-text=''></popup-header>
        <div class="pop-content">
          <checkPeople v-if='showPeople' ref='checkpeople' @onChange='getPhid' :phids='item.phid'  :checkedNumber='pnumber'></checkPeople> 
        </div>
      </popup>


    </div>

    

  </div>
</template>

<script>
import { Group, Cell, XHeader,Checklist, XTextarea, XInput, Selector, TransferDom, PopupHeader, Popup, Picker } from 'vux';
import {_appointmentServce} from '../../service/appointmentServices'
import checkPeople from '../staff-information/checkPeople'
export default {
  name: 'appointment-add',
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
      },
      pnumber: ''
    };
  },
  methods: {
    getPhid(val, length){
      // console.log(val,this.item.phid);
      this.item.phid = val;
      this.pnumber = length
      this.showPeople = false;
    },
    submit(){
      let that = this;
      if(this.maxNumber < this.pnumber){
        return this.$vux.toast.show({
          text: "所选日期最多可提交"+this.maxNumber+'人次预约',
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
      _appointmentServce.gettbsysorganize().then((data) => {
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
      that.showOr = false;

      if(val.length !== 0){
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
      this.gettbsysorganize();
      this.item.phid = this.$route.params.phid;
      this.pnumber = this.item.phid.length == 0?0:this.item.phid.split(',').length-1;
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
body[data-path=appointment-add]{
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
