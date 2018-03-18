<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="pop-card">
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close" @click="close">
			</a>
			<div class="bill-header">
				<h4 class="bill-title">已发放</h4>
			</div>
			<div class="jd-card-content">
				<div class="jd-group">
					<input type="text" :value="receiveData.receiveRemark"/>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			receiveData: {
				type: Object,
				default: {}
			}
		},
		methods: {
			close() {
				this.$emit('close');
			},
			submit() {
				this.$emit('close');
			}
		}
	}
</script>
<style lang="less" scoped>
	.pop-card {
		width: 84%;
		height: 5.16rem;
		background: url(../../images/knapsack/pop-bill-bg.jpg) repeat-x center top;
		background-size: 100% 6.05rem;
		border: 0.02rem solid #304a92;
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
		.jd-card-content {
			height: 0.7rem;
			text-align: center;
			.jd-group {
				margin: 0.64rem 0  0.45rem 0;
				input {
					width: 3.86rem;
					height: 0.7rem;
					border: none;
					outline: none;
					background: #1b3b6f;
					box-sizing: border-box;
					text-indent: 0.18rem;
					font-size: 0.24rem;
					color: #ccc;
					border-radius: 0.05rem;
					margin: 0 0.15rem;
					font-size: 0.28rem;
					color: #fff;
				}
			}
		}
		.bill-header {
			height: 2.14rem;
			background: url(../../images/game/list-bg.png) no-repeat center bottom;
			background-size: 5.69rem 1px;
		}
		.bill-title {
			font-size: 0.48rem;
			color: #fffefe;
			text-align: center;
			line-height: 2.0rem;
			span {
				color: #fd2383;
			}
		}
	}
</style>