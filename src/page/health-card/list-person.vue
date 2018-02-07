<template >
  <div class="myapp">
    <x-header :left-options="{showBack: false}">健康证查询</x-header>
    <scroll class='scroll-normal'
          :on-refresh="onRefresh"
          :noDataText='noDataText'
          ref="my_scroller">
      <div class="list">
         <div class="item"  v-for="item in list" :key="item.PCCardNumber" @click="view(item)">
            <div class="right-ctx" v-bind:style="{ 'border-color': item.color }">
              <h3>{{item.PCName}}</h3>
              <p>证件编号：{{item.PCCardNumber}}</p>
              <p>有效期限：{{item.PCDateStart|formatdate}}&nbsp;~&nbsp;{{item.PCDateEnd|formatdate}}</p>
            </div>
          </div>
      </div>
      <div v-if='nodata' class="nodata" @click="goAppoinment">
        <img src="../../assets/nodata.png" alt="无数据">
        亲，您目前还未领到健康证哦！！！
      </div>

    </scroll>
  </div>
</template>

<script>
import { XHeader, Swipeout, SwipeoutItem, SwipeoutButton, PopupHeader, Popup,Checklist } from "vux";
// import vscroll from "../../components/vscroll";
import { _personServices } from "../../service/personServices";
import scroll from '../../components/scroll';
import { formatDate } from '../../utils/formatDate';
export default {
  name: "health-list-person",
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
    this.loadData();
  
    
  },
  filters: {
    formatdate(time){
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd")
    }
  },
  data() {
    return {
      list: [],
      isLoading: false,
      nodata: false,
      noDataText: '',
    };
  },
  methods: {
    view(item) {
      this.$store.commit("updateHealthyCard", item);
      this.$router.push({
        name: "health-view-person",
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

    loadData() {
      // this.maxPageIndex = pageindex;
      let that = this;
      this.isLoading = true;
      _personServices._getphysicalcard().then(data => {
        if (data.ResultType == 0) {
          console.log(data);
          if(data.AppendData.length !== 0){
            that.list = data.AppendData;
            this.list.forEach((item, index, arr) => {
              let number = new Date(item.PCDateEnd).getTime() - new Date();
              if (number < 0) this.list[index].color = "gray";
              else this.list[index].color = "#3c9";

            });
            
            that.nodata = false;
            that.isLoading = false;
            that.noDataText = '---- 我是底线 ----';
            // console.log(data.AppendData);
          }else{
            that.nodata = true
            that.noDataText = "";
          }
        }
      }).catch(err => console.log(err));
    },
    goAppoinment(){
      this.$router.push({name: 'staff-information-list'});
    }
  }
};
</script>

<style lang="less">
body[data-path=health-list-person] {
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
        border-left: 1px solid #3c9;
        padding-left: 1em;
    }
  }
}
</style>
