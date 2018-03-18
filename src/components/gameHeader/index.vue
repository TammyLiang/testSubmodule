<template lang="html">
    <div class="c-header">
        <div class="g-personal" v-if="userTansInfo">
            <div class="g-pic-box" >

                <img v-if="userTansInfo && userTansInfo.head" :src="userTansInfo.head|imgCurrency" class="g-pic">
                <!-- <p v-else>
                    <span v-if="vistorHead" class="g-login" @click.stop="toLogin($event)">点击<br>登录</span> -->
                <img v-else src="../../images/img_photo.png" class="g-pic">
                <div class="icon-pumpkin"></div>
                <!-- </p> -->
                <span class="g-accoutid" :class="{'down':vistorHead}">ID:{{userTansInfo.userId}}</span>
                <!-- <div v-show="!(userTansInfo && userTansInfo.head)">
                    <div v-show="isShowSmall">
                    <p class="login-small" @click.stop="toLogin($event)" v-if="vistorHead">
                        <i class="close" @click.stop="closeSmallPop"></i>账户登录<br><i>奖励200金叶子</i></p>
                    </div>
                </div> -->
            </div>
            <div class="g-info">
                <h1>{{userTansInfo.nickname}}</h1>
                <div class="g-info-box" @click.stop.prevent="showShoppingMall">
                    <img src="../../images/personalnew/leafs.png" class="" class="g-leaf">
                    <span class="g-leaf-amount">{{userAmount}}</span>
                    <!-- <img src="../../images/game/game-add.png" class="g-add"> -->
                    <img src="../../images/game/sc-icon.png" class="sc-icon">
                </div>
            </div>
        </div>
        <div class="g-items">
            <ul>
                <!-- <li @click.stop.prevent="showPopRecharge($event)" v-if="showCharge">
                    <img src="../../images/game/xuanzhuan.png" class="xuanzhuan">
                    <div class="g-item-box caijin">
                    </div>充值送话费
                </li> -->
                <li @click.stop.prevent="showPopRecharge($event)" v-if="showCharge">
                    <div class="cz-bill">
                        <div class="circle-bg" :class="{'six':showGiftPage==6,'fifteen':showGiftPage==15}"></div>
                        <div class="feed":class="{'two':showGiftPage==2,'six':showGiftPage==6,
                            'fifteen':showGiftPage==15,'fifty':showGiftPage==50,
                            'onehundred':showGiftPage==100,'fivehundreds':showGiftPage==500,'onethousands':showGiftPage==1000,
                            'twothousands':showGiftPage==2000, 'fivethousands':showGiftPage==5000}">
                        </div>
                    </div>
                </li>
                <li @click.stop.prevent="showPopTask($event)">

                    <div class="g-Heavy">
                        <em class="red-dot" v-if="isRedDot"></em>
                        <em class="sd-tips" v-if="isOpenDot"></em>
                    </div>任务
                </li>
                <li @click.stop.prevent="showMessage($event)">
                    <div class="g-item-box message">
                        <em class="message-num" v-if="unreadCount >0">{{unreadCount}}
                            {{unreadCount > 99 ? '+' : ''}}</em>
                    </div>消息中心
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { bus } from '../../common/bus';
import API from '../../api';

export default {
    data() {
        return {
            isShowSmall: true,
            isOpenDot: false,
            isRedDot: false
        }
    },
    props:{
        redDotStatus: {
            default: false
        },
        userTansInfo :{
            type :Object,
            default :null
        },
        showCharge:{
            type : Boolean,
            default : false
        },
        showLittleLogin:{
            type : Boolean,
            default : false
        },
        vistorHead:{
            type : Boolean,
            default : false
        },
        showGiftPage : {
            type : Number,
            default : 0
        },
        unreadCount : {
            type : Number,
            default : 0
        },
    },
    mounted(){
        var that = this;
        bus.$on('openDot',function(status) {
            if(status) {
               that.isOpenDot = true;
            }else {
                that.isOpenDot = false;
            }
        })
        bus.$on('redDot',function(status) {
            if(status) {
               that.isRedDot = true;
            }else {
                that.isRedDot = false;
            }
        })
    },
    computed:{
          userAmount(){
              let amount = this.userTansInfo.amount,
                  len = amount.toString().length
              if(len > 6){
                  amount = this.avg(this.userTansInfo.amount,10000) + '万'
              }
              return amount
          }
    },
    methods :{
        avg(a,b){
            var res= parseInt((a/b)*10)/10;
             return res;
         },
        showShoppingMall(e) {
            if(!e._constructed) {
                return;
            }
            GLOBALS.buryingPoint(1203);
            if(GLOBALS.accessToken) {
                localStorage.setItem('APP_CHANNEL', GLOBALS.channel);
                localStorage.setItem('APP_VERSION', GLOBALS.version);
                setTimeout(() => {
                    window.location.href = GLOBALS.shopUrl;
                })
            }else {
                this.$toast({
                    message: '未授权，请先登录',
                    duration: 1500
                });
            }
        },
        showPopTask(e){
            if(!e._constructed) {
                return;
            }
    	    GLOBALS.buryingPoint(1205);
                // this.$emit('openTask',true);
    	    this.$emit('newTask', true);
        },
        showMessage(e){
            if(!e._constructed) {
                return;
            }
            this.$emit('openMessage',true)
        },
        showPopRecharge(e){
            if(!e._constructed) {
                return;
            }
            GLOBALS.buryingPoint(1204);
            this.$emit('showCharge',true);
        },
        toLogin(e){
            if(!e._constructed) {
				return;
			}
            let urls = encodeURIComponent('/game?type=jdd&status=bind')
            location.href='http://m.okooo.com/user/login.php?FromUrl='+urls;
        },
        closeSmallPop(){
            this.isShowSmall = false;
        }
    }
}
</script>

<style lang="less">
@import "./index.less";
.sc-icon {
    width: 0.68rem;
    height: 0.55rem;
}
</style>
