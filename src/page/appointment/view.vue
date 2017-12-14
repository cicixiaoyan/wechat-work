<template>
  <div>
    <x-header>预约详情</x-header>
    <div class="result">
      <div class="success" v-if="item.PhAStatus == 3"><span class="iconfont icon-circle"></span>审核成功</div>
      <div class="danger" v-if="item.PhAStatus == 2"><span class="iconfont icon-circle"></span>审核中</div>
      <div calss="warning" v-if="item.PhAStatus == 1"><span class="iconfont icon-circle"></span>审核失败</div>

    </div>
    <div class="content">
      <group>
        <cell title="体检机构" readonly :is-loading="!item.PhaOrName" :value="item.PhaOrName"></cell>
        <cell title="成员列表" :value="item.PhCount+'人'" is-link @click.native="viewStaffList"></cell>
        <cell title="体检日期" readonly :is-loading="!item.PhADate" :value="item.PhADate"></cell>
        <cell title="申请日期" readonly :is-loading="!item.CreateDate" :value="item.CreateDate"></cell>

        <!-- :is-loading="!item.Description" -->
        <cell :title="stateTitle" readonly  :value="item.Description"></cell>
        <div v-if="item.PhAStatus == 3" class="result-tip danger"><span class="iconfont icon-circle"></span>
          预约成功，请通知相关人员凭身份证按时到【{{item.PhaOrName}}】进行体检</div>
        <div v-if="item.PhAStatus == 1" class="result-tip danger"><span class="iconfont icon-circle"></span>
          预约失败了，可以删除这条申请，重新提交申请</div>
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
    var detail = this.$route.params.appointmentDetail;
    if (detail != null) {
      this.item = {
        PhAStatus: detail.PhAPhAStatus,
        PhaOrName: detail.PhaOrName,
        PhCount: detail.PhCount,
        Listparma: id,
        PhADate: detail.PhADate + " " + ["全天", "上午", "下午"][detail.PPNType],
        CreateDate: detail.CreateDate,
        Description: detail.PhABackOption
      };
    }

    console.log("审核内容", detail);
    // PhABackOption PhADescription

    // let desc = "";
    // if (detail.PhABackOption != null) {
    //   desc = detail.PhABackOption;
    // }

    // _appointmentServce.getappointmentdetailbyphaid(id).then(data => {
    //   if (data.ResultType == 0) {
    //     // Show
    //     console.log('获取成功');
    //     console.log(data.AppendData);
    //   } else {
    //     alert('获取失败');
    //   }
    // });
  },
  methods: {
    viewStaffList(){
      if(this.item.PhCount != 0)
       this.$router.push({name: "staff-information-view-list", params: {phaid: this.item.Listparma }});
    }
  },
  data() {
    return {
      stateTitle: "审核说明",
      item: {
        PhAStatus: "",
        PhaOrName: "",
        PhCount: 0,
        Listparma: "",
        PhADate: "",
        Description: ""
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
    .px2px(font-size, 56);
  }
}
.result-tip {
  .px2px(font-size, 24);
  .px2px(padding-left, 60);
  .px2px(padding-top, 20);
  .px2px(padding-bottom, 30);

  position: relative;
  .iconfont {
    position: absolute;
    .px2px(font-size, 40);
    .px2rem(left, 10);
    top: 0;
  }
}
</style>
