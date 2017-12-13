<template>
    <div class="firstContainer">

    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {_userServices} from '../../service/userServices';

  export default {
    name: 'redirect',
    data(){
      return{

      }
    },
    created(){
      this.redirect();
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
      }

    },
  }
</script>
<style lang="less">

</style>


