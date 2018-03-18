<template>
	<div class="page-header">
		<div class="page-back">
			<a :href="linkHref">
				<img src="../../images/h-back.png" class="h-back">
			</a>
		</div>{{text}}
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			text: {
				type: String,
				default: ''
			},
			linkHref: {
				type: String,
				default: 'javascript:'
			}
		}
	}
</script>
<style lang="less">
	.page-header {
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		background: #212a40;
		position: relative;
		text-align: center;
		font-size: 0.34rem;
		color: #fff;
		border-bottom: 1px solid #383f53;
		.page-back {
			width: 0.62rem;
			height: 0.88rem;
			position: absolute;
			left: 0;
			top: 0;
		}
		.h-back {
			width: 0.2rem;
			height: 0.34rem;
			float: right;
			margin-top: 0.27rem;
		}
	}
</style>
