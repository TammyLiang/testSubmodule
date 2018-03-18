<template>
		<div class="pop-window">
			<div class="pop-mask"></div>
				<div class="sign-animation">
					<img src="../../images/bigImage/sign-title.png" class="sign-title">
					<div class="sign">
						<div class="leaf-box">
							<transition-group name="shake">
					            <i class="leafs-2" key=""></i>
					            <i class="leafs-3" key=""></i>
					            <i class="leafs-4" key=""></i>
					            <i class="leafs-5" key=""></i>
					            <i class="leafs-6" key=""></i>
					        </transition-group>
				        </div>
						<ul>
							<li v-for="(item,index) in signData">
								<h4>{{item.title}}</h4>
								<span class="sign-box">
									<img :src="item.icon|imgCurrency" class="sign-pic">
								</span>
								<img src="../../images/sign/sign-mask.png" class="sign-mask" v-if="index != 7 && index < signlist.signedDay">
								<span class="leaf-number" v-if="index<7">{{signlist.moneyList[index]}}</span>
								<span class="leaf-number" v-else>随机</span>
							</li>
						</ul>
					</div>
				</div>
		</div>

</template>
<script type="text/javascript">
	import API from '../../api';
	import { bus } from '../../common/bus';
	export default {
		data() {
			return {
				signData:[
		          { title: '第一天', icon: 'static/image/sign-pic1.png', count: '--', done: false },
		          { title: '第二天', icon: 'static/image/sign-pic2.png', count: '--', done: false },
		          { title: '第三天', icon: 'static/image/sign-pic3.png', count: '--', done: false },
		          { title: '第四天', icon: 'static/image/sign-pic4.png', count: '--', done: false },
		          { title: '第五天', icon: 'static/image/sign-pic5.png', count: '--', done: false },
		          { title: '第六天', icon: 'static/image/sign-pic6.png', count: '--', done: false },
		          { title: '第七天', icon: 'static/image/sign-pic7.png', count: '--', done: false },
		          { title: '七天以上', icon: 'static/image/sign-pic8.png', count: '随机', done: false }
		        ],
		        tzStatus: false
			}
		},
		mounted() {
			//签到列表
			var that = this;
			setTimeout(() => {
				that.$emit('isSignHide', false);
			},1500)
			that.getnewuserawardlog();
			setTimeout(() => {
				that.getSigning();
			}, 1000)

		},
		props: {
			signlist: {
				type: Object,
				default: null
			}
		},
		methods: {
			getnewuserawardlog() {
				this.axios.post(API.isNewUserFirstIn, {
					isShowTotast: "false"
				}).then((response) => {
					if(response.data.code == 200) {
						this.tzStatus = true;
					}

				})
			},
			getSigning() {
                
				this.axios.post(API.signing).then((response) => {
			     	if(response.data.code == 200) {
			     		this.$toast({
							message: response.data.data + '金叶子领取成功',
							duration: 1000
						});
						setTimeout(()=> {
                            
							//领取后金叶子增加
							bus.$emit('addLeaf', response.data.data);
							//是否是第一天签到(第一天跳转桌球，第二天弹出充值送话费)
							if(this.tzStatus) {
								WapCall.openGame(2);
							}else {
								//每天弹出充值送话费
								bus.$emit('showExclusive', true);
								//弹出双11活动
								localStorage.setItem('firstSign',true);
							}
						},500)

			     	}
			    });
			},
		}
	}
</script>
<style lang="less" scoped>
	.sign-animation {
		width: 100%;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 14;
		animation:scales 0.8s ease;
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
	.sign-title {
		width: 100%;
		position: fixed;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		z-index: 15;
		padding-bottom: 5.45rem;
	}
	.leaf-number {
		display: block;
		line-height: 0.33rem;
		text-align: center;
		font-size: 0.24rem;
		color: #fbeb4d;
	}
	.sign {
		width: 5.9rem;
		height: 4.9rem;
		background: #162137;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 14;

		ul {
			overflow: hidden;
			margin-left: 0.04rem;
			padding-top: 0.7rem;
		}
		li {
			width: 1.24rem;
			height: 1.68rem;
			background: url(../../images/sign/sign-bg.png) no-repeat;
			background-size: 100% 100%;
			float: left;
			margin-left: 2.8%;
			margin-bottom: 0.32rem;
			position: relative;
			&:nth-child(1) span img,&:nth-child(8) span img {
				width:58%;
			};
			&:nth-child(5) span img {
				width:52%;
			};
			&:nth-child(6) span img {
				width: 60%;
			}
			h4 {
				font-weight: normal;
				height: 0.34rem;
				line-height: 0.34rem;
				text-align: center;
				font-size: 0.2rem;
			}
			.sign-mask {
				width: 100%;
				height: 100%;
				position: absolute;
				right: 0;
				top: 0;
			}
			.sign-box {
				display: block;
				width: 100% ;
				height: 1rem;
			}
			.sign-pic {
				max-width: 68%;
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				right: 0;
				margin: auto;
			}
		}
	}
	.leaf-box i{
		opacity: 0;
	}

    .top-leaf,.leafs,.leafs-2,.leafs-3,.leafs-4,.leafs-5,.leafs-6{
        position: absolute;
        bottom:0;
        right: 0%;
        width: .6rem;
        height: .6rem;
        background: url(../../images/sign/floatleaf.png) no-repeat;
        background-size: 100% 100%;
        /*animation-play-state: running;*/
        z-index: 2;
    }

    .leafs{animation: fadeup 1.5s ease .1s 1;}
    .leafs-2{animation: fadeup-2 1.5s ease .2s 1;}
    .leafs-3{animation: fadeup-3 1.5s ease .3s 1;}
    .leafs-4{animation: fadeup-4 1.5s ease .4s 1;}
    .leafs-5{animation: fadeup-3 1.5s ease .5s 1;}
    .leafs-6{animation: fadeup-4 1.5s ease .6s 1;}
    .upup(@top0,@left0,@left1,@top2,@left2){
        from {
          opacity: 1;
          transform: translate3d(0, 100%, 0);
        }
        /*0%{
            top:@top0;
            left: @left0;
            opacity:1;

         }
         50%{
             opacity:1;
             left: @left1;
             transform: rotate(90deg);
         }
         100%{
             opacity: 0;
             top: @top2;
             left: @left2;
            //  transform: rotate(45deg);
         }*/
         0% {
         	left: 80%;
         	bottom: 25%;
         	opacity: 1;
         }
         50% {
         	opacity: 1;
         	left:36%;
         	top: 56%;
         	transform: rotate(90deg);
         }
         100% {
         	opacity: 0;
         	left: 0;
         	top: 0;
         }
        to {
          opacity: 0;
          transform: none;
        }
    }
    @keyframes fadeup {
        .upup(39%,40%,25%,11%,26%);
    }
    @keyframes fadeup-2 {
        .upup(0%,50%,45%,11%,30%)
    }
    @keyframes fadeup-3 {
        .upup(39%,45%,40%,11%,26%)
    }
    @keyframes fadeup-4 {
        .upup(39%,42%,38%,11%,26%)
    }
</style>
