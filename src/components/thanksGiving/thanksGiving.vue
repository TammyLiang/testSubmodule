<template>
	<div class="pop-window">
		<div class="pop-mask"></div>
		<div class="c-dw">
			<div class="thank-giving">
				<a href="javascript:">
					<img src="../../images/thanksGiving/close.png" class="close" @click="close">
				</a>
				<div class="top-head">
					<img src="../../images/thanksGiving/top-text.png" class="top-text">
					<img src="../../images/thanksGiving/date-corner.png" class="date-corner">
					<div class="top-title">注：活动期间单个礼包限购五次</div>
				</div>
				<div class="major" >
					<div class="m-bow"></div>
					<div class="ribbon-box">
						<img src="../../images/thanksGiving/bottom-ribbon.png" class="bottom-ribbon">
						<img src="../../images/thanksGiving/package.png" class="package">
					</div>
					<div class="m-items">
						<ul>
							<li v-for="(item,index) in 3">
								<div class="corner">超值<br/>特惠</div>
								<div class="item-pic">
									<img :src="thankPic[index] | imgCurrency">
								</div>
								<p class="item-name">{{leaguePackage.leaguePacksList[index].name}}</p>
								<div class="item-text">
									<p>{{leaguePackage.leaguePacksList[index].content}}</p>
								</div>
								<div class="btn-box">
									<a href="javascript:" class="btn btn-normal" v-if="leaguePackage.leaguePacksList[index].buyStatus == 0" @click="buying(leaguePackage.leaguePacksList[index], index)">￥{{leaguePackage.leaguePacksList[index].price}}</a>
									<a href="javascript:" class="btn btn-overdue" v-else>￥{{leaguePackage.leaguePacksList[index].price}}</a>
								</div>
							</li>
						</ul>
					</div>

					<div class="preferential">
						<div class="prefer-box">
							<img src="../../images/thanksGiving/th-corner-hs.png" class="th-corner-hs">
							<div class="prefer-pic">
								<img src="static/image/04.png">
							</div>
							<div class="prefer-text">
								<h4>{{leaguePackage.leaguePacksList[3].name}}</h4>
								<div class="prefer-award">{{leaguePackage.leaguePacksList[3].content}}</div>
								<div class="btn-box">
									<a href="javascript:" class="btn btn-normal" v-if="leaguePackage.leaguePacksList[3].buyStatus == 0" @click="buying(leaguePackage.leaguePacksList[3],3)">￥{{leaguePackage.leaguePacksList[3].price}}</a>
									<a href="javascript:" class="btn btn-overdue" v-else>￥{{leaguePackage.leaguePacksList[3].price}}</a>
								</div>
							</div>
						</div>
					</div>

					<div class="preferential">
						<div class="prefer-box">
							<img src="../../images/thanksGiving/th-corner.png" class="th-corner">
							<div class="prefer-pic">
								<img src="static/image/05.png">
							</div>
							<div class="prefer-text">
								<h4>{{leaguePackage.leaguePacksList[4].name}}</h4>
								<div class="prefer-award">{{leaguePackage.leaguePacksList[4].content}}</div>
								<div class="btn-box">
									<a href="javascript:" class="btn btn-normal" v-if="leaguePackage.leaguePacksList[4].buyStatus == 0" @click="buying(leaguePackage.leaguePacksList[4],4)" >￥{{leaguePackage.leaguePacksList[4].price}}</a>
									<a href="javascript:" class="btn btn-overdue" v-else>￥{{leaguePackage.leaguePacksList[4].price}}</a>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				thanksGivingAward: {},
				thankPic: ['static/image/01.png','static/image/02.png','static/image/03.png'],
				showLoading: true
			}
		},
		props: {
			leaguePackage: {
				default: ''
			}
		},
		components: {
		},
		mounted() {
		},
		
		methods: {
			close() {
				this.$emit('close');
			},
			buying(item,index) {
				if(item  && item.buyStatus == 0){
                    localStorage.setItem('JDD_PARAM', JSON.stringify(item));
                    localStorage.setItem('originDeffer','');

                    this.thanksGivingAward.content = item.content;
                    this.thanksGivingAward.pic = 'static/image/0'+(index+1)+'.png';
                    console.log(this.thanksGivingAward)
                    localStorage.setItem('thanksGivingAward', JSON.stringify(this.thanksGivingAward));
                    setTimeout(() => {
                         window.location.href = '../../../../payment/#/payment';
                        // window.location.href = GLOBALS.curDomain + 'wap/payment/#/payment';
                    }, 0)
	            }else if(item.buyStatus == 1){
	                this.$toast({
	                    message: '您已购买过该商品哦~',
	                    duration: 2000
	                });
	            } else if(item.buyStatus == 2){
	                this.$toast({
	                    message: '该商品已售罄',
	                    duration: 2000
	                });
	            }
			}
		}
	}
</script>
<style lang="less" scoped>
	@import './thanksGiving';
</style>