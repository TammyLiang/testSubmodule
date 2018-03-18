<template>
	<div>
		<div v-show="!showLoading">
			<receive-list :receiveList="receiveDatas" v-on:receivePop="receivePop"></receive-list>
		</div>
		<loading :smaller="true" v-show="showLoading"></loading>

		<!-- 领取话费弹窗 -->
		<pop-bill v-on:close="handlePopBillClose" v-if="isPopBill" :receiveData="receiveData"></pop-bill>

		<!-- 领取京东卡 -->
		<pop-card v-on:close="handlePopCardClose" v-if="isPopCard" :receiveData="receiveData"></pop-card>

		<!-- 查询物流 -->
		<popwl v-on:close="handlePopWlClose" v-if="isPopWl" :receiveData="receiveData"></popwl>

		<!-- 领取实物 -->
		<pop-material v-on:close="handlePopMaterialClose" v-if="isPopMaterial" :receiveData="receiveData"></pop-material>
		<!--  提示登录 -->
		<bind-pop v-if="showBindPop" @close="closeBind" :showClose="true">
			<p>为了确保您的中奖信息安全 <br>验证领奖信息的准确性 <br>请先完成账号登录</p>
			<p>
				<span @click="goLogin" class="gologin"></span>
			</p>
		</bind-pop>
	</div>
</template>
<script type="text/javascript">
	import API from '../../api';
	import scroll from '../scroll/scroll';
	import receiveList from './receiveList';
	import popMaterial from './popMaterial';
	import popCard from './popJdCard';
	import popBill from './popBill';
	import popwl from './popwl';
	import loading from '../common/loading';
	import bindPop from '../loginPop/bindPop.vue'
	export default {
		data() {
			return {
				// receiveDatas: '',
				isPopBill: false,
				isPopMaterial: false,
				isPopCard: false,
				refreshDelay: 120,
				visitorLogin : false,
				isPopWl: false,
				showBindPop : false,
				
				// showLoading: true
			}
		},
		components: {
			receiveList,
			popMaterial,
			popCard,
			popBill,
			scroll,
			loading,
			bindPop,
			popwl
		},
		props: {
			receiveDatas: {
				default: ''
			},
			showLoading: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			handlePopWlClose() {
				this.isPopWl = false;
			},
			handlePopCardClose() {
				this.isPopCard = false;
			},
			handlePopMaterialClose(parmas) {
				if(parmas) {
					this.receiveDatas[this.xqIndex].receiveStatus = 2;
				}
				this.isPopMaterial = false;
			},
			receivePop(item,index) {
				this.xqIndex = index;
				this.receiveData = item ? item : {};
				this.visitorLogin = localStorage.getItem('userid') ? true : false
				let isVisitor = localStorage.getItem('visitorLogin') ? JSON.parse(localStorage.getItem('visitorLogin')) : null

				if(item && item.awardsType === 9) {
					if(this.visitorLogin && isVisitor){
						this.showBindPop = true
					}else{
							if(item.receiveStatus == 3) {
							this.isPopWl = true;
						}else {
							this.isPopMaterial = true;
						}
					}
				}else if(item && item.receiveStatus == 1 && (item.awardsType == 3 || item.awardsType == 11 || item.awardsType == 4)) {
					if(this.visitorLogin && isVisitor){
						this.showBindPop = true
					}else{
						if(item.receiveStatus == 1) {
							this.isPopBill = true;
						}else if(item.receiveStatus == 3) {
							this.isPopWl = true;
						}
					}
				}else if(item && item.receiveStatus == 3 && item.awardsType == 4) {
					if(this.visitorLogin && isVisitor){
						this.showBindPop = true
					}else{
						this.isPopCard = true;
					}
				}
			},
			handlePopBillClose(parmas) {
				if(parmas) {
					this.receiveDatas[this.xqIndex].receiveStatus = 2;
				}
				this.isPopBill = false;
			},
			goLogin(){
				window.location.href = GLOBALS.loginUrl;
			},
			closeBind(val){
	  			  this.showBindPop = false
	  		  },
			// getCatchedawards() {
			// 	this.axios.post(API.Catchedawards, {
			// 		page: 1,
			// 		pageSize: 20
			// 	}).then((response) => {
			// 		this.receiveDatas = response.data.data;
			// 		this.showLoading = false;
			// 		this.$emit('awardNumber', this.receiveDatas.length);
			// 	})
			// }
		},
		mounted() {
			// this.getCatchedawards();
		}
	}
</script>
