<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="pop-running c-pop-ys">
			<img src="../../images/pop-running-head.png" class="pop-running-head">
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close" @click="close">
			</a>
			<div class="running-box">
				<div class="running-nav">
					<ul>
						<li :class="currentIndexName === 'dart' ? 'active':'' " @click="handleCurrentIndexName('dart')"><span><i>梦想飞镖</i></span></li>
						<li :class="currentIndexName === 'billiards' ? 'active':'' " @click="handleCurrentIndexName('billiards')"><span><i>梦想桌球</i></span></li>
						<li :class="currentIndexName === 'moto' ? 'active':'' " @click="handleCurrentIndexName('moto')"><span><i>热血摩托</i></span></li>
					</ul>
				</div>
				<div class="running-subnav">
					<ul>
						<li class="active">
							<img src="../../images/icon-head.png" class="icon-head"><span v-if="bettingRank && bettingRank.nowAmount">{{bettingRank.nowAmount}}</span><span>0</span>
						</li>
						<li>
							<img src="../../images/icon-rank-dark.png" class="icon-rank-dark"><span v-if="bettingRank && bettingRank.nowRank">{{bettingRank.nowRank}}</span><span v-else>未上榜</span>
						</li>
						<li>
							<img src="../../images/icon-rmb.png" class="icon-rmb">0元彩金卡
						</li>
					</ul>
				</div>
				<div class="running-article">
					<div class="running-article-nav">
						<ul>
							<li>排名</li>
							<li>玩家</li>
							<li>支持金叶</li>
							<li>可获奖励</li>
						</ul>
					</div>
					<div class="running-pd"  v-show="!showLoading">
						<div class="running-article-items" v-if="bettingRank">
							<scroll>
								<ul v-if="bettingRank.rankList.length">
									<li v-for="(item,index) in bettingRank.rankList">
										<span>{{item.rank}}</span>
										<span>{{item.nickName}}</span>
										<span>{{item.amount}}</span>
										<span>{{item.awardName}}</span>
									</li>
								</ul>

							</scroll>
						</div>
						<div class="no-record" v-else>
			                <p></p><br>
			                暂无记录
			            </div>
		            </div>
					<loading :smaller="true" v-show="showLoading"></loading>
					<div class="list-introduction">榜单每天21点刷新，金叶子发榜后自动发放..</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import scroll from '../scroll/scroll';
	import API from '../../api';
	import loading from '../common/loading';
	export default {
		data() {
			return {
				currentIndexName: 'dart',
				bettingRank: '',
				showLoading: true
			}
		},
		methods: {
			close() {
				this.$emit('close', false);
			},
			getBettingRank(gameType) {
				this.axios.post(API.BettingRank, {
					page: 1,
					pageSize: 100,
					value: gameType
				}).then((response) => {
					if(response.data.code = 200) {
						this.bettingRank = response.data.data;
					}else {
						this.bettingRank = {};
					}
			      	this.showLoading = false;
			    })
			},
			handleCurrentIndexName(gameName) {
				this.showLoading = true;
				this.currentIndexName = gameName;
				switch(gameName) {
					case 'dart':
						this.getBettingRank(1);
						break;
					case 'billiards':
						this.getBettingRank(2);
						break;
					case 'moto':
						this.getBettingRank(8);
						break;
				}
			}
		},
		mounted() {
			//飞镖1 桌球2 摩托8
			this.getBettingRank(1);
		},
		components: {
			scroll,
			loading
		},
	}
</script>
<style lang="less" scoped>
	.running-pd .no-record p{
		    margin: 13% auto 0;
	}
	.pop-window {
		position: relative;
		.pop-mask {
			width: 100%;
			height: 100%;
			background: #000;
			opacity: 0.5;
			filter:alpha(opacity=50);
			position: fixed;
			left: 0;
			top: 0;
			z-index: 10;
		}
		.pop-close {
			width: 0.68rem;
			height: 0.68rem;
			position: absolute;
			right: -0.34rem;
			top: -0.34rem;
		}
		.pop-running-head {
			width: 5.24rem;
			height: 1.92rem;
			position: absolute;
			left: 50%;
			top: -1.1rem;
			transform: translateX(-50%);
		}
		.pop-running {
			width: 5.92rem;
			height: 7.7rem;
			background: url(../../images/pop-running-bg.jpg) repeat-x;
			background-size: 5.92rem 7.7rem;
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);
			z-index: 11;
			animation: showAnimate .5s;
		}
		.running-box {
			padding-top: 0.79rem;
		}
		.running-article-nav {
			background: #3d0433;
			ul {
				height: 0.64rem;
				background: #3d0433;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			li {
				flex: 1;
				text-align: center;
				font-size: 0.24rem;
				color: #c04bb6;
				&:nth-child(1) {
					flex: 0 0 20%;
				};
				&:nth-child(4) {
					flex: 0 0 30%;
				};
			}
		}
		.running-article-items {
			width: 100%;
			position: absolute;
			top: 0.64rem;
			bottom: 0.69rem;
			overflow: hidden;
			background: #2e0124;
			li {
				height: 0.85rem;
				line-height: 0.85rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 0.24rem;
				color: #fff;
				background: url(../../images/running-article-bg.png) no-repeat center bottom;
				background-size: 100% 0.02rem;
				&:hover {
					background:#40103b;
				};
				&:nth-child(1) span:nth-child(1),
				&:nth-child(2) span:nth-child(1),
				&:nth-child(3) span:nth-child(1){
					display: block;
					width: 0.4rem;
					height: 0.66rem;
					margin: 0 auto;
					font-size: 0;
				};
				&:nth-child(1) span:nth-child(1) {
					background: url(../../images/medal-gold.png) no-repeat center center;
					background-size: 0.4rem 0.66rem;
				}
				&:nth-child(2) span:nth-child(1) {
					background: url(../../images/medal-sliver.png) no-repeat center center;
					background-size: 0.4rem 0.66rem;
				}
				&:nth-child(3) span:nth-child(1) {
					background: url(../../images/medal-copper.png) no-repeat center center;
					background-size: 0.4rem 0.66rem;
				}
				span {
					flex: 1;
					text-align: center;
					&:nth-child(1) {
						flex: 0 0 20%;
					};
					&:nth-child(4) {
						flex: 0 0 30%;
					};
				}
			}
		}
		.running-article {
			width: 5.67rem;
			height: 5.53rem;
			background: #2e0124;
			margin: 0.1rem auto;
			border: 0.01rem solid #3d0433;
			border-radius: 0.05rem;
			position: relative;
		}
		.running-nav {
			overflow: hidden;
			ul {
				margin-left: -0.1rem;
			}
			li {
				width: 1.5rem;
				height: 0.62rem;
				line-height: 0.62rem;
				float: left;

				font-size: 0.24rem;
				color: rgba(255,255,255,0.7);
				transform:skew(20deg);
				text-align: center;
				box-shadow: 0 0 0.08rem #222;
				cursor: pointer;
				position: relative;
				text-align: center;
				&.active span{
					height: 0.62rem;
					line-height: 0.62rem;
					background: #7d0850;
					font-size: 0.28rem;
					color: #fff;
				};
				span {
					display: block;
					width: 100%;
					height: 0.51rem;
					line-height: 0.51rem;
					background: #4b0749;
					position: absolute;
					right: 0;
					bottom: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					i {
						display: block;
						font-style: normal;
						transform:skew(-20deg);
					}
				}
			}
		}
		.running-subnav {
			height: 0.54rem;
			background: url(../../images/running-subnav-bg.jpg) repeat-x;
			background-size:100% 0.54rem;
			ul {
				height: 0.54rem;
				display: flex;
				align-items: center;
			}
			li {
				flex: 0 0 33.33%;
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				font-size: 0.24rem;
				color: #fedb46;
				img {
					margin: 0 0.1rem;
				}
				.icon-head {
					width: 0.27rem;
					height: 0.28rem;
				}
				.icon-rank-dark {
					width: 0.3rem;
					height: 0.26rem;
				}
				.icon-rmb {
					width: 0.28rem;
					height: 0.28rem;
				}
			}
		}
		.list-introduction {
			width: 100%;
			height: 0.68rem;
			line-height: 0.68rem;
			text-align: center;
			position: absolute;
			bottom: 0;
			left: 0;
			background: #320a2a;
		}
	}
	@keyframes showAnimate {
		from{opacity: 0}
		to{opacity: 1}
	}
</style>
