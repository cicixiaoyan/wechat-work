<template >
  <div class="myapp">
    <x-header :left-options="{showBack: false}">申请记录</x-header>
    <!-- <panel :footer="footer" :list="list" :type="type" @on-img-error="onImgError"></panel> -->
    <!-- <vscroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <div class="list">
        <div class="item" v-for="item in list" @click='view(item.Id,item.originalData)'>
          <div class="left-ctx"
          v-bind:class="{ 'warning': item.status=='待审核', 'danger': item.status=='未通过', 'success': item.status=='已通过' }">
            {{item.status}}
          </div>
          <div class="right-ctx">
            <h4>{{item.time}}</h4>
            <p>[{{item.number}}]&emsp;预约人数</p>
          </div>
        </div>
      </div>
      <div v-if='nodata'></div>
    </vscroll> -->
    <scroll style="top: 44px;"
          :on-refresh="onRefresh"
          :on-infinite="onInfinite"
          :noDataText='noDataText'
          ref="my_scroller">
      <div class="list">
        <div class="item" v-for="item in list" @click='view(item.Id,item.originalData)'>
          <div class="left-ctx"
          v-bind:class="{ 'warning': item.status=='待审核', 'danger': item.status=='未通过', 'success': item.status=='已通过' }">
            {{item.status}}
          </div>
          <div class="right-ctx">
            <h4>{{item.time}}</h4>
            <p>[{{item.number}}]&emsp;预约人数</p>
          </div>
        </div>
      </div>
      <div v-if='nodata' class="nodata" @click="goAppoinment">
        <img src="../../assets/vux_logo.png" alt="无数据">
        亲，您目前还没有任何预约记录哦！点击预约
      </div>

    </scroll>
  </div>
</template>

<script>
import { XHeader } from "vux";
// import vscroll from "../../components/vscroll";
import { _appointmentServce } from "../../service/appointmentServices";
import scroll from '../../components/scroll';
export default {
  name: "appointment-list",
  components: {
    XHeader,
    scroll
  },
  created() {
    console.log("创建成功");
    this.loadData();
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      list: [
        // {
        //   Id: "1",
        //   time: "2017-01-01 14:00:00",
        //   number: "50",
        //   status: "待审核"
        // },
        // {
        //   Id: "2",
        //   time: "2017-01-02 14:00:00",
        //   number: "51",
        //   status: "已通过"
        // },
        // {
        //   Id: "3",
        //   time: "2017-01-02 14:00:00",
        //   number: "50",
        //   status: "未通过"
        // },
        // {
        //   Id: "4",
        //   time: "2017-01-02 14:00:00",
        //   number: "50",
        //   status: "未通过"
        // },
        // {
        //   Id: "5",
        //   time: "2017-01-02 14:00:00",
        //   number: "50",
        //   status: "未通过"
        // },
        // {
        //   Id: "6",
        //   time: "2017-01-02 14:00:00",
        //   number: "50",
        //   status: "已通过"
        // },
        // {
        //   Id: "7",
        //   time: "2017-01-02 14:00:00",
        //   number: "50",
        //   status: "未通过"
        // }
      ],
      maxPageIndex: 1,
      isLoading: false,
      nodata: false,
      noDataText: '',
      page: 1,
      size: 10,
      snapping: false,
      showInfiniteLayer: false,

    };
  },
  methods: {
    view(id,originalData) {
      this.$router.push({
        name: "appointment-view",
        params: { id: id, appointmentDetail: originalData }
      });
    },
    onRefresh(done) {
      this.page = 1;
      this.list = [];
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
        that.nodata ? done(true) : done();
      }, 1500)

      console.log("加载更多数据");
      // console.log(
      //   "this.lastPageIndex = " +
      //     this.lastPageIndex +
      //     " this.maxPageIndex = " +
      //     this.maxPageIndex
      // );


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
            this.isLoading = false;
            // that.maxPageIndex = pageindex;
            // setTimeout(() => {
            //   // this.isLoading = false; // TODO
            // }, 200);
            // console.log(
            //   "数据获取成功  pageindex = " + pageindex + " pagesize =" + pagesize
            // );
            console.log(data.AppendData);
          }else{
            that.nodata = true;
            that.noDataText = that.page == 1 ? '' : '没有更多数据';
          }
        }
      }).catch(err => console.log(err));
    },

    appendToList(AppendData) {
      let that = this;
      AppendData.forEach(item => {
        that.list.push({
          Id: item.PhAID,
          time: item.PhADate + " " + ["全天", "上午", "下午"][item.PPNType],
          number: item.PhCount,
          status: ["", "未通过", "待审核", "已通过"][item.PhAStatus],
          originalData: item
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
