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
        <cell title="体检人员" readonly :is-loading="!item.PhADName" :value="item.PhADName"></cell>
        <cell title="体检日期" readonly :is-loading="!item.PhAdDate" :value='item.PhAdDate'></cell>
        <cell title="体检机构" readonly :is-loading="!item.PhADOrName" :value="item.PhADOrName"></cell>
        <cell title="身份证号" readonly :is-loading="!item.PhADCardId" :value="item.PhADCardId"></cell>
        <cell title="所属公司" readonly :is-loading="!item.PhUnit" :value="item.PhUnit"></cell>
        <cell title="申请日期" readonly :is-loading="!item.CreateDate" :value="item.CreateDate"></cell>

        <div v-if="item.PhAStatus!=2"   class="result-tip " :class='{"success":(item.PhAStatus != 1),"danger":(item.PhAStatus == 1) }'>
          <span class="iconfont icon-fail"></span>
          <div v-if="item.PhAStatus == 3">预约成功，请凭身份证按时到【{{item.PhADOrName}}】进行体检</div>
          <div v-if="item.PhAStatus == 1">预约失败了！</div>
      
        </div>

      </group>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XHeader } from "vux";
import { _appointmentServce } from "../../service/appointmentServices";

export default {
  name: "appointment-view-person",
  components: {
    Group,
    Cell,
    XHeader
  },
  created() {
    this.item = this.$store.getters.getAppointment;
    this.item.PhAdDate = this.item.PhAdDate.split(" ")[0] + " " + ["全天", "上午", "下午"][this.item.PPNType];
    console.log(this.item.PhAdDate);
  },
  methods: {
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  data() {
    return {
      stateTitle: "审核说明",
      item: {
        PhAStatus: "",
        PhADName: "",
        PhAdDate: "",
        PhADOrName: "",
        PhADCardId: "",
        PhUnit: "",
        CreateDate: "",
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
