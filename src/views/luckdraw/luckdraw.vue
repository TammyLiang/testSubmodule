<template>
	<div class="luck-draw">
		<div class="luck-header">
			<ul>
				<li>
					<div class="ring-box"  @click="openGames(3)">
						<img src="../../images/bigImage/tc-ring.png" class="tc-ring">
						<span class="draw-tips" v-if="totalNum && totalNum > 0">免费x{{totalNum}}</span>
					</div>
				</li>
				<li>
					<div class="ring-box"  @click="openGames('bzRing')">
						<img src="../../images/luckdraw/bz-ring.png" class="bz-ring">
						<!-- <span class="draw-tips">免费x1</span> -->
					</div>
				</li>
			</ul>
		</div>
		<div class="k-header">
			<ul>
				<li :class="{'current':showsale}" @click="showTab('showsale')" v-if="showSaleTab && giftList"><span>限时换购</span></li>
				<li :class="{'current':!showsale && giftList}" @click="showTab"><span>套圈大神榜</span></li>
			</ul>
		</div>
		<div class="luck-content" v-if="!showsale">
			<div class="luck-title">
				<ul>
					<li>奖品</li>
					<li>中奖类型</li>
					<li>中奖时间</li>
					<li>大神昵称</li>
				</ul>
			</div>
			<div class="luck-items">
				<scroll :data="getManitoList">
					<ul>
						<li v-for="item in getManitoList">
							<span>{{item.name}}</span>
							<span>欢乐套圈</span>
							<span>{{item.create_time}}</span>
							<span>
								<i v-if="item.user_name">{{item.user_name}}</i>
								<i v-else>null</i>
							</span>
						</li>
					</ul>
				</scroll>
			</div>
		</div>
		<flashsale v-if="showsale" :giftList="giftList" :countDown="countDown" @getData="getData"></flashsale>
		<c-footer :currentIndex="3"></c-footer>
		<loading v-show="showLoading"></loading>
	</div>
</template>
<script type="text/javascript">
	import scroll from 'components/scroll/scroll';
	import API from '../../api'
	export default {
		data() {
			return {
				getManitoList: '',
				showLoading : true,
				totalNum: '',
				showsale : false,
				showSaleTab: false,
				giftList : null,
	            countDown : {
	                time : "00:00:00"
	            },
				noSaleTab: false
			}
		},
		components: {
			scroll,
			'cFooter':() => import('components/footer'),
			'loading':() => import('components/common/loading'),
			'flashsale':() => import('components/flashSale'),
		},
		methods: {
			getAllData(){
	            this.axios.post(API.recharge).then((response) => {
	                let params = response.data
	                if(params.code == 200){
						if(params.data.status == 1){
							this.showsale = true
							this.showSaleTab = true
							this.giftList = params.data
							this.countDown.time = this.giftList.countDown
							GLOBALS.loopTime(this,this.countDown)
						}else{
							this.showsale = false
							this.showSaleTab = false
						}
	                }
	            })
	        },
			getGetManitoList() {
				this.axios.post(API.GetManitoList).then((response) => {
					this.getManitoList = response.data.data;
					this.showLoading = false
				})
			},
			getFreeTimes() {
				this.axios.post(API.freeTimes).then((response) => {
					if(response.data.code == 200) {
						let curs = response.data.data;
						this.totalNum = curs.quoitsHighTimes + curs.quoitsLowTimes + curs.quoitsMiddleTimes;
					}
				})
            },
            getData(data){
                this.giftList = data
                this.countDown.time = data.countDown
            },
			openGames(type) {
				if(type == 'bzRing') {
					window.location.href= '../../ring?channel=100006&id=2';
				}else {
					WapCall.openGame(type);	
				}
			},
			showTab(val){
				if(val == 'showsale'){
					this.showsale = true;
				}else{
					this.showsale = false;
				}
			}
		},
		mounted() {
			this.getAllData()
			this.getGetManitoList();
			this.getFreeTimes();
		}
	}
</script>
<style lang="less" scoped>
	@import './luckdraw.less';
</style>
