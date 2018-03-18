<template>
	<div class="pop-window scale-ys" >
		<div class="pop-mask"></div>

			<div class="time-task c-dw">
				<div class="scale-ys ">
					<!-- <img src="../../images/task/title.png" class="title c-dw"> -->
					<a href="javascript:">
						<img src="../../images/pumpkin/close.png" class="close" @click="close">
					</a>
					<div class="pumpkin-task">
						<div class="t-box">
							<div class="box-fl">
								<ul>
									<li @click="currentIndex = 1" :class="currentIndex == 1 ? 'active':'' ">
										<div class="box">
											<img src="../../images/task/daily-task-active.png" class="daily-task-active" v-if="currentIndex == 1">
											<img src="../../images/task/daily-task.png" class="daily-task" v-else>
										</div>每日任务
									</li>
									<li @click="currentIndex = 2" :class="currentIndex == 2 ? 'active':'' ">
										<div class="box">
											<img src="../../images/task/achievement-active.png" class="achievement-active" v-if="currentIndex == 2">
											<img src="../../images/task/achievement.png" class="achievement" v-else>
										</div>成就任务
									</li>
									<li @click="currentIndex = 3" :class="currentIndex == 3 ? 'active':'' " v-if="xsTaskArr && xsTaskArr.length && isShowLimit">
										<div class="box">
											<!-- <img src="../../images/task/time-limit-active.png" class="time-limit-active" v-if="currentIndex == 4">
											<img src="../../images/task/time-limit.png" class="time-limit" v-else> -->
											<img src="../../images/pumpkin/ng-icon.png" class="ng-icon">
										</div>限时任务
									</li>
								</ul>
							</div>
							<div class="box-fr">
								<div v-show="!showLoading">
									<div class="box-items day-task-items" v-show="currentIndex == 2">
										<ul v-if="dayTaskArr && dayTaskArr.length">
											<li :class="item.taskStatus != 1 && item.taskStatus != 0 ? 'complete':'' " v-for="item in dayTaskArr">
												<img src="../../images/task/complete.png" class="pic-complete" v-if="item.taskStatus == 0">
												<img src="../../images/task/received.png" class="pic-received" v-if="item.taskStatus == 2">
												<img src="../../images/task/obsoleted.png" class="pic-obsoleted" v-if="item.taskStatus == 3">
												<div class="tx">
													<img :src="item.icon|imgCurrency">
												</div>
												<div class="text">
													<h4>{{item.taskName}}</h4>
													<p v-html="item.taskDesc"></p>
												</div>
												<div class="btn-box">
													<a href="javascript:" class="btn btn-init" v-if="item.taskStatus == 1" @click="goGame(item.gameType)">前往</a>
													<a href="javascript:" class="btn btn-complete"  v-if="item.taskStatus == 0" @click="handleReceive(item)">领取</a>
													<a href="javascript:" class="btn btn-lq"  v-if="item.taskStatus == 2">已领取</a>
													<a href="javascript:" class="btn btn-lq"  v-if="item.taskStatus == 3">已过期</a>
													<a href="javascript:" class="btn btn-lq"  v-if="item.taskStatus == 4">未开启</a>
													<span>{{item.finishNum}}/{{item.taskOps}}</span>
												</div>
											</li>
										</ul>
										<div class="null-information" v-else>
											<img src="../../images/task/null-information.png" class="null-information">
											<p>没有任何信息</p>
										</div>
									</div>
									<div class="box-items day-task-items" v-show="currentIndex == 1">
										<ul  v-if="achievementTaskArr && achievementTaskArr.length">
											<li :class="item.taskStatus != 1 && item.taskStatus != 0 ? 'complete':'' " v-for="item in achievementTaskArr">
												<img src="../../images/task/complete.png" class="pic-complete" v-if="item.taskStatus == 0">
												<img src="../../images/task/received.png" class="pic-received" v-if="item.taskStatus == 2">
												<img src="../../images/task/obsoleted.png" class="pic-obsoleted" v-if="item.taskStatus == 3">
												<div class="tx">
													<img :src="item.icon|imgCurrency">
												</div>
												<div class="text">
													<h4>{{item.taskName}}</h4>
													<p v-html="item.taskDesc"></p>
												</div>
												<div class="btn-box">
													<a href="javascript:" class="btn btn-init" v-if="
													item.taskStatus == 1" @click="goGame(item.gameType)">前往</a>
													<a href="javascript:" class="btn btn-complete"  v-if="item.taskStatus == 0" @click="handleReceive(item,'refresh')">领取</a>
													<a href="javascript:" class="btn btn-lq"  v-if="item.taskStatus == 2">已领取</a>
													<a href="javascript:" class="btn btn-lq"  v-if="item.taskStatus == 3">已过期</a>
													<a href="javascript:" class="btn btn-lq"  v-if="item.taskStatus == 4">未开启</a>
													<span>{{item.finishNum}}/{{item.taskOps}}</span>
												</div>
											</li>
										</ul>
										<div class="null-information" v-else>
											<img src="../../images/task/null-information.png" class="null-information">
											<p>没有任何信息</p>
										</div>
									</div>

									<div class="box-items sj-items"  v-show="currentIndex == 3">
										<div class="sj-ul" v-if="xsTaskArr && xsTaskArr.length">
											<ul>
												<li :class="item.taskStatus != 1 && item.taskStatus != 0 ? 'received':'' " v-for="(item,index) in xsTaskArr">
													<img src="../../images/task/complete.png" class="pic-complete" v-if="item.taskStatus == 0">
													<img src="../../images/task/received.png" class="pic-received" v-if="item.taskStatus == 2">
													<img src="../../images/task/obsoleted.png" class="pic-obsoleted" v-if="item.taskStatus == 3">
													<div class="item">
														<div class="trademark">
																<div class="trademark-box">
																	<span>NO.{{index+1}}</span>
																	<span class="corner"></span>
																</div>
															</div>
														<div class="text">
															<!-- <h4>{{item.taskName}}</h4> -->
															<p v-html="item.taskDesc"></p>
														</div>
														<div class="btn-box">
															<a href="javascript:" class="btn btn-init" v-if="item.taskStatus == 1" @click="goGame(item.gameType)">前往</a>
															<a href="javascript:" class="btn btn-complete"  v-if="item.taskStatus == 0">已完成</a>
															<a href="javascript:" class="btn btn-lq"  v-if="item.taskStatus == 2">已领取</a>
															<a href="javascript:" class="btn btn-lq"  v-if="item.taskStatus == 3">已过期</a>
															<a href="javascript:" class="btn btn-lq"  v-if="item.taskStatus == 4">未开启</a>
															<span>{{item.finishNum}}/{{item.taskOps}}</span>
														</div>
													</div>
												</li>
											</ul>
										</div>
										<div class="null-information" v-else>
											<img src="../../images/task/null-information.png" class="null-information">
											<p>没有任何信息</p>
										</div>
										<div class="cj-active">
											<div class="cj-card" v-if="xsComprehensiveArr && xsComprehensiveArr.icon">
												<!-- <img :src="xsComprehensiveArr && xsComprehensiveArr.icon"> -->
												<img src="../../images/task/jdcard.png">
											</div>
											<div class="qb-complete"  v-if="xsComprehensiveArr && (xsComprehensiveArr.taskStatus == 0 || xsComprehensiveArr.taskStatus == 2 || xsComprehensiveArr.taskStatus == 3)">
												<img src="../../images/task/immediately-title.png" class="immediately-title">
												<a href="javascript:" class="btn-immediately" v-if="xsComprehensiveArr.taskStatus == 0"   @click="handleReceive(xsComprehensiveArr)">立即领取</a>
												<a href="javascript:" class="btn-immediated" v-if="xsComprehensiveArr.taskStatus == 2">已领取</a>
												<a href="javascript:" class="btn-immediated" v-if="xsComprehensiveArr.taskStatus == 3">已过期</a>
											</div>
											<div v-else>
												<div class="cj-tips" v-if="xsComprehensiveArr && xsComprehensiveArr.taskDesc">
													<p>{{xsComprehensiveArr && xsComprehensiveArr.taskDesc}}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="spin-loader">
								<loading :smaller="true" v-show="showLoading"></loading>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	</div>
</template>




<script type="text/javascript">
	import API from '../../api';
	import { bus } from '../../common/bus';
	import loading from '../common/loading';
	export default {
		data() {
			return {
				currentIndex: 2,
      			dayTaskArr: [],
      			achievementTaskArr: [],
      			sjTaskArr: [],
      			xsTaskArr: [],
      			sjComprehensiveArr: '',
      			xsComprehensiveArr: '',
      			showLoading: true,
      			isShowLimit: false,
			}
		},
		props: {
			curIndex: {
				default: 1
			}
		},
		components: {
			loading
		},
		methods: {
			close() {
				this.$emit('close', true);
			},
			goGame(type) {
				WapCall.openGame(type);
			},
			handleReceive(item, str) {
				console.log(str,str == 'shuangjie');
				bus.$emit('isAlsoGetUserTansInfo', true);
				this.axios.post(API.UserTaskFinish, {
					taskId: item.taskId,
					taskLogId: item.taskLogId
				}).then((response) => {
					if(response.data.code === 200) {
						item.taskStatus = 2;
						this.$toast('领取成功');
						if(str == 'refresh') {
							bus.$emit('isAlsoGetUserTansInfo', true);
						}
					}
				})
			},
			taskList() {
				this.axios.post(API.UsertaskShowlist).then((response) => {
					if(response && response.data.code == 200) {
						var res = response.data.data;
						for(var i=0; i<res.length;i++) {
							switch(res[i].cycle) {
								case 1:
									this.dayTaskArr.push(res[i])
									break;
								case 2:
									this.achievementTaskArr.push(res[i]);
									break;
								case 5:
									this.sjTaskArr.push(res[i])
									break;
								case 6:
									this.xsTaskArr.push(res[i]);
									if(res[i].taskStatus != 3) {
										this.isShowLimit = true;
									}
									break;
								case 7:
									this.sjComprehensiveArr = res[i];
									break;
								case 8:
									this.xsComprehensiveArr = res[i];
									break;
							}
						}
						this.showLoading = false;
					}
			    })
			}
		},
		mounted() {
			this.currentIndex = this.curIndex;
			this.taskList();
		}
	}
</script>
<style lang="less" scoped>
 @import './timeTask.less';

</style>
