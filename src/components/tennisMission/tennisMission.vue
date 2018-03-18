<template>
	<div>
		<div class="pop-window">
			<div class="pop-mask"></div>
			<div class="c-dw">
				<div class="dart-mission">
					<img src="../../images/tennisMission/top-decoration.png" class="top-decoration">
					<img src="../../images/tennisMission/top-head.png" class="d-title">
					<a href="javascript:">
						<img src="../../images/tennisMission/close.png" class="close" @click="close">
					</a>
					<img src="../../images/tennisMission/bottom-decoration.png" class="bottom-decoration">
					<div class="d-content" v-show="!showLoading">
						<div class="tz-title">累计投注{{missionList.progress/10000}}万
							<img src="../../images/tennisMission/bz.png" class="bz">
						</div>
						<div class="percent">
							<div class="percent-title"></div>
							<div class="percent-box">
								<div class="line" :style="{width:percent}"></div>
							</div>
						</div>
						<div class="percent-nr">


							<div class="group " v-for="(item,index) in missionList.list">
								<div class="sp-box">
									<div class="hf-fragment-box">
										<img v-if="index==0 || index== 1" src="../../images/tennisMission/hf-fragment.png" class="hf-fragment">
										<img v-if="index==2 || index==3 || index==4" src="../../images/tennisMission/jd-fragment.png" class="hf-fragment">
										<img v-if="index==5" src="../../images/tennisMission/ultimate-product.png" class="ultimate-product">
									</div>
									<div class="pic-info">
										<img src="../../images/tennisMission/one-bill.png" class="one-bill" v-if="index==0">
										<img src="../../images/tennisMission/ten-bill.png" class="ten-bill" v-if="index==1">
										<img src="../../images/tennisMission/eighty-card.png" class="eighty-card" v-if="index==2">
										<img src="../../images/tennisMission/wb-card.png" class="wb-card" v-if="index==3">
										<img src="../../images/tennisMission/yqs-card.png" class="yqs-card" v-if="index==4">
										<img src="../../images/tennisMission/sqr-card.png" class="sqr-card" v-if="index==5">
										<span class="pic-text">({{item.level/10000}}万奖励)</span>
									</div>
								</div>
								<div class="btn-box">
									<a href="javascript:" class="btn btn-normal" v-if="item.status == 0" @click="goGame">快去完成</a>
									<a href="javascript:" class="btn btn-receive" v-if="item.status == 1" @click="goReceive(item,index)">立即领取</a>
									<a href="javascript:" class="btn btn-already" v-if="item.status == 2">已经领取</a>
								</div>
							</div>

							

						</div>
					</div>
				</div>
				<div class="tennis-load">
					<loading :smaller="true" v-show="showLoading"></loading>
				</div>
			</div>
		</div>
		<pop-lottery @close="closePopLottery" v-if="isPopLottery" :lotteryParmas="lotteryParmas" :curIndex="curIndex"></pop-lottery>
	</div>
</template>
<script type="text/javascript">
	import API from '../../api';
	import popLottery from './pop-lottery';
	import loading from '../common/loading';
	export default {
		data() {
			return {
				missionList: '',
				isPopLottery: false,
				lotteryParmas: '',
				curIndex: '',
				showLoading: true
			}
		},
		mounted() {
			// 飞镖限时嘉奖列表
			this.getUrlwelfareboxlist();
		},
		components: {
			popLottery,
			loading
		},
		computed: {
			percent: function() {
				let myNum = this.missionList.progress/10000;
				let cArr = [];
				let m= 0;

				cArr[1] = (myNum<5);
				cArr[2] = (myNum==5);
				cArr[3] = ((myNum>5)&&(myNum<60));
				cArr[4] = (myNum == 60);
				cArr[5] = ((myNum>60)&&(myNum<600));
				cArr[6] = (myNum == 600);
				cArr[7] = ((myNum>600)&&(myNum<3600));
				cArr[8] = (myNum == 3600);
				cArr[9] = ((myNum>3600)&&(myNum<9999));
				cArr[10] = (myNum == 9999);
				cArr[11] = ((myNum>9999)&&(myNum<30000));
				cArr[12] = (myNum==30000);

				for(let i=0; i<cArr.length; i++) {
					if(cArr[i]) {
						m = i;
					}
				}
				switch(m) {
					case 1:
						return '6%';
						break;
					case 2:
						return '20%';
						break;	
					case 3:
						return '28%';
						break;
					case 4:
						return '36%';
						break;
					case 5:
						return '44%';
						break;
					case 6:
						return '52%';
						break;
					case 7:
						return '60%';
						break;
					case 8:
						return '68%';
						break;
					case 9:
						return '76%';
						break;
					case 10:
						return '84%';
						break;
					case 11:
						return '92%';
						break;
					case 12:
						return '100%';
						break;
				}
				
			}
		},
		methods: {
			closePopLottery() {
				this.isPopLottery = false;
			},
			goGame() {
				WapCall.openGame(2);
			},
			goReceive(item,index) {
				this.axios.post(API.urlwelfareboxaccept,{
					'value': item.awardsId
				}).then((response) => {
				  	if(response.data.code == 200) {
				  		item.status = 2;
				  		this.lotteryParmas = response.data.data;

				  		this.curIndex = index;

				  		this.isPopLottery = true;
				  	}
				})
			},
			close() {
				this.$emit('close');
			},
			getUrlwelfareboxlist() {
				this.axios.post(API.bettingList).then((response) => {
				  	if(response.data.code == 200) {
				  		this.missionList = response.data.data.bettingList;
				  		this.showLoading = false;
				  	}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	@import './tennisMission';
</style>