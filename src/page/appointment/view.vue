<template>
  <div>
    <x-header>预约详情</x-header>
    <div class="result">
      <div class="success" v-if="item.Status == 3"><span class="iconfont icon-circle"></span>审核成功</div>
      <div class="danger" v-if="item.Status == 2"><span class="iconfont icon-circle"></span>审核中</div>
      <div calss="warning" v-if="item.Status == 1"><span class="iconfont icon-circle"></span>审核失败</div>

    </div>
    <div class="content">
      <group>
        <cell title="体检医院" :is-loading="!item.Hospital" :value="item.Hospital"></cell>
        <cell title="成员列表" :value="item.Number+'人'" is-link :link="{name:'staff-information-list'}"></cell>
        <cell title="体检时间" :is-loading="!item.Time" :value="item.Time"></cell>
        <!-- :is-loading="!item.Description" -->
        <cell :title="stateTitle"  :value="item.Description"></cell>
        <div v-if="item.Status == 3" class="result-tip danger"><span class="iconfont icon-circle"></span>
          预约成功，请通知相关人员凭身份证按时到【{{item.Hospital}}】进行体检</div>
        <div v-if="item.Status == 1" class="result-tip danger"><span class="iconfont icon-circle"></span>
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
        Status: detail.PhAStatus,
        Hospital: detail.PhaOrName,
        Number: detail.PhCount,
        Listparma: id,
        Time: detail.PhADate + " " + ["全天", "上午", "下午"][detail.PPNType],
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
  data() {
    return {
      stateTitle: "审核说明",
      item: {
        Status: "",
        Hospital: "",
        Number: "",
        Listparma: "",
        Time: "",
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
