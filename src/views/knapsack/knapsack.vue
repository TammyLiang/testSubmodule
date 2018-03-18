<template>
	<div class="knapsack">
		<div class="k-header">
			<div class="k-title">
				<img src="../../images/knapsack/k-fragment.png" class="icon-fragment">我的碎片包
			</div>
			<div class="k-icon">
				<img src="../../images/knapsack/k-record.png" class="icon-record" @click="showFragmentRecord">
				<img src="../../images/knapsack/k-question.png" class="question-mark" @click="showFragmentDesc">
			</div>
		</div>
		<div class="k-fragment">
			<div class="k-fragment-coupons">
				<div class="coupons-scroll">
					<scroll :data="newShards" :scrollX="true" :scrollY="false">
						<ul ref="couponsUl">
							<li v-for="item in newShards" ref="couponsLi" >
								<div class="pic-box" @click="showPopFragmentCoupons(item,$event)">
									<img :src="item.image|imgCurrency" class="icon-coupons">
								</div>
								<span class="k-fragment-pice">{{item.price}}</span>
							</li>
						</ul>
					</scroll>
				</div>
			</div>
			<div class="k-fragment-material">
				<div class="coupons-scroll">
					<scroll :data="oldShards" :scrollX="true" :scrollY="false">
						<ul ref="materialUl">
							<li v-for="item in oldShards" ref="materialLi" @click="showPopFragmentMaterial(item)">
								<div class="material-bg">
									<div class="pic-box">
										<img :src="item.image|imgCurrency" class="icon-material">
									</div>
									<span class="percent-rate"><i>{{item.fragmentNum}}</i>/{{item.changeNum}}</span>
								</div>
							</li>
						</ul>
					</scroll>
				</div>
			</div>
		</div>
		<div class="k-header">
			<div class="k-title">
				<img src="../../images/knapsack/k-reward.png" class="icon-gift">奖励
			</div>
		</div>
		<div class="k-items">
			<div class="k-items-nav">
				<ul>
					<li>领奖时间</li>
					<li>奖品</li>
					<li>状态</li>
				</ul>
			</div>
			<div class="k-item"  v-show="!showLoading">
				<div v-if="receiveDatas && receiveDatas.length" :click="true">
					<receive-list :receiveList="receiveDatas" v-on:receivePop="receivePop"></receive-list>
				</div>
				<div class="k-item-box" v-else>
					<img src="../../images/bigImage/knapsack.png" class="package-bg">
				</div>
			</div>
		</div>
		<c-footer :currentIndex="2"></c-footer>

		<!-- 碎片合成记录 -->
		<fragment-record v-on:close="handleFragmentClose" v-if="isFragment"></fragment-record>
		<!-- 碎片说明 -->
		<fragment-desc v-on:close="handleFragmentDescClose" v-if="isFragmentDesc"></fragment-desc>

		<!-- 合成碎片 -->
		<fragment-coupons :couponsData="fragmentCouponsData" v-if="isFragmentCoupons" v-on:close="handleFragmentCouponsClose"></fragment-coupons>

		<!-- 合成老碎片 -->
		<fragment-material :materialData="fragmentMaterial" v-if="isFragmentMaterial" v-on:close="handleFragmentMaterialClose"></fragment-material>

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

		<loading v-show="showLoading"></loading>
	</div>
</template>
<script type="text/javascript">
	import scroll from 'components/scroll/scroll';
	import API from '../../api'
	import { bus } from '../../common/bus';
	export default {
		data() {
			return {
				fragmentRich: '',
				richArr: '',
				newShards: [],
				oldShards: [],
				isFragment: false,
				isFragmentDesc: false,
				isFragmentCoupons: false,
				fragmentCouponsData: '',
				isFragmentMaterial: false,
				fragmentMaterial: '',
				isPopBill: false,
				isPopCard: false,
				isPopMaterial: false,
				receiveData: '',
				receiveDatas: '',
				materialStatus: false,
				xqIndex: '',
				showLoading : true,
				showBindPop : false,
				isPopWl: false
			}
		},
		components: {
			scroll,
			'receiveList':() => import('components/receive/receiveList'),
			'fragmentRecord':() => import('components/fragment/fragmentRecord'),
			'fragmentDesc':() => import('components/fragment/fragmentDesc'),
			'fragmentCoupons':() => import('components/fragment/popFragmentCoupons'),
			'fragmentMaterial':() => import('components/fragment/popFragmentMaterial'),
			'popBill':() => import('components/receive/popBill'),
			'popCard':() => import('components/receive/popJdCard'),
			'popMaterial':() => import('components/receive/popMaterial'),
			'receiveCommon':() => import('components/receive/popReceiveCommon'),
			'cFooter':() => import('components/footer'),
			'loading':() => import('components/common/loading'),
			'bindPop':() => import('components/loginPop/bindPop'),
			'popwl':() => import('components/receive/popwl')
		},
		methods: {
			handlePopWlClose() {
				this.isPopWl = false;
			},
			receivePop(item,index) {
				this.xqIndex = index;
				this.receiveData = item ? item : {};
				let visitorLogin = localStorage.getItem('userid') ? true : false
				let isVisitor = localStorage.getItem('visitorLogin') ? JSON.parse(localStorage.getItem('visitorLogin')) : null
				 /**
				 * receiveStatus : 1-待领取 2-审核中 3-已发放 4-可领取
				 * awardsType ： 1-金叶子  3-话费 4- 京东卡 9-实物 11-流量
				 **/
				if(item && item.awardsType === 9) {
					if(visitorLogin && isVisitor){
						this.showBindPop = true
					}else{
						if(item.receiveStatus == 3) {
							this.isPopWl = true;
						}else {
							this.isPopMaterial = true;
						}
					}

				}else if(item && item.receiveStatus == 1 && (item.awardsType == 3 || item.awardsType == 11 || item.awardsType == 4)) {
					if(visitorLogin && isVisitor){
						this.showBindPop = true
					}else{
						if(item.receiveStatus == 1) {
							this.isPopBill = true;
						}else if(item.receiveStatus == 3) {
							this.isPopWl = true;
						}
					}

				}else if(item && (item.receiveStatus == 3 && item.awardsType == 4)) {
					if(visitorLogin && isVisitor){
						this.showBindPop = true
					}else{
						this.isPopCard = true;
					}
				}
			},
			handlePopMaterialClose(parmas) {
				if(parmas) {
					this.receiveDatas[this.xqIndex].receiveStatus = 2;
				}
				this.isPopMaterial = false;
			},
			handlePopCardClose() {
				this.isPopCard = false;
			},
			handlePopBillClose(parmas) {
				if(parmas) {
					this.receiveDatas[this.xqIndex].receiveStatus = 2;
				}
				this.isPopBill = false;
			},
			showPopFragmentMaterial(item) {
				this.fragmentMaterial = item;
				this.isFragmentMaterial = true;
			},
			handleFragmentMaterialClose() {
				this.isFragmentMaterial = false;
			},
			showPopFragmentCoupons(item,e) {
				this.fragmentCouponsData = item;
				this.isFragmentCoupons = true;
			},

			handleFragmentCouponsClose() {
				this.isFragmentCoupons = false;
			},
			showFragmentDesc() {
				this.isFragmentDesc = true;
			},
			handleFragmentDescClose() {
				this.isFragmentDesc = false;
			},
			showFragmentRecord() {
				this.isFragment = true;
			},
			handleFragmentClose() {
				this.isFragment = false
			},
			getFragmentRich() {
				var that = this;
				this.axios.post(API.FragmentRich, {
					page: 1,
					pageSize: 100
				}).then((response) => {
					this.showLoading = false
			     	this.richArr = (response.data.code == 200) ? response.data.data:[];
			     	let newShard = [];
			     	let oldShard = [];

			        for(var i=0; i< that.richArr.length; i++) {
			          if(that.richArr[i].fragmentId === 7 || that.richArr[i].fragmentId === 8) {
			            newShard.push(that.richArr[i]);
			          }else {
			            oldShard.push(that.richArr[i]);
			          }
			        }
			        that.newShards = newShard;
			        that.oldShards = oldShard;
			        that.$nextTick(() => {
			        	// part1

						let couponsLiWidth = that.$refs.couponsLi ? that.$refs.couponsLi[0].offsetWidth:0;

						// console.log('style---',this.$refs.couponsUl)
						that.$refs.couponsUl.style.width = couponsLiWidth *  that.newShards.length +10 +'px';

						// part2
						let materialLiWidth =  that.$refs.materialLi ? that.$refs.materialLi[0].offsetWidth:0;
						that.$refs.materialUl.style.width = materialLiWidth *  that.oldShards.length +10 +'px';
			        })

			    })
			},
			getCatchedawards() {
				this.axios.post(API.Catchedawards, {
					page: 1,
					pageSize: 100
				}).then((response) => {
					this.receiveDatas = response.data.data;
				})
			},
			goLogin(){
				let urls = encodeURIComponent('/game?type=jdd&status=bind')
	            location.href='http://m.okooo.com/user/login.php?FromUrl='+urls;
				// this.$router.replace('/loginPop')
			},
			closeBind(val){
	  			  this.showBindPop = false
	  		  },
		},
		mounted() {
			this.getFragmentRich();
			this.getCatchedawards();
			var that = this;
			bus.$on('isCatchedawards',function(status) {
				if(status) {
					setTimeout(() => {
						that.getFragmentRich();
						that.getCatchedawards();
					},1000)

				}
			})
		}
	}
</script>
<style lang="less" scoped>
	@import './knapsack.less';
</style>
