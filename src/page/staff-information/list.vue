<template >
  <div class="myapp">
    <x-header>成员列表({{totalNumber}})<a slot="left" @click="add">添加</a><a slot="right" @click='appointment'>预约</a></x-header>
    <!-- <panel :footer="footer" :list="list" :type="type" @on-img-error="onImgError"></panel> -->
    <div class="list">
      <label class="item" v-for="(item, index) in list" @click='change(index)'>
        <div class="left-ctx">
          <span v-show='!item.checked' class="iconfont icon-circle1"></span>
          <span v-show='item.checked' class="iconfont icon-checkedon success"></span>
        </div>
        <div class="right-ctx">
          <h3>{{item.username}}</h3>
          <p>[{{item.idc}}]</p>
        </div>
      </label>
    </div>
    <!-- <checklist  :options="ilist" v-model="checkValue" @on-change="change"></checklist> -->
    <flexbox align='stretch'  :gutter="0" class="fix-bottom">
      <flexbox-item @click.native='checkall'><label>
        <span v-show='!checkAll' class="iconfont icon-circle1"></span>
        <span v-show='checkAll' class="iconfont icon-checkedon success"></span>
        全选
      </label></flexbox-item>
      <flexbox-item><div>共计30人</div></flexbox-item>
      <flexbox-item @click.native='submit' class='flex-last'>提交体检预约申请</flexbox-item>
    </flexbox>

    <div v-transfer-dom>
      <popup v-model="showpop" position="bottom">
        <div class="popup-header"></div>
        <div>
          <flexbox  class="form-item" :gutter="0">
            <flexbox-item class='form-item-left'>
              <span class="iconfont icon-addressbook_fill"></span>
            </flexbox-item>
            <flexbox-item>
              <input type="text" placeholder="姓名" name="username" value="">
            </flexbox-item>
          </flexbox>
          <flexbox  class="form-item"  :gutter="0">
            <flexbox-item class='form-item-left'>
              <span class="iconfont icon-addressbook_fill"></span>
            </flexbox-item>
            <flexbox-item>
              <input type="text" placeholder="身份证号" name="icd" value="">
            </flexbox-item>
          </flexbox>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { XHeader, TransferDom, PopupHeader, Popup, Checklist, Flexbox, FlexboxItem } from 'vux';

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
    FlexboxItem
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      username: '',
      icd: '',
      checkAll: false,
      showpop: false,
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
          username: '张三',
          idc: '511322198910101010',
          checked: false
        },
        {
          Id: '2',
          username: '李四',
          idc: '511322198910101010',
          checked: false
        },
        {
          Id: '3',
          username: '王五',
          idc: '511322198910101010',
          checked: false
        }
      ]
    };
  },
  methods: {
    view(id) {
      this.$router.push({name: 'appointment-view', params: { 'id': id }});
    },
    change (index) {
      this.list[index].checked = !this.list[index].checked;
    },
    checkall() {
      let that = this;
      this.checkAll = !this.checkAll;
      this.list.forEach(function (item, index, array) {
        item.checked = that.checkAll;
      });

    },
    appointment() {
    },
    add(){
      this.showpop = true;
    },
    submit() {

    }
  }
};
</script>

<style lang="less">
  @import '../../style/common.less';
  .myapp {
    .list{
      .px2rem(padding-bottom, 90);
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
        .right-ctx {

        }

      }
    }

    .fix-bottom{
      .px2rem(height, 90);
      .px2rem(line-height, 90);
      position: fixed;
      bottom: 0;
      background: #fff;
      .px2px(font-size, 36);
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
  .vux-flexbox.form-item{
    background: #fff;
    .px2px(font-size, 36);
    .px2rem(padding-left, 100);
    .px2rem(padding-bottom, 36);
    > .form-item-left{
      flex-grow: 0;
      flex-shrink: 0;
      .px2rem(flex-basis, 84);
    }
    .iconfont{
      .px2px(font-size, 56);
    }
    input{
      width: 100%;
      .px2rem(height, 70);
      .px2rem(padding-left, 10);
      .px2rem(padding-right, 10);
    }
  }

</style>
