<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="fragment-record">
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close" @click="close">
			</a>
			<div class="f-title sp-title-bg">碎片记录</div>
			<div class="f-nav">
				<ul>
					<li :class="currentIndex ===1 ? 'active':'' " @click="handleTabNav(1)">领取记录</li>
					<li :class="currentIndex ===2 ? 'active':'' " @click="handleTabNav(2)">合成记录</li>
				</ul>
			</div>
			<div class="f-items-title">
				<ul v-if="currentIndex === 1">
					<li>获取时间</li>
					<li>碎片</li>
					<li>来源</li>
				</ul>
				<ul v-else>
					<li>获取时间</li>
					<li>奖品</li>
					<li>来源</li>
				</ul>
			</div>
			<div class="fragment-pic" v-show="!showLoading">
				<div class="f-items" v-if="fragmentRecord && fragmentRecord.length">
					<scroll :data="fragmentRecord">
						<ul>
							<li v-for="item in fragmentRecord">
								<span>{{item.createTime}}</span>
								<span>{{item.name}}</span>
								<span>{{item.source}}</span>
							</li>
						</ul>
					</scroll>
				</div>
				<div class="no-record" v-else>
	                <p></p><br>
	                暂无记录
	            </div>
			</div>
			<div class="fragment-record-loader">
				<loading :smaller="true" v-show="showLoading"></loading>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import API from '../../api';
	import scroll from '../scroll/scroll';
	import loading from '../common/loading';
	export default {
		data() {
			return {
				currentIndex: 1,
				fragmentRecord: '',
				showLoading: true
			}
		},
		components: {
			scroll,
			loading
		},
		methods: {
			close() {
				this.$emit('close', false)
			},
			getFindUserFragmentRecord() {
				this.axios.post(API.FindUserFragmentRecord, {
					page: 1,
					pageSize: 100
				}).then((response) => {
			      this.fragmentRecord = response.data.data;
			      this.showLoading = false;
			    })
			},
			getFindUserComposeRecord() {
				this.axios.post(API.FindUserComposeRecord, {
					page: 1,
					pageSize: 100
				}).then((response) => {
			      this.fragmentRecord = response.data.data;
			      this.showLoading = false;
			    })
			},
			handleTabNav(index) {
				this.showLoading = true;
				this.currentIndex = index;
				if(index === 1) {
					this.getFindUserFragmentRecord();
				}else if(index === 2) {
					this.getFindUserComposeRecord();
				}
			}
		},
		mounted() {
			this.getFindUserFragmentRecord();
		}
	}
</script>
<style lang="less" scoped>
	.fragment-pic .no-record p{
		margin: 15% auto 0;
	}
	.fragment-record {
		/*width: 5.92rem;*/
		width: 90%;
		height: 7.7rem;
		/*background: url(../../images/fragmentation-record-bg.jpg) no-repeat center top;*/
		background: url(../../images/game/common-pop-bg.jpg) repeat-x;
		background-size: 100% 7.7rem;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		border-radius: 0.08rem;
		border: 0.02rem solid #304a92;
		animation: showAnimate .5s;
		z-index: 12;
		.f-items {
			width: 100%;
			position: absolute;
			top: 2.9rem;
			bottom: 0.02rem;
			overflow: hidden;
			li {
				height: 0.99rem;
				display: flex;
				align-items: center;
				background: url(../../images/game/list-bg.png) no-repeat center top;
				background-size: 100% 1px;
				span {
					flex: 1;
					text-align: center;
					color: #ccc;
				}
			}

		}
		.f-items-title {
			ul {
				height: 0.7rem;
				display: flex;
				align-items: center;
			}
			li {
				flex: 1;
				text-align: center;
				font-size: 0.24rem;
				color: #f4cf54;
			}
		}
		.f-nav {
			height: 0.54rem;
			font-size: 0;
			text-align: center;
			padding-top: 0.3rem;
			padding-bottom: 0.08rem;
			li {
				width: 1.56rem;
				height: 0.54rem;
				line-height: 0.54rem;
				display: inline-block;
				background: #0d2854;
				text-align: center;
				font-size: 0.24rem;
				border-radius: 0.24rem;
				margin: 0 0.27rem;
				&.active {
					background: #3263d8;
				}
			}
		}
		.pop-close {
			width: 0.68rem;
			height: 0.68rem;
			position: absolute;
			right: -0.34rem;
			top: -0.34rem;
		}
		
	}
	@keyframes showAnimate {
		from{opacity: 0}
		to{opacity: 1}
	}
</style>
