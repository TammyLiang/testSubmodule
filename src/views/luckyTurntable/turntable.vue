<template lang="html">
    <div class="turn-wrap">
        <div class="turn-content">
            <div class="turn-bg" :class="{'turn-animate':turnAnimate}" ref="wheel">
                <ul v-if="awardsList">
                    <li v-for="(item,index) in awardsList.awards" :style="rotate[index]">
                        <span>{{item.awardsName}}</span><br>
                        <img :src="item.awardsImage|imgCurrency">
                    </li>
                </ul>
            </div>
            <p class="turn-btn" @click="circle"></p>
        </div>
        <turnpop v-if = "showPop" :finalAwards = "finalAwards" :finalImg="finalImg"></turnpop>
    </div>
</template>

<script>
import turnpop from '../../components/turntable/turnpop.vue'
document.title = '幸运转盘'

export default {
    data(){
        return{
            turnAnimate :false,
            lenCloc : 0,
            isStatr : false,
            awardsList : null, // 获得的奖品
            finalAwards :null, // 奖品列表
            getFinalIndex : null,
            finalImg : null ,
            showPop: false
        }
    },
    components:{
        turnpop
    },
    computed: {
		rotate() {
			var rotateArr = [];
			var d = 1/6;
			for(var i=0; i< 6; i++) {
				rotateArr.push('transform: rotate(' + d * i + 'turn)');
			}
			return rotateArr;
		}
	},
    beforeMount(){
        // 奖品列表
        this.getAwardsList()
        // 最终奖品
        this.getFinalAwards()
    },
    methods:{
        getFinalAwards(){
            this.$http.post('/api_platform/api/fee/wheel/betting').then(data => {
                let params = data.body
                if(params.code != 200){
                    params.data={description: "188金叶子", awardsType: "188金叶子", awardsName:"88金叶子"}
                    this.finalAwards = params.data;
                }else{
                    this.$toast({
                      message: params.message,
                      duration: 3000
                    });
                }
            })

        },
        getAwardsList(){
            this.$http.post('/api_platform/api/fee/wheel/status').then(data => {
                let params = data.body
                if(params.code == 200){
                    // params.data ={
                    //     "awards":[
                    //         { awardsName: '88金叶子', awardsImage: 'http://192.168.101.241/wap/imgtemp/leafes88.png' },
                    //         { awardsName: '188金叶子' , awardsImage: 'http://192.168.101.241/wap/imgtemp/leafes188.png' },
                    //         { awardsName: '288金叶子' , awardsImage: 'http://192.168.101.241/wap/imgtemp/leafes288.png' },
                    //         { awardsName: '666金叶子' , awardsImage: 'http://192.168.101.241/wap/imgtemp/leafes666.png' },
                    //         { awardsName: '8888金叶子' , awardsImage: 'http://192.168.101.241/wap/imgtemp/leafes8888.png' },
                    //         { awardsName: '免费套圈x1' , awardsImage: 'http://192.168.101.241/wap/imgtemp/ferruleicon.png' }
                    //     ],
                    //     "bettingTimes":0,
                    //     "consumerAmount":null,
                    //     "enabled":3,
                    //     "distanceOpen":5000,
                    //     "description":'hahaha'
                    // }
                    this.awardsList = params.data
                }else{
                    this.$toast({
					  message:params.message,
					  duration: 3000
					});
                }
            })
        },
        getiAwardsDetail(){
            for(let i=0,len=this.awardsList.awards.length;i<len;i++){
                if(this.finalAwards.awardsName == this.awardsList.awards[i].awardsName){
                    this.getFinalIndex = i
                    this.finalImg = this.awardsList.awards[i].awardsImage
                }
            }
        },
        circle(){
            let that = this
            if(that.awardsList.awards.length == 0){
                that.$toast({
                  message: '转盘活动未开启',
                  duration: 3000
                });
                return
            }
            this.getiAwardsDetail()
            that.operation(this.$refs.wheel,this.getFinalIndex,function() {
                that.isStatr = false;
                that.showPop = true;
                setTimeout(function(){
					that.showPop = false
					// 付费转盘
			    //    that.getAwardsList()
                   history.go(-1)
                },3500)
            });
        },
        operation(wheel,ran,fn) {
    		if(!this.isStatr){
                this.isStatr = true;
                this.lenCloc++;
    			let sun = 9 * 360 //最小圈数 * 360
        		if(ran >= 6) {
        			ran = 0;
        		}
        		var soBuom = parseInt(Math.floor(Math.random() * 60) -30);
        		/*    旋转度数 = 上次度数+  + 当前数字 * 60 +随机角度  = 最终旋转度数     */
        		wheel.style.transform = "rotate(-" + ((this.lenCloc * sun + ran * 60) + soBuom) + "deg)";
        		setTimeout(function() {
        			if(fn) {
        				fn();
        			}
        		}, 3000);
            }
    	}
    }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
