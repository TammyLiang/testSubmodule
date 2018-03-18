<template>
	<div class="receive-list">
			<ul v-if="receiveList">
				<li v-for="(item,index) in receiveList">
					<span>{{item.createTime}}</span>
					<span>{{item.awardsName}}</span>
					<span>
						<a href="javascript:" class="btn-default btn-receive" v-if="item.receiveStatus === 1" @click.stop="onItemAccept(item,index)">领取</a>
						<a href="javascript:" class="btn-default btn-nreceive" v-if="item.receiveStatus === 2">审核中</a>
						<a href="javascript:" class="btn-default btn-nreceive" v-if="item.receiveStatus === 3 && item.awardsType !== 4 && item.awardsType !== 9">已发放</a>
						<a href="javascript:" class="btn-default btn-receive" v-if="item.receiveStatus === 3 && (item.awardsType === 4 || item.awardsType === 9)" @click.stop="checkCode(item,index)">查询</a>
					</span>
				</li>
			</ul>
			<!-- <scroll :data="receiveList" :refreshDelay="refreshDelay" ref="receiveLists">
			</scroll> -->
			<div class="no-record" v-if="receiveList && receiveList.length == 0">
				<p></p><br>
				暂无中奖信息
			</div>
		
	</div>
</template>
<script type="text/javascript">
	import scroll from '../scroll/scroll';
	import loading from '../common/loading';
	export default {
		data() {
			return {
				refreshDelay: 120,
				showLoading: true
			}
		},
		created() {
			this.listenScroll = false;
		},
		methods: {
			
			onItemAccept(item,index) {
				console.log('888')
				this.$emit('receivePop', item, index);
			},
			checkCode(item, index) {
				this.$emit('receivePop', item, index);
			}
		},
		components: {
			scroll,
			loading
		},
		props: {
			receiveList: {
				default: ''
			}
		}
	}
</script>
<style lang="less">

	.receive-list {
		position: relative;
		z-index: 9;
		/*width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;*/
		
		-webkit-overflow-scrolling: touch; /* lets it scroll lazy */

		-webkit-overflow-scrolling: auto; /* stop scrolling immediately */
		li {
			height: 0.99rem;
			display: flex;
			align-items: center;
			font-size: 0.24rem;
			color: #fff;
			/*background: url(../../images/c-rank-line.png) no-repeat center bottom;
			background-size: 100% 0.02rem;*/
			background: url(../../images/game/c-line.png) no-repeat center bottom;
			background-size: 100% 1px;
			&:last-child {
				background: none;
			};
			span {
				flex: 1;
				text-align: center;
			}
			.btn-default {
				display: block;
				width: 1.36rem;
				height: 0.62rem;
				line-height: 0.62rem;
				text-align: center;
				font-size: 0.24rem;
				margin: 0 auto;
				&.btn-receive {
					background: url(../../images/knapsack/k-btn.png) no-repeat center center;
					background-size: 1.36rem 0.62rem;
					color: #fff;
				}
				&.btn-nreceive {
					height: 0.58rem;
					line-height: 0.58rem;
					background: #162f61;
					color: #ccc;
					border-radius: 0.12rem;
				}
			}
		}
	}
</style>
