<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './utils/device';
export default {
  name: 'app'
};
</script>


<style lang="less">
@import '/style/common.less';
@import '~vux/src/styles/reset.less';
@import '//at.alicdn.com/t/font_502622_dzphuykghuygmn29.css';

html{
  font-size: 20px;
}
body {
  background-color: #fff;
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


.weui-icon.weui_icon_clear{
    .px2px(font-size, 24); 
}

.app{
  .weui-cell{
    padding: 0.4167rem 0.277rem;
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
      padding: 15px;
      position: relative;

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



      h4{
        .px2px(font-size, 32); 
        color: #333;
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
}
</style>
