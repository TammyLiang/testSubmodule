<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="pop-fragmentation">
			<a href="javascript:">
				<img src="../../images/pop-close.png" class="pop-close">
			</a>
			<div class="f-title">碎片记录</div>
			<div class="f-nav">
				<ul>
					<li class="active">获取记录</li>
					<li>合成记录</li>
				</ul>
			</div>
			<div class="f-items">
				<div class="f-items-nav">
					<ul>
						<li>获取时间</li>
						<li>奖品</li>
						<li>来源</li>
					</ul>
				</div>
				<div class="f-item">
					<scroll>
						<ul>
							<li v-for="item in 5">
								<span>2017.03.21 22:15:13</span>
								<span>30元话费</span>
								<span>碎片合成</span>
							</li>
						</ul>
					</scroll>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import scroll from '../scroll/scroll';
	export default {
		components: {
			scroll
		},
	}
</script>
<style lang="less" scoped>
	.pop-fragmentation {
		width: 5.92rem;
		height: 7.7rem;
		background: url(../../images/fragmentation-record-bg.jpg) no-repeat center top;
		background-size: 100% 7.7rem;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		border-radius: 0.05rem;
		box-shadow: 0 0 0.08rem #d22650;
		z-index: 12;
		.pop-close {
			width: 0.68rem;
			height: 0.68rem;
			background: url(../../images/pop-close.png) no-repeat;
			position: absolute;
			right: -0.34rem;
			top: -0.34rem;
		}
		.f-title {
			height: 1.28rem;
			line-height: 1.28rem;
			text-align: center;
			background: url(../../images/running-article-bg.png) no-repeat center bottom;
			background-size: 100% 0.02rem;
			font-size: 0.32rem;
			color: #fff;
		}
		.f-nav {
			height: 0.54rem;
			line-height: 0.54rem;
			font-size: 0;
			text-align: center;
			margin: 0.3rem 0 0.05rem 0;
			li {
				width: 1.56rem;
				height: 0.54rem;
				line-height: 0.54rem;
				text-align: center;
				display: inline-block;
				font-size: 0.24rem;
				color: #fff;
				background: #4b1747;
				border-radius: 0.2rem;
				margin: 0 0.27rem;
				cursor: pointer;
				&.active {
					background: #b41155;
				}
			}
		}
		.f-items {
			width: 100%;
			position: relative;
		}
		.f-items-nav {
			height: 0.73rem;
			line-height: 0.73rem;
			ul {
				height: 0.73rem;
				display: flex;	
				align-items: center;
				font-size: 0.24rem;
			}
			li {
				flex: 1;
				text-align: center;
				color: #f4cf54;
			}

		}
		.f-item {
			width: 100%;
			height: 4.77rem;
			position: absolute;
			top: 0.73rem;
			bottom: 0;
			overflow: hidden;
			ul {
				
				font-size: 0.24rem;
			}
			li {
				display: flex;	
				align-items: center;
				height: 0.99rem;
				background: url(../../images/running-article-bg.png) no-repeat center top;
				background-size: 5.69rem 0.01rem;
				span {
					flex: 1;
					text-align: center;
				}
			}
		}	
	}
</style>