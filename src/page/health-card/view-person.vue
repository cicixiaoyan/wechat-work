<template >
  <div class="myapp">
    <x-header>健康证详情</x-header>
    <div class="box">
      <div class="card">
        <div class="top">四川省从业人员预防性健康检查合格证</div>
        <div class="contents">
          <div class="row">
            <div class="left">
              <div class="row">
                <div class="flex-1">
                  <div>姓名：{{item.PCName}}</div>
                  <div>从业类别：食品/公告</div>
                  
                </div>
                <div class="flex-none" style="margin-right:2em;">
                  <div>性别：{{item.PCSex}}</div>
                  <div>年龄：{{item.PCAge}}</div>
                </div>
              </div>
              <div class="row">
                <div class="flex-none">有效期限：</div>
                <div class="flex-1 canvas-box">
                  {{item.PCDateStart|formatdate}}至<br>{{item.PCDateEnd|formatdate}}
                  <div class="canvas"><canvas id="seal" width="100" height="100"></canvas></div>
                </div>
              </div>
              <div class="card-number">编号：{{item.PCCardNumber}}</div>
            </div>
            <div class="right">
              <img v-bind:src="item.PCPicUrl">
            </div>
          </div>
          <div>发证机构：{{item.orseal}}</div>
          <div style="padding-left:1.5em;">
            <VueBarcode  tag="svg" :options="{width: 2, height: 32.5, fontSize: 14, margin: 0}" :value="item.IdentityNumber"></VueBarcode>
          </div>
        </div>
        <div class="bottom row">
          <div class="col-25"></div>
          <div class="flex-1"></div>
        </div>
      </div>
    </div>

    <!-- <div></div> -->
    <!-- <div class="photo" v-if="item.PcPicUrl">
      <img v-bind:src="item.PcPicUrl">
    </div>
    <div class="content">
      <group>
        <cell title="姓名" readonly :is-loading="!item.PcName" :value="item.PcName"></cell>
        <cell title="性别" readonly :is-loading="!item.PcSex" :value="item.PcSex"></cell>
        <cell title="年龄" readonly :is-loading="!item.PcAge" :value="item.PcAge"></cell>
        <cell title="身份证号" readonly :is-loading="!item.PcCardId" :value="item.PcCardId"></cell>
        <cell title="有效期自" readonly :is-loading="!item.PcDateStart" :value="item.PcDateStart|formatdate"></cell>
        <cell title="有效期至" readonly :is-loading="!item.PcDateEnd" :value="item.PcDateEnd|formatdate"></cell>
        <cell title="健康证编号" readonly :is-loading="!item.PcCardNumber" :value="item.PcCardNumber"></cell>
      </group>
    </div> -->

  </div>
</template>

<script>
import { XHeader,Group, Cell, } from "vux";
import { formatDate } from '../../utils/formatDate';
import { createSeal } from '../../utils/createSeal';
import VueBarcode from '@xkeshi/vue-barcode';
export default {
  name: "health-view-person",
  components: {
    Group, Cell, XHeader, VueBarcode
  },
  filters: {
    formatdate(time){
      let date = new Date(time.replace(/-/g, '/'));
      return formatDate(date, "yyyy年MM月dd日")
    }
  },
  created() {
    this.item =  this.$store.getters.getHealthyCard;

    // this.component('barcode', VueBarcode);
  },
  mounted:function(){
    console.log("体检专用章1");
    // createSeal("seal", "郫县德源镇卫生院", "体检专用章"); 
    createSeal("seal", this.item.orseal, "体检专用章"); 

  },
  data() {
    return {
      item: {
        "PCName": "",
        "PCSex": "",
        "PCAge": "",
        "PCCardId": "",
        "PCCardNumber": "",
        "PCDateStart": "",
        "PCDateEnd": "",
      }
    };
  },
  methods: {

  }
};
</script>

<style lang="less">
@import '../../style/common.less';
body[data-path=health-view-person] {
  padding: 5px;
  .box{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
    .card {
      // margin: auto auto;
      max-width: 10rem;
      // transform: translateY(50%);
      // margin-bottom: -50%;
      width: 100%;
      > .top{
        background: #2b25a2;
        color: #fff;
        font-family: 'SimHei', 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: .5rem;
  
        // max-width: 19em;
        text-align: center;
        padding-top: 1em;
        padding-bottom: .5em;
        border-radius: 12px 12px 0 0;
        
      }
  
      > .contents{
        font-family: 'SimSun', 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: .4rem;
        line-height: 150%;
        padding-left: 1em;
        padding-right: .5em;
        color: #000;
        background: #fff;
        .px2px(padding-top, 10);
        > .row{
          display: flex;
          > .left{
            flex: 1;
  
          }
          > .right{
            flex: none;
            > img{
              width: 2rem;
              height: 2.8rem;
            }
          }
        }
  
        .canvas-box{
          position: relative;
          .canvas{
            position: absolute;
            right: 0;
            bottom: -4.5em;
            z-index: 1;
            // background: transparent;
          }
        }
  
        .card-number{
          position: relative;
          z-index: 2;
        }
      }
  
      .row{
        display:flex;
    
        .flex-1{
          flex: 1;
        }
        .flex-none{
          flex: none;
        }
        .col-25 {
          flex: 0 0 25%;
        }
      }
  
      > .bottom{
        padding: 5px;
        background: #2b25a2;
        border-radius: 0 0 12px 12px;
      }
    }
  }


  // .photo{
  //   text-align: center;
  //   padding-top: 2em;
  // }
  
}
</style>
