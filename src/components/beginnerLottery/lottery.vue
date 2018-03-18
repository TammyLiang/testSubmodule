<template>
	<div class="luck-draw" v-show="awardList">
		<div class="group-item">
			<div class="gift gift1">
				<img :src="awardList[0].awardsImage.split(';')[1]|imgCurrency" class="turn-award">
			</div>
			<div class="gift gift2">
				<img :src="awardList[1].awardsImage.split(';')[1]|imgCurrency" class="turn-award">
			</div>
			<div class="gift gift3">
				<img :src="awardList[2].awardsImage.split(';')[1]|imgCurrency" class="turn-award">
			</div>
		</div>
		<div class="group-item">
			<div class="gift gift0">
				<img :src="awardList[7].awardsImage.split(';')[1]|imgCurrency" class="turn-award">
			</div>
			<div  class="gift cj-gift">
				<span class="start-btn" @click="starBtn" v-if="!isEnd">
					<em class="text">剩余抽奖券：{{beginAwardData.bettingTimes}}</em>
				</span>
				<span class="start-btn" @click="endBtn" v-else>
					<em class="text">剩余抽奖券：{{beginAwardData.bettingTimes}}</em>
				</span>

			</div>
			<div class="gift gift4">
				<img :src="awardList[3].awardsImage.split(';')[1]|imgCurrency" class="turn-award">
			</div>
		</div>
		<div class="group-item">
			<div class="gift gift7">
				<img :src="awardList[6].awardsImage.split(';')[1]|imgCurrency" class="turn-award">
			</div>
			<div class="gift gift6">
				<img :src="awardList[5].awardsImage.split(';')[1]|imgCurrency" class="turn-award">
			</div>
			<div class="gift gift5">
				<img :src="awardList[4].awardsImage.split(';')[1]|imgCurrency" class="turn-award">
			</div>
		</div>

		<span class="luck-draw-active"></span>

	</div>
</template>
<script type="text/javascript">
	import popLottery  from './pop-lottery';
	import API from '../../api';
	import { bus } from '../../common/bus';
	export default {
		data() {
			return {
				stopStep: 1,
				runT: null,
				step: -1,
				during: 2,
				isEnd: false,
				isShow: false,
				msg: '',
				currentMsg: '',
				currentId: 0,
				isStart: false,
				awardList: '',
				awardResult: ''
			}
		},
		props: {
			beginAwardData: {
				default: ''
			},

		},
		created() {
			this.awardList = this.beginAwardData.awards;

		},
		components: {
		},
		methods: {
			goTennis() {
				this.isShow = false;
			},
			starBtn() {
				var that = this;
				this.axios.post(API.commonBetting, {
					'value': 2,
				}).then((response) => {
					if(response.data.code == 200) {
						if(this.beginAwardData.bettingTimes) {
							this.beginAwardData.bettingTimes = this.beginAwardData.bettingTimes - 1;
						}
						this.awardResult = response.data.data;
						for(var i=0; i< this.awardList.length; i++) {
							if(this.awardList[i].configId == response.data.data.configId) {
								this.currentMsg = response.data.data.awardsName;
								this.stopStep = i+1;
								this.runT=setTimeout(this.runF,100);
								this.$set(this.awardResult, 'awardsImage', this.awardList[i].awardsImage)
							}
						}
					}else {
						this.$emit('isAwardMessage', 1);
					}
					if(document.querySelector('.mint-toast')) {
						document.querySelector('.mint-toast').style.opacity = 0;
					}

			    })

			},
			close() {
				this.isShow = false;
			},
			endBtn() {
				// this.$toast({
				//   message: '您已经参与！',
				//   duration: 5000
				// });
				this.$emit('isAwardMessage', 2);
				if(document.querySelector('.mint-toast')) {
					document.querySelector('.mint-toast').style.opacity = 0;
				}

			},
			addClass(obj,className){
                //如果原来没有class
                if(obj.className == ""){
                    obj.className = className;
                }else{
                    var _index = this.classIndexOf(obj,className);
                    //如果原来没有这个新加的class
                    if(_index == -1){
                        obj.className += " " + className;
                    }
                }
            },
            removeClass(obj,className){
                //如果以前的元素不为空
                if(obj.className != ""){
                    var arrClassName = obj.className.split(" ");
                    var _index = this.classIndexOf(obj,className);
                    //如果存在要删除的class
                    if(_index != -1){
                        arrClassName.splice(_index,1);
                    }
                    obj.className = arrClassName.join(" ");
                }
            },
            classIndexOf(obj,v){
                var arrClassName = obj.className.split(" ");
                for(var i=0;i<arrClassName.length;i++){
                    if(arrClassName[i] == v){
                        return i;
                    }
                }
                return -1;
            },
			runF() {
				var that = this;
				if(this.step>=(32+this.stopStep))//设置转动多少圈
		        {
		            this.addClass(document.querySelector(".gift"+(this.step%8)),'active');
		            this.step= this.stopStep;
		            //弹窗显示处
		            this.$emit('isAwardMessage', this.awardResult);
		            if(this.awardResult.awardsType == 1) {
		            	bus.$emit('addLeaf', that.awardResult.awardsAmount);
		            }


		            clearTimeout(this.runT);//停止转动
		            this.isEnd = true;
		            return;
		        }
		        if(this.step>=(24+this.stopStep)){ //在即将结束转动前减速
		            this.during+=1;
			    }else{
		          if(this.during<=2){ //控制中间转速
		              this.during=2;
		          }
		          this.during--;
			    }
		        this.step++;
		        let oGift = document.querySelectorAll('.gift');
		        for(var i=0; i<oGift.length; i++) {
		        	that.removeClass(oGift[i], 'active');
		        }
		        this.addClass(document.querySelector(".gift"+(this.step%8)),'active')
		        this.runT=setTimeout(this.runF,this.during*50);
			}
		}
	}
</script>
<style  lang="less">

	.luck-draw {
		text-align: center;
	}
	.gift {
		width: 1.98rem;
		height: 1.13rem;
		overflow: hidden;
		text-align: center;
		font-size: 0.24rem;
		color: #C05A3D;
		box-sizing: border-box;
		background: url(../../images/beginnerLottery/drawprod-bg.png) no-repeat center center;
		background-size: 1.82rem 1.04rem;
		position: relative;
		margin: -0.045rem;
		&.active {
			background: url(../../images/beginnerLottery/drawprod-active-bg.png) no-repeat center center;
			background-size: 1.82rem 1.04rem;
		}
		.turn-award {
			width: 1.74rem;
			height: 0.92rem;
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			margin: auto;
		}
		.item-award {
			width: 100%;
			height: 0.72rem;
			position: relative;
			img {
				max-width: 80%;
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				right: 0;
				margin: auto;
			}
		}
	}
	.group-item {
		height: 1.13rem;
		font-size: 0;
		display: flex;
		justify-content: center;
	}
	.cj-gift {
		background: url(../../images/beginnerLottery/startBtn.png) no-repeat center center;
		background-size: 1.98rem 1.13rem;
		position: relative;
		top: 0.05rem;
		.text {
			width: 100%;
			font-size: 0.18rem;
			color: #fff;
			position: absolute;
			left: 0;
			bottom: 0.25rem;
		}
	}

	.start-btn {
		display: block;
		height: 1.13rem;
	}

	.luck-draw-active {
		color:#ff0000;
	}
	.pop-send {
		width: 80%;
		height: 3.5rem;
		background: #fff;
		border-radius: 0.1rem;
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 11;
		transform: translateX(-50%) translateY(-50%);
		text-align: center;
		.pop-spirit {
			width: 3.23rem;
			height: 2.23rem;
			position: absolute;
			left:50%;
			top: -1.24rem;
			transform: translateX(-50%);
		}
		h1 {
			font-size: 0.36rem;
			color: #474747;
			padding: 1.4rem 0 0.2rem 0;
		}
		p {
			font-size: 0.28rem;
			color: #777777;
		}
		.pop-button {
			width: 3.13rem;
			height: 0.9rem;
			position: absolute;
			left: 50%;
			bottom: 0.2rem;
			transform: translateX(-50%);
		}
		.pop-close {
			width: 0.4rem;
			height: 0.4rem;
			position: absolute;
			right: 0.2rem;
			top: 0.2rem;
		}
	}
	.pop-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: #000;
		opacity: 0.5;
		filter:alpha(opacity=50);
		z-index: 10;
	}
</style>
