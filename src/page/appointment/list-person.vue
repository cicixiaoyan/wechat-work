<template >
  <div class="myapp">
    <x-header :left-options="{showBack: false}">申请记录</x-header>
    <scroll class='scroll-normal'
          :on-refresh="onRefresh"
          :noDataText='noDataText'
          loadingLayerColor="red"
          ref="my_scroller">
      <div class="list">
            <div slot="content">
              <div class="item" v-for="item in list" :key="item.Id" @click="view(item)">

                <div class="left-ctx"
                  v-bind:class="{ 'warning': item.PhAStatus==2, 'danger': (item.PhAStatus==1 || item.IsDelete == 1), 'success': item.PhAStatus==3 }">
                  {{item.IsDelete == 1 ? "已取消" : ["", "已拒绝", "待审核", "已预约"][item.PhAStatus]}}
                </div>

                <div class="right-ctx">
                  <h4>{{item.PhADate.split(" ")[0]}}&nbsp;{{["全天", "上午", "下午"][item.PPNType]}}</h4>
                  <p>{{item.PhADOrName}}</p>
                </div>
              </div>
            </div>
         
      </div>
      <div v-if='nodata' class="nodata">
        <img src="../../assets/nodata.png" alt="无数据">
        亲，您目前还没有任何预约记录哦!
      </div>

    </scroll>
    <div v-transfer-dom>
      <loading :show="isLoading" text="加载中"></loading>
    </div>
  </div>
</template>

<script>
import { XHeader, PopupHeader, Popup, Checklist, Loading, TransferDomDirective as TransferDom } from "vux";
// import vscroll from "../../components/vscroll";
import { _personServices } from "../../service/personServices";
import scroll from '../../components/scroll';
export default {
  name: "personappointment-list-person",
  components: {
    XHeader,
    scroll, Loading,
    PopupHeader, Popup,Checklist
  },
  directives: {
    TransferDom
  },
  created() {
    console.log("创建成功");
    this.loadData();
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
      
    };
  },
  methods: {
    view(item) {
      console.log(item);
      this.$store.commit("updateAppointment", item);
      this.$router.push({
        name: "appointment-view-person"
      });
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
    loadData() {
      // this.maxPageIndex = pageindex;
      let that = this;
      this.isLoading = true;
      _personServices._getinfo().then(data => {
        if (data.ResultType == 0) {
          if(data.AppendData.appointment.length !== 0){
            // that.appendToList(data.AppendData);
            console.log(data.AppendData);
            that.list = data.AppendData.appointment;
            that.nodata = false;
            that.isLoading = false;
            that.noDataText = '---- 我是底线 ----';
            // console.log(data.AppendData);
          }else{
            that.isLoading = false;
            that.loadmore = false;
            that.nodata = true
            that.noDataText = "";
          }
        }
      }).catch(err => {
        console.log(err); that.isLoading = false;
      });
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
