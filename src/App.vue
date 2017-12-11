<template>
  <div id="app" class="app">
    <router-view></router-view>
    <!-- <tabbar  v-show="!showTabbar" slot="bottom">
      <tabbar-item  :link="{name: 'register' }">
        <img slot="icon" class="iconfont icon-task_fill">
        <span slot="label">体检</span>
      </tabbar-item>
      <tabbar-item show-dot :link="{path: '/app/register' }">
        <img slot="icon" class="iconfont icon-task_fill">
        <span slot="label" link="../page/appointment/add">审核</span>
      </tabbar-item>
      <tabbar-item :link="{path: '/app/register' }">
        <img slot="icon" class="iconfont icon-task_fill">
        <span slot="label" >个人中心</span>
      </tabbar-item>
    </tabbar> -->
  </div>
</template>

<script>
import './utils/device';
export default {
  name: 'app',
  data() {
    return {
    }
  },
  computed: {
    // showTabbar () {
    //   return /tabbar/.test(this.$route.path);
    // },
  },
  watch: {
    // path (path) {
    //   if (path === '/component/demo') {
    //     this.$router.replace('/demo')
    //     return
    //   }
    //   if (path === '/demo') {
    //     setTimeout(() => {
    //       this.box = document.querySelector('#demo_list_box')
    //       if (this.box) {
    //         this.box.removeEventListener('scroll', this.handler, false)
    //         this.box.addEventListener('scroll', this.handler, false)
    //       }
    //     }, 1000)
    //   } else {
    //     this.box && this.box.removeEventListener('scroll', this.handler, false)
    //   }
    // }
  }
};
</script>


<style lang="less">
@import '/style/common.less';
@import '~vux/src/styles/reset.less';
@import '//at.alicdn.com/t/font_502622_e609vzsilv0r7ldi.css';

html{
  font-size: 20px;
}
body {
  background-color: #f2f5f7;
  color: #333;
}
.round-big-btn{
  .px2rem(border-radius, 60);
  .px2rem(padding, 24);
  .px2rem(font-size, 32);
  background: #3c9;
  color: #fff;
  width: 100%;
  box-shadow: none;
  border: none;

  &:focus{
    outline: none;
  }

  &[disabled]{
    background: #ccc;
  }
}

.success{
  color: #3c9;
}
.warning{
  color: #ebc650;
}
.danger{
  color: #f96868;
}

.gray{
  color: #999;
}
.weui-icon.weui_icon_clear{
    .px2px(font-size, 24);
}

.app{
  .weui-cell{
    .px2px(padding, 30); 

    
    // padding: 0.4167rem 0.277rem;
  }
  .list{
    position: relative;
    .item{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .px2px(padding, 30);
      // padding: 15px;
      position: relative;
      background-color: #fff;

      &::before{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #E5E5E5;
        color: #E5E5E5;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        left: 15px;

      }

      &:last-child{
        content: " ";

      }


      h3{
        .px2px(font-size, 36);
        font-weight: normal;
        color: #444;
      }
      h4{
        .px2px(font-size, 32);
        font-weight: normal;
        color: #444;
      }
      p{
        .px2px(font-size, 28);
        color: #919191;
      }
    }

    &::before,
    &::after{
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }

  .vux-header .vux-header-left, .vux-header .vux-header-right{
    // top: 14px;
    .px2rem(top, 26);
    display: block;
    // font-size: 14px;
    .px2px(font-size, 32);
    .px2px(line-height, 40);
    // line-height: 21px;
  }
}
</style>
