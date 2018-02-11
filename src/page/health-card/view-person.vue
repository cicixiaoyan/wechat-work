<template >
  <div class="myapp">
    <x-header>健康证详情</x-header>
    <div class="box">
      <div class="card">
        <div class="top">四川省从业人员预防性健康检查合格证</div>
        <div class="contents">
          <div class="row">
            <div class="left canvas-box">
              <div>姓名：{{item.PcName}}</div>
              <div class="row">
                <div class="flex-1">
                  <div>性别：{{item.PcSex}}</div>                  
                </div>
                <div class="flex-1">
                  <div>年龄：{{item.PcAge}}</div>
                </div>
              </div>
              <div class="row">
                <div class="flex-none">有效期限：</div>
                <div class="flex-1 ">
                  至{{item.PcDateEnd|formatdate}}
                </div>
              </div>
              <div class="card-number">编号：{{item.PcCardNumber}}</div>
              <div  class="card-number">发证机构：{{item.OrName}}</div>
              <div class="canvas">
                <img v-bind:src="sealImg"  />
              </div>
            </div>
            <div class="right">
              <img v-bind:src="item.PcPicUrl">
            </div>
          </div>
          
          <div  class="card-number">
            <VueBarcode style="width:5.1rem;"  tag="img" :options="{height: 30, margin: 0, displayValue: false, background:'transparent'}" :value="PcCardId"></VueBarcode>
          </div>
          <!-- <div class="identity-number" style="margin-bottom:.1em">{{item.IdentityNumber}}</div> -->

        </div>
        <div class="bottom row">
          <div class="col-25"></div>
          <div class="flex-1"></div>
        </div>
      </div>

      <div style="display:none">
        <canvas id="seal" width="250" height="250"></canvas>
      </div>
     
    </div>

  </div>
</template>

<script>
import { XHeader,Group, Cell, } from "vux";
import { formatDate } from '../../utils/formatDate';
import { createSeal } from '../../utils/createSeal';
import { _personServices } from '../../service/personServices';
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
    let item =  this.$store.getters.getHealthyCard, 
        that = this;
    _personServices._setcardid(item.PCCardId).then(data => {
      this.PcCardId = data;
      _personServices._selectcardid({'key': this.$store.getters.getCardKey, cardid: data}).then(resJson => {
        if (resJson.ResultType == 0) {
          this.item = resJson.AppendData;
          this.sealImg = createSeal("seal", this.item.OrSeal, "体检专用章"); 
        }else{
          
        }
      });
    });

    // this.component('barcode', VueBarcode);
  },
  mounted:function(){
    console.log("体检专用章1");
    // createSeal("seal", "郫县德源镇卫生院", "体检专用章"); 
    // this.sealImg = createSeal("seal", this.item.OrSeal, "体检专用章"); 

  },
  data() {
    return {
      sealImg: '',
      item: {
        "PcName": "",
        "PcSex": "",
        "PcAge": "",
        "PcCardId": "",
        "PcCardNumber": "",
        "PcDateStart": "",
        "PcDateEnd": "",
      },
      PcCardId: ''
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
        background: #1d2088;
        color: #fff;
        font-family: 'SimHei', 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        letter-spacing: .1em;
        font-size: .48rem;
  
        // max-width: 19em;
        text-align: center;
        padding-top: 1.05em;
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
            padding-bottom: 1.3em;
          }
          > .right{
            flex: none;
            > img{
              width: 2.5rem;
              height: 100%;
              // height: 2.7rem;
            }
          }
        }
  
        .canvas-box{
          position: relative;
          .canvas{
            position: absolute;
            line-height: 100%;
            right: -5px;
            bottom: -5px;
            z-index: 1;
            > img{
              width:2.2rem;
              height:2.2rem;
            }
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
          flex: 0 0 5.3em;
        }
      }

      .identity-number{
        padding-left:5em;
        line-height: 1em;
        font-size: .38rem;
        font-weight: bold;
        margin-top: -.4em;
      }
  
      > .bottom{
        border-radius: 0 0 12px 12px;
        font-size: .4rem;
        .col-25{
          height: 1em;
          background: #f08300;
          border-bottom-left-radius: 12px;
        }
        .flex-1{
          background: #1d2088;
          border-bottom-right-radius: 12px;
        }

      }
    }
  }


  // .photo{
  //   text-align: center;
  //   padding-top: 2em;
  // }
  
}
</style>
