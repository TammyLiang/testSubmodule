<template>
	<div v-if="beginAwardData">
		<div class="pop-window">
			<div class="pop-mask"></div>
			<div class="beginner-lottery c-dw">
				<div class="beginner-box">
					<div class="top-header">
						<img src="../../images/beginnerLottery/unitary-text.png" class="unitary-text">
						<img src="../../images/beginnerLottery/close.png" class="close" @click="closeBeginner">
					</div>
					<div class="b-content">
						<div class="unitary">
							<ul>
								<li>
									<div class="pic">
										<img src="../../images/beginnerLottery/golden-leaf.png">
									</div>
									<span class="title">金叶子数</span>
									<img src="../../images/beginnerLottery/number.png" class="number">
								</li>
								<li>
									<div class="pic">
										<img src="../../images/beginnerLottery/ring.png">
									</div>
									<span class="title">免费套圈</span>
									<img src="../../images/beginnerLottery/once.png" class="once">
								</li>
								<li>
									<div class="pic">
										<img src="../../images/beginnerLottery/turnable.png">
									</div>
									<span class="title">VIP转盘</span>
									<img src="../../images/beginnerLottery/days.png" class="days">
								</li>
								<li>
									<div class="pic">
										<img src="../../images/beginnerLottery/raffle-tickets.png">
									</div>
									<span class="title">抽奖券</span>
									<img src="../../images/beginnerLottery/asheet.png" class="asheet">
								</li>
							</ul>
						</div>
						<div class="lottery lottery-turnable">
							<lottery :beginAwardData="beginAwardData" @isAwardMessage="handleAwardMessage"></lottery>
						</div>
					</div>
					<div>
						<a href="javascript:" v-if="isNew" class="btn-purchase" @click="buying(newUserFeedbackList)">每人限购买1次</a>
						<a href="javascript:" v-else class="btn-purchase active">每人限购买1次</a>
					</div>
				</div>
			</div>
		</div>

		<pop-lottery v-if="isPopLottery" :isNew="isNew" :lotteryParmas="lotteryParmas" @close="closePopLottery"></pop-lottery>
	</div>
</template>
<script type="text/javascript">
	import popLottery  from './pop-lottery';
	import lottery from './lottery';
	import API from '../../api';
	export default {
		data() {
			return {
				isbeginner: false,
				isPopLottery: false,
				lotteryParmas: '',
				isNew: false,
				newUserFeedbackList: ''
			}
		},
		props: {
			beginAwardData: {
				default: ''
			}
		},
		methods: {
			 closeBeginner() {
			 	this.$emit('close');
			 },
			 buying(item) {
                 switch(item && item[0].buyStatus){
                     case 0 :
                        localStorage.setItem('APP_CHANNEL', GLOBALS.channel);
                        localStorage.setItem('APP_VERSION', GLOBALS.version);
                        localStorage.setItem('JDD_PARAM', JSON.stringify(item[0]));
                        localStorage.setItem('originDeffer','');
                        setTimeout(() => {
                            window.location.href = '../../../../payment/#/payment';
                            // window.location.href = GLOBALS.curDomain + 'payment/#/payment';
                        }, 0)
                        break;
                     case 1 :
                        this.$toast({
                            message: '您已购买过该商品哦~',
                            duration: 2000
                        });
                        break;
                     case 2 :
                        this.$toast({
                            message: '该商品已售罄~',
                            duration: 2000
                        });
                        break;
                 }
			 	// if(item && item[0] && item[0].buyStatus == 0){
                //     localStorage.setItem('APP_CHANNEL', GLOBALS.channel);
                //     localStorage.setItem('APP_VERSION', GLOBALS.version);
                //     localStorage.setItem('JDD_PARAM', JSON.stringify(item[0]));
                //     localStorage.setItem('originDeffer','');
                //     setTimeout(() => {
                //         window.location.href = GLOBALS.curDomain + 'payment/#/payment';
                //     }, 0)
	            // }else if(item.buyStatus == 1){
	            //     this.$toast({
	            //         message: '您已购买过该商品哦~',
	            //         duration: 2000
	            //     });
	            // } else if(item.buyStatus == 2){
	            //     this.$toast({
	            //         message: '该商品已售罄',
	            //         duration: 2000
	            //     });
	            // }
			 },
			 closePopLottery() {
			 	this.isPopLottery = false;
			 },
			 getNewUserFeedback() {
			 	this.axios.post(API.isNewUserFeedback).then((response) => {
					if(response.data.code == 200) {
						this.isNew = response.data.data.isNew;
						this.newUserFeedbackList = response.data.data.newUserFeedbackList;
					}
			    })
			 },
			 handleAwardMessage(result) {
			 	this.isPopLottery = true;
			 	if(result !== 1 && result !== 2) {
			 		this.isNew = false;
			 	}
			 	this.lotteryParmas = result;
			 }
		},
		components: {
			popLottery,
			lottery
		},
		mounted() {
			this.getNewUserFeedback();
		}
	}
</script>
<style lang="less" scoped>
	@import './beginnerLottery';
</style>