<template>
	<div class="group-input">
		<p class="title">
			<span>时间</span>
			<span>奖品</span>
			<span>状态</span>
		</p>
		<div class="back-box">
			<scroll :data="backRecord">
				<ul>
					<li v-for="item in backRecord">
						<span>{{item.periodTime}}</span>
						<span>{{item.remark}}</span>
						<span><i class="state-btn">
							{{item.verifyStatus == 4 ? '已发放' : (item.verifyStatus == 5 ? '审核中' : '审核未通过')}}
						</i></span>
					</li>
				</ul>
			</scroll>
		</div>
		<div class="no-record" v-if="backRecord && backRecord.length == 0">
            <p></p><br>
            暂无记录
        </div>
	</div>
</template>
<script type="text/javascript">
import scroll from '../scroll/scroll.vue'
import loading from '../common/loading.vue'
	export default {
		data() {
			return {
				timerCodeMsg: '',
				fetchCodeMsg: true,
			}
		},
		components: {
			scroll,
			loading
		},
		props: {
			backRecord: {
				type: Array,
				default: null
			},
		},
		methods: {

		}
	}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
