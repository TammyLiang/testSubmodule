<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="fragment-coupons">
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close" @click="close">
			</a>
			<div class="f-title sp-title-bg">碎片合成</div>
			<div class="f-content">
				<div class="f-content-title">我的{{couponsData.awardsName}}：<span>{{couponsData.price}}</span></div>
				<div class="f-items">
					<ul>
						<li v-for="item in convert">
							<div class="f-item">
								<div class="f-item-box">
									<img :src="item.awardsImage|imgCurrency">
								</div>
								<a href="javascript:" class="btn-fragment" v-if="!item.composeState">合成</a>
								<a href="javascript:" class="btn-fragment active" v-else @click="handleFragment(item)">合成</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="fragment-coupons-info">合成奖品在背包页面“奖励”中领取</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import API from '../../api';
	import { bus } from '../../common/bus';
	export default {
		data() {
			return {
				convert: ''
			}
		},
		props: {
			couponsData: {
				type: Object,
				default: {}
			}
		},
		methods: {
			handleFragment(item) {
				this.axios.post(API.CombineAwards, {
					awardsId: item.awardsId,
					fragmentId: this.couponsData.fragmentId
				}).then((response) => {
			      if(response.data.data.isSuccess) {
			      	this.$toast('碎片合成成功!');
					this.$emit('close',true);
					bus.$emit('isCatchedawards', true);
			      }
			    })
			},
			close() {
				this.$emit('close', false);
			},
			getFragmentConvertList() {
				this.axios.post(API.fragmentConvertList+this.couponsData.fragmentId).then((response) => {
			      this.convert = response.data.data;
			    })
			}
		},
		mounted() {
			this.getFragmentConvertList();
		}
	}
</script>
<style lang="less" scoped>

	.fragment-coupons {
		/*width: 5.92rem;*/
		width: 84%;
		height: 5.37rem;
		/*background: url(../../images/fragment-coupons-bg.jpg) no-repeat center top;*/
		background: url(../../images/knapsack/fragment-bg.jpg) repeat-x;
		background-size: 100% 100%;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		border: 0.02rem solid #304a92;
		border-radius: 0.08rem;
		z-index: 14;
		.pop-close {
			width: 0.68rem;
			height: 0.68rem;
			position: absolute;
			right: -0.34rem;
			top: -0.34rem;
		}
		.f-content {
			.f-content-title {
				width: 3.48rem;
				height: 0.68rem;
				line-height: 0.68rem;
				text-align: center;
				background: url(../../images/knapsack/f-coupons-title.png) no-repeat;
				background-size: 3.48rem 0.68rem;
				margin: 0.4rem auto;
				font-size: 0.32rem;
				color: #fff;
				span {
					color: #fedb46;
				}
			}
			.f-items {
				ul {
					display: flex;
				}
				li {
					flex: 1;
					text-align: center;
					.btn-fragment {
						display: block;
						width: 1.06rem;
						height: 0.44rem;
						line-height: 0.44rem;
						text-align: center;
						background: #193261;
						margin: 0.27rem auto 0;
						border-radius: 0.17rem;
						font-size: 0.24rem;
						color: #fff;
						&.active {
							background: #2a59ae;
						}
					}
					.f-item-box {
						width: 1.15rem;
						margin: 0 auto;
						img {
							width: 1.15rem;
							height: 0.58rem;
							background: #ccc;
						}
					}
				}
			}
		}
		.fragment-coupons-info {
			height: 0.3rem;
			line-height: 0.3rem;
			font-size: 0.2rem;
			color: #ccc;
			text-align: center;
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 0.4rem;
		}
	}
</style>
