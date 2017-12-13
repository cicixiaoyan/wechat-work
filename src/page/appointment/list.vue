<template >
  <div class="myapp">
    <x-header :left-options="{showBack: false}">申请记录</x-header>
    <!-- <panel :footer="footer" :list="list" :type="type" @on-img-error="onImgError"></panel> -->
    <vscroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <div class="list">
        <div class="item" v-for="item in list" @click='view(item.Id)'>
          <div class="left-ctx"
          v-bind:class="{ 'warning': item.status=='待审核', 'danger': item.status=='未通过', 'success': item.status=='已通过' }">
            {{item.status}}
          </div>
          <div class="right-ctx">
            <h4>{{item.time}}</h4>
            <p>[{{item.number}}]&emsp;预约人数</p>
          </div>
        </div>
      </div>
    </vscroll>
  </div>
</template>

<script>
import { XHeader } from 'vux';
import vscroll  from '../../components/vscroll';
export default {
  name: 'appointment-list',
  components: {
    XHeader,
    vscroll
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      list: [{
        Id: '1',
        time: '2017-01-01 14:00:00',
        number: '50',
        status: '待审核'
      },
      {
        Id: '2',
        time: '2017-01-02 14:00:00',
        number: '51',
        status: '已通过'
      },
      {
        Id: '3',
        time: '2017-01-02 14:00:00',
        number: '50',
        status: '未通过'
      },
      {
        Id: '4',
        time: '2017-01-02 14:00:00',
        number: '50',
        status: '未通过'
      },
      {
        Id: '5',
        time: '2017-01-02 14:00:00',
        number: '50',
        status: '未通过'
      },
      {
        Id: '6',
        time: '2017-01-02 14:00:00',
        number: '50',
        status: '未通过'
      },
      {
        Id: '7',
        time: '2017-01-02 14:00:00',
        number: '50',
        status: '未通过'
      },
      ]
    };
  },
  methods: {
    view(id){
      this.$router.push({name: 'appointment-view', params: { 'id': id }});
    },
    onRefresh(done){
      // 刷新
      done();//必须有
    },
    onInfinite(done){
      // 加载更多时间
      done();
    }
  }
};
</script>

<style lang="less">
  .myapp {
    .list{
      margin-bottom: 5px;
    }
    .item{
      .left-ctx {
        width: 1.389rem;
        height: 1.389rem;
        line-height: 1.389rem;
        border-radius: 50%;
        align-self: center;
        margin-right: 0.278rem;
        font-size: 0.361rem;
        text-align: center;

        &.warning{
          border: 0.0833rem solid #ebc650;
          color: #ebc650;
        }

        &.success{
          border: 0.0833rem solid #73ca47;
          color: #73ca47;
        }

        &.danger{
          border: 0.0833rem solid #f96868;
          color: #f96868;
        }
      }
      .right-ctx {

      }

    }

  }
</style>
