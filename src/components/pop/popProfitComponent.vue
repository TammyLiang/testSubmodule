<template>
	<div class="nav-profit-rank">
		<div class="n-profit-tx">
			<div class="tx-pic">
				<img :src="photoPic|imgCurrency" v-if="photoPic">
				<img v-else src="../../images/img_photo.png">
			</div>
			<div class="tx-brief">
				<ul>
					<li>
						<span>我的排名</span>
						<em v-if="profitNew && profitNew.me && profitNew.me.index">{{profitNew.me.index}}</em>
						<em v-else>未上榜</em>
					</li>
					<li>
						<span>我的奖励</span>
						<em v-if="profitNew && profitNew.me && profitNew.me.awardsName">{{profitNew.me.awardsName}}</em>
						<em v-else>还需努力</em>
					</li>
					<li class="tx-brief-info">提示：实物奖励结算后前往平台背包领取</li>
				</ul>

			</div>
		</div>
		<div class="profit-component">
			<div class="fortune-items c-items">
				<div class="c-items-nav">
					<ul>
						<li>排名</li>
						<li>玩家</li>
						<li>盈利数</li>
						<li>奖励</li>
					</ul>
				</div>
				<div class="no-record-pic"  v-show="!showLoading">
					<div class="c-groups profit-scroll" v-if="profitNew && profitNew.list && profitNew.list.length">
						<scroll :data="profitNew && profitNew.list" >
							<ul>
								<li v-for="(item,index) in profitNew.list">
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
	            	<loading :smaller="true" ></loading>
	            </div>

			</div>
			<div class="check-rules" @click="checkPrevRank">榜单每天13点、21点刷新，查看上期榜单 ></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import scroll from '../scroll/scroll';
	import loading from '../common/loading';
	import API from '../../api';
	export default {
		data() {
			return {
				profitNew: '',
				rich: '',
				showLoading: true,
				photoPic: ''
			}
		},
		methods: {
			checkPrevRank() {
				this.$emit('isShow',true)
			},
			getProfitNew() {
				this.axios.post(API.ProfitNew).then((response) => {
			      this.profitNew = response.data.data ? response.data.data: [];
			      this.showLoading = false;
			    })
			}
		},
		components: {
			scroll,
			loading
		},

		mounted() {
			GLOBALS.buryingPoint(120602);
			this.getProfitNew();
			this.photoPic = GLOBALS.txPic;
		}
	}
</script>
<style lang="less" scoped>
	.no-record-pic .no-record {
		transform: scale(0.8);
	}
	.no-record-pic .no-record p{
		margin: 1% auto 0;
	}
	.profit-load{
		position: relative;
		top: 1.8rem;
	}

</style>
