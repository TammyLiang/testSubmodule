<template>
	<div class="my-profit">
		<div class="my-intro">
			<ul>
				<li>
					<span class="m-name">盈利</span>
					<span class="m-leaf-num">{{profitNext.amount}}<img src="../../images/ic_leaf.png" class="ic_leaf"></span>
					<img src="../../images/game/eraser.png" @click="showEraser" class="eraser" v-if="profitNext.amount < 0 && isEraserPic">
					<!-- <img src="../../images/game/eraser.png" @click="showEraser" class="eraser"> -->
				</li>
				<li>
					<span class="m-name">奖励</span>
					<span class="m-leaf-num" v-if="profitNext && profitNext.awardsName">{{profitNext.awardsName}}</span>
					<span class="m-leaf-num" v-else>还需努力</span>
				</li>
			</ul>
		</div>
		<div class="my-award">
			<!-- 一等奖 -->
			<div class="first-award"  v-if="currentRank === 1">
				<div class="my-award-item">
					<div class="pic-box">
						<img :src="profitNext.finalAwardsImage|imgCurrency">
					</div>
					<span class="my-award-text">最终奖励</span>
				</div>
				<span class="my-award-info">{{profitNext.finalAwardsName}}</span>
				<p class="my-award-tips">无敌是多么寂寞~</p>
			</div>
			<!-- 第二名 -->
			<div class="second-award" v-if="currentRank === 2">
				<div class="m-award-group current-award">
					<div class="m-award-box">
						<div class="pic-box">
							<img :src="profitNext.awardsImage|imgCurrency">
						</div>
						<span class="m-award-text">当前奖励</span>
					</div>
					<span class="my-award-info">{{profitNext.awardsName}}</span>
				</div>
				<div class="m-award-group final-award">
					<div class="m-award-box">
						<div class="pic-box">
							<img :src="profitNext.finalAwardsImage|imgCurrency">
						</div>
						<span class="m-award-text">最终奖励</span>
					</div>
					<span class="my-award-info">{{profitNext.finalAwardsName}}</span>
				</div>
				<div class="m-award-tips">离下级奖励需{{profitNext.downAmount}}
					<img src="../../images/white-leaf.png" class="white-leaf">
				</div>
			</div>
			<!-- 存在名次 -->
			<div class="third-award"  v-if="currentRank === 3">

				<div class="m-award-group ">
					<div class="m-award-box">
						<div class="pic-box">
							<img :src="profitNext.awardsImage|imgCurrency" v-if="profitNext.awardsImage">
							<img src="../..//images/image_award_empty.png" v-else>
						</div>
						<span class="m-award-text">当前奖励</span>
					</div>
					<span class="my-award-info" v-if="profitNext && profitNext.awardsName">{{profitNext.awardsName}}</span>
					<span class="my-award-info" v-else>还需努力</span>

				</div>
				<div class="m-award-group">
					<div class="m-award-box">
						<div class="pic-box">
							<img :src="profitNext.nextAwardsImage|imgCurrency">
						</div>
						<span class="m-award-text">下级奖励</span>
					</div>
					<span class="my-award-info">{{profitNext.nextAwardsName}}</span>
				</div>
				<div class="m-award-group">
					<div class="m-award-box">
						<div class="pic-box">
							<img :src="profitNext.finalAwardsImage|imgCurrency">
						</div>
						<span class="m-award-text">最终奖励</span>
					</div>
					<span class="my-award-info">{{profitNext.finalAwardsName}}</span>
				</div>
				<div class="m-award-tips">离下级奖励需{{profitNext.downAmount}}
					<img src="../../images/white-leaf.png" class="white-leaf">
				</div>
			</div>
			<loading :smaller="true" v-show="showLoading"></loading>
		</div>
		<div class="check-rules" @click="checkRules">查看详细规则 ></div>

		<!-- 橡皮擦 -->
		<pop-eraser v-if="isPopEraser" v-on:close="handlePopEraserClose"></pop-eraser>
	</div>
</template>
<script type="text/javascript">
	import API from '../../api';
	import { bus } from '../../common/bus';
	import popEraser from './popEraser';
	import loading from '../common/loading';
	export default {
		data() {
			return {
				profitNext: '',
				configEraser: '',
				isEraserPic: true,
				isPopEraser: false,
				showLoading: true
			}
		},
		components: {
			popEraser,
			loading
		},
		methods: {
			handlePopEraserClose(parmas) {
				this.isPopEraser = parmas;
				bus.$emit('isShowProfitTitlePic', parmas);
			},
			checkRules() {
				bus.$emit('showRuleDetails', true);
			},
			showEraser() {
					this.isPopEraser = true;
					bus.$emit('isShowProfitTitlePic', true);
			},
			getHistoryProfitNext() {
				// 我的盈利
				this.axios.post(API.HistoryProfitNext).then((response) => {
			      	this.profitNext = response.data.data ? response.data.data: [];
			      	this.showLoading = false;
			    })
			},
			getEraser() {
				// 橡皮擦
			    this.axios.post(API.Eraser).then((response) => {
			      	this.configEraser = response.data.data ? response.data.data : {};
		      		if(this.configEraser.me == this.configEraser.times) {
						this.isEraserPic = false;
					}else {
						this.isEraserPic = true;
					}
			    })
			}
		},
		computed: {
			currentRank() {
				if(this.profitNext) {
					if(this.profitNext.awardsName != this.profitNext.finalAwardsName && this.profitNext.nextAwardsName == this.profitNext.finalAwardsName) {
						return 2;
					}else if(this.profitNext.awardsName && this.profitNext.awardsName == this.profitNext.finalAwardsName) {
						return 1;
					}else{
						return 3;
					}
				}

			}
		},
		mounted() {
			var that = this;
			this.getHistoryProfitNext();
			this.getEraser();
			bus.$on('isAlsoGetUserTansInfo', function(status) {
				if(status) {
					that.getHistoryProfitNext();
				}
		    })
		}
	}
</script>
<style lang="less" scoped>
	.second-award {
		.m-award-tips {
			position: absolute;
			right: 0;
			top: 0;
		}
	}
</style>
