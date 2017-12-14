<template >
  <div class="myapp">
    <x-header :left-options="{showBack: false}">成员列表({{totalNumber}})<a slot="left" @click="showchecktime=true">添加</a><a slot="right" @click='appointment'>预约</a></x-header>
    <!-- <panel :footer="footer" :list="list" :type="type" @on-img-error="onImgError"></panel> -->
    <vscroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <div class="list">
        <swipeout>
          <swipeout-item ref="swipeoutItem"  transition-mode="follow" v-for="(item, index) in list" :key="item.Id">
            <div slot="right-menu">
              <swipeout-button @click="deleteItem(index)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content">
            <label class="item">
              <div class="left-ctx"  @click='change(index)'>
                <span v-show='!item.checked' class="iconfont icon-checknormal"></span>
                <span v-show='item.checked' class="iconfont icon-checkedon success"></span>
              </div>
              <div class="right-ctx">
                <h4>{{item.phName}}</h4>
                <p>[{{item.phcardid}}]</p>
              </div>
              <span class="iconfont icon-accessory" @click="$refs.swipeoutItem[index].open('right')"></span>
            </label>
            </div>
          </swipeout-item>
        </swipeout>

      </div>
    </vscroll>
      <!-- <checklist  :options="ilist" v-model="checkValue" @on-change="change"></checklist> -->
    <flexbox align='stretch'  :gutter="0" class="fix-bottom">
      <flexbox-item @click.native='checkall'>
        <label>
          <span v-show='!checkAll' class="iconfont icon-checknormal gray"></span>
          <span v-show='checkAll' class="iconfont icon-checkedon success"></span>
          全选
      </label>
      </flexbox-item>
      <flexbox-item>共计<span class="danger">{{checkedNumber}}人</span></flexbox-item>
      <flexbox-item @click.native='submit' class='flex-last'>提交体检预约申请</flexbox-item>
    </flexbox>

    <div v-transfer-dom>
      <popup v-model="showchecktime" position="bottom">
        <popup-header left-text="" right-text="" title="新增成员"></popup-header>
        <div class="pop-content">
          <flexbox  class="form-item" :gutter="0">
            <flexbox-item class='form-item-left'>
              <span class="iconfont icon-gerenxinxi"></span>
            </flexbox-item>
            <flexbox-item>
              <input type="text" placeholder="姓名" name="phName" value="">
            </flexbox-item>
          </flexbox>
          <flexbox  class="form-item"  :gutter="0">
            <flexbox-item class='form-item-left'>
              <span class="iconfont icon-shenfenzhenghao"></span>
            </flexbox-item>
            <flexbox-item>
              <input type="text" placeholder="身份证号" name="phcardid" value="">
            </flexbox-item>
          </flexbox>
          <flexbox  class="form-item"  :gutter="0">
            <flexbox-item class='form-item-left'>
              <span class="iconfont icon-contextphone"></span>
            </flexbox-item>
            <flexbox-item>
              <input type="text" placeholder="手机号(选填)" name="phTel" value="">
            </flexbox-item>
          </flexbox>
          <flexbox  class="form-item"  :gutter="0">
            <flexbox-item class='form-item-left'>
              <span class="iconfont icon-jigou"></span>
            </flexbox-item>
            <flexbox-item>
              <input type="text" placeholder="单位" name="phunit" value="">
            </flexbox-item>
          </flexbox>
        </div>
        <div>
          <flexbox class="submit-box1"  :gutter="0">
            <flexbox-item class="light" @click.native='cancel'>取消</flexbox-item>
            <flexbox-item class="primary" @click.native='addStaff'>完成</flexbox-item>
          </flexbox>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { XHeader, TransferDom, PopupHeader, Popup, Checklist, Flexbox, FlexboxItem, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux';
import { IdCardTo } from '../../utils/idc';
import vscroll  from '../../components/vscroll';
import {_staffServce} from '../../service/staffService';
export default {
  name: 'staff-information-list',
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
    vscroll
  },
  created(){
    _staffServce.getphysicalinfo()
    .then((data) => {

    }).catch(err => console.log(err));
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      phName: '',
      phTel: '',
      phunit: '',
      phcardid: '',
      checkAll: false,
      showpop: false,
      showchecktime: false,
      checkedNumber: 0,
      totalNumber: 3,
      checkValue: [],
      ilist: [
        {
          key:'1',
          value:'张三',
          inlineDesc:'511322198910101010'
        }
      ],
      list: [
        {
          Id: '1',
          phName: '张三',
          phcardid: '511322198910101010',
          checked: false
        },
        {
          Id: '2',
          phName: '李四',
          phcardid: '511322198910101010',
          checked: false
        },
        {
          Id: '3',
          phName: '王五',
          phcardid: '511322198910101010',
          checked: false
        }
      ]
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
      this.checkedNumber = this.checkAll ? this.list.length : 0;
      this.list.forEach(function (item, index, array) {
        item.checked = that.checkAll;
      });

    },
    appointment() {
      // this.$router.push({name: 'appointment-view', params: { 'id': id }});
    },
    submit() {

    },
    addStaff(){
      // 添加
      // ...
      this.showchecktime = false;
    },
    cancel(){
      this.showchecktime = false;
    },
    deleteItem(index) {

      let id = this.list[index].Id;
      // 根据id请求后台删除
      _staffServce.deleteAppointment(id)
      .then((data) => {
        console.log("删除成功");
      }).catch(err => {console.log(err)})

      this.list.splice(index,1);

    },
    onRefresh(done){
      done();
      },
    onInfinite(done){
      done();
    }
  }
};
</script>

<style lang="less">
  @import '../../style/common.less';
  .myapp {
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
      .px2rem(bottom, 100);
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
