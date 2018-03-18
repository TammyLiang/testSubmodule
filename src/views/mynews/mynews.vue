<template>
	<transition name="slide">
		<div class="my-news">
			<headers text="我的消息"  linkHref="#/Personal"></headers>
			<div class="news-nav">
				<ul>
					<li @click="handleTab(1)" :class="currentIndex == 1 ? 'active':'' "><span class="news-name">消息<em v-if="getPushedMessages && getPushedMessages.length">{{getPushedMessages.length}}</em></span></li>
					<li @click="handleTab(2)" :class="currentIndex == 2 ? 'active':'' "><span class="news-name">中奖信息<em v-if="zjNumber">{{zjNumber}}</em></span></li>
				</ul>
			</div>
			<div class="my-news-items" >
				<div v-show="!showLoading">
					<div class="scroll-box" v-if="currentIndex === 1">
						<div v-if="getPushedMessages && getPushedMessages.length">
							<scroll :data="getPushedMessages">
								<ul>
									<li v-for="item in getPushedMessages">
										<div class="item-text">
									<em v-if="!getPushedMessages.messageStatus"></em>{{getPushedMessages.content}}></div>
									</li>
								</ul>
							</scroll>
						</div>
						<div v-else>
							<div class="no-record">
				                <p></p><br>
				                暂无消息
				            </div>
						</div>
					</div>
					<!-- 中奖信息 -->
					<div v-if="currentIndex === 2">
						<receive-common  :showLoading="showLoading" :receiveDatas="receiveDatas"></receive-common>
					</div>
				</div>
				<loading :smaller="true" v-show="showLoading"></loading>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	// import {scroll,headers,receiveCommon,loading} from '../../components';

	import scroll from 'components/scroll/scroll';
	import headers from 'components/header/header';
	import receiveCommon from 'components/receive/popReceiveCommon';
	import loading from 'components/common/loading';

	import API from '../../api';
	export default {
		data() {
			return {
				getPushedMessages: '',
				currentIndex: 1,
				showLoading: true,
				zjNumber: '',
				receiveDatas: '',
				showLoading: true
			}
		},
		components: {
			scroll,
			headers,
			receiveCommon,
			loading
		},
		methods: {
			handleTab(index) {
				this.currentIndex = index;
			},
			awardNumber(parmas) {
				this.zjNumber = parmas;
			},
			getCatchedawards() {
				this.axios.post(API.Catchedawards, {
					page: 1,
					pageSize: 20
				}).then((response) => {
					this.receiveDatas = response.data.data;
					this.showLoading = false;
					// this.$emit('awardNumber', this.receiveDatas.length);
					this.zjNumber = this.receiveDatas && this.receiveDatas.length
				})
			}
		},
		mounted() {
			this.axios.post(API.GetPushedMessages).then((response) => {
				this.getPushedMessages = response.data.data;
				this.showLoading = false;
			})
			this.getCatchedawards();
		}
	}
</script>
<style lang="less" scoped>
	.my-news-items {
		width: 100%;
		position: absolute;
		top: 2rem;
		bottom: 0;
		overflow: auto;
		background: url(../../images/bigImage/bodybj.png) repeat;
	    background-size: 100% 100%;

		ul {
			padding-left: 0.18rem;
			padding-right: 0.15rem;
		}
		li {
			height: 1.0rem;
			display: flex;
			align-items: center;
			padding-left: 0.3rem;
			position: relative;
			font-size: 0.24rem;
			color: #fff;
			&:last-child:after {
				background:none;
			};
		    &:after {
		    	content: '';
		    	width: 100%;
		    	height: 0.02rem;
		    	background: #350e31;
		    	position: absolute;
		    	left: 0;
		    	bottom: 0;
		    };
		    .item-text {
		    	overflow:hidden;
		    	text-overflow:ellipsis;
		    	white-space:nowrap;
		    }
			em {
				display: block;
				width: 0.1rem;
				height: 0.1rem;
				background: #ff5346;
				border-radius: 50%;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	.my-news {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: #25022a;
		z-index:2;
		.news-nav {
			height: 1.11rem;
			background: url('../../images/topbg.png') repeat;
		    background-size: 100% 100%;
			ul {
				font-size: 0;
				text-align: center;
				padding-top: 0.29rem;
			}
			li {
				display: inline-block;
				font-size: 0.32rem;
				color: #fff;
				height: 0.56rem;
				position: relative;
				margin: 0 0.71rem;
				cursor: pointer;
				span.news-name {
					display: block;
					position: relative;
					em {
						right: -0.22rem;
						top: -0.1rem;
					}
				}
				&.active {
					color: #fedb46;
				}
				&.active:after {
					content: '';
					width: 1.0rem;
					height: 0.06rem;
					background: #fedb46;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					border-radius: 0.03rem;
				}
				em {
					display: block;
					font-style: normal;
					width: 0.24rem;
					height: 0.24rem;
					line-height: 0.24rem;
					border-radius: 50%;
					background: #ff5346;
					font-size: 0.18rem;
					text-align: center;
					position: absolute;
				}

			}
		}
	}
</style>
