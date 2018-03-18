<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="fragment-material">
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close" @click="close">
			</a>
			<div class="f-title sp-title-bg">碎片合成</div>
			<div class="f-content">
				<div class="card-box">
					<img :src="materialData.image|imgCurrency">
				</div>
				<span class="card-info">{{materialData.awardsName}}</span>
				<div class="btn-synthesis" v-if="!materialData.highlight" @click="handleSynthesis">
					合成<span>({{materialData.fragmentNum}}/{{materialData.changeNum}})</span>
				</div>
				<div class="btn-synthesis active" @click="handleSynthesis" v-else>
					合成<span>({{materialData.fragmentNum}}/{{materialData.changeNum}})</span>
				</div>
				<p class="f-tips">合成奖品在背包页面“奖励”中领取1</p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import API from '../../api';
	import { bus } from '../../common/bus';
	export default {
		data() {
			return {}
		},
		props: {
			materialData: {
				type: Object,
				default: {}
			}
		},
		methods: {
			close() {
				this.$emit('close')
			},
			handleSynthesis() {

				this.axios.post(API.FragmentCombine, {
					fragmentId: this.materialData.fragmentId
				}).then((response) => {
					if(response.data.code == 200 && response.data.data.isSuccess) {
						this.$toast('合成成功！');
						this.$emit('close',true);
						bus.$emit('isCatchedawards', true);
					}
				})
			}
		},
		mounted() {
		}
	}
</script>
<style lang="less" scoped>
	.fragment-material {

		/*width: 5.92rem;*/
		width: 84%;
		height: 5.37rem;
		background: url(../../images/knapsack/fragment-bg.jpg) repeat-x;
		background-size: 100% 100%;
		border: 0.02rem solid #304a92;
		/*background-size: cover;*/
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		border-radius: 0.08rem;
		/*box-shadow: 0 0 0.08rem #d22650;*/
		z-index: 14;
		.pop-close {
			width: 0.68rem;
			height: 0.68rem;
			position: absolute;
			right: -0.34rem;
			top: -0.34rem;
		}
		.f-title {
			line-height: 1.28rem;
			font-size: 0.32rem;
			color: #fff;
			text-align: center;
		}
		.f-content {
			text-align: center;
		}
		.card-info {
			font-size: 0.24rem;
			color: #fffefe;
		}
		.btn-synthesis {
			width: 1.72rem;
			height: 0.68rem;
			background: #193363;
			border-radius: 0.17rem;
			margin: 0.4rem auto 0;
			font-size: 0.24rem;
			color: #fff;
			box-sizing: border-box;
			padding-top: 0.1rem;
			&.active {
				background: #2a59ae;
			}
			span {
				display: block;
				font-size: 0.2rem;
				padding-top: 0.08rem;
			}
		}
		.card-box {
			width: 1.2rem;
			height: 1.1rem;
			border-radius: 0.08rem;
			margin: 0.4rem auto 0.18rem;
			img {
				width: 90%;
			}
		}
		.f-tips {
			font-size: 0.2rem;
			color: #ccc;
			padding-top: 0.5rem;
		}
	}
</style>
