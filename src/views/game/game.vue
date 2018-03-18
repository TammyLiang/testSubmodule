<template>
	<div class="c-game">
		<!-- <div class="game-content-bg"></div> -->
		<div class="sy-game" ref="syName">
			<scroll>
			<div>
				<!-- 个人信息 -->
				<game-header :userTansInfo = "userTansInfo" :showCharge="showCharge" :showLittleLogin="visitorLogin" @openMessage = "openMessage"
				:vistorHead="visitorLogin" @openTask="openTask" @newTask = "newTask" @showLogin = "getLogin" @showCharge="showPopRecharge"
				:showGiftPage = "showGiftPage" :unreadCount="unreadCount"></game-header>
				<div class="c-rank">
						<div class="c-rank-award" @click.stop.prevent="handlePopProfit(1,$event)">
							<div class="game-rank-icon">
								<i v-if="profitMe && profitMe.index">{{profitMe.index}}</i>
								<i v-else>未上榜</i>
							</div>
							<span class="cj-text">
								<i v-if="profitNews && profitNews.me.awardsName">{{profitMe.awardsName}}</i>
								<i v-else>暂无奖励</i>
							</span>
							<a href="javascript:" class="btn-rank"></a>
						</div>
						<div class="c-rank-items" @click.stop.prevent="handlePopProfit(2,$event)">
							<div class="rank-list" >
								<span>本次盈利榜结算时间：</span>
								<span class="c-rank-time">
									<i v-if="countdown.time">{{countdown.time}}</i>
									<i v-else>00:00:00</i>
								</span>
								<a href="javascript:">
									<img src="../../images/game/rank-list-check.png" class="rank-list-check" >
								</a>
							</div>
							<ul>
									<li>
										<div class="item-container" v-if="rankingList && rankingList[0]">
											<div class="item-box">
												<img v-if="rankingList && rankingList[0].headImg" :src="rankingList[0].headImg | imgCurrency" class="item-box-pic">
												<img v-else src="../../images/img_photo.png" class="item-box-pic">
											</div>
											<span class="item-name">{{rankingList[0].nickName}}</span>
											<span class="item-award">{{rankingList[0].awardsName}}</span>
										</div>
										<div class="item-container" v-else>
											<div class="item-box">
												<img src="../../images/img_photo.png" class="item-box-pic">
											</div>
											<span class="item-name">*****</span>
											<span class="item-award">*****</span>
										</div>
									</li>
									<li>
										<div class="item-container" v-if="rankingList && rankingList[1]">
											<div class="item-box">
												<img v-if="rankingList && rankingList[1].headImg" :src="rankingList[1].headImg | imgCurrency" class="item-box-pic">
												<img v-else src="../../images/img_photo.png" class="item-box-pic">
											</div>
											<span class="item-name">{{rankingList[1].nickName}}</span>
											<span class="item-award">{{rankingList[1].awardsName}}</span>
										</div>
										<div class="item-container" v-else>
											<div class="item-box">
												<img src="../../images/img_photo.png" class="item-box-pic">
											</div>
											<span class="item-name">*****</span>
											<span class="item-award">*****</span>
										</div>
									</li>
									<li>
										<div class="item-container"  v-if="rankingList && rankingList[2]">
											<div class="item-box">
												<img v-if="rankingList && rankingList[2].headImg" :src="rankingList[2].headImg | imgCurrency" class="item-box-pic">
												<img v-else src="../../images/img_photo.png" class="item-box-pic">
											</div>
											<span class="item-name">{{rankingList[2].nickName}}</span>
											<span class="item-award">{{rankingList[2].awardsName}}</span>
										</div>
										<div class="item-container" v-else>
											<div class="item-box">
												<img src="../../images/img_photo.png" class="item-box-pic">
											</div>
											<span class="item-name">*****</span>
											<span class="item-award">*****</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="c-horn" @click="handleHorn">
							<div class="c-horn-text">
						        <ul ref="hornUl">
						        	<li v-for="item in noticeList" ref="hornLi">
						        		<span v-html="item.remark"></span>
						        	</li>
						        </ul>
							</div>
						</div>
						<div class="c-game-groups" >
							<div class="game-itmes-box">
								<div class="game-items" ref="scrollGameItems">
									<ul :class="gameList.length==7 ? 'gameStyle1':'gameStyle2' ">
										<li v-for="(item,index) in gameList" @click="goGame(item,index,$event)">
											<em v-if="index == 0" class="text">一炮百万金叶</em>
											<a href="javascript:">
												<img :src="item.icon | imgCurrency" :class="item.type==10 ? 'game-dart':'' ">
											</a>
										</li>
										<!-- <li @click="goGame('fish',8,$event)">
											<img src="">
										</li> -->
									</ul>
								</div>
							</div>
						</div>
				</div>
			</scroll>
		</div>
		<c-footer :currentIndex="1"></c-footer>
		<!-- 排行榜 -->
		<profit-list v-if="isShowPopProfit" :currentnum = "isProfitNumber" :isShow="isShowPopProfit" v-on:close="handlePopProfitClose"></profit-list>

		<!-- 规则详情 -->
		<rule-details v-if="isRuleDetails" v-on:close = "handleRuleDetailsClose" ></rule-details>

		<!-- 新任务 -->
		<time-task v-if="isNewTask" v-on:close="handleNewTaskClose" :curIndex="curIndex"></time-task>
		<!-- 消息中心  -->
		<pop-message v-if="showMessage" :showMessage="showMessage" @openMessage = "openMessage"
		:showSystemNotice="showSystemNotice" @getTabInfo="getTabInfo"></pop-message>
		<!-- 签到 -->
		<sign v-if="isSign" @isSignHide = "isSignHide" :signlist="signlist"></sign>
		<!-- 侧边弹窗 -->
		<side v-if="isShowSide" @showBeginnerLottery="showBeginnerLottery" 
			@openSingleStatus="openSingleWindow" 
			@openDartMissionStatus="openDartMissions" 
			@openTennisMissionStatus="openTennisMissions" 
			@showPayTurntable="showPayTurntable"  
			:leaguePackage="leaguePackage"
			@openThanksGiving="openThanksGiving"
		></side>


		
		<!-- 充值回馈 -->
		<feedback v-if="isShowRecharge" @closeCharge="closeCharge"
		:feedbackList="feedbackList" :showGiftPage="showGiftPage"></feedback>
		<!-- 新人专属签到 -->
		<exclusive v-if="isShowExclusive"   @close="closeExclusive"></exclusive>
		<loading v-show = "showLoading"></loading>
		<!-- 绑定弹框 -->
		<bind-pop v-if="showBindPop">
			<p>澳客账号已绑定游戏账号：<br>{{okoooCode}}</p>
			<p>
				<span @click="rebind" class="rebind"></span>
				<span @click="useOld" class="usebtn"></span>
			</p>
		</bind-pop>
		<!-- 五大联赛 11-->
		<loader v-if="isLoader"></loader>

		<!-- 付费转盘改版(弹窗) -->
		<pay-turntable v-if="isPayTurntable" @close="closePayTurntable" :whichNumber="whichNumber"></pay-turntable>
		<!-- 一元礼包 -->
		<beginner-lottery v-if="isBeginnerLottery" :beginAwardData="beginAwardData" @close="closeBeginnerLottery" ></beginner-lottery>

		<!-- 感恩节活动 -->
		<thanks-giving  v-if="isThanksGiving" :leaguePackage="leaguePackage" @close="closeThanksGiving"></thanks-giving>

		<!-- 飞镖活动 -->
		<!-- <dart-mission v-if="isDartMission" @close="closeDartMission" ></dart-mission> -->

		<!-- 桌球活动 -->
		<tennis-mission v-if="isTennisMission" @close="closeTennisMission"></tennis-mission>

		<!-- 暂时不用 -->
			<!--任务 -->
			<!-- <pop-task v-if="isPopTask" v-on:close="handlePopTaskClose"></pop-task> -->
			<!-- 充值送话费 -->
			<!-- <pop-charge v-if="isShowRecharge" @closeCharge="closeCharge" :feedbackList="feedbackList"></pop-charge> -->
			<!-- 新人专属签到 -->
			<!-- <exclusive v-if="isShowExclusive"  :rawardlogs="rawardlogs" :isreceiveStatus="isreceiveStatus"
			:receiveDay="receiveDay" @close="closeExclusive"></exclusive> -->
			<!-- 双11活动 -->
			<!-- <single v-if="single" @close="close"></single> -->
		<popLottery v-if="isPopLotterys" @close="closePopLotterys"></popLottery>
	</div>
</template>
<script type="text/javascript">
	import BScroll from 'better-scroll'
	import scroll from 'components/scroll/scroll';
	import API from '../../api';
	import { bus } from '../../common/bus';
	export default {
		data() {
			return {
				isPopLotterys: false,
				isPayTurntable: false,
				single: false,
				userTansInfo: null,
				noticeList: '',
				bannerList: '',
				showLoading : true,
				isShowPopProfit: false,
				isPopRunning: false,
				isRuleDetails: false,
				isPopTask: false,
				isShowSide: false,
				isShoppingMall: false,
				profitNews: '',
				isProfitNumber: '',
				isLoader: false,
				isLeague: false,
				leaguePacksList: '',
				isBeginnerLottery: false,
				countdown: {
					time: ''
				},
				gameList: '',
				timer: '',
				isShowRecharge : false,
				isSign: false,

				signlist: '',
				showCharge : false,
				feedbackList : null,
				isShowExclusive: false,
				rawardlogs: '',
				isreceiveStatus: false,
				receiveDay: '',
				loginToken : '',
				profitMe: '',
				rankingList: '',
				visitorToken : '',
	        	visitorLogin : null,
				showLittleLogin :false,
				showBindPop : false,
				okoooCode :'',
				vistorHead : false,
				isUseOld : false,
				showGiftPage: 0,
				openCharge :false,
				isNewTask: false,
				redDotStatus: false,
				showMessage : false,
				showSystemNotice : true,
				unreadCount : 0,
				beginAwardData: '',
				curIndex: 1,
				isDartMission: false,
				isTennisMission: false,
				whichNumber: 2,
				// 五大连赛
				leaguePackage: '',
				isThanksGiving: false
			}
		},
		methods: {
			openThanksGiving() {
				this.isThanksGiving = true;
			},
			closePopLotterys() {
				this.isPopLotterys = false;
			},
			closeThanksGiving() {
				this.isThanksGiving = false;
			},
			// 五大联赛
			getLeaguePacksList() {
				this.axios.post(API.leaguePacksList).then((response) => {
					if(response.data.code == 200) {
						this.leaguePackage = response.data.data;
					}
			    })
			},
			showPayTurntable() {
				this.isPayTurntable = true;
			},
			closePayTurntable() {
				this.isPayTurntable = false;
			},
			openDartMissions(status) {
				this.isDartMission = true;
			},
			closeDartMission() {
				this.isDartMission = false;
			},
			// 桌球
			openTennisMissions(status) {
				this.isTennisMission = true;
			},
			closeTennisMission() {
				this.isTennisMission = false;
			},

			close() {
				this.single = false;
			},
			openSingleWindow(status) {
				this.single = status;
			},
			showBeginnerLottery(item) {

				this.beginAwardData = item;
				this.isBeginnerLottery = true;
			},
			closeBeginnerLottery() {
				this.isBeginnerLottery = false;
			},
			getTaskStatus() {
				
				this.axios.post(API.UsertaskShowlist).then((response) => {
					if(response && response.data.code == 200) {
						var index=0;
						var flag=true;
						// 成就任务》显示任务》每日任务
						while(flag){
							if (index == response.data.data.length) {
								break;
							};
							switch(response.data.data[index].cycle) {
								case 1:
									if(response.data.data[index].taskStatus != 2) {
										this.curIndex = 2;
										flag=false;
									}

									break;
								case 8:
									if(response.data.data[index].taskStatus != 2) {
										this.curIndex = 3;
										flag=false;
									}
									break;
								default:
									this.curIndex = 1;
							}
							index++;
						}

						// 红点是否显示

						var flag2 = true;
						var index2 = 0;
						while(flag2) {
							if(index2 == response.data.data.length) {
								break;
							}
							if(response.data.data[index2].taskStatus == 0 && (response.data.data[index2].cycle == 1 || response.data.data[index2].cycle == 2 || response.data.data[index2].cycle == 8)) {
								bus.$emit('redDot',true);
								break;
							}
							index2++;
						}

						// 判断双节任务的左侧导航是否显示
						for(var i=0; i< response.data.data.length; i++) {
							if(response.data.data[i].cycle == 6) {
								bus.$emit('openDot',true);
								return;
							}
						}
						bus.$emit('openDot',false);
					}
			    })
			},
			newTask(val) {
				this.isNewTask = true;
			},
			handleNewTaskClose() {
				this.isNewTask = false;
			},
			closeLeague(status) {
				this.isLeague = false;
			},
			handleHorn(e) {
				if(!e._constructed) {
					return;
				}
				GLOBALS.buryingPoint(1208);
			},
			goGame(item,index,e) {
				if(!e._constructed) {
					return;
				}
				GLOBALS.buryingPoint(121401+index);
				var that = this;
				that.isLoader = true;
				setTimeout(() => {
					that.isLoader = false;
				}, 2000)
				
				WapCall.openGame(item.type);
			},
			closeExclusive() {
				this.isShowExclusive = false;
			},
			getSignedList() {
				if(GLOBALS.accessToken) {
					this.axios.post(API.signedList).then((response) => {
				     	if(response.data.code == 200 && !response.data.data.daySigned) {
				     		this.isSign = true;
				     		this.signlist = response.data.data;
				     	}
				    });
			    }
			},
			isSignHide(status) {
				this.isSign = status;
			},
			openGames(type) {
				WapCall.openGame(type);
			},
			getProfitNew() {
				this.axios.post(API.ProfitNew).then((response) => {
			      this.profitNews = response.data.data;
			      this.showLoading = false;
			    });
			},
			showShoppingMall(e) {
				if(!e._constructed) {
					return;
				}
				if(GLOBALS.accessToken) {
					localStorage.setItem('APP_CHANNEL', GLOBALS.channel);
					localStorage.setItem('APP_VERSION', '3.0.0.0');
					setTimeout(() => {
						window.location.href = GLOBALS.shopUrl;
					})
				}else {
					this.$toast({
						message: '未授权，请先登录',
						duration: 1500
					});
				}
			},
			getLogin(val,e){

				this.showLittleLogin = false
			},
			handleShoppingMallClose(parmas) {
				this.isShoppingMall = parmas;
			},
			// 任务
			openTask() {
				this.isPopTask = true;
			},
			// 消息中心
			openMessage(val){
				this.showSystemNotice = true
				this.showMessage = val
				if(val.isclose){
					this.getUserTansInfo();
				}
				// 刷新消息条数
				if(val.refreshUnread){
					if(val.showSys){
						this.getNoticeNum(1)
					}else{
						this.showSystemNotice = false
						this.getNoticeNum(2)
					}
				}
			},
			getNoticeNum(val){
	            this.axios.post(API.messageList, {
	                value: val,
	                page: 1,
	                pageSize: 100
	            }).then((res) => {
	                let params = res.data
	                if(params.code == 200){
	                    this.unreadCount = params.data.allUnreadCount
	                }
	            })
	        },
			getTabInfo(val){
				this.showSystemNotice = val
			},
			showPopRecharge(){
				this.isShowRecharge = true;
			},
			closeCharge(){
				this.isShowRecharge = false;

			},
			handlePopTaskClose(parmas) {
				this.isPopTask = parmas;
			},
			handleRuleDetailsClose(parmas) {
				bus.$emit('showRuleDetails', false);
			},
			handleIsRunningShow(e) {
				if(!e._constructed) {
					return;
				}
				this.isPopRunning = true;
			},
			handlePopRunning(parmas) {
				this.isPopRunning = parmas;
			},
			handlePopProfitClose() {
				this.isShowPopProfit = false;
			},
			getUserTansInfo() {
				this.axios.post(API.UserTransInfo).then((response) => {
			      this.userTansInfo = response.data.data;
			      GLOBALS.txPic = this.userTansInfo && this.userTansInfo.head;
			    })
			},
			getNoticeList() {
				this.axios.post(API.NoticeList).then((response) => {
			      this.noticeList = response.data.data;
			      var that = this;

			      this.$nextTick(() => {
	      			  var iMax = this.noticeList.length;
	      			  if(this.$refs.hornUl) {
	      			  	 var oLiHeight = this.$refs.hornUl.children.length && this.$refs.hornUl.children[0].offsetHeight;
					      var speed = oLiHeight;
					      var that = this;
					      var oUl = that.$refs.hornUl;
					      oUl.innerHTML = oUl.innerHTML+oUl.innerHTML;
					      oUl.style.height = oUl.children.length * oLiHeight + 'px';
					      clearInterval(this.timer);
					      this.timer = setInterval(sliders, 3000);
	      			  }
				      function sliders() {
						if(-oUl.offsetTop >= oLiHeight * (iMax-1)) {
							oUl.style.webkitTransition = 'all 0s';
							// oUl.style.top = oLiHeight+'px';
							oUl.style.top = speed + 'px';
						}
						oUl.style.top = ((oUl.offsetTop - speed)) +'px';
						oUl.style.webkitTransition = 'all .5s';
				      }
			      })

			    })
			},
			getBannerList() {
				this.axios.post(API.BannerList).then((response) => {
			      this.bannerList = response.data.data;
			    })
			},
			handlePopProfit(index,e) {
				if(!e._constructed) {
					return;
				}
				GLOBALS.buryingPoint(1206);
				this.isProfitNumber = index;
				this.isShowPopProfit = true;
			},
			getTopThreeProfit() {
				this.axios.post(API.TopThreeProfit).then((response) => {
					if(response.data.code == 200) {
						let millSecond = response.data.data.countdown;
						this.profitMe = response.data.data.profitMe;
						this.rankingList = response.data.data.rankingList;

						GLOBALS.remainingTime(this, millSecond, this.countdown);
						let syName = new BScroll(this.$refs.syName, {
				          click:true,
				        })
					}
			    })
			},
			feedback(){

				this.axios.post(API.feedBackList).then((response) => {
					if(response && response.data && response.data.code == 200){
						this.feedbackList = response.data.data;
						if(this.feedbackList && this.feedbackList.buyFlag == 1){
							this.showCharge = true
						}
						switch (this.feedbackList && this.feedbackList.price){
			                case 2:
			                	this.showGiftPage = 2
			                	break
			                case 6:
				                this.showGiftPage = 6
				                break
			                case 15:
				                this.showGiftPage = 15
				                break
			                case 50:
				                this.showGiftPage = 50
				                break
			                case 100:
				                this.showGiftPage = 100
				                break
			                case 500:
				                this.showGiftPage = 500
				                break
				            case 1000:
				                this.showGiftPage = 1000
				                break
			                case 2000:
				                this.showGiftPage = 2000
				                break
				            case 5000:
				                this.showGiftPage = 5000
				                break
			            }
					}
			    });
			},
			getnewuserawardlog() {
				return this.axios.post(API.getnewuserawardlog, {
					isShowTotast: "false"
				});
			},
			getIsreceive() {
				return this.axios.post(API.isreceive)
			},
			getGameList() {
				this.axios.post(API.gameList).then((response) => {
					this.$nextTick(() => {
						this.gameList = response.data.data;
					})
			    })
			},
			uicBuryingPoint() {
				GLOBALS.buryingPoint(1299);
				this.axios.post(API.uicBuryingPoint,{
					buryingType: 8,
					gameType: 0
				})
			},
			// 进入当前页面，调澳客登录接口（成功、失败两种），调游客登录接口，
			onUserLogin() {

				// 正常登录
				if(this.loginToken && this.loginToken != 'null' && this.loginToken != null){
					if(GLOBALS.tabNumber<2) {
						this.axios.post(API.aokeUserInfo,{
							token: this.loginToken,
							visitorToken : this.visitorToken
						}).then((response) => {
							if(response && response.data.code == 200) {
								localStorage.setItem('visitorLogin',false);
								this.visitorLogin = false;
								this.getAccessToken(response.data.data)
							}else if(response.data && response.data.code == 401){
								// if(localStorage.getItem('visitorLogin') && JSON.parse(localStorage.getItem('visitorLogin'))){
								// 	this.getVisitorLogin()
								// }else{
									localStorage.setItem('okooo','null')
									this.$router.replace('/loginPop')

								// }
							}
						})
					}else {
						this.gameMethods();
					}
				}else{
					// if(GLOBALS.tabNumber<2) {
					// 	// 游客登录
					// 	this.getVisitorLogin();
					// }else {
						 this.gameMethods();
					// }
				}
	      },
		  getVisitorLogin(){
			  this.axios.post(API.visitorLogin,{
			  	source : 5,
			  	visitorToken: this.visitorToken
			  }).then((response) => {
			  	let params = response.data
			  	if(params && params.code == 200){
			  		this.getAccessToken(params.data);
			  		// localStorage.setItem('userid',params.data);
			  		localStorage.setItem('visitorLogin',true);
			  		this.showLittleLogin = true
			  		this.vistorHead = true
			  	}else if(params.code == 104){
			  		this.showLoading = false;
			  		this.$router.replace('/loginPop');
			  	}
			  })
		  },
		  
	      gameMethods() {
	      	 var that = this;
	      	 this.isShowSide = true;
	      	 this.isNewTask = false;
	      	
			  //gamelist
			  this.getGameList();
			  // 头像信息
			  this.getUserTansInfo();
			  // 喇叭
			  this.getNoticeList();
			  // this.getBannerList();
			  // 盈利榜接口
			  this.getProfitNew();
			  //倒计时
			  this.getTopThreeProfit();
			  //是否签到
			  this.getSignedList();
			  // 充值送话费
			  this.feedback();
			  // 消息列表
			  this.getNoticeNum(1)

			  // 五大联赛
			  this.getLeaguePacksList();

			  
			  this.getTaskStatus();
			  if(sessionStorage.getItem('openBill')) {
				  that.isShowRecharge = true;
				  sessionStorage.setItem('openBill', '');
			  }
	      },
		  shoppingList(){
			  this.axios.post(API.ShopMallList).then((res) => {
				  let that = this;
				  let params = res.data
				  if(params.code == 200) {
					 this.openCharge =  params.data.feedbackAutoOpen
				  }
			  })
		  },
		  getAccessToken(data){
			  this.axios.post(API.UserAccessToken, {
				  token: data,
				  type: 1
			  }).then((res) => {
				  let that = this;
				  if(res.data.code == 200) {
				  		that.uicBuryingPoint();

					  this.showLoading = false;
					  GLOBALS.accessToken = res.data.data.accessToken;
					  this.gameMethods();
				  }
			  })

		  },
		  getBintStatus(){
			  this.axios.post(API.bindStatus,{
				  token: this.loginToken
			  }).then((response) => {
				  if(response.data.code == 200) {
					  this.showLoading = false
					  if(response.data.data.status == 1){
						  this.showBindPop = true
						  this.isShowSide = false
						  this.okoooCode = response.data.data.user
						  return
					  }else{
						  this.onUserLogin();
					  }
				  }else{
					  this.$toast({
  						message: response.data.message,
  						duration: 1500
  					});
				  }
			  })
		  },
		  rebind(){
			  let urls = encodeURIComponent('/game?type=jdd&status=bind')
              location.href='http://m.okooo.com/user/login.php?FromUrl='+urls;
            //   location.href='http://m.okooo.com/user/login.php?FromUrl=/game?type=jdd&status=bind';
          },
          useOld(){
			  this.showBindPop = false
			  this.onUserLogin();
          },
		},
		components: {
			'profitList':() => import('components/pop/popProfitList'),
			'ruleDetails':() => import('components/details/ruleDetails'),
			'popTask':() => import('components/pop/popTask'),
			'cFooter':() => import('components/footer'),
			'loading':() => import('components/common/loading'),
			'loader':() => import('components/common/loader'),
			'popCharge':() => import('components/pop/popCharge'),
			'scroll': scroll,
			'sign':() => import('components/sign/sign'),
			'side':() => import('components/side/side'),
			'Exclusive':() => import('components/exclusive'),
			'bindPop':() => import('components/loginPop/bindPop'),
			'gameHeader':() => import('components/gameHeader'),
			'feedback':() => import('components/pop/feedback/feedback'),
			'league':() => import('components/league/league'),
			'timeTask':() => import('components/timeTask/timeTask'),
			'popMessage':() => import('components/pop/popMessage/index'),
			'beginnerLottery':() => import('components/beginnerLottery/beginnerLottery'),
			'single': () => import('components/single/single'),
			'tennisMission':() => import('components/tennisMission/tennisMission'),
			'payTurntable':() => import('components/payTurntable/payTurntable'),
			'thanksGiving':() => import('components/thanksGiving/thanksGiving'),
			'popLottery':() => import('components/thanksGiving/popLottery'),
		},
		destroyed() {
			clearInterval(this.timer);
		},
		mounted() {
			if(localStorage.getItem('JumpPlace') == 'Backpack') {
				localStorage.setItem('JumpPlace', '');
				this.$router.replace('/knapsack');
			}

			// 判断是否显示感恩节的结果弹窗
			if(localStorage.getItem('thanksGivingAwards')) {
				this.isPopLotterys = true;
			}

			// let urls = 'http://m.okooo.com/user/login.php?FromUrl='+ encodeURIComponent('/game?type=jdd')
			// let status = decodeURIComponent(urls)
			var that = this;
			let geturl =  GLOBALS.getUrlParam('token');
			let isBind = GLOBALS.getUrlParam('status') && GLOBALS.getUrlParam('status').split('#')[0]
			let isNormal = localStorage.getItem('normaluser') ? JSON.parse(localStorage.getItem('normaluser')) : false
			this.loginToken = geturl ? geturl.split('#')[0] : localStorage.getItem('okooo');
			localStorage.setItem('okooo',this.loginToken);
			localStorage.setItem('goNational', false);
			localStorage.setItem('APP_VERSION', GLOBALS.version);
			// 去掉游客登录
			localStorage.removeItem('visitorLogin');
			localStorage.removeItem('userid');

			// 游客登录
			this.visitorToken = localStorage.getItem('userid')
        	this.visitorLogin = localStorage.getItem('visitorLogin') ? JSON.parse(localStorage.getItem('visitorLogin')) : 'null';
			let isLogin = this.loginToken != "null" && this.loginToken != null
			let isVisitor = this.visitorToken != "null" && this.visitorToken != null
			// 获取token
			// if(isVisitor && isLogin && isBind == 'bind' && GLOBALS.tabNumber<2){
			// 	this.getBintStatus()
			// }else if( isLogin || isVisitor ){
			// 	this.onUserLogin();
			// }else if((this.loginToken == "null" || this.loginToken == null) && (this.visitorToken == "null" || this.visitorToken == null)){
				// this.showLoading = false;
				// localStorage.setItem('okooo','null');
				// this.$router.replace('/loginPop');
			// }
			if( isLogin ){
				this.onUserLogin();
			}else{
				this.showLoading = false;
				localStorage.setItem('okooo','null');
				this.$router.replace('/loginPop');
			}
			// 游戏部分左右滚动
			let scrollGameItems = new BScroll(this.$refs.scrollGameItems, {
	          click:true,
	          scrollY: false,
	          scrollX: true,
	          snap: false,
	          snapLoop: false,
	          snapThreshold: 0.3,
	          snapSpeed: 3000
	        });

		    bus.$on('league',function(status) {
		    	if(!localStorage.getItem('isExistenceLeague')) {
		    		localStorage.setItem('isExistenceLeague', 'true');
					// this.openLeague();
					that.isLeague = true;
				}else {
					that.isLeague = status;
				}
		    })
		    bus.$on('newPackage',function(status) {
		    	that.isShowExclusive = status;
		    	bus.$emit('isReceivePackage', true);
		    })
		    bus.$on('showRuleDetails',function(status) {
		        that.isRuleDetails = status;
		    })
		    bus.$on('isAlsoGetUserTansInfo', function(status) {
		    	if(status) {
		    		that.getUserTansInfo();
		    	}
		    })
		    // 增加金叶子
		    bus.$on('addLeaf',function(str) {
		    	if(that.userTansInfo) {
		    		that.userTansInfo.amount = that.userTansInfo.amount + Math.floor(str);
		    	}
		    })
		    // 弹出双11活动
		    bus.$on('showSingle', function(status) {
		    	if(status) {
		    		that.single = true;
		    	}
		    });

		    // 付费转盘弹窗开启
		    bus.$on('isPaid', function(status) {
		    	that.isPayTurntable = true;

		    	if(status == 'true') {
		    		//有资格抽奖状态
		    		that.whichNumber = 1;
		    	}else if(status == 'false') {
		    		//无资格抽奖状态
		    		that.whichNumber = 2;
		    	}
		    })

		    //弹出充值回馈
		    bus.$on('showFeedBack', function(status) {
		    	if(status) {
		    		that.isShowRecharge = true;
		    	}
		    })

		    // 新人签到判断是否开启
		    bus.$on('showExclusive',function(status) {
		    	if(localStorage.getItem('isExistenceLeague')) {

				}else {
					that.isLeague = true;
					localStorage.setItem('isExistenceLeague', 'true');
				}
				that.isShowRecharge = true;
		    })
		}
	}
</script>
<style lang="less" scoped>
	@import './game.less';
	.sy-game {
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 1.04rem;
		overflow: hidden;
		background: url(../../images/game/game-bottom.jpg) repeat-x center 4.8rem;
		background-size: 100% 100%;
	}
</style>
