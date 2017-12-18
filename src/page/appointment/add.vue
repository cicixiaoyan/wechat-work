<template>
  <div>
    <x-header>提交体检预约申请</x-header>
    <group>
      <cell title="体检机构" value-align="left" readonly @click.native="showOr=true" is-link :value="PhaOrName"></cell>
      <cell title="体检日期" placeholder="请选择" value-align="left" is-link @click.native="showpop=true"  :value="ptime"></cell>
      <cell title="成员列表" value-align="left" :value="pnumber+'人'" is-link :link="{name:'staff-information-check', params: { phids: $route.params.phid }}"></cell>
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
          <checklist  :options="orinfoList" :max="1" :value="PhAOrCode"></checklist>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
import { Group, Cell, XHeader,Checklist, XTextarea, XInput, Selector, TransferDom, PopupHeader, Popup, Picker } from 'vux';
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
    Checklist,
    XTextarea,
    XInput,
    Selector ,
    PopupHeader,
    Popup,
    Picker
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
    submit(){
      let that = this;
      if(this.maxNumber < this.pnumber){
        return this.$vux.toast.show({
          text: "所选日期最多可提交"+this.maxNumber+'人次预约',
          type: 'success',
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
          let list = data.AppendData;
          let arr = [];
          list.forEach(function(value, index, array1){
            arr.push({
              key: value.OrCode,
              value: value.OrName
            });
          });
          that.orinfoList = [...arr];
          that.PhAOrCode = [arr[0].key, arr[0].value];
           console.log(that.PhAOrCode)
          // console.log(list[0])
          that.changeOr();
        }
      })
      .catch((err) => {console.log(err);})
    },
    changeOr(){
      let that = this;
      let val = this.PhAOrCode;
      console.log(this.PhAOrCode)
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
              if(length != 0 && value.PPNDate == list[index-1].PPNDate){
                arr.push({
                  name : ["全天","上午","下午"][value.PPNType]+"("+value.UsedNumber+"/"+value.Number+")",
                  value : value.PPNDate+','+["全天","上午","下午"][value.PPNType]+','+(value.Number-value.UsedNumber),
                  parent : value.PPNDate
                });
              }else{
                arr.push({
                  name : value.PPNDate,
                  value : value.PPNDate,
                  parent : 0
                });
                arr.push({
                  name : ["全天","上午","下午"][value.PPNType]+"("+value.UsedNumber+"/"+value.Number+")",
                  value :  value.PPNID+","+["全天","上午","下午"][value.PPNType]+','+(value.Number-value.UsedNumber),
                  parent : value.PPNDate
                })
              }
            });
            that.timedatas = arr;
          }
        })
        .catch((err) => { console.log(err) })
      }

    },
    fetchData(){
      this.gettbsysorganize();
      this.item.phid = this.$route.params.phid;
      this.pnumber = this.item.phid.length == 0?0:this.item.phid.split(',').length-1;
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
