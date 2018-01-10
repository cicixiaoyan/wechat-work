<template>
  <div  class="myapp">
    <x-header>体检人员列表<a slot="right" v-if='!nodata && checkAllowNumber!=0' @click='appointment'>{{checkAllow?'取消':'取消预约'}}</a></x-header>
    <!-- :on-infinite="onInfinite" -->
    <scroll :class='{"scroll-checkallow":checkAllow,"scroll-normal":!checkAllow}'
          :on-refresh="onRefresh"
          :noDataText='noDataText'
          ref="my_scroller">
      <div class="list">
        <swipeout>
          <swipeout-item ref="swipeoutItem" disabled transition-mode="follow" v-for="(item, index) in list" :key="item.PhId">
            <div slot="right-menu">
              <swipeout-button @click="deleteItem(index)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content">
            <label class="item">
              <div class="left-ctx"  @click='change(index)' v-if="checkAllow && item.PhADStatus != -10">
                <span v-show='!item.checked' class="iconfont icon-checknormal"></span>
                <span v-show='item.checked '  class="iconfont icon-checkedon success"></span>
              </div>
              <div  class="left-ctx" v-if="checkAllow && item.PhADStatus == -10">&nbsp;</div>
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
    <flexbox v-if="checkAllow" align='stretch'  :gutter="0" class="fix-bottom">
      <flexbox-item @click.native='checkall'>
        <label>
          <span v-show='!checkAll' class="iconfont icon-checknormal gray"></span>
          <span v-show='checkAll' class="iconfont icon-checkedon success"></span>
          全选
      </label>
      </flexbox-item>
      <flexbox-item>共计<span class="danger">{{checkedNumber}}人</span></flexbox-item>
      <flexbox-item @click.native='submit' class='flex-last'>提交取消预约申请</flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { XHeader, TransferDom,  Swipeout, SwipeoutItem, SwipeoutButton, Flexbox, FlexboxItem } from 'vux';
import {_appointmentServce} from '../../service/appointmentServices'
import scroll from '../../components/scroll';
export default {
  name: 'staff-information-view-list',
  components: {
    XHeader, TransferDom,  Swipeout, SwipeoutItem, SwipeoutButton, scroll, Flexbox, FlexboxItem
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
      checkAllow: false,
      checkAllowNumber: 0,
      checkedNumber: 0,
      checkAll: false
    };
  },
  computed:{
    phaid(){
      return this.$route.params.phaid;
    }
  },
  created(){
    this.checkAllow = this.$route.params.showcancel == "1" ? true : false;
    this.loadData();
  },
  methods: {
    change(index) {
      this.list[index].checked = !this.list[index].checked;
      let dec = this.list[index].checked ? 1 : -1;
      this.checkedNumber = this.checkedNumber + dec;
      this.checkAll = (this.checkAllowNumber == this.checkedNumber) ? true : false;
    },
    checkall() {
      let that = this;
      this.checkAll = !this.checkAll;
      let number = 0;
      this.list.forEach(function(item, index, array) {
        if (item.PhADStatus != -10) {
          item.checked = that.checkAll;
          that.checkAll ? number++ : "";
        }
      });
      this.checkedNumber = number;
    },
    appointment() {
      if(!this.checkAllow && this.checkAllowNumber === 0) {
        return this.$vux.toast.show({
            text: '您当前无可取消预约员工！',
            type: "warn",
            position: "middle",
            width: '10em'
          });
      }
      this.checkAllow = !this.checkAllow;
      // this.$router.push({name: 'appointment-view', params: { 'id': id }});
    },
    submit() {
      if(this.checkedNumber === 0) return;
      let that = this;
      let phadids = "";
      this.list.forEach(function(item, index, array) {
        phadids += item.checked ? item.PhADID + "," : "";
      });
      _appointmentServce.cacelAppointment({phadid: phadids}).then(data => {
        if(data.ResultType == 0){
          this.$vux.toast.show({
            text: '已选人员取消预约成功！',
            type: "success",
            position: "middle",
            width: '10em'
          });
          this.$router.push({name: "appointment-list"});
        }else{
          this.$vux.toast.show({
            text: data.Message,
            type: "warn",
            position: "middle",
            width: '10em'
          });
        }
      });
    },
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
            // that.list = data.AppendData;
            that.nodata = false;


            that.list = data.AppendData.sort(function(x, y){
              if(x.PhADStatus == -10 ){
                return 1
              }else {
                return -1
              }
            });

            that.checkAllowNumber = 0;
            that.list.forEach(function(item, index) {
              if (item.PhADStatus != -10) {
                that.checkAllowNumber++;
              }
            });

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

    cancelAppiontment(){

    }

  }
};
</script>

<style lang="less">
  @import "../../style/common.less";
body[data-path=staff-information-view-list]{
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
    // position: relative;
    // 修改scroll
    ._v-container.scroll-normal >  {
      .px2rem(top, 100);
      .px2rem(bottom, 0);
      position: fixed;
      height: auto !important;
    }

    ._v-container.scroll-checkallow >  {
      .px2rem(top, 100);
      .px2rem(bottom, 20);
      position: fixed;
      height: auto !important;
    }
    // 修改header a
    .vux-header .vux-header-right a{
      min-width: 4em;
      text-align: right;
    } 
    .vux-header .vux-header-left a{
      min-width: 3em;
    }
    .list {
      .px2rem(margin-bottom, 5);
      .item {
        .left-ctx {
          width: 1.389rem;
          height: 1.389rem;
          line-height: 1.389rem;
          border-radius: 50%;
          align-self: center;
          margin-right: 0.278rem;
          text-align: center;
          color: #999;
          .iconfont {
            .px2px(font-size, 52);
          }
        }
        > .iconfont {
          position: absolute;
          right: 1em;
          color: #ebc650;
          font-size: large;
        }
      }
    }
    .fix-bottom {
      .px2rem(height, 90);
      .px2rem(line-height, 90);
      position: fixed;
      .px2rem(bottom, 0);
      background: #fff;
      .px2px(font-size, 32);
      text-align: center;
      .iconfont {
        .px2px(font-size, 52);
        position: relative;
        .px2rem(bottom, 4);
        vertical-align: middle;
      }
      > .flex-last {
        flex: 0 0 10em;
        background: #FF5722;
        color: #fff;
      }
    }
  }
  }
</style>
