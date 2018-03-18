<template>
	<div class="pop-mask">
		<div class="pop-lottery">
			<div class="aperture">
				<img src="../../images/payTurntable/aperture.png" class="aperture-bg">
				<img src="../../images/payTurntable/top-title.png" class="top-title">
				<div class="pic-award">
					<img v-if="finalImg" :src="finalImg | imgCurrency">
				</div>
				<div class="content">
					<p class="title">{{finalAwards ? finalAwards.awardsName:''}}</p>
					<p class="text" v-if="finalAwards && !(finalAwards.awardsName.indexOf('金叶子') != -1)">奖品已发放，请到背包内查看</p>
					<p class="text" v-else>金叶子可在游戏中赢取丰富奖励哦~</p>
				</div>
				<a href="javascript:" class="close" @click="close"></a>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { bus } from '../../common/bus';
	export default {
		data() {
			return {

			}
		},
		props: {
			finalAwards: {
				default: ''
			},
			finalImg: {
				default: ''
			}
		},
		methods: {
			close() {
				this.$emit('closePopLottery');
				//倒计时开启
				bus.$emit('openCountDown', true);
			}
		}
	}
</script>
<style lang="less" scoped>
	.pop-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0,0,0,0.5);
		z-index: 17;
	}
	.pic-award {
		width: 1.84rem;
		height: 1.24rem;
		margin: 0.9rem auto 0;
		img {
			max-width: 100%;
		}
	}
	.pop-lottery {
		width: 5.24rem;
		height: 4.99rem;
		position: absolute;
		left: 50%;
		top: 42%;
		transform: translateX(-50%) translateY(-50%);

	}
	.aperture {
		width: 100%;
		height: 100%;
		
		text-align: center;
		.aperture-bg {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0.05rem;
			z-index: -1;
			animation: rotate 2s linear infinite;
		}
		.top-title {
			width: 4.51rem;
			height: 1.07rem;
		}
		.content {

		}
		.title {
			font-size: 0.48rem;
			color: #fff177;
			margin-top: 0.25rem;
		}
		.text {
			width: 4.24rem;
			height: 0.4rem;
			line-height: 0.4rem;
			background: url(../../images/payTurntable/text-bg.png) no-repeat;
			background-size: 100% 100%;
			font-size: 0.22rem;
			color: #ccc;
			margin: 0.16rem auto 0;
		}
	}
	.close {
		display: block;
		width: 0.49rem;
		height: 0.49rem;
		background: url(../../images/close.png) no-repeat;
		background-size: 100% 100%;
		margin: 0.6rem auto 0;
	}
</style>