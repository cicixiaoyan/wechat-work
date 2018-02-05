<template >
  <div class="myapp">
    <x-header :left-options="{showBack: false}">申请记录</x-header>
    <scroll class='scroll-normal'
          :on-refresh="onRefresh"
          :on-infinite="onInfinite"
          :noDataText='noDataText'
          ref="my_scroller">
      <div class="list">
        <swipeout>
          <swipeout-item ref="swipeoutItem"   transition-mode="follow" v-for="(item, index) in list" :key="item.Id">
            <div slot="right-menu"  >
              <swipeout-button v-if='item.PhAStatus === 1 || item.PhAStatus === 2' @click.native.prevent="deleteItem(index)" type="warn">删除</swipeout-button>

              <swipeout-button v-if='item.PhAStatus === 3 && (item.CancelNumber < item.number)' @click.native.prevent="showCancel=true;cancelId=item.Id" type="danger">取消预约</swipeout-button>
            </div>
            <div slot="content">
              <div class="item"  @click='view(item.Id,item.originalData)'>

                <div class="left-ctx"
                  v-bind:class="{ 'warning': item.status=='待审核', 'danger': (item.status=='未通过' || item.status == '已取消'), 'success': item.status=='已通过' }">
                  {{item.status}}
                </div>

                <div class="right-ctx">
                  <h4>{{item.time}}&emsp;</h4>
                  <p>[{{item.number}}]&emsp;预约人数<span v-if="item.CancelNumber > 0" tyle="font-size: small;color: chocolate;"> [已取消{{item.CancelNumber}}人]</span>&emsp;<span style="font-size: small;color: chocolate;">{{item.ActualPPNID !== item.PPNID ? '[时间被更改]':''}}</span></p>
                  <p>{{item.originalData.PhaOrName}}</p>
                </div>
              </div>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
      <div v-if='nodata' class="nodata" @click="goAppoinment">
        <img src="../../assets/nodata.png" alt="无数据">
        亲，您目前还没有任何预约记录哦！点击预约
      </div>

    </scroll>
    <popup v-model="showCancel">
        <popup-header  title="选择取消预约方式"></popup-header>
        <div class="pop-content">
          <checklist  :options="chancelOption" :max="1" @on-change='cancelItem' :value="chancelMethod"></checklist>
        </div>
      </popup>
  </div>
</template>

<script>
import { XHeader, Swipeout, SwipeoutItem, SwipeoutButton, PopupHeader, Popup,Checklist } from "vux";
// import vscroll from "../../components/vscroll";
import { _appointmentServce } from "../../service/appointmentServices";
import scroll from '../../components/scroll';
export default {
  name: "appointment-list-person",
  components: {
    XHeader,
    scroll,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    PopupHeader, Popup,Checklist
  },
  created() {
    // console.log("创建成功");
    // this.loadData();
  },
  data() {
    return {
      list: [],
      maxPageIndex: 1,
      isLoading: false,
      nodata: false,
      noDataText: '',
      loadmore: true,
      page: 0,
      size: 10,
      snapping: false,
      showInfiniteLayer: false,
      showCancel: false,
      chancelOption: ["取消整条预约", "取消某人预约"],
      cancelId: '',
      chancelMethod: []
    };
  },
  methods: {
    view(id,originalData) {
      this.$router.push({
        name: "appointment-view",
        params: { id: id, appointmentDetail: originalData }
      });
    },
    cancelItem(val){
      let that = this;
      this.showCancel = false;
      if(val[0] == "取消整条预约"){
        _appointmentServce.cacelAppointment({"phaid": this.cancelId}).then(data => {
          if(data.ResultType == 0){
            that.$vux.toast.show({
              text: "取消预约成功",
              type: 'success',
              position: 'middle',
              width: '10em'
            });
            this.loadData();
          }else{
            that.$vux.toast.show({
              text: data.Message,
              type: 'warn',
              position: 'middle',
              width: '10em'
            });
          }
        })
      }else if(val[0] == "取消某人预约"){
        this.$router.push({name: "staff-information-view-list", params: {"phaid": this.cancelId, "showcancel": "1" }});
      }
      
    },
    onRefresh(done) {
      this.page = 1;
      this.list = [];
      this.loadmore = true;
      this.loadData();
      setTimeout(() => {
        done(); //必须有
      }, 1500)
      // 刷新
    },
    onInfinite(done) {

      if (this.isLoading == false) {
        this.isLoading = true;
        this.page++;
        this.loadData(this.page);
        // console.log("加载新的数据");
        // this.loadData(this.maxPageIndex + 1);
      }
      let that = this;
      // 加载更多时间
      setTimeout(() => {
        that.loadmore ? done() : done(true);
      }, 1500)
      // console.log("加载更多数据");
    },
    loadData(pageindex = 1, pagesize = 10) {
      // this.maxPageIndex = pageindex;
      let that = this;
      this.isLoading = true;
      _appointmentServce.getAppointmentList(pageindex, pagesize).then(data => {
        if (data.ResultType == 0) {
          if(data.AppendData.length !== 0){
            that.appendToList(data.AppendData);
            
            that.nodata = false;
            that.loadmore = data.AppendData.length === pagesize ? true : false;
            that.isLoading = false;
            that.noDataText = '---- 我是底线 ----';
            // console.log(data.AppendData);
          }else{
            that.loadmore = false;
            if(that.page == 1){
              that.nodata = true
              that.noDataText = "";
            }else{
              that.noDataText = '---- 我是底线 ----';
            }

          }
        }
      }).catch(err => console.log(err));
    },
    deleteItem(index){
      let id = this.list[index].Id;
      let that = this;
      _appointmentServce.deleteAppointment(id)
      .then(data => {
        that.list.splice(index, 1);

        that.$vux.toast.show({
          text: "删除预约成功",
          type: 'success',
          position: 'middle',
          width: '10em'
        });
        that.list = [];
        that.loadData();
      })
    },
    appendToList(AppendData) {
      let that = this;
      AppendData.forEach(item => {
        that.list.push({
          Id: item.PhAID,
          time: item.PhADate + " " + ["全天", "上午", "下午"][item.PPNType],
          number: item.PhCount,
          status: item.CancelNumber==item.PhCount? "已取消" :["", "未通过", "待审核", "已通过"][item.PhAStatus],
          originalData: item,
          PhAStatus: item.PhAStatus,
          ActualPPNID: item.ActualPPNID,
          PPNID: item.PPNID,
          CancelNumber: item.CancelNumber
        });
      });
    },
    goAppoinment(){
      this.$router.push({name: 'staff-information-list'});
    }
  }
};
</script>

<style lang="less">
.myapp {
  .nodata{
    text-align: center;
    color: #3c9;
    padding: 20px;
    margin-top: 50%;
    transform: translateY(-50%);
    img{
      width: 100%;
    }
  }
  .list {
    margin-bottom: 5px;
  }
  .item {
    .left-ctx {
      width: 1.389rem;
      height: 1.389rem;
      line-height: 1.389rem;
      border-radius: 50%;
      align-self: center;
      margin-right: 0.278rem;
      font-size: 0.361rem;
      text-align: center;

      &.warning {
        border: 0.0833rem solid #ebc650;
        color: #ebc650;
      }

      &.success {
        border: 0.0833rem solid #73ca47;
        color: #73ca47;
      }

      &.danger {
        border: 0.0833rem solid #f96868;
        color: #f96868;
      }
    }
    .right-ctx {
    }
  }
}
</style>
