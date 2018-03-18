<template lang="html">
    <transition name="fade">
        <div class="charge-wrap">
            <div class="charge-bg">
                <p class="closebtn" @click="closePop"></p>
                <ul>
                    <li v-for="item in feedbackList">
                        <span>
                            <img :src="item.icon.split(';')[0] | imgCurrency">
                            <img :src="item.icon.split(';')[1] | imgCurrency" class="icon">
                            <i v-html="item.content"></i>
                        </span>
                        <br>
                        <span class="feedname">{{item.name}}</span><br>
                        <span class="buybtn" @click="gotoPay(item)" :class="{'disable':item.buyStatus != 0}">
                            {{item.buyStatus == 0 ? '购买' : (item.buyStatus == 1 ? '已购买' : '已售罄')}}
                        </span><br>
                        <span>今日剩余&nbsp;:&nbsp;{{item.totalNum < 0 ? 0 : item.totalNum}}</span>
                    </li>
                    <!-- <li>
                        <img src="../../images/activity/testimg.png"><br>
                        <span>2元回馈礼包</span><br>
                        <span class="buybtn">抢购</span><br>
                        <span>今日剩余</span>
                    </li> -->
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
        return{
            btnText : ''
        }
    },
    props :{
        feedbackList : {
            type: Array,
            default : null
        }
    },
    methods:{
        closePop(){
            sessionStorage.setItem('openBill', '');
            this.$emit('closeCharge');
        },
        gotoPay(item){
            if(item.buyStatus == 0){
                if(GLOBALS.accessToken) {
                    localStorage.setItem('APP_CHANNEL', GLOBALS.channel);
                    localStorage.setItem('APP_VERSION', GLOBALS.version);
                    localStorage.setItem('JDD_PARAM', JSON.stringify(item));
                    localStorage.setItem('originDeffer','');
                    setTimeout(() => {
                        // location.replace('http://192.168.101.181/wap/payment/#/payment');
                        // window.location.href = GLOBALS.curDomain + 'wap/payment/#/payment';
                        window.location.href = '../../../../payment/#/payment';

                    }, 0)
                }else {
                    this.$toast({
                        message: '未授权，请先登录',
                        duration: 1500
                    });
                }
            }
        }
    }
}
</script>

<style lang="less">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.charge-wrap{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    z-index: 12;
    .charge-bg{
        position: absolute;
        top: 50%;
        left : 50%;
        transform: translate(-50%,-50%;);
        width: 78%;
        height: 8rem;
        background: url('../../images/bigImage/rechargebg.png') no-repeat;
        background-size: 100% 100%;
        .closebtn{
            float: right;
            width: .44rem;
            height: .44rem;
            background: url('../../images/activity/closebtn.png') no-repeat;
            background-size: 100%;
        }
        ul{
            position: absolute;
            top: 54%;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            // margin: 75% auto 0;
            width: 87%;
            li{
                position: relative;
                flex: 1;
                text-align : center;
                img:first-child{
                    margin-bottom: .1rem;
                    width: 1.41rem;
                    height: 1.41rem;
                }
                .icon{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: .75rem;
                    height: .79rem;
                }
                span{
                    line-height: .4rem;
                    &:first-child{
                        position: relative;
                        display: inline-block;
                        width: 1.41rem;
                        height: 1.41rem;
                        i{
                            position: absolute;
                            bottom: .01rem;
                            left: 0;
                            width: 100%;
                            line-height: .25rem;
                            font-size: .2rem;
                        }
                    }
                    .feed-name{
                        color : #ebf316;
                        font-size : .24rem;
                    }
                    &:last-child{
                        color : #94adff;
                        font-size : .2rem;
                    }
                    &.buybtn{
                        display: inline-block;
                        margin: .1rem auto;
                        width : 1.34rem;
                        height : .5rem;
                        line-height: .5rem;
                        background : #fff10e;
                        border-radius: .5rem;
                        color : #16309d;
                        font-size : .28rem;
                        box-shadow: 0 0 .1rem #16309d;
                    }
                    &.disable{
                        background: #b8b5a9;
                        color:#fff;
                        box-shadow: none;
                    }
                }
            }
        }
    }
}
</style>
