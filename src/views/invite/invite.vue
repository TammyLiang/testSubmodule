<template>
	<transition name="slide">
		<div class="my-invite">
			<headers text="分享秒变壕"  linkHref="#/Personal">
				<span class="add-invite" v-if="!myCode.parentInvitationCode" @click="showPop=true">填写邀请码</span>
				<span class="add-invite" v-else @click="showInviteInfo">{{myCode.parentInvitationCode}}</span>
			</headers>
			<div class="my-code">
				<span>我的邀请码</span>
				<span v-if="myCode.invitationCode">{{myCode.invitationCode}}</span>
				<span v-else>暂无</span>
			</div>
			<p class="tips">邀请好友拿分成 金额奖励无上限</p>
			<!-- <p class="sharebtn" @click="share">分&nbsp;享</p> -->
			<p class="invite-friends" @click="goInviteList">我邀请的好友></p>
			<div class="rules">
				<p class="title">
					<span class="line left"></span>
					奖励规则
					<span class="line right"></span>
				</p>
				<p>
					<span>1.</span>
					<span>
						邀请好友注册，让好友打开该页面，在右上角输入您的邀请码确认邀请关系即可；
					</span><br>
					<span>2.</span>
					<span>您邀请的好友在每局游戏中产生的支持，都会有一部分作为邀请返利返到您的账户，
						可在“我的好友—返利记录”中查看您的邀请返利记录</span>
				</p>
			</div>
			<pop :showPop="showPop" popBtn="确定"
	         :goPage="close" @close="closetips">
			 	<p class="input">请输入邀请码</p>
			 	<input type="text" class="input-box" maxLength="10" ref="codeval">
			</pop>
			<pop :showPop="showInvite" popBtn="确定邀请关系"
	         :goPage="closeInvite" @close="showInvite=false">
			 	<img class="heading" v-if="getInvitiedUserInfo && getInvitiedUserInfo.headImg" :src="getInvitiedUserInfo.headImg|imgCurrency"/>
				<img class="heading" v-else src="../../images/img_photo.png" >
				<span class="info" v-if="getInvitiedUserInfo">
					昵&nbsp;&nbsp;&nbsp;称:{{getInvitiedUserInfo.nickname || null}} <br>
					邀请码:{{getInvitiedUserInfo.invitationCode || null}}
				</span>
				<span class="info" v-else>
					昵&nbsp;&nbsp;&nbsp;称: null<br>
					邀请码: null
				</span>
			</pop>
			<pop :showPop="showFriendInfo" @close="showFriendInfo=false">
			 	<img class="heading" v-if="getInvitiedUserInfo" :src="getInvitiedUserInfo.headImg|imgCurrency"/>
				<img class="heading" v-else src="../../images/img_photo.png" >
				<span class="info" v-if="getInvitiedUserInfo">
					昵&nbsp;&nbsp;&nbsp;称:{{getInvitiedUserInfo.nickname || null}} <br>
					邀请码:{{getInvitiedUserInfo.invitationCode || null}}
				</span>
				<span class="info" v-else>
					昵&nbsp;&nbsp;&nbsp;称: null<br>
					邀请码: null
				</span>
			</pop>
			 <pop :showPop="noInvite" popContent="暂无邀请的好友" popBtn="确定" :goPage="closeAddCode" @close="noInvite=false"></pop>
		</div>
	</transition>
</template>
<script type="text/javascript">
	// import {headers,pop} from '../../components';
	import headers from 'components/header/header';
	import pop from 'components/common/popMask';

	import API from '../../api';
	export default {
		data() {
			return {
				currentIndex: 1,
				changeranking : null,
				backList : null,
				showPop: false,
				showInvite :false,
				showFriendInfo : false,
				myCode : '',
				inputCode : '',
				getInvitiedUserInfo : null,
				toAddCode : false,
				getSupportRecord : null,
				noInvite: false
			}
		},
		components: {
			headers,
			pop
		},
		beforeMount() {
			this.getMyCode()
		},
		methods: {
			closetips() {
				this.showPop=false;
				this.$refs.codeval.value ='';
			},
			getMyCode(){
				this.axios.post(API.Invitationcodeandqr,{
				}).then((response) => {
					if(response.data.code == 200){
						this.myCode = response.data.data;
						this.axios.post(API.Changeranking,{
							invitationCode: this.myCode.invitationCode,
							page: 1,
							pageSize: 100
						}).then((response) => {
							if(response.data.code == 200){
								this.getSupportRecord = response.data.data;
							}
						})
					}
				})
			},
			showInviteInfo(){
				this.axios.post(API.Invitationuserinfo,{
					parentInvitationCode: this.myCode.parentInvitationCode
				}).then((response) => {
					if(response.data.code == 200){
						this.getInvitiedUserInfo = response.data.data;
						this.showFriendInfo=true
					}
				})
			},
			close(){
				// 验证邀请码
				this.inputCode = !this.myCode.parentInvitationCode ?  this.$refs.codeval.value : this.myCode.parentInvitationCode;
				if(this.inputCode != ''){
					this.axios.post(API.Invitationuserinfo,{
						parentInvitationCode: this.inputCode
					}).then((response) => {
						if(response.data.code == 200){
							this.getInvitiedUserInfo = response.data.data;
							this.showPop=false
							this.showInvite = true
							// this.inputCode = ''
						}
					})
				}else{
					this.$toast('请输入邀请码')
				}
	        },
			closeInvite(){
				// 验证邀请关系
				this.axios.post(API.Invitationcodebind,{
					parentInvitationCode: this.inputCode
				}).then((response) => {
					if(response.data.code == 200){
						this.showInvite = false
						this.myCode.parentInvitationCode = this.getInvitiedUserInfo.invitationCode;
					}
				})
			},
			goInviteList(){
				if(!this.getSupportRecord){
					this.noInvite = true
				}else{
					this.$router.push({
						name: 'myInvite',
						params: {
							invitations: this.myCode.invitationCode,
							supportRecord: this.getSupportRecord
						}
					})
				}
			},
			closeAddCode(){
				this.noInvite=false
			},
			share(){
				this.isShare = true;
				// document.getElementById('m-share').style.display = 'block'
			}
		},

	}
</script>
<style lang="less" scoped>
	@import "./invite.less";
</style>
