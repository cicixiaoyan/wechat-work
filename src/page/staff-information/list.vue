<template >
  <div class="myapp">
    <x-header :left-options="{showBack: false}">成员列表({{totalNumber}})
      <a slot="left" @click="showchecktime=true;edit=false;">
        <i class="iconfont icon-add-people" style="font-size:1.7em;"></i>&emsp;
      </a>
      <a slot="right" v-if='!nodata' @click='appointment'>{{checkAllow?'取消预约':'预约'}}</a></x-header>
    <!-- <panel :footer="footer" :list="list" :type="type" @on-img-error="onImgError"></panel> -->
    <scroll :class='{"scroll-checkallow":checkAllow,"scroll-normal":!checkAllow}'
          :on-refresh="onRefresh"
          :noDataText='noDataText'
          ref="my_scroller">
      <div class="list">
        <swipeout>
          <swipeout-item ref="swipeoutItem"  transition-mode="follow" v-for="(item, index) in list" :key="item.PhID">
            <div slot="right-menu">
              <swipeout-button v-if='item.IsLeave==0' @click.native.prevent="deleteItem(index)" type="warn">离职</swipeout-button>
              <swipeout-button  @click.native.prevent="editAction(index)" type="primary">详情</swipeout-button>
              <swipeout-button v-if='item.IsLeave==1' @click.native.prevent="recoverItem(index)" type="warn">复职</swipeout-button>
            </div>
            <div slot="content">
            <label class="item">
              <div class="left-ctx"  @click='change(index)' v-if="checkAllow && (item.PhStatus==0) && (item.IsLeave==0)">
                <span v-show='!item.checked' class="iconfont icon-checknormal"></span>
                <span v-show='item.checked' class="iconfont icon-checkedon success"></span>
              </div>
              <div  class="left-ctx" v-if="checkAllow  && ((item.IsLeave!=0) || (item.PhStatus!=0))">&nbsp;</div>
              <div class="right-ctx">
                <h4>{{item.PhName}}<span>[{{item.age}}岁]</span>&emsp;{{item.PhSex}}</h4>
                <p>{{item.PhCardId}}</p>
                <p>{{item.IsLeave == 0 ? '在职' : '离职'}}&emsp;{{item.PhStatus == 0? '未预约':'已预约'}}</p>
                <!-- PhStatus:体检人员状态 0:未提交过预约  1:预约未审核 -->
              </div>
              <span class="iconfont icon-dot" @click="$refs.swipeoutItem[index].open('right')"></span>
            </label>
            </div>
          </swipeout-item>
        </swipeout>

      </div>
      <div v-if='nodata' class="nodata">
        <img src="../../assets/nodata.png" alt="无数据">
        亲，您目前还没有添加任何员工哦！左上角添加
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
      <flexbox-item @click.native='submit' class='flex-last'>提交体检预约申请</flexbox-item>
    </flexbox>

    <div v-transfer-dom>
      <popup v-model="showchecktime" position="bottom" @on-hide='cancel'>
        <popup-header left-text="" right-text="" :title="edit?'员工详情':'新增成员'"></popup-header>
        <div class="pop-content">
          <flexbox  class="form-item" :gutter="0">
            <flexbox-item class='form-item-left'>
              <span class="iconfont icon-gerenxinxi"></span>
            </flexbox-item>
            <flexbox-item>
              <input type="text" placeholder="姓名" @input="testName" maxlength="8" name="phName" v-model="addData.phname">
            </flexbox-item>
          </flexbox>
          <div class="valid-err" v-if='!nameValid'>{{addData.phname == "" ? '姓名必填':''}}{{addData.phname.length > 10 ? '姓名最多可输入10位':''}}</div>
          <flexbox  class="form-item"  :gutter="0">
            <flexbox-item class='form-item-left'>
              <span class="iconfont icon-shenfenzhenghao"></span>
            </flexbox-item>
            <flexbox-item>
              <input type="text" @input="testIdc" placeholder="身份证号" maxlength="18" name="phcardid" v-model="addData.phcardid">
            </flexbox-item>
          </flexbox>
          <div class="valid-err" v-if='!idcValid'>{{addData.phcardid==""?'身份证号必填':'请输入合法的身份证号'}}</div>
          <flexbox  class="form-item"  :gutter="0">
            <flexbox-item class='form-item-left'>
              <span class="iconfont icon-contextphone"></span>
            </flexbox-item>
            <flexbox-item>
              <input type="text"  @input="textPhone" maxlength="11" placeholder="手机号(选填)" name="phtel" v-model="addData.phtel">
            </flexbox-item>
          </flexbox>
          <div class="valid-err" v-if='!phoneValid'>请输入合法的手机号</div>
          <flexbox  class="form-item"  :gutter="0">
            <flexbox-item class='form-item-left'>
              <span class="iconfont icon-jigou"></span>
            </flexbox-item>
            <flexbox-item>
              <input type="text" placeholder="单位" name="phunit" v-model="addData.phunit">
            </flexbox-item>
          </flexbox>
          <div class="valid-err" v-if='addData.phunit.length==0'>单位名称必填</div>
        </div>
        <div>
          <flexbox class="submit-box1"  :gutter="0">
            <flexbox-item class="light" @click.native='cancel'>取消</flexbox-item>
            <flexbox-item v-if="!edit" class="primary"
            @click.native='(nameValid && idcValid && phoneValid && addData.phunit.length!=0 && addData.phname.length!=0 && addData.phcardid.length!=0) ? addStaff():""'>添加</flexbox-item>
            <flexbox-item v-if="edit" class="primary"
            @click.native='(nameValid && idcValid && phoneValid && addData.phunit.length!=0 && addData.phname.length!=0 && addData.phcardid.length!=0) ?  editSubmit(): ""'>修改</flexbox-item>
          </flexbox>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {
  XHeader,
  TransferDom,
  PopupHeader,
  Popup,
  Checklist,
  Flexbox,
  FlexboxItem,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton
} from "vux";
import scroll from "../../components/scroll";
import { _staffServce } from "../../service/staffService";
import { PhysicalInfoServices } from "../../service/EmpPhysicalInfo";
import { IdentityCodeValid } from '../../utils/idc-valid';
import { employmentServices } from '../../service/EmploymentRegister';
export default {
  name: "staff-information-list",
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
  created() {
    let that = this;
    if(!!window.localStorage.getItem('UoName')){
      that.addData.phunit = window.localStorage.getItem('UoName');
    }else{
      employmentServices._getorganizeinfo().then(data => {
        that.addData.phunit = data.AppendData.uoname;
        window.localStorage.setItem('UoName', data.AppendData.uoname);
      });
    }

    that.loadData();
  },
  data() {
    return {
      edit: false,
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
      noDataText: "",
      page: 0,
      size: 10,
      addData: {
        phname: "",
        phcardid: "",
        phtel: "",
        phunit: window.localStorage.getItem("ULName") || ""
      },
      nameValid: true,
      idcValid: true,
      phoneValid: true
    };
  },
  methods: {
    view(id) {
      this.$router.push({
        name: "staff-information-edit",
        params: { id: id, read: true }
      });
    },
    change(index) {
      this.list[index].checked = !this.list[index].checked;
      let dec = this.list[index].checked ? 1 : -1;
      this.checkedNumber = this.checkedNumber + dec;
    },
    checkall() {
      let that = this;
      this.checkAll = !this.checkAll;
      let number = 0;
      this.list.forEach(function(item, index, array) {
        if (item.PhStatus == 0 && item.IsLeave == 0) {
          item.checked = that.checkAll;
          that.checkAll ? number++ : "";
        }
      });
      this.checkedNumber = number;
    },
    appointment() {
      this.checkAllow = !this.checkAllow;
      // this.$router.push({name: 'appointment-view', params: { 'id': id }});
    },
    submit() {
      if(this.checkedNumber === 0) return;
      let that = this;
      let phids = "";
      this.list.forEach(function(item, index, array) {
        phids += item.checked ? item.PhID + "," : "";
      });
      this.$router.push({ name: "appointment-add", params: { phid: phids } });
    },
    addStaff() {
      //console.log(this.addData)
      //console.log(!this.nameValid || !this.idcValid || !this.phoneValid || this.addData.phunit.length==0||this.addData.phname.length==0||this.addData.phcardid.length==0)
      // 添加
      let that = this;
      _staffServce
        .creatphysicalinfo(this.addData)
        .then(data => {
          that.$vux.toast.show({
            text: data.Message,
            type: "success",
            position: "middle"
          });
          if (data.ResultType == 0) {
            this.addData.phname = "";
            this.addData.phcardid = "";
            this.addData.phtel = "";
            this.loadData();
            this.showchecktime = false;
          }
        })
        .catch(err => console.log(err));
    },
    editAction(index){
      this.edit = true;
      this.showchecktime = true;
      let data = this.list[index];
      // console.log(data);
      this.addData.phname = data.PhName;
      this.addData.phcardid = data.PhCardId;
      this.addData.phtel = data.PhTel;
      this.addData.phunit = data.PhUnit;
      this.addData.phid = data.PhID;
    },
    editSubmit(){
      let that = this;
      _staffServce
        .updatephysicalinfo(this.addData)
        .then(data => {
          that.$vux.toast.show({
            text: data.Message,
            type: "success",
            position: "middle"
          });
          if (data.ResultType == 0) {
            this.addData.phname = "";
            this.addData.phcardid = "";
            this.addData.phtel = "";
            this.loadData();
            this.showchecktime = false;
          }
          this.edit = false;
        })
        .catch(err => console.log(err));
         this.addData.phid = null;
    },
    cancel() {
      this.addData.phname = "";
      this.addData.phcardid = "";
      this.addData.phtel = "";
      this.showchecktime = false;
      this.addData.phid = null;
    },
    deleteItem(index) {
      let PhID = this.list[index].PhID;
      let that = this;
      // 根据id请求后台删除
      _staffServce
        .deleteAppointment(PhID)
        .then(data => {
          that.list[index].IsLeave = 1;
          that.$vux.toast.show({
            text: "删除成功",
            type: "success",
            position: "middle"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    recoverItem(index) {
      let PhID = this.list[index].PhID;
      let that = this;
      // 根据id请求后台删除
      _staffServce
        .recoverphysicalinfo(PhID)
        .then(data => {
          that.list[index].IsLeave = 0;
          that.$vux.toast.show({
            text: "复职成功",
            type: "success",
            position: "middle"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onRefresh(done) {
      this.page = 1;
      this.list = [];
      this.loadmore = true;
      this.loadData();
      setTimeout(() => {
        done(); //必须有
      }, 1500);
    },
    loadData() {
      let that = this;
      _staffServce
        .getphysicalinfo()
        .then(data => {
          that.checkedNumber = 0;
          if (data.AppendData.length != 0) {
            that.list = data.AppendData.sort(function(x, y){
              if(x.IsLeave == y.IsLeave ){
                if(x.PhStatus == y.PhStatus){
                  return [x.PhID, y.PhID].sort();
                } else return x.PhStatus - y.PhStatus;
              }else if(x.IsLeave == 1 && y.IsLeave == 0){
                return 1;
              }else if (x.IsLeave == 0 && y.IsLeave == 1) {
                return -1
              }
            });
            that.totalNumber = that.list.length;
            that.nodata = false;
          } else {
            that.nodata = true;
          }
        })
        .catch(err => console.log(err));
    },
    testName() {
      if (this.addData.phname.trim() == "" || this.addData.phname.trim().length > 10) {
        this.nameValid = false;
      } else {
        this.nameValid = true;
      }
    },
    testIdc() {
      // var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (IdentityCodeValid(this.addData.phcardid.trim())) {
        this.idcValid = true;
      } else {
        this.idcValid = false;
      }
    },
    textPhone() {
      let reg = /^((13[0-9])|(14[5|7])|(15([0-9]))|(17[0-9])|(18[0-9]))\d{8}$/;
      if ((this.addData.phtel.trim().length === 0) || reg.test(this.addData.phtel.trim())) {
        this.phoneValid = true;
      } else {
        this.phoneValid = false;
      }
    }
  }
};
</script>

<style lang="less">
@import "../../style/common.less";
body[data-path=staff-information-list]{
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
      .px2rem(bottom, 70);
      position: fixed;
      height: auto !important;
    }

    ._v-container.scroll-checkallow >  {
      .px2rem(top, 100);
      .px2rem(bottom, 90);
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
      .px2rem(bottom, 100);
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
        background: #3c9;
        color: #fff;
      }
    }
  }
  .valid-err {
    position: relative;
    // top: -5px;
    .px2rem(top, -20);
    text-align: center;
    color: red;
  }
  .pop-content {
    .px2rem(padding-left, 100);
    .px2rem(padding-right, 100);
    padding-top: 0.5rem;
  }
  .vux-flexbox.form-item {
    .px2px(font-size, 36);

    .px2rem(padding-bottom, 36);
    > .form-item-left {
      flex-grow: 0;
      flex-shrink: 0;
      .px2rem(flex-basis, 84);
    }

    .iconfont {
      .px2px(font-size, 56);
      color: #3c9;
    }
    input {
      width: 100%;
      border: 1px solid #ddd;
      .px2px(font-size, 28);
      .px2rem(height, 72);
      .px2rem(padding-left, 10);
      .px2rem(padding-right, 10);
      box-shadow: none;
      outline: none;
      outline-offset: 0;

      &:focus {
        outline: none;
        outline-offset: 0;
        border-color: #3c9;
        box-shadow: none;
        border-width: 1px;
      }
    }
  }
  .vux-flexbox.submit-box1 {
    > .vux-flexbox-item {
      .px2rem(height, 85);
      .px2rem(line-height, 85);
      text-align: center;
      .px2px(font-size, 32);
      &.light {
        background: #fff;
        color: #3c9;
      }

      &.primary {
        background: #3c9;
        color: #fff;
      }
    }
  }
}
</style>
