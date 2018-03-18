<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="pop-eraser">
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close" @click="close">
			</a>
			<div class="e-title">是否擦除当日亏损</div>
			<div class="pop-eraser-content">
				<img src="../../images/game/brush.png" class="brush">
				<div class="pop-eraser-info">
					<p>橡皮擦是你打榜成功的小帮手，可一键清除负盈利，助你卷土重来。</p>
					<p>橡皮擦每天限用三次，每天提供一次免费擦除机会，之后需消耗一定的金叶子开启此功能</p>
				</div>
				<div class="btn-eraser" @click="eraseNegativeNumber">
					<p>擦除 ({{configEraser.times-configEraser.me}}/{{configEraser.times}})</p>
					<span>
						<img src="../../images/grayish-yellow-leaf.png" class="grayish-yellow-leaf">
						<i v-if="currentUseTimes == 0">免费</i>
						<i v-else>{{currentUseTimes}}</i>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import API from '../../api';
	import { bus } from '../../common/bus';
	export default {
		data() {
			return {
				configEraser: '',
				isEraserPic: true,
				currentUseTimes: '',
			}
		},
		methods: {
			close() {
				this.$emit('close', false);
			},
			eraseNegativeNumber() {
				this.axios.post(API.Elear, {
					isShowTotast: 'false'
				}).then((response) => {

					if(response.data.code === 200) {
						this.$toast('擦除成功');
						//擦除成功后首页需要刷新金叶子数，以及盈利榜中的我的盈利也需要重置
						bus.$emit('isAlsoGetUserTansInfo', true);
					}else {
						this.$toast({
							message: response.data.message,
							duration: 1500
						});
					}
					this.$emit('close', false);
				})
			}
		},
		mounted() {
			GLOBALS.buryingPoint(120601);
			this.axios.post(API.EraserConfig).then((response) => {
		      	this.configEraser = response.data.data;
				if(this.configEraser.me == this.configEraser.times) {
					this.isEraserPic = false;
				}else {
					this.isEraserPic = true;
					this.currentUseTimes = this.configEraser.config[this.configEraser.me].label;
				}
		    })
		}
	}
</script>
<style lang="less" scoped>
	.pop-eraser {
		/*width: 5.92rem;*/
		width: 100%;
		height: 7.7rem;
		/*background: url(../../images/fragmentation-record-bg.jpg) no-repeat center top;*/
		background: url(../../images/game/common-pop-bg.jpg) repeat-x;
		background-size: 100% 7.7rem;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		border-radius: 0.08rem;
		z-index: 14;
		.pop-close {
			width: 0.68rem;
			height: 0.68rem;
			position: absolute;
			right: -0.34rem;
			top: -0.34rem;
		}
		.e-title {
			height: 1.29rem;
			line-height: 1.29rem;
			font-size: 0.32rem;
			color: #fff;
			text-align: center;
			background: url(../../images/game/list-bg.png) no-repeat center bottom;
			background-size: 100% 0.02rem;
		}
		.pop-eraser-content {
			.brush {
				display: block;
				width: 3.1rem;
				height: 3.1rem;
				margin: 0.4rem auto 0.34rem;
			}
		}
		.pop-eraser-info {
			font-size: 0.2rem;
			color: #aaa4ab;
			padding: 0 0.45rem;
			p {
				line-height: 0.3rem;
			}
		}
		.btn-eraser {
			width: 2.58rem;
			height: 0.88rem;
			background: url(../../images/game/lq-btn.png) no-repeat center top;
			background-size: 2.25rem 0.88rem;
			margin: 0.25rem auto;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			padding: 0.08rem 0;
			cursor: pointer;
			i {
				font-style: normal;
			}
			p {
				flex: 0 0 100%;
				text-align: center;
				font-size: 0.28rem;
				color: #fff;
			}
			span {
				display: block;
				display: flex;
				align-items: center;
				font-size: 0.22rem;
				color: #faeb4b;
			}
			.grayish-yellow-leaf {
				width: 0.28rem;
				height: 0.22rem;
				margin-right: 0.05rem;
			}
		}
	}
</style>
