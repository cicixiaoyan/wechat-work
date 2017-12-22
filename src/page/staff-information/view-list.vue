<template>
  <div>
    <x-header>员工列表</x-header>
    <!-- :on-infinite="onInfinite" -->
    <scroll style="top: 44px;"
          :on-refresh="onRefresh"
          
          :noDataText='noDataText'
          ref="my_scroller">
      <div class="list">
        <swipeout>
          <swipeout-item ref="swipeoutItem" disabled  transition-mode="follow" v-for="(item, index) in list" :key="item.PhId">
            <div slot="right-menu">
              <swipeout-button @click="deleteItem(index)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content">
            <label class="item">
              <div class="right-ctx">
                <h4>{{item.PhName}}<span>[{{item.age}}岁]</span>&emsp;{{item.PhSex}}</h4>
                <p>[{{item.PhCardId}}]</p>
                <!-- <p>{{item.IsLeave == 0 ? '在职' : '离职'}}</p> -->
              </div>
              <span class="iconfont icon-accessory" @click="$refs.swipeoutItem[index].open('right')"></span>
            </label>
            </div>
          </swipeout-item>
        </swipeout>
      </div>

    </scroll>
  </div>
</template>

<script>
import { XHeader, TransferDom,  Swipeout, SwipeoutItem, SwipeoutButton } from 'vux';
import {_appointmentServce} from '../../service/appointmentServices'
import scroll from '../../components/scroll';
export default {
  name: 'staff-information-view-list',
  components: {
    XHeader, TransferDom,  Swipeout, SwipeoutItem, SwipeoutButton, scroll
  },
  data () {
    return {
      noDataText: '',
      list: [],
      page: 0,
      size: 20,
      loadmore: true,
      isLoading: false,
      nodata: false,
    };
  },
  computed:{
    phaid(){
      return this.$route.params.phaid;
    }
  },
  created(){
    this.loadData();
  },
  methods: {
    deleteItem(index) {
      let that = this;
      let id = this.list[index].Id;
      // 根据id请求后台删除
      _staffServce.deleteAppointment(id)
      .then((data) => {
        that.$vux.toast.show({
          text: '删除成功',
          type: 'success',
          position: 'middle'
        });
      }).catch(err => {console.log(err)})
      this.list.splice(index,1);
    },
    onRefresh(done) {
      this.page = 1;
      this.list = [];
      this.loadmore = true;
      this.loadData();
      setTimeout(() => {
        done(); //必须有
      }, 1500)
    },
    // onInfinite(done) {
    //   if (this.isLoading == false) {
    //     this.isLoading = true;
    //     this.page++;
    //     this.loadData(this.page);
    //   }
    //   let that = this;
    //   // 加载更多时间
    //   setTimeout(() => {
    //     that.loadmore ? done() : done(true);
    //   }, 1500)
    // },
    loadData(pageindex = 1, pagesize = 10, phaid = this.$route.params.phaid) {
      let that = this;
      this.isLoading = true;
      _appointmentServce.getappointmentdetailbyphaid( pageindex, pagesize,this.phaid).then(data => {
        if (data.ResultType == 0) {
          if(data.AppendData.length !== 0){
            that.list = data.AppendData;
            that.nodata = false;
            this.loadmore = true;
            this.isLoading = false;
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

  }
};
</script>

<style lang="less">

</style>
