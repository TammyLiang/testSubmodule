<template>
	<div id="prev-profit">
		<div class="nav-profit-rank">
			<div class="prev-profit-title">上期榜单</div>
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close" @click="close">
			</a>
			<div class="n-profit-tx prev-tx">
				<div class="tx-pic">
					<img :src="photoPic|imgCurrency" v-if="photoPic">
					<img v-else src="../../images/img_photo.png">
				</div>
				<div class="tx-brief">
					<ul>
						<li>
							<span>我的排名</span>
							<em v-if="handselNew && handselNew.me.index">{{handselNew.me.index}}</em>
							<em v-else>未上榜</em>
						</li>
						<li>
							<span>我的奖励</span>
							<em v-if="handselNew && handselNew.me.awardsName">{{handselNew.me.awardsName}}</em>
							<em v-else>还需努力</em>
						</li>
						<li class="tx-brief-info">提示：实物奖励结算后前往平台背包领取</li>
					</ul>

				</div>
			</div>
			<div class="c-border prev-profit-border">
				<div class="fortune-items c-items">
					<div class="c-items-nav prev-items-nav">
						<ul>
							<li>排名</li>
							<li>玩家</li>
							<li>上期盈利</li>
							<li>奖励</li>
						</ul>
					</div>
					<div class="prev-profit-record" v-show="!showLoading">
						<div class="c-groups" id="c-prev-groups" v-if="handselNew && handselNew.list && handselNew.list.length">
							<scroll :data="handselNew && handselNew.list">
								<ul>
									<li v-for="(item,index) in handselNew.list">
										<span>{{index+1}}</span>
										<span>{{item.nickName}}</span>
										<span>{{item.amount}}</span>
										<span>{{item.awardsName}}</span>
									</li>
								</ul>
							</scroll>

						</div>
						<div class="no-record" v-else>
			                <p></p><br>
			                暂无数据
			            </div>
					</div>
					<div id="profit-loader" v-show="showLoading">
						<loading :smaller="true"></loading>
					</div>
				</div>
				<div class="check-rules">榜单每天13点、21点刷新</div>
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
				handselNew: '',
				showLoading: true,
				photoPic: ''
			}

		},
		methods: {
			close() {
				this.$emit('isShow', false)
			},
			getProfitNew() {
				this.axios.post(API.HandselNew, {}).then((response) => {
			      this.handselNew = response.data.data;
			      this.showLoading = false;
			    })
			}
		},
		components: {
			scroll,
			loading
		},
		mounted() {
			GLOBALS.buryingPoint(120603);
			this.getProfitNew();
			this.photoPic = GLOBALS.txPic;
		}
	}
</script>
<style lang="less" scoped>

	.prev-profit-record .no-record {
		transform: scale(0.8);
	}
	.prev-profit-record .no-record p{
		margin: 5% auto 0;

	}
	#prev-profit {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 12;
		/*background: url(../../images/profit-bg.jpg) repeat-x;*/
		background:url(../../images/game/prev-profit-bg.jpg) repeat-x;
		background-size: 100% 100%;
	}
	.nav-profit-rank {
		.pop-close {
			z-index: 6;
		}
		.check-rules {
			height: 0.7rem;
			line-height: 0.7rem;
		}
	}

	.c-border {
		height: 4.5rem;
	}
	.prev-profit-border {
		/*width: 5.68rem;*/
		width: 95%;
		margin: 0 auto;
		/*border: 0.02rem solid #440839;*/
		border-radius: 0.05rem;
		height: 4.87rem;
		position: relative;
		background: url(../../images/game/prev-profit-list.jpg) repeat-x center 0.64rem;
		background-size: 100%  4.24rem;
		/*top: 0.83rem;*/
	}

	#c-prev-groups {
		width: 100%;
		height: 3.53rem;
		position: absolute;
		top: 0.67rem;
		bottom: 0.74rem;
		overflow: hidden;
	}
	.prev-items-nav {
		width: 100%;
	}
	.prev-tx {
		width: 100%;
	}
	.prev-profit-title {
		height: 1.4rem;
		line-height: 1.8rem;
		width: 100%;
		text-align: center;
		font-size: 0.32rem;
		color: #fff;
		background: url(../../images/game/list-bg.png) no-repeat center bottom;
	}
</style>
