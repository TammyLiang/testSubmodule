<template>
	<!-- v-if="showSide" -->
	<div class="side-box" v-if="isShowSide">
		<a href="javascript:">
			<p class="side-btn" :class="{'slide-open':isOpen}" @click="sideTab" :style="btnStyles"></p>
		</a>
		<div class="side"  :style="styles">
			<span style="display:none;">{{showSide}}</span>
			<ul ref="sideUlElement">
				<!-- <li class="side-league" @click="openLeague" v-if="isShowPackageIcon">
					<div class="league-box">
						<img src="../../images/league/chest-bg.png" class="chest-bg">
						<img src="../../images/league/chest.png" class="s-chest">
						<span class="award-detail"><i>超值特惠</i></span>
					</div>
				</li> -->

				<!-- 九宫格抽奖弹窗 -->
				<li class="side-league" @click="openBeginnerLottery" v-if="!(beginAwardData.bettingTimes == 0 && !isNew)">
					<div class="league-box">
						<img src="../../images/activity/fish/circle.png" class="chest-bg">
						<img src="../../images/activity/nationalActivity.png" class="s-chest">
					</div>
				</li>
				<!-- 国庆活动 -->
				<!-- <li class="side-league" @click="openFish" v-if="showFish">
					<div class="league-box">
						<img src="../../images/activity/fish/circle.png" class="chest-bg">
						<img src="../../images/activity/fish/icon.png" class="s-chest">
					</div>
				</li> -->

				<!-- 双11 -->
				<!-- <li class="side-league" @click="openSingle">
					<div class="league-box">
						<img src="../../images/activity/fish/circle.png" class="chest-bg">
						<img src="../../images/single/side-icon.png" class="single-icon">
					</div>
				</li> -->

				<!-- 飞镖限时嘉奖-->
				<!-- <li class="side-league" @click="openDartMission" v-if="isOpenBetting" >
					<div class="league-box">
						<img src="../../images/activity/fish/circle.png" class="chest-bg">
						<img src="../../images/activity/fb.png" class="single-icon">
					</div>
				</li> -->
				<!-- 新手礼包 -->
				<li @click="handlePackage" v-if="isLoopTime" class="side-xslb">
					<div class="box">
						<img src="../../images/bigImage/package.png" class="package">
						<span class="award-detail">
						<i>新手礼包</i></span>
						<div class="loop-time" v-if="openTime || receiveDays == 1">
							<p>{{loop.time}}</p>
							<p>再次开启</p>
						</div>
						<div class="loop-time" v-else>
							<p></p>
						</div>
					</div>
				</li>

				<li v-if="showPayedTurntable && showPayedTurntable.enabled != 0" class="side-xsjl">
					<div class="box">
						<!-- 幸运转盘 -->
						<payedTurntable :showPayedTurntable="showPayedTurntable"

						 v-if="showPayedTurntable && showPayedTurntable.awards.length"></payedTurntable>
						<!-- <span class="award-detail"><i>限时奖励</i></span> -->
					</div>
				</li>
				

			</ul>
		</div>
		<!-- <fish v-if="showFishPop" :bettingList="bettingList" @close="showFishPop = false"
		@bettingList="newBettingList"></fish> -->
	</div>
</template>
<script type="text/javascript">
import payedTurntable from '../turntable/PayedTurntable.vue';
// import fish from '../pop/fishActivity';
import API from '../../api';
import { bus } from '../../common/bus';

	export default {
		data() {
			return {
				isSideHide: true,
				isShowSide: false,
				styles: {
					'right': '0',
					'height':'5.52rem'
				},
				btnStyles: {
					'right': '-0.07rem'
				},
				isLoopTime: false,
				showPayedTurntable : null,
				loop: {
					time: 0
				},
				isOpen : true,
				leaguePacksList: '',
				isShowPackageIcon: false,
				openTime: false,
				receiveDays: false,
				showFish :false,
				showFishPop :false,
				bettingList : null,
				beginAwardData: '',
				isSideBeginnerLottery: false,
				isNew: false,
				isOpenBetting: false

			}
		},
		components:{
			payedTurntable,
			// fish
		},
		computed:{
			showSide(){
				

				let isShow = this.showPayedTurntable && this.showPayedTurntable.enabled != 0;

				// 是否增加侧边栏高度
				// if(isShow && this.isLoopTime && this.isOpenBetting) {
				// 	this.styles.height = '7rem';
				// }

				// if(isShow ||this.showFish || this.isLoopTime){
				// 	return true
				// }else {
				// 	return false
				// }

			}
		},
		mounted(){

			var that = this;

			setTimeout(() => {
				that.isShowSide = true;
				
			}, 150)

			

			GLOBALS.loopTime(this,this.loop);
			// 五大联赛
			// this.getLeaguePacksList();
			// 捕鱼显示嘉奖
			// this.getBettingList()



			// 飞镖嘉奖
			// this.getFbBettingList();

			//一元抽奖
			this.getRichwheel(2);
			this.getNewUserFeedback();

			

			bus.$on('openCountTime',function(status) {
		    	if(status) {
		    		that.openTime = true;
		    	}
		    })
			// 付费转盘
			if(GLOBALS.accessToken){
				this.payedTurntable();
				this.getNewuserawardReceive();
			}
		},
		methods: {
			// getFbBettingList() {
			// 	this.axios.post(API.bettingList).then((response) => {
			// 	  	if(response.data.code == 200) {
			// 	  		this.isOpenBetting = response.data.data.isOpen ? true:false;
			// 	  	}
			// 	})
			// },
			openDartMission() {
				this.$emit('openDartMissionStatus', true);
			},
			openSingle() {
				this.$emit('openSingleStatus', true);
			},
			openBeginnerLottery() {
				this.$emit('showBeginnerLottery', this.beginAwardData);
			},
			getRichwheel (val) {
			  	//一元抽奖
			  	this.axios.post(API.richwheel, {
					'value': val
				}).then((response) => {
					if(response.data.code == 200) {
						this.beginAwardData = response.data.data;
						this.isSideBeginnerLottery = true;
					}
			    })
			},
			getNewUserFeedback() {
				//是否购买一元礼包
			 	this.axios.post(API.isNewUserFeedback).then((response) => {
					if(response.data.code == 200) {
						this.isNew = response.data.data.isNew;
					}
			    })
			 },
			openLeague() {
				bus.$emit('league',true);
			},
			jumpNationalActivity(){
				location.href = '../../../../activities/#/nationalActivity'
			},
			openFish(){
				this.showFishPop = true
			},
			// getLeaguePacksList() {
			// 	this.axios.post(API.leaguePacksList, {
			// 		isShowTotast: "false"
			// 	}).then((response) => {
			// 		if(response.data.code !== 200) {
			// 			this.isShowPackageIcon = false;
			// 		}else if(response.data.data.leagueAutoOpen){
			// 			this.isShowPackageIcon = true;
			// 		}
			// 	})
			// },
			getBettingList(){
	            this.axios.post(API.bettingList).then((response) => {
	                if(response.data.code === 200 && response.data.data.isOpen) {
						this.bettingList = response.data.data.bettingList.list
						if(this.bettingList.length > 0){
							this.showFish = true
						}
	                }
	            })
	        },
			newBettingList(val){
				this.bettingList = val
			},
			getNewuserawardReceive() {
				this.axios.post(API.getnewuserawardlog, {
					isShowTotast: "false"
				}).then((response) => {
					if(response.data.code == 101) {
						this.isLoopTime = false;
						this.openTime = false;
					}else if(response.data.code == 200) {
						this.isLoopTime = true;
						this.receiveDays = response.data.data.isReceive;
					}
				})
			},
			handlePackage() {
				GLOBALS.buryingPoint(1209);
				// this.openTime = true;
				bus.$emit('closeCountTime', true);
				bus.$emit('newPackage',true);
				return;
			},
			sideTab() {
				GLOBALS.buryingPoint(1207);
				this.isOpen = !this.isOpen
				var that = this;
				this.btnStyles.right = '-0.6rem';
				this.isSideHide = !this.isSideHide;
				if(!this.isSideHide) {
					this.styles.right = '-1.98rem';
				}else {
					this.styles.right = '0';
				}
				setTimeout(() => {
					that.btnStyles.right = '-0.07rem';
				}, 300)

			},
			payedTurntable(){
			      this.axios.post(API.payedTurntable).then((response) => {
			          if(response.data.code == 200){
			              this.showPayedTurntable = response.data.data;
						  localStorage.setItem('turntableData',JSON.stringify(this.showPayedTurntable))
			          }
			      })
			},
		}
	}
</script>
<style lang="less" scoped>

	.chest-bg {
		animation: rotate 2s linear infinite;
}
.side-xslb {
	top: -0.3rem;
}
	.side-xsjl {
		position: relative;
		bottom: 0.2rem;
	}
	@keyframes rotate{
		transform-origin: center;
	    from{transform:  rotate(0);}
	    to{transform: rotate(360deg);}
	}
	.side-box {
		position: relative;
		z-index: 5;
		.side {
			width: 1.98rem;
			height: 5.52rem;
			background: url(../../images/activity/side-pop.png) no-repeat;
			background-size:100% 100%;
			position: fixed;
			right: -0.07rem;
			top: 60%;
			transform: translateY(-50%);
			transition: all .3s;
			z-index: 12;
			.package {
				width: 75%;
				/*position: absolute;
				left: 50%;
				top: 0;
				transform: translateX(-50%);*/
			}
			.loop-time {
				font-size: 0.2rem;
				color: #ffeb44;
				text-align: center;
				position: relative;
				top: 0.25rem;
				left: 0.03rem;
				text-align: center;
			}
			ul{
				display: flex;
				flex-direction: column;
				padding: .2rem 0;
				height: 100%;
				.side-league {
					position: relative;

					.chest-bg {
						width: 1.8rem;
						height: 1.8rem;
						position: absolute;
						left: -0.4rem;
    					top: -.2rem;
					}
					.s-chest {
						width: 1rem;
						height: 1rem;
						position: relative;
						z-index: 2;
					}
					.single-icon {
						width: 1.05rem;
						height: 1.05rem;
						position: relative;
						z-index: 2;
					}
				}
				li{
					position: relative;
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 auto;
					width: 1rem;
					background: url('../../images/activity/circle.png') no-repeat center center;
					background-size: 100%;
					.box {
						position: relative;
						text-align: center;
					}
					.league-box {
						width: 1.53rem;
    					height: 1.34rem;
    					position: relative;
    					display: flex;
    					align-items: center;
    					justify-content: center;
					}
					&:nth-child(1) {
						top: -0.1rem;
						margin-bottom: 0.3rem;
						.award-detail {
							top: .85rem;
						}
					};
					&:nth-child(2) {
						position: relative;
						top: -0.32rem;
					};
					&:nth-child(3) {
						background-position: center center;
						top: -0.23rem;
					}
				}
			}
		}
		.side-btn {
			width: 0.6rem;
			height: 1.47rem;
			position: fixed;
			right: -0.07rem;
			top: 60%;
			transform: translateY(-50%);
			z-index: 13;
			transition: all .3s;
			background: url('../../images/activity/slide-open.png') no-repeat;
			background-size: 100%;
		}
		.slide-open{
			background: url('../../images/activity/side-btn.png') no-repeat;
			background-size: 100%;
		}
		.award-detail{
			position: absolute;
			top: .8rem;
			left: -.03rem;
			width: 1.15rem;
			height: .23rem;
			text-align: center;
			background: url('../../images/activity/awardbg.png') no-repeat;
			background-size: 100%;
			z-index: 12;
			display: flex;
			align-items: center;
    		justify-content: center;
			i{
				display: inline-block;
				padding: 0 0.02rem;
				font-size: .18rem;
				color: #fff;
				background: #3758c4;
				border-radius: .2rem;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			    font-size: 0.2rem;
			}
		}
	}
</style>
