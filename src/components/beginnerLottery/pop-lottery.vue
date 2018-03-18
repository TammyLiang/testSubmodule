<template>
	<div id="pop-lottery">
		<div class="pop-window">
			<div class="pop-mask"></div>
			<div class="pop-lottery c-dw">
				<div class="pop-error" v-if="lotteryParmas == 1 || lotteryParmas == 2">
					<img src="../../images/beginnerLottery/btn-delete.png" class="btn-delete" @click="close">
					<div class="error-content">
						<div class="pic">
							<img src="../../images/beginnerLottery/raffle-tickets.png">
						</div>
						<p class="error-text" v-if="lotteryParmas == 1 && isNew">
							<span>啊！你的抽奖券不足</span>
							<span>购买超实惠的1元礼包</span>
							<span>立刻获得抽奖机会</span>
						</p>
						<p class="error-text" v-else>
							<span>啊！爸爸</span>
							<span>该礼包购买次数已达上限！</span>
							<span>请尝试购买其他礼包</span>
						</p>
						<a href="javascript:" class="btn-error" @click="close">我知道了</a>
					</div>
				</div>
				<div class="pop-correct" v-else>
					<h4>
						<img src="../../images/beginnerLottery/correct-text.png" class="correct-text">
					</h4>
					<div class="show-award">
						<img src="../../images/beginnerLottery/correct-aperture.png" class="correct-aperture">
						<img :src="lotteryParmas && lotteryParmas.awardsImage.split(';')[0]|imgCurrency" class="pic-award">
					</div>
					<div class="correct-text">
						<p>{{lotteryParmas.awardsName}}</p>
						<span>奖品已经发放，请到背包内查看。</span>
					</div>
					<a href="javascript:" class="btn-check" @click="goCheck">前往查看</a>
					<img src="../../images/activity/closebtn.png" class="closebtn" @click="close">
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				isPopLottery: true
			}
		},
		props: {
			lotteryParmas: {
				default: ''
			},

			isNew: {
				default: ''
			}
		},
		methods: {
			goCheck() {
				if(this.lotteryParmas) {
					if(this.lotteryParmas.awardsName.indexOf('金叶子') != -1) {
							this.$emit('close');
					}else {
							this.$router.replace('/knapsack');
					}
				}
			},
			close() {
				this.$emit('close');
			}
		},
		mounted() {
		}
	}
</script>
<style lang="less" scoped>
	.closebtn {
		width: 0.64rem;
		height: 0.64rem;
		display: block;
		margin: 0.9rem auto 0;
	}
	#pop-lottery {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 16;
		.pop-mask {
			opacity: 0.7;
		}
	}
	.pop-lottery {
		z-index: 14;
	}
	.pop-error {
		width: 4.82rem;
		height: 5.23rem;
		.btn-delete {
			width: 0.6rem;
			height: 1.23rem;
			position: absolute;
			right: 0;
			top: -0.95rem;
			z-index: -1;
		}
	}
	.correct-text {
		width: 4.29rem;
		text-align: center;
		font-family: '宋体';
		p {
			font-size: 0.48rem;
			color: #fff177;
			margin-bottom: 0.15rem;
		}
		span {
			font-size: 0.22rem;
			color: #ccc;
		}
	}
	.show-award {
		width: 3.75rem;
		height: 3.78rem;
		position: relative;
		top: -0.1rem;
		margin: 0 auto -0.1rem;
		.correct-aperture {
			width: 3.75rem;
			height: 3.78rem;
			position: absolute;
			left: 0;
			top: 0;
			transform-origin: center;
    		animation: rotate 2s linear infinite;
		}
		.pic-award {
			    width: 2.02rem;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto;
		}
	}
	.btn-check {
		display: block;
		width: 2.53rem;
		height: 0.95rem;
		line-height: 0.86rem;
		text-align: center;
		margin: 0.25rem auto 0;
		font-size: 0.36rem;
		color: #9e4501;
		background: url(../../images/beginnerLottery/btn-error.png) no-repeat;
		background-size: 2.53rem 0.95rem;
	}
	.btn-error {
		display: block;
		width: 2.53rem;
		height: 0.95rem;
		line-height: 0.90rem;
		text-align: center;
		background: url(../../images/beginnerLottery/btn-error.png) no-repeat;
		background-size: 2.53rem 0.95rem;
		font-size: 0.36rem;
		color: #9e4501;
		margin: 0.28rem auto 0;
	}
	.error-content {
		width: 4.82rem;
		height: 5.23rem;
		background: url(../../images/beginnerLottery/error-bg.png) no-repeat;
		background-size: 4.82rem 5.23rem;
		position: relative;
		z-index: 2;
		.pic {
			height: 2.46rem;
			position: relative;
			img {
				width: 2.24rem;
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				margin: auto;
			}
		}
		.error-text {
			font-size: 0.32rem;
			color: #7d1d23;
			text-align: center;
			line-height: 0.4rem;
			span {
				display: block;
			}
		}
	}
	@keyframes rotate{
	    from{transform:  rotate(0);}
	    to{transform:  rotate(360deg);}
	}
</style>
