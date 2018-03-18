<template>
	<transition name="list-fade">
		<div class="my-invite">
			<headers text="我邀请的好友"  linkHref="#/invite"></headers>
			<p class="tab-title">
				<ul>
					<li :class="{'current':showSupport}" @click="showRecordPage('support')"><span>支持记录</span></li>
					<li :class="{'current':!showSupport}" @click="showRecordPage('back')"><span>返利记录</span></li>
				</ul>
				<p class="box-line"></p>
			</p>
			<!-- 支持记录 -->
			<supportRecord v-show="showSupport" :supporeRecord="getSupportRecord"></supportRecord>
			<!-- 返利记录 -->
			<backRecord v-show = "!showSupport" :backRecord="getBackRecord"></backRecord>

			<loading v-show="showLoading"></loading>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import API from '../../api';
	// import {headers,supportRecord,backRecord,loading} from '../../components';

	import headers from 'components/header/header';
	import supportRecord from 'components/supportRecord/support';
	import backRecord from 'components/supportRecord/back';
	import loading from 'components/common/loading';

	export default {
		data(){
			return{
				showSupport : true,
				getSupportRecord : this.$route.params.supportRecord,
				getBackRecord : null,
				invitations: this.$route.params.invitations,
				showLoading: false
			}
		},
		components:{
			headers,
			supportRecord,
			backRecord,
			loading
		},
		beforeMount(){
			this.showRecordPage('support')
		},
		methods: {
			showRecordPage(val){
				if(val == 'support'){
					this.showSupport = true
					if(!this.getSupportRecord){
						this.axios.post(API.Changeranking,{
							invitationCode: this.invitations,
							page: 1,
							pageSize: 100
						}).then((response) => {
							if(response.data.code == 200){
								this.getSupportRecord = response.data.data;
							}
						})
					}
				}else{
					this.showSupport = false
					this.axios.post(API.BacklogBacklist,{
						page: 1,
						pageSize: 100
					}).then((response) => {
						if(response.data.code == 200){
							this.getBackRecord = response.data.data;
						}
					})
				}
			},
		}
	}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
