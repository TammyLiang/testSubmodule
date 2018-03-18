<template>
	 <!--  -->
	<div class="pop-window" v-if="isreceiveStatus">
		<div class="pop-mask"></div>
		<div class="exclusive-box">
			<img src="../../images/exclusive/exclusives.png" class="exclusive-title">
			<a href="javascript:">
				<img src="../../images/exclusive/close.png" class="close" @click="close">
			</a>
			<a href="javascript:" class="btn-receive" @click="submit">领取奖励开始游戏</a>

			<div class="new-exclusive">
				<h2 class="n-title">新注册用户前7天，连续签到即可获得全部奖励!</h2>
				<div class="new-sign-box">
					<div class="new-sign-percent" :style="styles"></div>
					<ul class="sign-group" v-if="rawardlogs">
						<li v-for="(item,index) in rawardlogs.awardLogList" :class="index == receiveDay ? 'active':''">
							<span class="item-date">第{{index+1}}天</span>
							<em class="dot" v-if="index<receiveDay"></em>
							<div class="item-sign">
								<div class="pic-box">
									<img :src="item.awardImage|imgCurrency">
									<span>{{item.awardName}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>

			</div>
		</div>
		<loader v-if="isLoader"></loader>
	</div>
</template>

<script type="text/javascript">
	import API from '../../api';
	import { bus } from '../../common/bus';
	import loader from '../common/loader';
	export default {
		data() {
			return {
				styles: {
					'height': 0
				},
				isLoader: false,
				rawardlogs: '',
				isreceiveStatus:false,
				receiveDay: '',
				count: 0
			}
		},
		components: {
			loader
		},
		mounted() {
			var that = this;
			that.getExclude();
		},
		watch: {
			receiveDay: function(curVal,old) {
				var that = this;
				switch(curVal) {
					case 0:
						that.styles.height = '0';
						break;
					case 1:
						that.styles.height = '0.56rem';
						break;
					case 2:
						that.styles.height = '1.12rem';
						break;
					case 3:
						that.styles.height = '1.68rem';
						break;
					case 4:
						that.styles.height = '2.24rem';
						break;
					case 5:
						that.styles.height = '2.8rem';
						break;
					case 6:
						that.styles.height = '3.36rem';
						break;
					default:
						that.styles.height = '3.36rem';
				}
			}
		},
		methods: {
			getExclude() {
				var that = this;
				if(that.count == 2) {
					that.$toast({
						message: '您已今天已经领取',
						duration: 1500
					});
					return;
				}
				that.axios.all([that.getnewuserawardlog(),that.getIsreceive()]).then(that.axios.spread(function (rawardlog, isreceive) {

				    if(isreceive.data.data == 0 && rawardlog.data.code == 200) {
				    	that.rawardlogs = rawardlog.data.data;
				    	that.isreceiveStatus = true;
				    	that.receiveDay = that.rawardlogs.receiveDay;
				    }else {
				    	that.count = 2;
				    	that.$toast({
							message: '您已今天已经领取',
							duration: 1500
						});
				    }
				}));

			},
			getnewuserawardlog() {
				return this.axios.post(API.getnewuserawardlog, {
					isShowTotast: "false"
				});
			},
			getIsreceive() {
				return this.axios.post(API.isreceive);
			},
			close() {
				this.$emit('close');
			},
			submit() {
				this.isLoader = true;
				var that = this;
				this.axios.post(API.newuserawardReceive+(this.receiveDay+1)).then((response) => {
			      if(response.data.code == 200) {
			      	this.$toast({
						message: '领取成功',
						duration: 1000
					});
			      	setTimeout(function() {
			      		that.isLoader = false;
			      	},2000);
					this.$emit('close');
					// 增加金叶子
					bus.$emit('isAlsoGetUserTansInfo', true);
					//领取过以后开启倒计时
					bus.$emit('openCountTime', true);
			      }
			    })
			}
		}
	}
</script>
<style lang="less" scoped>

	.pic-box {
		display: flex;
		align-items: center;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			left: 0.5rem;
			top: 50%;
			transform: translateY(-50%);
			width: 0.24rem;
			height: 0.17rem;
			/*background: url(../../images/exclusive/arraw.png) no-repeat;
			    background-size: 0.24rem 0.17rem;*/
		};
		img {
			width: 0.7rem;
			margin-right: 0.3rem;
		}
	}
	.new-sign-percent {
		width: 0.14rem;
		height: 3.4rem;
		background: #3569bb;
		position: absolute;
		left: 33.68%;
    	top: 0.22rem;
    	z-index: 2;
    	border-radius: 0.22rem;
	}
	.new-sign-box{
		position: relative;
	}

	.exclusive-box {
		width: 100%;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 12;
		animation:scales .6s ease;
		.close {
			width: 0.68rem;
			height: 0.68rem;
			position: fixed;
			right: 0.1rem;
			top: -5.0rem;
			z-index: 14;
		}
		ul.sign-group {
			overflow: hidden;
			&:after{
				content: '';
				width: 0.3rem;
				height: 3.93rem;
				background: url(../../images/exclusive/sign-percent.png) no-repeat;
				background-size: 100% 100%;
				position: absolute;
				left: 32.2%;
				top: 0.13rem;
			};
			.dot {
				width: 0.22rem;
			    height: 0.22rem;
			    background: #3569bb;
			    border-radius: 50%;
			    position: absolute;
			    left: 33%;
			    top: 50%;
			    -webkit-transform: translateY(-50%);
			    transform: translateY(-50%);
			    z-index: 4;
			}
			li {
				height: 0.6rem;
				display: flex;
				align-items: center;
				position: relative;
				&:before {
					content: '';
					width: 0.38rem;
					height: 0.38rem;
					background: url(../../images/exclusive/new-hook.png) no-repeat;
					background-size: 100% 100%;
					border-radius: 50%;
					position: absolute;
					left: 31.8%;
					top: 50%;
					transform: translateY(-50%);
					z-index: 4;
					display: none;
				};
				&.active .item-date{
					color: #fedb46;
					font-size: 0.28rem;
				}
				&.active:before {
					display: block;
				}
				&:after {
					content: '';
					width: 0.22rem;
					height: 0.22rem;
					/*background: #3569bb;*/
					border-radius: 50%;
					position: absolute;
					left: 33%;
					top: 50%;
					transform: translateY(-50%);
					z-index: 3;
				};
				.item-date {
					flex: 0 0 42%;
					text-align: center;
					display: block;
				}
				.item-sign {
					flex: 0 0 58%;
				}
			}
		}


	}
	.btn-receive {
			display: block;
			width: 3.06rem;
			height: 0.76rem;
			line-height: 0.76rem;
			text-align: center;
			background: url(../../images/game/lq-btns.png) no-repeat;
			background-size: 3.06rem 0.76rem;
			margin: 0.2rem auto 0;
			font-size: 0.3rem;
			color: #fff;
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);
			margin-top: 2.5rem;
			z-index: 14;
		}
	.new-exclusive {
		width: 5.85rem;
		height: 6.84rem;
		background: url(../../images/exclusive/exclusive-bg.png) repeat-x;
		background-size: 100% 6.84rem;
		    border: 0.02rem solid #2d4286;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 12;

		.n-title {
			font-size: 0.24rem;
			color: #418bff;
			padding-top: 0.5rem;
			padding-bottom: 0.35rem;
			text-align: center;
			font-weight: normal;
			span {
				color: #faeb4b;
			}
		}
	}
	.exclusive-title {
		width: 98%;
		height: 2.11rem;
		position: fixed;
		left: 1%;
		top: 50%;
		transform: translateY(-50%);
		z-index: 13;
		padding-bottom: 8rem;
	}
	@-webkit-keyframes scales {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(-50%) scale(0.5);
			transform-origin: center center;
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(-50%) scale(1);
			transform-origin: center center;
		}
	}
</style>
