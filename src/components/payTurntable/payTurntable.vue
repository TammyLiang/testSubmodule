<template>
	<div>
		<div class="pop-window">
				<div class="pop-mask"></div>
				<div class="c-dw">
					<div>
						<div class="m-box">
							<div class="already-paid" >
								<a href="javascript:" class="btn-close close" @click="close"></a>
								<div class="turntable-bg">
										<img src="../../images/payTurntable/btn-lottery.png" class="btn-lottery" @click="statBtn" v-if="isbtnStatus == 1">
										<img src="../../images/payTurntable/btn-lottery.png" class="btn-lottery" @click="endBtn" v-if="isbtnStatus == 2">
								</div>
								<div class="zp-bg" ref="wheel">
									<ul v-if="awardsList">
										<li v-for="(item,index) in awardsList.awards" :style="rotate[index]">
										 	<div class="turntable-con">
										 		<p class="name">{{item.awardsName}}</p>
										 		<span class="box">
										 			<img :src="item.awardsImage | imgCurrency" :class="{'taoquan': item.configId == 184}">
										 		</span>
										 	</div>
									 	</li>
									</ul>
								</div>

								<div class="pic">
									<div class="rule-text" @click="showRule">活动规则></div>
									<a href="javascript:" @click="goAdverLink">
										<img :src="adverImg | imgCurrency">
									</a>
								</div>
							</div>
						</div>
						<div class="rule-text-bg" v-if="isRuleText">
							<div class="text">
								<img src="../../images/payTurntable/bigClose.png" class="bigClose" @click="closeRule">
								<h4>————<span>活动规则</span>————</h4>
								<p>● 即日起，只要在多多游戏平台充值任意金额，立即畅享每日幸运转盘VIP特权(30天内有效)</p>
								<p>● 幸运转盘每24小时刷新一次，您可以在刷新时间结束后直接参与幸运转盘，获得丰厚的游戏奖励</p>
								<p>● 幸运转盘VIP特权自参与活动起30个自然日内有效，该特权将在您最后一次充值的第31天后自动解除</p>
								<p>● 本活动最终解释权归多多游戏所有</p>
							</div>
						</div>
					</div>
				</div>
				<div class="unpaid-mask" v-if="whichNumber == 2">
					<div class="unpaid">
						<img src="../../images/payTurntable/unpaid.png" class="pic-unpaid">
						<a href="javascript:" class="btn-open" @click="openShopping">立即开启</a>
						<a href="javascript:" class="btn-close" @click="close"></a>
					</div>
				</div>
		</div>

		<pop-lottery v-if="isPopLottery" :finalAwards="finalAwards" :finalImg="finalImg" @closePopLottery="closePopLottery"></pop-lottery>

	</div>
</template>
<script type="text/javascript">
	import lottery from '../../common/lottery';
	import popLottery from './popLottery';
	import API from '../../api';
	import { bus } from '../../common/bus';
	export default {
		data() {
			return {
				award: [
					{ name: '1000元京东卡碎片*8', pic: 'http://10.33.85.160/cdn/wheel/jdcard_fragment.png' },
					{ name: '免费抽一次' , pic: 'http://10.33.85.160/cdn/wheel/wheel_phonebill.png' },
					{ name: 'iPhone7' , pic: 'http://10.33.85.160/cdn/wheel/jdcard_fragment.png' },
					{ name: '京东金条' , pic: 'http://10.33.85.160/cdn/wheel/freeonetime.png' },
					{ name: '1000元京东卡' , pic: 'http://10.33.85.160/cdn/wheel/wheel_phonebill.png' },
					{ name: '300元京东卡' , pic: 'http://10.33.85.160/cdn/wheel/freeonetime.png' }
				],
				isPopLottery: false,
				PrizeSon: [],
				isbtnStatus: 1,
				awardsList : null, // 获得的奖品
            	finalAwards :null, // 奖品列表
            	getFinalIndex : null,
            	finalImg : null ,
            	adverImg: '',
            	adverLink: '',
            	isRuleText: false
			}
		},
		props: {
			whichNumber: {
				default: 2
			}
		},
		components: {
			popLottery
		},
		mounted() {
			this.getFeeWheelBanner();
			// 奖品列表
        	this.awardsList = localStorage.getItem('turntableData') ? JSON.parse(localStorage.getItem('turntableData')) : '';
		},
		methods: {
			goAdverLink() {
				if(this.adverLink.indexOf('http') != -1) {
					window.location.href = this.adverLink;
				}
			},
			showRule() {
				this.isRuleText = true;
			},
			closeRule() {
				this.isRuleText = false;
			},
			getFeeWheelBanner() {
				this.axios.post(API.feeWheelBanner).then(response => {
					if(response.data.code == 200) {
						this.adverImg = response.data.data.image;
						this.adverLink = response.data.data.url;
					}
				})
			},
			openShopping() {
				
				bus.$emit('showFeedBack', true);
			},
			closePopLottery() {
				this.isPopLottery = false;
				this.$emit('close');
			},
			getFinalAwards(){
				var that = this;
	            this.axios.post(API.payedBetting).then(response => {
	                let params = response.data
	                if(params.code == 200){
	                    // params.data={description: "188金叶子", awardsType: "188金叶子", awardsName:"88金叶子"}
	                    this.finalAwards = params.data;
	                    
	                    let that = this;

	                    for(let i=0,len=that.awardsList.awards.length;i<len;i++){
	                        if(params.data.awardsName == that.awardsList.awards[i].awardsName){
	                            that.getFinalIndex = i
	                            that.finalImg = that.awardsList.awards[i].awardsImage
	                        }
	                    }
	                    lottery.operation(this.$refs.wheel,this.PrizeSon,that.getFinalIndex,function() {
							that.isbtnStatus = 2;
							that.isPopLottery = true;
							bus.$emit('addLeaf', that.finalAwards.awardsAmount);
						})
	                }else{
	                    this.$toast({
	                      message: params.message,
	                      duration: 1500
	                    });
	                }
	            })

	        },
			close() {
				this.$emit('close');
			},
			statBtn() {
				var that = this;
				if(that.awardsList.awards.length == 0){
	                that.$toast({
	                  message: '转盘活动未开启',
	                  duration: 1500
	                });
	                return
	            }
	            // 最终奖品
            	this.getFinalAwards();
			},
			endBtn() {
				this.$toast({
                  message: '你已经参与',
                  duration: 1500
                });
			}
		},
		computed: {
			rotate() {
				var rotateArr = [];
				var d = 1/this.award.length;
				for(var i=0; i< this.award.length; i++) {
					rotateArr.push('transform: rotate(' + d * i + 'turn)');
				}
				return rotateArr;
			}
		}
	}
</script>
<style lang="less" scoped>
	@import './index';
</style>