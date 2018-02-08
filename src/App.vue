<template>
  <div id="app" class="app">
    <router-view :class="{'has-bottom-tabbar':!showTabbar}" class="router-view"></router-view>

    <tabbar  v-if="showTabbar && !person"  slot="bottom" style="position:fixed;">
      <tabbar-item :selected='$route.name=="staff-information-list"' :link="{name: 'staff-information-list', replace: true }">
        <span slot="icon" class="iconfont icon-tijianyuyue1"></span>
        <span slot="label">体检预约</span>
      </tabbar-item>
      <tabbar-item :selected='$route.name=="appointment-list"' :link="{name: 'appointment-list', replace: true }">
        <span slot="icon" class="iconfont icon-shenhejilu"></span>
        <span slot="label" link="../page/appointment/add">预约记录</span>
      </tabbar-item>
      <tabbar-item :selected='$route.name=="personal-center"' :link="{name: 'personal-center', replace: true }">
        <span slot="icon" class="iconfont icon-gerenxinxi"></span>
        <span slot="label" >个人中心</span>
      </tabbar-item>
    </tabbar>

    <tabbar  v-if="showTabbar && person"  slot="bottom" style="position:fixed;">
      <tabbar-item :selected='$route.name=="appointment-list-person"' :link="{name: 'appointment-list-person', replace: true }">
        <span slot="icon" class="iconfont icon-tijianyuyue1"></span>
        <span slot="label">预约记录</span>
      </tabbar-item>
      <tabbar-item :selected='$route.name=="health-list-person"' :link="{name: 'health-list-person', replace: true }">
        <span slot="icon" class="iconfont icon-shenhejilu"></span>
        <span slot="label" link="../page/appointment/add">健康证查询</span>
      </tabbar-item>
      <tabbar-item :selected='$route.name=="personal-center"' :link="{name: 'personal-center', replace: true }">
        <span slot="icon" class="iconfont icon-gerenxinxi"></span>
        <span slot="label" >个人中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import './utils/device';
import { Tabbar, TabbarItem } from 'vux';
export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
    }
  },
  computed: {
    showTabbar () {
      return /tabbar/.test(this.$route.path);
    },
    person() {
      if (/-person/.test(this.$route.path)){
        return true;
      }else{
        console.log(window.localStorage.getItem('IsPerson'), typeof window.localStorage.getItem('IsPerson'));
        let bol = window.localStorage.getItem('IsPerson') == "true" ? true : false;
        return bol;
      }
      
      // return /-person/.test(this.$route.path)
    }
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
<style src="./assets/iconfont/iconfont.css"></style>

<style lang="less">
@import '/style/common.less';
@import '~vux/src/styles/reset.less';
// @import '//at.alicdn.com/t/font_507624_dj5d8uffyfuvj9k9.css';

html{
  font-size: 20px;
}
body {
  background-color: #f2f5f7;
  color: #333;

  .weui-toast.weui-toast_forbidden .weui-toast__content{
    .px2rem(padding-left, 10);
    .px2rem(padding-right, 10);
  }
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
    background: #ccc!important;
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
  ._v-container.scroll-normal > {
    .px2rem(top, 100);
    .px2rem(bottom, 0);
    position: fixed;
    height: auto!important;
  }
  
  > .router-view{
    .px2rem(margin-top, 100);

    &.has-bottom-tabbar{
      .px2rem(margin-bottom, 100);
    }
  }

  .weui-tabbar__item{
    .px2rem(height, 100);
    .px2px(min-height, 88);
    padding: 2px 0 2px;
    // .px2rem(line-height, 48);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .weui-tabbar__icon .iconfont{
    .px2px(font-size, 40);
    // .px2rem(line-height, 57);
  }

  .weui-tabbar__label > span{
    .px2px(font-size, 26);
    // .px2rem(line-height, 37);
  }


  .weui-cell{
    .px2px(padding, 30);
    // padding: 0.4167rem 0.277rem;
  }

  .vux-header{
    width: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 100;
    .px2rem(height, 100);

    .vux-header-title{
      height: 100%;
      .px2rem(line-height, 94);
      .px2px(font-size, 36);
      
    }
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

  .vux-header .vux-header-left,
  .vux-header .vux-header-right {
    display: block;
    .px2px(font-size, 32);
    .px2rem(line-height, 100);
    top: 0;
  }

  .vux-header .vux-header-left .left-arrow{
    position: absolute;
    // .px2rem(width, 60);
    // .px2rem(height, 60);
    // .px2rem(top, 23);
    width: auto;
    height: auto;
    top: 0;
    .px2rem(left, -10);
    .px2rem(line-height, 100);
    &::before{
      .px2rem(width, 24);
      .px2rem(height, 24);

      .px2rem(top, 36);
    }
  }
}
</style>
