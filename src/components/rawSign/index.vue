<template>
  <div v-if="isShowRawSign">
    <div class="pop-window">
      <div class="pop-mask"></div>
      <div class="raw-sign c-dw">
        <div class="raw-box">
          <div class="content">
            <div class="info">
              <div class="title">
                <div class="line"></div>
                <div class="text">连续签到<span>7天</span>共可获得</div>
                <div class="line"></div>
              </div>
              <div class="list">
                <div class="jyz"></div>
                <div class="cj"></div>
                <div class="hf"></div>
              </div>
            </div>
            <ul class="list-info list1">
              <li v-for="(item,index) in rawardlogs.awardLogList" :class="index == receiveDay ? 'active':(index < receiveDay?'ylq':'')" class="item">
                <span class="item-date">{{getCapital(index+1)}}</span>
                <div class="item-sign">
                  <!--测试用图 以接口图片地址为准-->
                  <img src="../../images/rawSign/unstate.png" v-if="index<rawardlogs.awardLogList.length-1">
                  <img src="../../images/rawSign/qcp.png" v-else>
                  <!--测试用图 以接口图片地址为准-->
                  <!--<img :src="item.awardImage">-->
                  <span>{{item.awardName}}</span>
                </div>
              </li>
            </ul>
            <div class="btn">
              <a href="javascript:" class="btn-get" @click="submit">立即领取</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '../../api';
  export default {
    data () {
      return {
        isShowRawSign: false,
        rawardlogs: {},
        receiveDay: ''
      }
    },
    computed: {},
    components: {},
    methods: {
      getCapital (index) {
        let numStr='';
        switch(index){
          case 1:numStr='一';break;
          case 2:numStr='二';break;
          case 3:numStr='三';break;
          case 4:numStr='四';break;
          case 5:numStr='五';break;
          case 6:numStr='六';break;
          case 7:numStr='七';break;
        }
        return `第${numStr}天`;
      },
      getnewuserawardlog() {
        return this.axios.post(API.getnewuserawardlog, {
          isShowTotast: "false"
        });
      },
      getIsreceive() {
        return this.axios.post(API.isreceive);
      },
      submit() {
        var that = this;
        this.axios.post(API.newuserawardReceive+(this.receiveDay+1)).then((response) => {
          if(response.data.code == 200) {
            this.$toast({
              message: '领取成功',
              duration: 1000
            });
            that.isShowRawSign = false;
          }
        })
      }
    },
    watch: {},
    created () {
    },
    mounted () {
      var that = this;
      that.axios.all([that.getnewuserawardlog(),that.getIsreceive()]).then(that.axios.spread(function (rawardlog, isreceive) {
        if(isreceive.data.data == 0 && rawardlog.data.code == 200) {
          that.rawardlogs = rawardlog.data.data;
          that.isShowRawSign = true;
          that.receiveDay = that.rawardlogs.receiveDay;
        }
      }));
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .raw-sign {
    /*width: 6.47rem;*/
    width: 100%;
    height: 11.5rem;
    z-index: 16;
    .raw-box {
      width: 100%;
      height: 9.2rem;
      background: url(../../images/rawSign/bj.png) no-repeat center bottom;
      background-size: 6.47rem 9.2rem;
      position: relative;
      top: 1.1rem;
      &:before {
        content: '';
        width: 100%;
        height: 2.35rem;
        background: url(../../images/rawSign/top.png) no-repeat center;
        background-size: 6.48rem 2.35rem;
        position: absolute;
        bottom: 7.9rem;
      }
      .content {
        width: 6.12rem;
        height: 7.66rem;
        position: absolute;
        top: 1.36rem;
        margin: 0 auto;
        left: 0;
        right: 0;
        .info {
          width: 100%;
          height: 1.7rem;
          background: url(../../images/rawSign/qpbj.png) no-repeat center center;
          background-size: 5.77rem 1.7rem;
          margin-top: 0.14rem;
          position: relative;
          .title {
            display: flex;
            width: 3.06rem;
            position: absolute;
            right: .42rem;
            top: 0.12rem;
            .text {
              font-size: 0.24rem;
              padding: 0 0.05rem;
              color: #422B83;
              text-align: center;
              z-index: 2;
              position: relative;
              span {
                color: #FFE300
              }
            }
            .line {
              flex: 1;
              position: relative;
              top: -0.12rem;
              border-bottom: 1px solid #4C3D94;
            }
          }
          .list {
            display: flex;
            height: 1.05rem;
            width: 3.06rem;
            position: absolute;
            right: .48rem;
            top: 0.46rem;
            div {
              flex: 1;
            }
            .jyz {
              background: url(../../images/rawSign/jyz.png) no-repeat center center;
              background-size: 0.91rem 1.05rem;
            }
            .cj {
              background: url(../../images/rawSign/cj.png) no-repeat center center;
              background-size: 0.91rem 1.05rem;
            }
            .hf {
              background: url(../../images/rawSign/hf.png) no-repeat center center;
              background-size: 0.91rem 1.05rem;
            }
          }
        }
        .list-info {
          padding-top: 0.2rem;
          display: flex;
          position: relative;
          flex-wrap: wrap;
          justify-content: center;
          margin: 0 auto;
          .item {
            width: 1.44rem;
            height: 2.03rem;
            background: url(../../images/rawSign/nonbj.png) no-repeat;
            background-size: 1.44rem 2.03rem;
            margin: 0 .02rem .2rem;
            position: relative;
            //  &:not(:last-child)::after
            &.ylq::after{
              content: '';
              width: 1.39rem;
              height: 1.95rem;
              background: url(../../images/rawSign/ylq.png) no-repeat;
              background-size: 1.39rem 1.95rem;
              position: absolute;
              left: 0.015rem;
              bottom: 0.06rem;
              z-index: 2;
            }
            &.active{
              background: url(../../images/rawSign/selbj.png) no-repeat;
              background-size: 1.44rem 2.03rem;
            }
           .item-date{
              position: absolute;
              left: 50%;
              top: 0.15rem;
              transform: translateX(-50%);
              font-size: 0.18rem;
              color: #3B4C8B;
            }
            .item-sign{
              background: url(../../images/rawSign/ozbj.png) no-repeat center;
              background-size: 1.33rem 1.33rem;
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              margin: auto;
              img{
                width: 1.14rem;
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
              }
              span{
                display: block;
                font-size: 0.18rem;
                color: #82C3F6;
                position: relative;
                bottom: -1.58rem;
                text-align: center;
              }
            }
            &:last-child {
              width: 2.83rem;
              height: 1.96rem;
              background: url(../../images/rawSign/qbj.png) no-repeat;
              background-size: 2.83rem 1.96rem;
              &.active{
                background: url(../../images/rawSign/qsbj.png) no-repeat;
                background-size: 2.83rem 1.96rem;
              }
              .item-sign{
                background: url(../../images/rawSign/qzbj.png) no-repeat center;
                background-size: 1.91rem 1.91rem;
                img{
                  width: 1.4rem;
                  top: -.2rem;
                }
                span{
                  left: .4rem;
                  bottom: -1.52rem;
                }
              }
            }
          }
        }
        .btn {
          margin: 0.1rem auto 0;
          .btn-get {
            display: block;
            margin: 0 auto;
            width: 2.44rem;
            height: 0.85rem;
            background: url(../../images/rawSign/btn.png) no-repeat center;
            background-size: 2.44rem 0.85rem;
            font-size: 0.36rem;
            color: #9E4501;
            text-align: center;
            line-height: 0.8rem;
          }
        }
      }
    }
  }
</style>
