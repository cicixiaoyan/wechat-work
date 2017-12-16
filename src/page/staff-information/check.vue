<template >
  <div class="myapp">
    <x-header>体检人员选择</x-header>
    <!-- <panel :footer="footer" :list="list" :type="type" @on-img-error="onImgError"></panel> -->
    <scroll class="scroll-checkallow"
          :on-refresh="onRefresh"
          :noDataText='noDataText'
          ref="my_scroller">
      <div class="list">
        <label class="item" v-for="(item, index) in list" :key="item.PhID">
          <div class="left-ctx"  @click='change(index)' >
            <span v-show='!item.checked' class="iconfont icon-checknormal"></span>
            <span v-show='item.checked' class="iconfont icon-checkedon success"></span>
          </div>
          <div class="right-ctx">
            <h4>{{item.PhName}}<span>[{{item.age}}岁]</span>&emsp;{{item.PhSex}}</h4>
            <p>{{item.PhCardId}}</p>
          </div>
          <span class="iconfont icon-accessory" @click="$refs.swipeoutItem[index].open('right')"></span>
        </label>
      </div>
      <div v-if='nodata' class="nodata">
        <img src="../../assets/vux_logo.png" alt="无数据">
        亲，您目前还没有员工可以预约！
      </div>
    </scroll>
    <flexbox  align='stretch'  :gutter="0" class="fix-bottom">
      <flexbox-item @click.native='checkall'>
        <label>
          <span v-show='!checkAll' class="iconfont icon-checknormal gray"></span>
          <span v-show='checkAll' class="iconfont icon-checkedon success"></span>
          全选
      </label>
      </flexbox-item>
      <flexbox-item>共计<span class="danger">{{checkedNumber}}人</span></flexbox-item>
      <flexbox-item @click.native='submit' class='flex-last'>完成选择</flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { XHeader, TransferDom, PopupHeader, Popup, Checklist, Flexbox, FlexboxItem, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux';
import { IdCardTo } from '../../utils/idc';
import scroll from '../../components/scroll';
import {_staffServce} from '../../service/staffService';
import {PhysicalInfoServices} from '../../service/EmpPhysicalInfo';
export default {
  name: 'staff-information-check',
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    PopupHeader,
    Popup,
    Checklist,
    Flexbox,
    FlexboxItem,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    scroll
  },
  created(){
    this.routeParams = this.$route.params.phids.split(',');
    this.checkedNumber = this.routeParams.length.length ==0 ? 0: this.routeParams.length-1;
    this.loadData();

  },
  data () {
    return {
      routeParams:[],
      phName: '',
      phTel: '',
      phunit: '',
      phcardid: '',
      checkAll: false,
      showpop: false,
      showchecktime: false,
      checkedNumber: 0,
      totalNumber: 0,
      checkValue: [],
      checkAllow: false,
      list: [],
      isLoading: false,
      nodata: false,
      noDataText: '',
    };
  },
  methods: {
    view(id) {
      this.$router.push({name: 'staff-information-edit', params: { 'id': id, 'read': true }});
    },
    change (index) {
      this.list[index].checked = !this.list[index].checked;
      let dec = this.list[index].checked ? 1 : -1;
      this.checkedNumber = this.checkedNumber + dec;
    },
    checkall() {
      let that = this;
      this.checkAll = !this.checkAll;
      let number = 0;
      this.list.forEach(function (item, index, array) {
        if(item.PhStatus == 0 && item.IsLeave==0){
          item.checked = that.checkAll;
          that.checkAll ? number++ : '';
        }
      });
      this.checkedNumber = number;
    },
    submit() {
      let that = this;
      let phids = '';
      this.list.forEach(function (item, index, array) {
        phids += (item.checked ? item.PhID+',' : '');
      });
      this.$router.push({name:'appointment-add', params: {"phid": phids }});

    },
    onRefresh(done) {
      this.list = [];
      this.loadmore = true;
      this.loadData();
      setTimeout(() => {
        done(); //必须有
      }, 1500)
    },
    loadData() {
      let that = this;
      _staffServce.getphysicalinfo()
      .then((data) => {
        let list = data.AppendData;
        if(list.length != 0){
          let arr = [];
          list.forEach(function(value, index, array){
            if(value.PhStatus == 0 && value.IsLeave==0){
              value.checked = false;
              that.routeParams.forEach(function(value1, index1){
                if(value1 == value.PhID) value.checked = true;
              })
              arr.push(value)
            }
          })
          if(arr.length == 0) {that.nodata = true;}
          else{
            that.totalNumber = arr.length;
            that.nodata = false;
            that.list = arr;
          }
        }else{
          that.nodata = true;
        }
      }).catch(err => console.log(err));
    },
    testName(){
      if(this.addData.phName == "" || this.addData.phName.length > 10){
        this.nameValid = false;
      }else{
        this.nameValid = true;
      }
    },
    testIdc(){
      var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if(reg.test(this.addData.phcardid)){
        this.idcValid = true;
      }else{
        this.idcValid = false;
      }
    },
    textPhone(){
      let reg = /^((13[0-9])|(14[5|7])|(15([0-9]))|(17[0-9])|(18[0-9]))\d{8}$/;
      if(reg.test(this.addData.phTel)){
        this.phoneValid = true;
      }else{
        this.phoneValid = false;
      }
    },
  }
};
</script>

<style lang="less">
  @import '../../style/common.less';
  .myapp {
    // position: relative;

    ._v-container.scroll-checkallow >{
      .px2rem(top, 100);
      .px2rem(bottom, 90);
      position: fixed;
      height: auto!important;
    }
    .list{
      .px2rem(margin-bottom, 5);
      .item{
        .left-ctx {
          width: 1.389rem;
          height: 1.389rem;
          line-height: 1.389rem;
          border-radius: 50%;
          align-self: center;
          margin-right: 0.278rem;
          text-align: center;
          color: #999;
          .iconfont{
            .px2px(font-size, 52);
          }
        }
        >.iconfont{
          position: absolute;
          right: 1em;
          color: #ebc650;
          font-size: large;
        }

      }
    }
    .fix-bottom{
      .px2rem(height, 90);
      .px2rem(line-height, 90);
      position: fixed;
      .px2rem(bottom, 0);
      background: #fff;
      .px2px(font-size, 32);
      text-align: center;
      .iconfont{
        .px2px(font-size, 52);
        position: relative;
        .px2rem(bottom, 4);
        vertical-align: middle;
      }
      > .flex-last{
        flex: 0 0 10em;
        background: #3c9;
        color: #fff;
      }
    }

  }



  .valid-err{
    position: relative;
    // top: -5px;
    .px2rem(top, -20);
    text-align: center;
    color: red;
  }

  .pop-content{
    .px2rem(padding-left, 100);
    .px2rem(padding-right, 100);
    padding-top: .5rem;
  }
  .vux-flexbox.form-item{
    .px2px(font-size, 36);

    .px2rem(padding-bottom, 36);
    > .form-item-left{
      flex-grow: 0;
      flex-shrink: 0;
      .px2rem(flex-basis, 84);
    }


    .iconfont{
      .px2px(font-size, 56);
      color: #3c9;
    }
    input{
      width: 100%;
      border: 1px solid #ddd;
      .px2rem(height, 72);
      .px2rem(padding-left, 10);
      .px2rem(padding-right, 10);
      &:focus{
        outline: none;
        border-color: #3c9;
        // border-style: solid;
        border-width: 1px;
      }
    }


  }

  .vux-flexbox.submit-box1{
    > .vux-flexbox-item{
      .px2rem(height, 85);
      .px2rem(line-height, 85);
      text-align: center;
      .px2px(font-size, 32);
      &.light{
        background: #fff;
        color: #3c9;
      }

      &.primary{
        background: #3c9;
        color: #fff;
      }
    }
  }

</style>
