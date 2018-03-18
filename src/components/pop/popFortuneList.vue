<template>
	<div class="nav-fortune">
		<div class="nav-fortune-top">
			<img src="../../images/grail.png">排名 
			<span v-if="historyRich && historyRich.me">{{historyRich.me}}</span>
			<span v-else>未上榜</span>
		</div>
		<div class="fortune-list">
			<div class="fortune-items c-items">
				<div class="c-items-nav">
					<ul>
						<li>排名</li>
						<li>玩家</li>
						<li>盈利数</li>
					</ul>
				</div>
				<div class="fortune-record" v-show="!showLoading">
					<div class="c-groups fortune-scroll" v-if="historyRich && historyRich.list">
						<scroll :data="historyRich && historyRich.list">
							<ul>
								<li v-for="(item,index) in historyRich.list">
									<span>{{item.index}}</span>
									<span>{{item.nickName}}</span>
									<span>{{item.amount}}</span>
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
			<div class="check-rules">榜单每小时刷新</div>
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
				historyRich: '',
				showLoading: true
			}
		},
		components: {
			scroll,
			loading
		},
		mounted() {
			GLOBALS.buryingPoint(120604);
			this.axios.post(API.HistoryRich).then((response) => {
		      this.historyRich = response.data.data ? response.data.data : [];
		      this.showLoading = false;
		    })
		}
	}
</script>
<style lang="less" scoped>
	 
	.fortune-record .no-record {
		transform: scale(0.8);
	}
	.fortune-record .no-record p{
		margin: 5% auto 0;

	}
	.nav-fortune-top span {
		margin-left: 0.05rem;
	}
</style>