<template lang="html">
    <div class="wrap">
        <div class="exchange">
            <div class="header">
                <p class="countdown">更新倒计时：{{countDown.time}}</p>
            </div>
            <ul>
                <li v-for= "item in giftList.list">
                    <span>
                        <!-- <img src="../../images/flashsale/ipad-mini4.png"> -->
                        <img :src="item.icon|imgCurrency">
                        <i class="object-bg">{{item.awardsName}}</i>
                        <i class="once" v-if="item.awardsType == 9 && item.dailyLeftNum == 1"></i>
                    </span><br>
                    <span class="surplus" :class="{'nostok':item.dailyLeftNum==0}">剩余:{{item.dailyLeftNum}}</span><br>
                    <span class="buybtn" :class="{'nobuy':item.dailyLeftNum==0}" @click="goChange(item)"><i></i>{{item.leafNum}}</span>
                </li>
            </ul>
        </div>
        <!-- 立即兑换 -->
        <transition name = "fade">
            <div class="checkChange" v-if="showChargePop" @touchmove.prevent="">
                <div class="changebg">
                    <p class="closebtn" @click="showChargePop = false"></p>
                    <p class="name">{{currentGift.awardsName}}</p>
                    <img :src="currentGift.icon|imgCurrency">
                    <!-- <img src="../../images/flashsale/ipad-mini4.png"> -->
                    <p class="detail">
                        <span><i></i>{{currentGift.leafNum}}/份</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="rmb">参考价:{{currentGift.leafNum/1000}}元</span><br>
                        <span v-if="useAmount >= 0">我的金叶子:<i class="myleaf">{{useAmount}}</i></span>
                    </p>
                    <p class="submit" @click="submit(currentGift)">确认兑换</p>
                    <p>今日还可兑换:{{currentGift.dailyLeftNum}}</p>
                </div>
            </div>
        </transition>
        <!-- 兑换成功 -->
        <transition name = "fade">
            <div class="changesuccess" v-if="successPop">
                <div class="successbg">
                    <p class="img">
                        <img :src="successGift.icon|imgCurrency">
                        <!-- <img src="../../assets/images/flashsale/ipad-mini4.png"> -->
                    </p>
                    <p class="name">{{successGift.awardsName}}</p>
                    <p>恭喜您，兑换成功！</p>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
import API from '../../api'
import scroll from 'components/scroll/scroll';

export default {
    data(){
        return{

            currentGift : null,
            exchangeList :null ,
            successGift : null,
            showChargePop :false,
            showRecord : false,
            successPop : false,
            useAmount : 0,
            _appChannel:'',
            test : ''
        }
    },
    components: {
        scroll,
    },
    props:{
        giftList :{
            type:Object,
            default:null
        },
        countDown:{
            type:Object,
            default:null
        },
    },
    beforeMount(){
        this.getUserInfo()
    },
    methods:{
        getSaleData(){
            this.axios.post(API.recharge).then((response) => {
                let params = response.data
                if(params.code == 200){
                    if(params.data.status == 1){
                        this.$emit('getData',params.data)
                    }
                }
            })
        },
		getUserInfo(){
			this.axios.post(API.UserTransInfo).then((response) => {   
                if( response.data.code == 200){
                    this.userTansInfo = response.data.data;
                    this.useAmount = this.userTansInfo.amount
                }
		      
		    })
		},
        goChange(item){
            if(item.dailyLeftNum != 0){
                this.currentGift = item
                this.showChargePop = true
            }
        },
        submit(item){
            this.axios.post(API.reward,{
                value : item.awardsId
            }).then((response) => {
                let params = response.data
                if(params.code == 200){
                    this.successPop = true
                    this.showChargePop = false
                    this.successGift = item
                    let that = this
                    setTimeout(function(){
                        that.successPop = false
                        that.getUserInfo()
                        that.getSaleData()
                    },3000)
                }else{
                    this.$toast({
                      message:params.message,
                      duration: 3000
                    });
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
