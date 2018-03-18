<template>
	<div  class="pop-window">
		<div class="pop-mask"></div>
		<transition name="slide">
			<div class="rule-details">
				<div class="rule-title-bg">
					<div class="rule-details-title">规则详情
						<a href="javascript:" class="xl-box" @click="close">
							<img src="../../images/game/xl-arrow.png" class="xl-arrow">
						</a>
					</div>
				</div>
				<div class="rule-details-content">
					<div class="rule-scroll" v-show="!showLoading">
						<scroll :data="ruleDescBottom">
							<div>
								<div class="ranking-content">
									<p v-for="item in truleDescTop">{{item}}</p>
								</div>
								<div class="ranking-table">
									<table cellspacing="0" cellpadding="0">
										<tbody>
											<tr v-for="item in ruleDetails">
												<td>{{item.condition}}</td>
												<td><span>{{item.awardsName}}</span></td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="ranking-content ranking-bottom" >
									<p v-for="item in ruleDescBottom">{{item.replace(/(&ldquo\;)/g, "'").replace(/(&rdquo\;)/g, "'")}}</p>
								</div>
							</div>
						</scroll>
					</div>
					<div v-show="showLoading">
		            	<loading :smaller="true" ></loading>
		            </div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script type="text/javascript">
	import API from '../../api'; 
	import scroll from '../scroll/scroll';
	import loading from '../common/loading';
	export default {
		data() {
			return {
				profitRules: '',
				ruleDetails: '',
				ruleDescBottom: '',
				truleDescTop: [],
				showLoading: true
			}
		},
		components: {
			scroll,
			loading
		},
		methods: {
			trim(str){
			  return str.replace(/(^\s*)|(\s*$)/g, "");  
			},
			close() {
				this.$emit('close', false)
			}
		},
		mounted() {
			this.axios.post(API.ProfitRules).then((response) => {
		      	this.profitRules = response.data.data;
		      	this.$nextTick(() => {
		      		var _t = this.profitRules.ruleDescTop.split('；');
					for(var i=0;i<_t.length;i++) {
						this.truleDescTop.push(this.trim(_t[i]));
					}
					this.ruleDetails = this.profitRules.ruleDetails;
					this.ruleDescBottom = this.profitRules.ruleDescBottom.split('\n');
					this.showLoading = false;	
		      	})
				
		    })
		}
	}
</script>
<style lang="less" scoped>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
	  opacity: 0
	}
	.scroll-content {
		height: 5rem;
	}
	.rule-details-content {
		width: 96%;
		height: 6rem;
		position: relative;
		margin: 0 auto;

		.rule-scroll {
			width: 100%;
			position: absolute;
			top: 0.25rem;
			bottom: 0.2rem;
			overflow: auto;
			&::-webkit-scrollbar  {  
			    width: px;  /*滚动条宽度*/
			    height: 0;  /*滚动条高度*/
			}
		}
	}
	
	.rule-details {
		/*width: 7.08rem;*/
		width: 98%;
		height: 7rem;
		/*background: #18376a;*/
		background:url(../../images/game/rule-content-bg.jpg) repeat-x center 0.98rem;
		background-size: 100% 100%;
		position: fixed;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
		border-radius: 0.05rem 0.05rem 0 0;
		border: 0.02rem solid #304a92;
		z-index: 12;
		.ranking-table {
			margin: 0.15rem 0;
		}
		.rule-title-bg {
			background: url(../../images/game/list-bg.png) no-repeat center bottom;
			background-size: 100% 0.02rem;
		}
		.rule-details-title {
			border-radius: 0.05rem 0.05rem 0 0;
			height: 0.98rem;
			line-height: 0.98rem;
			background: url(../../images/game/rule-title-bg.jpg) repeat-x;
			background-size: 100% 100%;
			padding: 0 0.1rem 0 0.26rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			font-size: 0.32rem;
			.xl-box {
				width: 0.5rem;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.xl-arrow {
				width: 0.32rem;
				height: 0.2rem;
				background: url(../../images/xl-arrow.png) no-repeat;
				background-size: 0.32rem 0.2rem;
				float: right;
			}
		}
	}


	.rule-details-content p {
		font-size: 0.24rem;
		line-height: 0.36rem;
	}
	.rule-details-content .ranking-table table{
		width: 100%;
		text-align: center;
		border-bottom: 1px solid #3365a8;
		border-right: 1px solid #3365a8;
		margin: 0 auto;
	}
	.rule-details-content .ranking-table table .t-color{
		color:#cdcdcf;
	}
	.rule-details-content  tr:first-child td{
		color:#cdcdcf;
		font-weight: normal;
		font-size: 0.24rem;
	}
	.rule-details-content  .ranking-table table td{
		color:#cdcdcf;
	}
	.rule-details-content  td,.rule-details-content  th{
		padding: 0.12rem;
		border-left: 1px solid #3365a8;
		border-top: 1px solid #3365a8;
		text-align: center;
	}
	
</style>