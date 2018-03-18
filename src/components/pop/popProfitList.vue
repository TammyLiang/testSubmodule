<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="pop-profit c-pop-ys">
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close" @click="close">
			</a>
			<div class="pop-profit-box">
				<div class="profit-top-pic" v-if="isShowPic">
					<img src="../../images/game/ylb-text.png" class="profit-pic">
				</div>
				<div class="profit-nav">
					<ul>
						<li :class="currentIndex == 1 ? 'active':'' " @click="currentIndex = 1">我的盈利</li>
						<li :class="currentIndex == 2 ? 'active':'' " @click="currentIndex = 2">盈利榜</li>
						<li :class="currentIndex == 3 ? 'active':'' " @click="currentIndex = 3">财富榜</li>
					</ul>
				</div>
				<!-- <div class="prev-profit-nav">上期榜单</div> -->
				<!-- 我的盈利 -->
				<my-profit v-if="currentIndex == 1"></my-profit>
				<!-- 盈利榜 -->
				<profit-component v-if="currentIndex == 2" v-on:isShow="showPopPrevProfit" ></profit-component>
				<prev-profit v-if="isShowPrevProfit" v-on:isShow="showPopPrevProfit"></prev-profit>
				<!-- 财富榜 -->
				<fortune-list v-if="currentIndex == 3"></fortune-list>
			</div>

		</div>
	</div>
</template>
<script type="text/javascript">
	import myProfit from './popMyProfit';
	import profitComponent from './popProfitComponent';
	import fortuneList from './popFortuneList';
	import prevProfit from './popPrevProfitComponent';
	import { bus } from '../../common/bus';
	export default {
		data() {
			return {
				currentIndex: 1,
				isShowPrevProfit: false,
				isTest: false,
				isShowPic: true
			}
		},
		props: {
			currentnum: {
				default: 1
			}
		},
		methods: {
			showPopPrevProfit(parmas) {
				this.isShowPrevProfit = parmas;
			},
			handleText() {
				this.isTest = !this.isTest;
				console.log(this.isTest)
			},
			close() {
				this.$emit('close', false);
			}
		},
		mounted() {
			this.currentIndex = this.currentnum;
			var that = this;
			bus.$on('isShowProfitTitlePic',function(status) {
		        if(status) {
		        	that.isShowPic = false;
		        }else {
		        	that.isShowPic = true;
		        }
		    })
		},
		components: {
			myProfit,
			profitComponent,
			fortuneList,
			prevProfit
		},
	}
</script>
<style lang="less">
	.prev-profit-nav {
		font-size: 0.32rem;
		color: #fff;
		text-align: center;
		height: 1.41rem;
		line-height: 1.81rem;
	}
	.profit-component {
		/*width: 5.68rem;*/
		width: 96%;
		height: 4.51rem;
		margin: 0 auto;
		/*border: 0.02rem solid #440839;*/
		background: url(../../images/game/my-profit-list.jpg) repeat-x center 0.64rem;
		background-size: 100%  3.85rem;
		border-radius: 0.12rem;
		.check-rules {
			bottom: 0.15rem;
		}
	}
	.fortune-list {
		height: 4.88rem;
		/*width: 5.68rem;*/
		width: 96%;
		background: url(../../images/game/prev-profit-list.jpg) repeat-x center 0.64rem;
		background-size: 100% 4.24rem;
		margin: 0 auto;
		border-radius: 0.05rem;
		position: relative;
		.check-rules {
			height: 0.69rem;
			line-height: 0.69rem;
		}
	}
	.profit-scroll {
		width: 100%;
		height: 3.15rem;
		position: absolute;
		/*top: 3.75rem;*/
		top: 0.66rem;
		bottom: 0.74rem;
		overflow: hidden;
	}
	.nav-profit-rank {
		.n-profit-tx {
			height: 1.24rem;
			display: flex;
		}
		.tx-pic {
			flex: 0 0 1.3rem;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			img {
				width: 0.85rem;
				height: 0.85rem;
				border-radius: 50%;
				border: 0.02rem solid #ffb147;
				float: right;
			}
		}

		.tx-brief {
			flex: 1;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-left: 0.25rem;

			li {
				font-size: 0.24rem;
				color: #fff;
				margin: 0.06rem 0;
				em {
					color: #fedb46;
					margin-left: 0.15rem;
					font-style: italic;
				}
				&.tx-brief-info {
					font-size: 0.18rem;
					color: #73a8ff;
					margin-top: 0.08rem;
				}
			}
		}
	}
	.fortune-scroll {
		width: 100%;
		height: 3.54rem;
		position: absolute;
		/*top: 3.4rem;*/
		top: 0.65rem;
		bottom: 0.74rem;
		overflow: hidden;
	}
	.nav-fortune {
		
		.nav-fortune-top {
			width: 2.82rem;
			height: 0.58rem;
			line-height: 0.58rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #244d8d;
			border-radius: 0.25rem;
			text-align: center;
			margin: 0.14rem auto 0.15rem;
			font-size: 0.24rem;
			color: #faeb4b;
			img {
				width: 0.37rem;
				height: 0.43rem;
				margin-right: 0.12rem;
			}
		}
	}
	.c-items {
		position: relative;
		.c-items-nav {
			
			ul {
				height: 0.64rem;
				line-height: 0.64rem;
				display: flex;
				align-items: center;
				background: #1b488a;
				border-radius: 0.06rem  0.06rem 0 0;
			}
			li {
				flex: 1;
				text-align: center;
				font-size: 0.24rem;
				color: #478dff;
				&:nth-child(1) {
					flex: 0 0 20%;
				};
				&:nth-child(4) {
					flex: 0 0 30%;
				};
			}
		}
		.c-groups {
			li {
				height: 0.71rem;
				display: flex;
				align-items: center;
				background: url(../../images/game/list-bg.png) no-repeat center bottom;
				background-size: 100% 1px;

				&:hover {
					background:url(../../images/bigImage/hover-bg.png) no-repeat;
					background-size: 100% 100%;
				};
				&:last-child {
					background-image: none;
				};

				&:first-child span:first-child,&:nth-child(2) span:first-child,&:nth-child(3) span:first-child{
					color: rgba(0,0,0,0);
					display: block;
					height: 100%;
					

				};
				&:first-child span:first-child {
					background: url(../../images/medal-gold.png) no-repeat center center;
					background-size: 0.4rem 0.66rem;
				}
				&:nth-child(2) span:first-child {
					background: url(../../images/medal-sliver.png) no-repeat center center;
					background-size: 0.4rem 0.66rem;
				}
				&:nth-child(3) span:first-child {
					background: url(../../images/medal-copper.png) no-repeat center center;
					background-size: 0.4rem 0.66rem;
				}
			}
			span {
				flex: 1;
				text-align: center;
				font-size: 0.24rem;
				color: #fff;
				&:nth-child(1) {
					flex: 0 0 20%;
				};
				&:nth-child(4) {
					flex: 0 0 30%;
				};
			}
		}
	}
	.m-award-tips {
		width: 1.25rem;
		height: 0.76rem;
		line-height: 0.22rem;
		background:url(../../images/game/award-tips.png) no-repeat;
		background-size: 1.25rem 0.76rem;
		font-size: 0.18rem;
		color: #fff;
		position: absolute;
		box-sizing: border-box;
		padding: 0.15rem 0.08rem;
		box-sizing: border-box;
		img {
			width: 0.21rem;
			height: 0.17rem;
		}
	}
	.pop-profit {
		/*width: 5.9rem;*/
		width: 84%;
		height: 7.7rem;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		/*background: url(../../images/profit-bg.jpg) repeat-x;*/
		background: url(../../images/game/profit-bg.jpg) repeat-x;
		background-size: 100% 100%;
		animation: showAnimate .5s;
		z-index: 11;

		.profit-nav {
			height: 1.81rem;
			padding-top: 1.02rem;
			box-sizing: border-box;
			//background: url(../../images/bigImage/profit-title-line.png) no-repeat center bottom;
			background-size: 100% 1px;
			ul {
				height: 0.57rem;
				display: flex;
				justify-content: center;
				padding: 0 0.2rem;
			}
			li {
				flex: 1;
				font-size: 0.32rem;
				color: #fff;
				text-align: center;
				position: relative;
				height: 0.57rem;
				cursor: pointer;
				&.active {
					color: #faeb4a;
				}
				&.active:after {
					content: '';
					width:1.0rem;
					height: 0.06rem;
					background: #faeb4a;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: 0;
					border-radius: 0.03rem;
				};
			}
		}
		.my-profit {
			.check-rules {
				bottom: -0.03rem;
				border-radius: 0 0 0.08rem 0.08rem;
			}
			.my-intro {
				display: flex;
				align-items: center;
				height: 1.3rem;
				padding: 0 0.3rem;
				.eraser {
					width: 0.44rem;
					height: 0.44rem;
				}
				.ic_leaf {
					width: 0.3rem;
					height: 0.3rem;
				}
				li {
					height: 0.44rem;
					display: flex;
					align-items: center;
				}
				.m-leaf-num {
					margin: 0 0.22rem 0 0.18rem;
					color: #faeb4b;
					display: flex;
					align-items: center;
					img {
						margin-left: 0.05rem;
					}
				}
			}
			.my-award {
				/*width: 5.52rem;*/
				width: 94%;
				height: 3.85rem;
				background: url(../../images/game/my-profit-rank.jpg) repeat-x;
				background-size: 100% 3.84rem;
				border-radius: 0.05rem;
				margin: 0 auto;
				position: relative;
			}
			.first-award {
				float: left;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%) translateY(-50%);
				.my-award-info {
					display: block;
					width: 1.84rem;
					height: 0.5rem;
					line-height: 0.5rem;
					text-align: center;
					background: #12284f;
					font-size: 0.28rem;
					color: #f6d546;
					border-radius: 0.22rem;
					position: relative;
					left: -0.1rem;

				}
				.my-award-tips {
					font-size: 0.24rem;
					color: #bf0a59;
					padding-top: 0.3rem;
				}

				.my-award-item {
					width: 1.6rem;
					height: 1.6rem;
					border-radius: 50%;
					background: #12284f;
					position: relative;
					text-align: center;
					.pic-box {
						height: 1.1rem;
						position: relative;
					}
					.my-award-text{
						font-size: 0.26rem;
						color: #fff;
					}
					img {
						display: block;
						width: 60%;
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						margin: auto;
					}
				}
			}
			.second-award {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%) translateY(-50%);
				width: 4.54rem;
				height: 3.37rem;
				background: url(../../images/game/second-award-bg.png) no-repeat center 0.42rem;
				background-size: 2.38rem 1.85rem;
				margin: 0 auto;
				.current-award {
					position: absolute;
					left: -0.12rem;
					top: 0;
				}
				.final-award {
					position: absolute;
					right: 0;
					bottom: 0;
				}
				.m-award-tips {
					position: absolute;
					right: 1.57rem;
					top: 0;
				}
			}
			.third-award {
				width: 3.66rem;
				height: 2.45rem;
				background: url(../../images/n-award-bg.png) no-repeat;
				background-size: 3.66rem 2.45rem;
				position: absolute;
				left: 50%;
				top: 49%;
				transform: translateX(-50%) translateY(-50%);
				.m-award-tips {
					right: 0.12rem;
					top: -0.6rem;
				}
				.m-award-group {
					&:nth-child(1) {
						position: absolute;
						left: -0.45rem;
						top: -0.5rem;
					};
					&:nth-child(2) {
						position: absolute;
						right: -0.8rem;
						top: 0.6rem;
					};
					&:nth-child(3) {
						position: absolute;
						left: -1rem;
						bottom: -0.7rem;

					};
				}
			}
			.m-award-group {
				width: 2.0rem;
				float: left;
				position: relative;
				text-align: center;
				.m-award-box {
					width: 1.24rem;
					height: 1.24rem;
					background: #12284f;
					border-radius: 50%;
					position: relative;
					text-align: center;
					margin: 0 auto;
					.m-award-text {
						font-size: 0.24rem;
					}
					.pic-box {
						height: 0.84rem;
						position: relative;
						img {
							max-width: 70%;
							max-height: 70%;
							position: absolute;
							left: 0;
							top: 0;
							right: 0;
							bottom: 0;
							margin: auto;
						}
					}
				}
				.my-award-info {
					font-size: 0.24rem;
					color: #f6d546;
					padding: 0.05rem 0.08rem;
					height: 0.4rem;
					line-height: 0.4rem;
					text-align: center;
					background: #12284f;
					border-radius: 0.15rem;
					position: relative;
					top: -0.08rem;
					margin: 0 auto;
				}
			}

		}
	}
	.check-rules {
		width: 100%;
		font-size: 0.24rem;
		color: #a9a5ab;
		height: 0.74rem;
		line-height: 0.74rem;
		text-align: center;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.profit-top-pic {
		width: 5.24rem;
		height: 1.92rem;
		background: url(../../images/bigImage/profit-title-bg.png) no-repeat center top;
		background-size: 5.24rem 1.92rem;
		position: absolute;
		left: 50%;
		top: -1.1rem;
		z-index: 13;
		transform: translateX(-50%);
		.profit-pic {
			width: 1.57rem;
			height: 0.62rem;
			position: absolute;
			left: 50%;
			top: 0.92rem;
			transform: translateX(-50%);
		}
	}
	@keyframes showAnimate {
		from{opacity: 0}
		to{opacity: 1}
	}
</style>
