<template>
	<div class="support-record">
		<p class="support" v-if="supporeRecord">今日总支持：{{supporeRecord.subTotalChange}} <i @click="showRules"></i></p>
		<p class="title">
			<span>排行</span>
			<span>昵称</span>
			<span>今日支持</span>
		</p>
		<div class="support-box">
			<scroll :data="supporeRecord">
				<ul v-if="supporeRecord">
					<li v-for="(item,index) in supporeRecord.subChangeList">
			            <span v-if="index < 3">
			                <img v-if="index == 0" src="../../images/medal-gold.png">
			                <img v-if="index == 1" src="../../images/medal-sliver.png">
			                <img v-if="index == 2" src="../../images/medal-copper.png">
			            </span>
			            <span v-else>{{index+1}}</span>
			            <span>{{item.nickName}}</span>
			            <span>{{item.personalChange}}</span>
			        </li>
				</ul>
			</scroll>
		</div>
		<transition name="rule">
			<div class="rule-wrap" v-if="showRule">
				<p>规则说明:<span @click="showRule=false"><i></i></span></p>
				<div class="rule-detail">
					<p v-for="(item,index) in getRuleDetail">
						{{index+1}}.&nbsp;{{item.remark}}
					</p>
					<p class="tips">注：单个好友总支持100以下不计入邀请返利。</p>
				</div>
			</div>
		</transition>
		<div class="no-record" v-if="supporeRecord && supporeRecord.length == 0">
            <p></p><br>
            暂无记录
        </div>
	</div>
</template>
<script type="text/javascript">
import API from '../../api';
import scroll from '../scroll/scroll.vue'
	export default {
		data() {
			return {
				timerCodeMsg: '',
				fetchCodeMsg: true,
				showRule:false,
				getRuleDetail : null
			}
		},
		components: {
			scroll,
		},
		props: {
			supporeRecord: {
				type: Object,
				default: null
			},
		},
		methods: {
			showRules(){
				this.showRule = true
				this.axios.post(API.AwardbackruleList,{
				}).then((response) => {
					if(response.data.code == 200){
						this.getRuleDetail = response.data.data;
					}
				})

			}
		}
	}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
