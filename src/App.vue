<template>
  <div id="app">
    <div id="router-content">
        <router-view ></router-view>
        <!-- <router-view  ></router-view> -->
    </div>
  </div>
</template>

<script>
import API from './api';
// import {scroll} from './components'
import Router from 'vue-router'
export default {
    data() {
      return {
        currentIndex: 1,
        isRestart : false,
        showCountDown : false
      }
    },
    methods: {

    }
}
</script>

<style lang="less">
@import './common/base.css';

.slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease
   }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }


*{
  margin: 0;
  padding: 0;
  list-style: none;

}
a {
  text-decoration: none;
}
#app {
  width: 100%;
  margin: 0 auto;
}
input,button {
  border:none;
  outline: none;
}

/*input {
  -webkit-user-select:auto;
}*/
body {
   line-height: 1;
  overflow: hidden;
  color: #fff;
}
img {
  border: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.24rem;

}
.c-dw {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
#router-content {
    position: fixed;
    width: 100%;
    height: 100%;
    background: url(./images/bigImage/bodybj.png) repeat;
    background-size: 100% 100%;
  /*padding-bottom: 1.35rem;*/
}

@keyframes rotate{
      from{transform:  rotate(0);}
      to{transform:  rotate(360deg);}
  }
.footer {
  width: 100%;
  height: 1.04rem;
  background: url(./images/game/bottom-bg.png)  repeat-x center top;
  background-size: 100% 1.04rem;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  ul {
    height: 1.02rem;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    text-align: center;
  }
  li {
    height: 1.02rem;
    flex: 1;
    display: flex;
    align-items: center;
    text-align: center;
    &:not(:last-child):after{
        content: '';
        display: inline-block;
        width: 1px;
        height: 90%;
        background: url(./images/game/c-line-end.png) no-repeat;
        background-size: 100%;
    }
    cursor: pointer;
    position: relative;
    top: 0.02rem;
    a {
      height: 1.02rem;
      display: block;
      width: 100%;
      height: 100%;
      font-size: 0.24rem;
      color: #fff;
    }
    .f-box {
      flex: 0 0 100%;
      margin-bottom: 0.05rem;
    }
    span {
      position: relative;
      top: -0.03rem;
    }
    &.active {
      background: url(./images/game/bottom-nav.png) no-repeat center bottom;
      background-size: 100% 1.02rem;
      color: #fee694;
    }
    .f-box {
      height: 0.65rem;
      position: relative;
      img {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        &.game-icon-big{
          width: 0.62rem;
          bottom: -0.02rem;
        }
        &.game-icon{
          width: 0.5rem;
          bottom: 0.02rem;
        }
        &.knapsack-icon-big {
          width: 0.6rem;
          bottom: 0.01rem;
        }
        &.knapsack-icon {
          width: 0.5rem;
          bottom: 0.04rem;
        }

        &.luck-draw-big {
          width: 0.6rem;
          bottom: 0.01rem;
        }
        &.luck-draw {
          width: 0.45rem;
          bottom: 0.04rem;
        }
        &.head-icon-big {
          width: 0.6rem;
          bottom: -0.01rem;
        }
        &.head-icon{
          width: 0.5rem;
          bottom: 0.04rem;
        }

      }
    }
  }

 /* .knapsack-icon {
    width: 0.49rem;
    height: 0.52rem;
  }
  .luck-draw {
    width: 0.5rem;
    height: 0.54rem;
  }*/

}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}

.c-pop-ys {
  /*box-shadow: 0 0 0.25rem #84163c;*/
  border: 0.02rem solid #2d4286;
  border-radius: 0.1rem;
}
.pop-window {
    position: relative;
    z-index: 11;
    .pop-mask {
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.5;
      filter:alpha(opacity=50);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10;
    }
    .pop-close {
      width: 0.68rem;
      height: 0.68rem;
      position: absolute;
      right: -0.34rem;
      top: -0.34rem;
    }
}
.mint-swipe {
  overflow: inherit;
}
.game-banner-box .mint-swipe-indicators {
  bottom: -0.32rem;
}
.game-banner-box  .mint-swipe-indicator {
  opacity: 1;
  background:#725671;
  &.is-active {
    background: #fff;
  }
}



@media only screen and (max-width: 320px) {
   .league {
          width: 125% !important;
         transform: translateX(-50%) translateY(-50%) scale(0.8) !important;
         .close {
           transform: scale(1.2);
         }
         .league-list {
          padding-left: 0;
         }
         ul {
          margin-left: -4.76% !important;
          li {
              width: 31.05% !important;
              margin-left: 2.06% !important;
          }
          .l-text {
            width: 1.6rem !important;
          }
      }
   }
   .beginner-lottery {
          transform: translateX(-50%) translateY(-50%) scale(0.87) !important;
   }
   .single {
      transform: scale(0.8) !important;
   }
    .thank-giving{
    transform: scale(0.85) !important;
   }
   .dart-mission {
    transform: scale(0.8) !important;
   }
  .raw-sign{
    transform: translateX(-50%) translateY(-50%) scale(0.85);
  }
   /*.scale-ys {
        transform: scale(0.9);
         transform-origin:50% 50%;
   }*/
}

</style>
