<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="pop-task">
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close" @click="close">
			</a>
			<div class="task-nav sp-title-bg">
				<ul>
					<li :class="currentIndex == 2 ? 'active':'' " @click="handleTaskNav(2)">每日任务</li>
					<li :class="currentIndex == 1 ? 'active':'' " @click="handleTaskNav(1)">成长任务</li>
				</ul>
			</div>
			<div class="task-items">
				<div class="task-scroll">
						<ul v-if="usertaskShowlist.length">
							<li v-for="item in usertaskShowlist">
								<div class="item-pic">
									<img :src="item.icon|imgCurrency">
								</div>
								<div class="item-info">
									<h4>{{item.taskName}}</h4>
									<p v-html="item.taskDesc"></p>
								</div>
								<div class="btn-box">
									<a v-if="item.taskStatus == 1" href="javascript:" class="btn-container btn-container-active" @click="goGame(item.gameType)">
										<p>前往</p>
										<span>({{item.finishNum}}/{{item.taskOps}})</span>
									</a>
									<a v-if="item.taskStatus == 0" href="javascript:" class="btn-container btn-container-active" @click="handleReceive(item)">领取</a>
									<a v-if="item.taskStatus == 2" href="javascript:" class="btn-container">已领取</a>
								</div>
							</li>
						</ul>
						<div class="no-record" v-else>
			                <p></p><br>
			                暂无数据
			            </div>
					<loading :smaller="true" v-show="showLoading"></loading>
				</div>
			</div>
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
				usertaskShowlist: '',
				currentIndex: 2,
				showLoading: true
			}
		},
		components: {
			scroll,
			loading
		},
		methods: {
			handleReceive(item) {
				this.axios.post(API.UserTaskFinish, {
					taskId: item.taskId,
					taskLogId: item.taskLogId
				}).then((response) => {
					if(response.data.code === 200) {
						item.taskStatus = 2;
						this.$toast('领取成功');
					}
				})
			},
			goGame(type) {
				WapCall.openGame(type);
			},
			close() {
				this.$emit('close', false);
			},
			handleTaskNav(index) {
				if(index == 1) {
					GLOBALS.buryingPoint(120502);
				}else {
					GLOBALS.buryingPoint(120501);
				}
				this.axios.post(API.UsertaskShowlist).then((response) => {
			      // this.usertaskShowlist = response.data.data;
			      let currentArr = response.data.data;
			      this.usertaskShowlist = [];
			      this.currentIndex = index;
			      for(let i in currentArr) {
			      	if(currentArr[i].cycle == index) {
			      		this.usertaskShowlist.push(currentArr[i]);
			      	}
			      }
			      this.showLoading = false;

			    })
			}
		},
		mounted() {
			this.handleTaskNav(2);
		}
	}
</script>
<style lang="less" scoped>
	.pop-task {
		/*width: 5.92rem;*/
		width: 84%;
		height: 7.7rem;
		/*background: url(../../images/fragmentation-record-bg.jpg) no-repeat center top;*/
		background: url(../../images/game/common-pop-bg.jpg) repeat-x;
		background-size: 100% 7.7rem;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		border-radius: 0.08rem;
		/*box-shadow: 0 0 0.08rem #d22650;*/
		border: 0.02rem solid #304a92;
		animation: showAnimate .5s;
		z-index: 12;
		.pop-close {
			width: 0.68rem;
			height: 0.68rem;
			position: absolute;
			right: -0.34rem;
			top: -0.34rem;
		}
	}
	.task-nav {
		height: 1.28rem;
		ul {
			display: flex;
			align-items: center;
			height: 1.28rem;
			padding: 0 0.35rem;
		}
		li {
			height: 1.28rem;
			line-height: 1.28rem;
			flex: 1;
			text-align: center;
			font-size: 0.32rem;
			position: relative;
			cursor: pointer;
			&:after {
				content: '';
				display: block;
				width: 1.0rem;
				height: 0.06rem;
				position: absolute;
				left: 50%;
				bottom: 0.22rem;
				transform: translateX(-50%);
				background: #feda48;
				border-radius: 0.04rem;
				display: none;
			}
			&.active {
				color: #fbcf56;
				&:after {
					display: block;
				}
			}
		}
	}
	.task-items {
		height: 6.4rem;
		position: relative;
		.task-scroll {
			width: 100%;
			position: absolute;
			top: 0;
			bottom: 0;
			overflow: auto;
		}
		li {
			height: 1.28rem;
			display: flex;
			align-items: center;
			background: url(../../images/running-article-bg.png) no-repeat center bottom;
			background-size: 5.69rem 0.01rem;
			&:last-child {
				background-image: none;
			};
		}
		.item-pic {
			flex: 0 0 1.12rem;
			display: flex;
			justify-content: flex-end;
			img {
				width: 0.8rem;
				height: 0.8rem;
				background: #333;
				border-radius: 0.15rem;
			}
		}
		.item-info {
			flex: 1;
			padding: 0 0.24rem 0 0.22rem;
			h4 {
				font-size: 0.28rem;
				font-weight: normal;
				padding-bottom: 0.08rem;
			}
			p {
				font-size: 0.24rem;
				color: #fff;
				line-height: 0.3rem;
				span {
					color: #f3d93a;
				}
			}
		}
		.btn-box {
			flex: 0 0 1.63rem;
			display: flex;
			.btn-container {
				display: block;
				width: 1.32rem;
				height: 0.58rem;
				text-align: center;
				background: #19366a;
				border-radius: 0.15rem;
				font-size: 0.24rem;
				box-sizing: border-box;
				padding: 0.03rem 0;
				color: #fff;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				justify-content: center;
				p {
					flex: 0 0 100%;
				}
				span {
					font-size: 0.16rem;
				}
				&.btn-container-active {
					background: #2764d2;
				}
			}
		}
	}
@keyframes showAnimate {
	from{opacity: 0}
	to{opacity: 1}
}
</style>
