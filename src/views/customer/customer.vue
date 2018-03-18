<template>
	<transition name="slide">
		<div class="customer">
			<headers text="客服专区" linkHref="#/Personal"></headers>
			<div class="customer-text">
				<p>官方qq群：602079021</p>
				<p>官方客服电话：<span>0512-62873936</span></p>
				<p class="c-tips">加入玩家QQ群可与更多玩家互动获取攻略哦</p>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	// import {headers} from '../../components';
	import headers from 'components/header/header';
	export default {
		components: {
			headers
		}
	}
</script>
<style lang="less" scoped>
	.customer {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: url(../../images/bigImage/bodybj.png) repeat;
	    background-size: 100% 100%;
	    z-index: 2;
		.customer-text {
			border-top: 0.02rem solid #383f53;
			text-align: center;
			font-size: 0.3rem;
			color: #fff;
			padding-top: 0.55rem;
			p {
				line-height: 0.48rem;
				&.c-tips {

					padding-top: 0.4rem;
				}
			}
			span {
				color: #5597ff;
			}
		}
	}
</style>
