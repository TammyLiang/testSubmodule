<template lang="html">
    <div v-if="showPayedTurntable && showPayedTurntable.enabled != 0">


        <!-- <div class="turntable">
            <span class="colorful" v-if="showPayedTurntable.enabled != 2"></span>
            <div v-if="showPayedTurntable.enabled == 1" @click="showPop">
                <span class="new-icon"></span>
                <span class="text-img"></span>
                <span class="win-icon"></span>
            </div>
            <div v-if="showPayedTurntable.enabled == 3" @click="showTruntable">
                <span class="start"></span>
            </div>
            <div v-if="showPayedTurntable.enabled == 2" class="julikaiqi"
             @click="wait">
                <span class="ju"></span>
                <span class="li"></span>
                <span class="kai"></span>
                <span class="qi"></span>
                <span class="count-down">{{countDownText}}</span>
            </div>
        </div> -->


        <div class="turntables">
            <img src="../../images/turntable/open/money.png" class="money">
            <img src="../../images/turntable/open/box.png" class="box">
            <!-- 幸运转盘 -->
            <div v-if="showPayedTurntable.enabled == 1" >
                <div class="pic-box" @click="showPop">
                    <img src="../../images/turntable/open/zpdb.png" class="pic-text zpdb" >
                </div>

            </div>
            <!-- 立即开启 -->
            <div v-if="showPayedTurntable.enabled == 3" >
                <div class="pic-box" @click="showTruntable">
                    <img src="../../images/turntable/open/ljcj.png" class="pic-text zpdb" >
                </div>
            </div>
            <!-- 距离开启 -->
            <div v-if="showPayedTurntable.enabled == 2" class="julikaiqi" >
                <div class="pic-box" @click="wait">
                    <img src="../../images/turntable/open/jlkq.png" class="pic-text" >
                </div>
                <span class="count-down">{{countDownText}}</span>
            </div>
        </div>


        <!-- <div class="waiting" v-show="showWaitTips">新一轮转盘正在拼命组装中，先玩几局游戏吧</div> -->
    </div>
</template>

<script>
import API from '../../api';
import { bus } from '../../common/bus';
export default {
    data(){
        return{
            isShowPop:false,
            restart : false,
            countDownText :'',
            Interval : null,
            leftTime : 0,
            showWaitTips : false,
        }
    },
    props:{
        showPayedTurntable: {
            type: Object,
            default : null
        },
    },
    mounted(){
        
        var that = this;
        this.countDown();
        bus.$on('openCountDown', function(status) {
            if(status) {
                that.showPayedTurntable.enabled = 2;
                that.showPayedTurntable.distanceOpen = 86390438;
            }
        });

    },
    destroyed(){
        clearInterval(this.Interval)
    },
    computed:{
        contentText(){
            let hours = parseInt(this.showPayedTurntable.distanceOpen /1000/60/60%24); //计算剩余的小时
            let minutes = parseInt(this.showPayedTurntable.distanceOpen /1000/60%60);//计算剩余的分钟
            let seconds = parseInt(this.showPayedTurntable.distanceOpen /1000%60, 10);//计算剩余的秒数
            return this.formatTime(hours) + ':' + this.formatTime(minutes) + ':' + this.formatTime(seconds)
        },
        showPage(){
            if(location.href.indexOf('turntable') > -1){
                return false
            }else{
                return true
            }
        }
    },
    methods:{
        countDownTime(){
            if(this.showPayedTurntable && this.showPayedTurntable.enabled == 2){
                if(this.showPayedTurntable.distanceOpen > 0){
                    this.showPayedTurntable.distanceOpen  = this.showPayedTurntable.distanceOpen  - 1000
                    let hours = parseInt(this.showPayedTurntable.distanceOpen /1000/60/60%24); //计算剩余的小时
                    let minutes = parseInt(this.showPayedTurntable.distanceOpen /1000/60%60);//计算剩余的分钟
                    let seconds = parseInt(this.showPayedTurntable.distanceOpen /1000%60, 10);//计算剩余的秒数
                    this.countDownText = this.formatTime(hours) + ':' + this.formatTime(minutes) + ':' + this.formatTime(seconds)
                }else{
                    // clearInterval(this.Interval)
                    location.reload()
                }
            }
        },
        countDown(){
            let self = this
            self.Interval = setInterval(self.countDownTime,1000);
        },
        formatTime(time){
            if(time<10) {
              time = "0" + time;
             }
             return time;
        },

        showPop(){
            GLOBALS.buryingPoint(1210);
            // this.$router.replace('/turntable/luckyRecharge')
            //无资格抽奖
            bus.$emit('isPaid', 'false');
        },
        showTruntable(){
            GLOBALS.buryingPoint(1210);
            // this.$router.replace('/turntable/luckyTurntable')
            //有资格抽奖
            bus.$emit('isPaid', 'true');
        },
        wait(){
            GLOBALS.buryingPoint(1210);
            

            this.$toast({
                message: '新一轮转盘正在拼命组装中，先玩几局游戏吧',
                duration: 1500
            });
            // let that = this
            // that.showWaitTips = true
            // setTimeout(function(){
            //     that.showWaitTips = false
            // },4000)
        }
    }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
