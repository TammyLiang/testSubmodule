<template>
	<transition name="fade">
		<div class="pop-window league-mask" v-if="isLeague">
			<div class="pop-mask "></div>
			<div class="league">
				<a href="javascript:">
					<img src="../../images/league/close.png" class="close" @click="close">
				</a>
				<div class="pop-title">注：活动期间单个礼包限购一次</div>
				<div class="league-list">
					<ul>
						<li v-for="item in leaguePacksList">
							<h1 class="title">{{item.name}}</h1>
							<div class="l-text" v-html="item.content.replace('<br/>','')">
							</div>
							<a href="javascript:" class="btn-price" :class="item.buyFlag == 1 ? '':'active' " @click="gotoPay(item)">￥{{item.price}}</a>
						</li>
					</ul>	
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import API from '../../api';
	import { bus } from '../../common/bus';
	export default {
		data() {
			return {
				leaguePacksList: '',
				isLeague: true
			}
		},
		// props: {
		// 	leaguePacksList: {
		// 		default: []
		// 	}
		// },
		methods: {
			getLeaguePacksList() {
				this.axios.post(API.leaguePacksList, {
					"isShowTotast": "false"
				}).then((response) => {
					if(response.data.code == 200) {
						this.leaguePacksList = response.data.data;
					}else {
						this.isLeague = false;
					}
				})
			},
			close() {
				this.$emit('close');
			},
			gotoPay(item){
	            if(item.buyFlag == 1){
	                if(GLOBALS.accessToken) {
	                    localStorage.setItem('APP_CHANNEL', GLOBALS.channel);
	                    localStorage.setItem('APP_VERSION', GLOBALS.version);
	                    localStorage.setItem('JDD_PARAM', JSON.stringify(item));
	                    localStorage.setItem('originDeffer','');
	                    setTimeout(() => {
                            window.location.href = '../../../../payment/#/payment';
	                        // window.location.href = GLOBALS.curDomain + 'payment/#/payment';
	                    }, 0)
	                }else {
	                    this.$toast({
	                        message: '未授权，请先登录',
	                        duration: 1500
	                    });
	                }
	            }
	        }
		},
		mounted() {
			var that = this;
			that.getLeaguePacksList();
		}
	}
</script>
<style lang="less" scoped>
	.league-mask {
		z-index: 16;
	}
	.league {
		width: 100%;
		height: 10.95rem;
		background: url(../../images/league/league-bg.png) no-repeat;
		background-size: 100% 100%;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%) scale(0.96);
		z-index: 17;
		.close {
			width: 0.41rem;
			height: 0.44rem;
			position: absolute;
			right: 0.3rem;
			top: 0.25rem;
		}
		.pop-title {
			width: 100%;
			font-size: 0.24rem;
			color: #8F4920;
			text-align: center;
			position: absolute;
			left: 0;
			top: 4.25rem;
		}
	}
	.league-list {
		width: 6.14rem;
		margin: 0 auto;
		overflow: hidden;
		padding-top: 4.71rem;
		padding-left: 3%;
		li {
			width: 28.45%;
			height: 2.68rem;
			float: left;
			text-align: center;
			margin-left: 2.66%;
			margin-bottom: 0.15rem;
			.title {
				font-size: 0.2rem;
				color: #4D7A0F;
				padding: 1.25rem 0 0.09rem 0; 
				white-space:nowrap;
			    overflow:hidden;
			    text-overflow:ellipsis;
			}
			.l-text {
				width: 1.4rem;
				height: 0.4rem;
				padding: 0.05rem;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				font-size: 0.18rem;
				margin: 0 auto;
				color: #971213;
			}
			.btn-price {
				display: block;
				width: 1.37rem;
				height: 0.48rem;
				line-height: 0.48rem;
				text-align: center;
				background: url(../../images/league/button.png) no-repeat;
				background-size: 1.37rem 0.48rem;
				margin: 0.08rem auto 0;
				font-size: 0.26rem;
				font-weight: bold;
				color: #ffd143;
				&.active {
					background: url(../../images/league/button-bg.png) no-repeat;
					background-size: 1.37rem 0.48rem;
					color: #f2f1f1;
				}
			}
		}
	}
</style>