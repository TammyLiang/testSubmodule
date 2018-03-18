<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="fragment-desc">
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close" @click="close">
			</a>
			<div class="f-title sp-title-bg" >碎片说明</div>
			<div class="f-content">
				1. 碎片说明:<br>
				&nbsp;&nbsp;&nbsp;&nbsp;1） 碎片：即时发放，请前往平台背包查看。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;2） 话费：填写手机号码，待审核通过后即时充值，请注意查收短信；因运营商问题，部分地区每日限充5次，剩余话费将依次充值。<br>
				&nbsp;&nbsp;&nbsp;&nbsp;3） 实物奖品：待审核通过后发放，请注意查收快递<br>
				2. 禁止任何形式的作弊刷奖。若发现择取消派奖资格，已发送奖励有追回资格<br>
				3. 因网络波动影响，最终结果以碎片记录中详情为准<br>
				4. 请在中奖后准确填写收获信息，待审核通过后可在中奖纪录中查看快递号<br>
				5. 请在中奖后准确填写收获信息，待审核通过后可在中奖纪录中查看快递单号<br>
				6. 请勿拒收快递，拒收视为放弃领奖资格<br>
				7. 客服咨询电话：0512-62873936<br>
				8. 官方QQ群：602079021<br>
				<p>
					健康游戏公告<br>
					抵制不良游戏，拒绝盗版游戏<br>
					注意自我保护，谨防受骗上当<br>
					适度游戏益脑，沉迷游戏伤身<br>
					合理安排时间，享受健康生活<br>
				</p>

			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import API from '../../api';
	import scroll from '../scroll/scroll';
	export default {
		methods: {
			close() {
				this.$emit('close', false)
			}
		}
	}
</script>
<style lang="less" scoped>
	.fragment-desc {
		/*width: 5.92rem;*/
		width: 90%;
		height: 7.7rem;
		/*background: url(../../images/fragmentation-record-bg.jpg) no-repeat center top;*/
		background: url(../../images/game/common-pop-bg.jpg) repeat-x;
		background-size: 100% 7.7rem;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		border-radius: 0.08rem;
		border: 0.02rem solid #304a92;
		/*box-shadow: 0 0 0.08rem #d22650;*/
		animation: showAnimate .5s;

		z-index: 14;
		.pop-close {
			width: 0.68rem;
			height: 0.68rem;
			position: absolute;
			right: -0.34rem;
			top: -0.34rem;
		}
		.f-content{
			padding: .3rem;
			height: 5.5rem;
			line-height: .45rem;
			overflow-y: scroll;
			-webkit-overflow-scrolling : touch;
			p{
				margin-top: .3rem;
				text-align: center;
			}
		}
	}
	@keyframes showAnimate {
		from{opacity: 0}
		to{opacity: 1}
	}
</style>
