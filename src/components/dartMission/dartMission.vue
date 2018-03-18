<template>
	<div>
		<div class="pop-window">
			<div class="pop-mask"></div>
			<div class="c-dw">
				<div class="dart-mission">
					<img src="../../images/dartMission/title.png" class="d-title">
					<a href="javascript:">
						<img src="../../images/dartMission/close.png" class="close" @click="close">
					</a>
					<div class="d-content">
						<div class="tz-title">累计投注{{missionList.progress/10000}}万
							<img src="../../images/dartMission/bz.png" class="bz">
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
										<img v-if="index==0 || index== 1 || index==2" src="../../images/dartMission/hf-fragment.png" class="hf-fragment">
										<img v-if="index==3 || index==4" src="../../images/dartMission/jd-fragment.png" class="hf-fragment">
										<img v-if="index==5" src="../../images/dartMission/ultimate-product.png" class="ultimate-product">
									</div>
									<div class="pic-info">
										<img src="../../images/dartMission/two-bill.png" class="two-bill" v-if="index==0">
										<img src="../../images/dartMission/six-bill.png" class="six-bill" v-if="index==1">
										<img src="../../images/dartMission/thirty-bil.png" class="thirty-bil" v-if="index==2">
										<img src="../../images/dartMission/fifty-card.png" class="fifty-card" v-if="index==3">
										<img src="../../images/dartMission/wb-card.png" class="wb-card" v-if="index==4">
										<img src="../../images/dartMission/lq-bill.png" class="lq-bill" v-if="index==5">

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
			</div>
		</div>
		<pop-lottery @close="closePopLottery" v-if="isPopLottery" :lotteryParmas="lotteryParmas" :curIndex="curIndex"></pop-lottery>
	</div>
</template>
<script type="text/javascript">
	import API from '../../api';
	import popLottery from './pop-lottery';
	export default {
		data() {
			return {
				missionList: '',
				isPopLottery: false,
				lotteryParmas: '',
				curIndex: ''
			}
		},
		mounted() {
			// 飞镖限时嘉奖列表
			this.getUrlwelfareboxlist();
		},
		components: {
			popLottery
		},
		computed: {
			percent: function() {
				let myNum = this.missionList.progress/10000;
				let cArr = [];
				let m= 0;

				cArr[1] = (myNum<10);
				cArr[2] = (myNum==10);
				cArr[3] = ((myNum>10)&&(myNum<50));
				cArr[4] = (myNum == 50);
				cArr[5] = ((myNum>50)&&(myNum<200));
				cArr[6] = (myNum == 200);
				cArr[7] = ((myNum>200)&&(myNum<500));
				cArr[8] = (myNum == 500);
				cArr[9] = ((myNum>500)&&(myNum<3000));
				cArr[10] = (myNum == 3000);
				cArr[11] = ((myNum>3000)&&(myNum<13000));
				cArr[12] = (myNum==13000);

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
				WapCall.openGame(1);
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
				  	}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	@import './dartMission';
</style>