<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="pop-bill">
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close" @click="close">
			</a>
			<img src="../../images/bigImage/pic_getprop.png" class="pic_getprop">
			<div class="bill-header">
				<h4 class="bill-title">恭喜您获得<span>{{receiveData.awardsName}}</span></h4>
			</div>
			<div class="bill-content">
				<h5>● 请填写以下信息用于发放奖品</h5>
				<div class="b-group">
					<input type="text" placeholder="真实姓名" v-model="name"/>
				</div>
				<div class="b-group">
					<input type="text" placeholder="请输入手机号" v-model="phone"/>
				</div>
				<a href="javascript:" class="btn-confirm" @click="submit">确定</a>
			</div>
		</div>
		<pop :showPop="showPop" :popContent="popContent" :popBtn="popBtn"  @close="showPop=false"></pop>
	</div>
</template>
<script type="text/javascript">
	import API from '../../api';
	import pop from '../common/popMask';
	import utils from '../../common/utils.js';
	export default {
		data() {
			return {
				name: '',
		        phone: '',
		        popBtn: "确定",
				showPop: false,
				popContent: '',
			}
		},
		props: {
			receiveData: {
				type: Object,
				default: {}
			}
		},
		components: {
			pop
		},
		mounted() {
		},
		methods: {

			close() {
				this.$emit('close');
			},
			submit() {
				this.getSaveAddress();
			},
			getSaveAddress() {
				if(this.name =='') {
					this.$toast({
						message: '姓名不得为空',
						duration: 1500
					});
					return;
				}
				let vAccount = utils.checkValidate('phone',this.phone);
				if(this.phone == ''){
	                this.$toast({
						message: '请输入您的手机号！',
						duration: 1500
					});
	                return;
	            }else if(vAccount != '') {
	                this.$toast({
						message: '手机号格式不正确！',
						duration: 1500
					});
	                return;
	            }
				this.axios.post(API.SaveAddress, {
					recName: this.name,
            		recMobile: this.phone,
            		recordId: this.receiveData.recordId,
				}).then((response) => {
					if(response.data.code == 200 && response.data.data.isSuccess) {
						this.$toast('领取成功!');
						this.$emit('close',true);
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.pop-bill {
		/*width: 5.92rem;*/
		width: 84%;
		height: 6.05rem;
		background: url(../../images/knapsack/pop-bill-bg.jpg) repeat-x center top;
		background-size: 100% 6.05rem;
		border: 0.02rem solid #304a92;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		border-radius: 0.08rem;
		z-index: 14;
		.pop-close {
			width: 0.68rem;
			height: 0.68rem;
			position: absolute;
			right: -0.34rem;
			top: -0.34rem;
		}
		
		.bill-header {
			height: 2.14rem;
			background: url(../../images/running-article-bg.png) no-repeat center bottom;
			background-size: 5.69rem 0.02rem;
		}
		.bill-title {
			font-size: 0.48rem;
			color: #fffefe;
			text-align: center;
			padding-top: 1.1rem;
			span {
				color: #fd2383;
			}
		}
		.bill-content {
			width: 5.21rem;
			overflow: hidden;
			margin: 0 auto;
			h5 {
				font-size: 0.2rem;
				font-weight: normal;
				color: #b2b2b2;
				margin: 0.27rem 0 0.17rem 0;
			}
			.btn-confirm {
				display: block;
				width: 3.28rem;
				height: 1rem;
				line-height: 1rem;
				text-align: center;
				font-size: 0.3rem;
				color: #fff;
				background: url(../../images/game/lq-btn.png) no-repeat center center;
				background-size: 2.25rem 0.76rem;
				margin: 0 auto;
			}
		}
		.b-group {
			width: 5.21rem;
			margin-bottom: 0.32rem;
			input {
				width: 100%;
				height: 0.71rem;
				line-height: 0.71rem;
				border: none;
				outline: none;
				background: #1b3b6f;
				box-sizing: border-box;
				text-indent: 0.18rem;
				font-size: 0.24rem;
				color: #ccc;
				border-radius: 0.05rem;
			}
		}
	}
</style> 