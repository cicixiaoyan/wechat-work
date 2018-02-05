<template>
  <div>
    <x-header>预约详情</x-header>
    <div class="result">
      <div class="success" v-if="item.PhAStatus == 3"><span class="iconfont icon-checkedon"></span>审核成功</div>
      <div class="warning" v-if="item.PhAStatus == 2"><span class="iconfont icon-shenhezhong"></span>审核中</div>
      <div class="danger" v-if="item.PhAStatus == 1"><span class="iconfont icon-fail"></span>审核失败</div>

    </div>
    <div class="content">
      <group>
        <cell title="体检机构" readonly :is-loading="!item.PhaOrName" :value="item.PhaOrName"></cell>
        <cell title="体检人员" :value="item.PhCount+'人'" is-link @click.native="viewStaffList"></cell>
        <cell title="体检日期" readonly :is-loading="!item.PhADate" :value="item.Time"></cell>
        <cell title="申请日期" readonly :is-loading="!item.CreateDate" :value="item.CreateDate"></cell>

        <!-- :is-loading="!item.Description" -->
        <cell :title="stateTitle" readonly  :value="item.PhABackOption" placeholder="无"></cell>
        <div   class="result-tip " :class='{"success":(item.PhAStatus != 1),"danger":(item.PhAStatus == 1) }'>
          <span class="iconfont icon-fail"></span>
          <div v-if="item.PhAStatus == 3">预约成功，请通知相关人员凭身份证按时到【{{item.PhaOrName}}】进行体检</div>
          <div v-if="item.PhAStatus == 1">预约失败了，可以删除这条申请，重新提交申请</div>
          <div v-if='item.PhAStatus != 1 && phinfo.OrTel != "" '>
            --体检机构电话：<a :href="'tel:' + phinfo.OrTel ">{{phinfo.OrTel}}</a><br>
            --体检机构地址：{{phinfo.OrAddress}}
          </div>
        </div>

      </group>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XHeader } from "vux";
import { _appointmentServce } from "../../service/appointmentServices";

export default {
  name: "appointment-view",
  components: {
    Group,
    Cell,
    XHeader
  },
  created() {
    var id = this.$route.params.id;

    // let desc = "";
    // if (detail.PhABackOption != null) {
    //   desc = detail.PhABackOption;
    // }
    let that = this;
    _appointmentServce.getmodeltbphysicalappointment(id).then(data => {
      if (data.ResultType == 0) {
        that.item = data.AppendData[0];
        let time = new Date(that.item.PhADate.replace(/-/g, '/'));
        let timeArr = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
        that.item.Time = timeArr+' '+["全天", "上午", "下午"][that.item.PPNType];
        // 获取体检机构信息
        _appointmentServce.gettbsysorganize().then(data1 => {
          let list = data1.AppendData;

          list.forEach(function(value, index, array1){
            if(value.OrCode == that.item.PhAOrCode) that.phinfo = value;
          });

        }).catch(err => console.log(err));
      } else {
        alert('获取失败');
      }
    });
  },
  methods: {
    viewStaffList(){
      if(this.item.PhCount != 0)
       this.$router.push({name: "staff-information-view-list", params: {phaid: this.item.PhAID, "showcancel": "0" }});
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  data() {
    return {
      stateTitle: "审核说明",
      item: {
        PhAStatus: 2,
        PhaOrName: "",
        PhCount: 0,
        Listparma: "",
        Time: "",
        Description: "",
      },
      phinfo:{
        "OrAddress": "",
        "OrTel": "",
      }
    };
  }
};
</script>

<style lang="less">
@import "../../style/common.less";
.result {
  .px2px(font-size, 36);
  background: #fff;
  height: 2.639rem;
  line-height: 2.639rem;
  text-align: center;

  .iconfont {
    vertical-align: sub;
    .px2px(font-size, 56);
  }
}
.result-tip {
  .px2px(font-size, 24);
  .px2px(padding-left, 60);
  .px2px(padding-top, 20);
  .px2px(padding-bottom, 54);

  position: relative;
  .iconfont {
    position: absolute;
    .px2px(font-size, 40);
    .px2rem(left, 10);
    .px2rem(top, 8);
  }

  a{
    color: inherit;
  }
}
</style>
