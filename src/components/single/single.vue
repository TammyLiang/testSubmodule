<template>
<div v-if="beginAwardData">
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="c-dw">
			<div class="single">
				<div class="fragment"></div>
				<div class="single-box">
					<h4><img src="../../images/single/title.png" class="title"></h4>
					<div class="top-flag"><img src="../../images/single/top-flag.png"></div>
					<a href="javascript:" class="close">
						<img src="../../images/single/close.png" @click="close">
					</a>
					<div class="sold-tips">
						<div class="sold-box">
							已售出<div class="sold-mar"><span>{{hasSoldCount}}</span></div>份双11礼包
						</div>
					</div>
					<!-- 礼包 -->
					<div class="sold-package">
						<div class="s-item" v-if="packageLeft">
							<img src="../../images/single/carnival-corner.png" class="pic-corner">
							<div class="s-item-pic">
								<div class="pic">
									<img src="../../images/single/p-bill.png">
								</div>
								<div class="text">
									<img src="../../images/single/p-text1.png" class="p-text1">
								</div>
							</div>
							<a href="javascript:" class="btn-buy" @click="goBuy(packageLeft)" v-if="packageLeft.buyFlag ==1 ">
								<p class="price">￥{{packageLeft.price}}购买</p>
								<span class="text">再购买<i>{{packageLeft.totalNum}}次</i>开启更大折扣</span>
							</a>
							<a href="javascript:" class="btn-buy active" v-else>
								<p class="price">￥{{packageLeft.price}}购买</p>
								<span class="text">再购买<i>{{packageLeft.totalNum}}次</i>开启更大折扣</span>
							</a>
							<div class="s-tips">每人限购10次</div>

						</div>
						<div class="s-item" v-if="packageRight">
							<img src="../../images/single/preferential-corner.png" class="pic-corner">
							<div class="s-item-pic">
								<div class="pic">
									<img src="../../images/single/p-caijin.png">
								</div>
								<div class="text">
									<img src="../../images/single/p-text2.png" class="p-text2">
								</div>
							</div>
							<a href="javascript:" class="btn-buy" @click="goBuy(packageRight)"  v-if="packageRight.buyFlag ==1 ">
								<p class="price">￥{{packageRight.price}}购买</p>
								<span class="text">再购买<i>{{packageRight.totalNum}}次</i>开启更大折扣</span>
							</a>
							<a href="javascript:" class="btn-buy active"   v-else>
								<p class="price">￥{{packageRight.price}}购买</p>
								<span class="text">再购买<i>{{packageRight.totalNum}}次</i>开启更大折扣</span>
							</a>
							<div class="s-tips">每人限购10次</div>
						</div>
					</div>
					<!-- 转盘 -->
					<div class="lottery-bg">
						<div class="l-title">
							<marquee behavior="scroll" contenteditable="true"scrollamount="3"> 
								<!-- <ul v-if="lamp">
									<li v-for="item in lamp">恭喜<span>{{item.nickName}}</span>获得<span>{{item.awardsName}}</span></li>
								</ul> -->
								<div  v-if="lamp">
										<span v-for="item in lamp">恭喜<i>{{item.nickName}}</i>获得<i>{{item.awardsName}}</i></span>
								</div>
							</marquee>
						</div>
						<div class="lottery-box">
							<lottery v-if="isLottery" :beginAwardData="beginAwardData" @isAwardMessage="handleAwardMessage"></lottery>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
	<pop-lottery v-if="isPopLottery"  :lotteryParmas="lotteryParmas" @close="closePopLottery"></pop-lottery>
</div>
</template>
<script type="text/javascript">
	import lottery from './lottery';
	import popLottery  from '../beginnerLottery/pop-lottery';
	import API from '../../api';
	export default {
		data() {
			return {
				beginAwardData: '',
				isLottery: false,
				lotteryParmas: '',
				isPopLottery: false,
				lamp: '',
				packageLeft: '',
				packageRight: '',
				hasSoldCount: 0
			}
		},
		components: {
			lottery,
			popLottery
		},
		methods: {
			goBuy(item) {
				if(item && item.buyStatus == 0){
                    localStorage.setItem('APP_CHANNEL', GLOBALS.channel);
                    localStorage.setItem('APP_VERSION', GLOBALS.version);
                    localStorage.setItem('JDD_PARAM', JSON.stringify(item));
                    localStorage.setItem('originDeffer','');
                    setTimeout(() => {
                        window.location.href = '../../../../payment/#/payment';
                        // window.location.href = GLOBALS.curDomain + 'payment/#/payment';
                    }, 0)
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
			},
			closePopLottery() {
			 	this.isPopLottery = false;
			 },
			close() {
				this.$emit('close');
			},
			getRichwheel (val) {
			  	this.axios.post(API.richwheel, {
					'value': val
				}).then((response) => {
					if(response.data.code == 200) {
						this.beginAwardData = response.data.data;
						this.isLottery = true;
					}
			    })
			},
			getStaircasePacksList() {
				this.axios.post(API.staircasePacksList).then((response) => {
					if(response.data.code == 200) {

						this.packageLeft = response.data.data && response.data.data.staircasePacksList[0]; 
						this.packageRight = response.data.data && response.data.data.staircasePacksList[1]; 
						this.hasSoldCount = response.data.data && response.data.data.hasSoldCount;
					}
			    })
			},
			geThouseLamp() {
				this.axios.post(API.houseLamp, {
					'value': 3
				}).then((response) => {
					if(response.data.code == 200) {
						this.lamp = response.data.data;
					}
			    })
			},
			handleAwardMessage(result) {
			 	this.isPopLottery = true;
			 	this.lotteryParmas = result;

			 }
		},
		mounted() {
			// 奖品列表
			this.getRichwheel(3);
			//双11列表
			this.getStaircasePacksList();
			//
			this.geThouseLamp();

		}
	}
</script>
<style lang="less" scoped>
	@import './single';
</style>