<template lang="html">
    <div v-show="feedbackList">
        <transition name="fade">
            <div class="feedback-wrap">
                <div class="feedback-mask" @touchmove.prevent=""></div>
                <div class="feecback-content" :class="{'two':showGiftPage==2,'six':showGiftPage==6,
                'fifteen':showGiftPage==15,'fifty':showGiftPage==50,'onehundred':showGiftPage==100,
                'fivehundreds':showGiftPage==500,'onethousands':showGiftPage==1000,'twothousands':showGiftPage==2000, 'fivethousands':showGiftPage==5000}">
                    <p class="closebtn" @click="closePop"></p>
                    <p class="buybtn" :class="{'gray': nobuy}" @click="gotoPay(feedbackList)"></p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { bus } from '../../../common/bus';
export default {
    data(){
        return{
            feedDetail : null,
            noBuy : false,
            isFeedBack: true
        }
    },
    props :{
        feedbackList : {
            type: Array,
            default : null
        },
        showGiftPage :{
            type: Number,
            default : null
        },
    },
    mounted(){
        if(this.feedbackList){
            if(this.feedbackList.buyFlag == 0 || this.feedbackList.buyStatus != 0){
                this.nobuy = true
            }
        }
    },
    methods:{
        closePop(){
            sessionStorage.setItem('openBill', '');
            this.$emit('closeCharge');
            // 点击关闭按钮弹出双11礼包
            if(localStorage.getItem('firstSign')) {
                localStorage.setItem('firstSign','');
                bus.$emit('showSingle', true);
            }
        },
        gotoPay(item){
            if(item.buyStatus == 0){
                // if(GLOBALS.accessToken) {
                    localStorage.setItem('APP_CHANNEL', GLOBALS.channel);
                    localStorage.setItem('APP_VERSION', GLOBALS.version);
                    localStorage.setItem('JDD_PARAM', JSON.stringify(item));
                    localStorage.setItem('originDeffer','');
                    setTimeout(() => {
                        // location.replace('http://192.168.101.181/wap/payment/#/payment');
                        // window.location.href = GLOBALS.curDomain + 'payment/#/payment';
                        window.location.href = '../../../../payment/#/payment';

                    }, 0)
                // }else {
                //     this.$toast({
                //         message: '未授权，请先登录',
                //         duration: 1500
                //     });
                // }
            }else if(item.buyStatus == 1){
                this.$toast({
                    message: '您已购买过该商品哦~',
                    duration: 2000
                });
            } else if(item.buyStatus == 2){
                this.$toast({
                    message: '该商品已售罄',
                    duration: 2000
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
