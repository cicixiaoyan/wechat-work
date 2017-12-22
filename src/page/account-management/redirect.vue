<template>
    <div class="firstContainer">
      <div v-show='showtip' class="uatip">
        您当前使用非微信浏览器访问!
        <br/>
        <br/>
        请切换到微信中访问。。。
        <br>
        <br>
        <span>如已切换，<a href='javascript:void(0)' @click='reload'>点击刷新...</a></span>
      </div>

    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {_userServices} from '../../service/userServices';

  export default {
    name: 'redirect',
    data(){
      return{
        showtip: false
      }
    },
    created(){
      // 验证是否在微信环境中   main.js第54行解除注释
      var ua = window.navigator.userAgent.toLowerCase(); 
      if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
          this.redirect();
      } else { 
        this.showtip = true;
      }

      // this.redirect();
      
    },

    components:{
      
    },
    computed: {

    },
    methods:{

      redirect(){
        var that = this;
        if(this.$store.getters['getLoginState']){
            _userServices._getUserMsg().then(function(data1){
             //已审核通过 转到 人员信息页面
            if(data1.ULAudtiStatus == 3){
              that.$router.push({name: 'staff-information-list'});
            }
            if(data1.ULAudtiStatus == 1 || data1.ULAudtiStatus == 2){
              that.$router.push({name: 'submit-information-view'});
            }
            else{
              that.$router.push({name: 'submit-information-add'});
            }
          }).catch(function(err){console.log(err)})
        }else{
          this.$router.push({name: 'login'});
        }
      },
      reload(){
        window.location.reload();
      }

    },
  }
</script>
<style lang="less">
body{
  .uatip{
    text-align: center;
    font-size: large;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    color: #3c9;
    span{
      font-size: small;
    }
  }
}
</style>


