<template>
	<div class="group-input">
		<div class="input-box " :class="line ? 'group-line':'' ">
			<span class="group-name">{{iName}}</span>
			<input :type="type" :placeholder="iPlaceholder"
			 :maxLength="maxLength" @input="updateVal($event.target.value)"/>

			 <span class="input-btn" v-if="isShowVerification">
				<button :disabled="!fetchCodeMsg" :class="!fetchCodeMsg ? 'disabled':'' "
				class="btn-verification" v-if="iVerification" @click="getVerification">
					<i v-if="fetchCodeMsg">获取验证码</i>
					<i v-else>重新获取({{timerCodeMsg}}s)</i>
				</button>
			</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				timerCodeMsg: '',
				fetchCodeMsg: true,
			}
		},
		props: {
			line: {
				type: Boolean,
				default: true
			},
			iName: {
				type: String,
				default: ''
			},
			iText: {
				type: String,
				default: ''
			},
			iPlaceholder: {
				type: String,
				default: ''
			},
			iVerification: {
				type: Boolean,
				default: false
			},
			maxLength : {
				type: Number,
				default: null
			},
			type: {
				type: String,
				default: 'text'
			},
			isShowVerification: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
		},
		methods: {
			countDown() {
				var that = this;
				let SECONDS = 60;
				let sec =SECONDS;
				that.fetchCodeMsg = false;
			    for(let  i=0; i<=SECONDS; i++){
			       setTimeout(function(){
			           if (sec != 0) {
			             that.timerCodeMsg = sec;
			            sec--;
			         } else {
			             sec = SECONDS;
			             that.fetchCodeMsg = true;
			        }
			       }, i * 1000)
			     }
			},
			updateVal(val){
				this.$emit('getVal',val)
			},
			getVerification() {
        		this.$emit('getCode');
			}
		}
	}
</script>
<style lang="less" scoped>
	.group-input {
		padding: 0 0 0 0.3rem;
		background: #193b73;

	}
	.btn-verification {
		position: absolute;
		right: 0;
		top: .18rem;
		width: 1.9rem;
	 	height: 0.6rem;
	 	line-height: 0.6rem;
	 	box-sizing: border-box;
	 	border: 0.02rem solid #5597ff;
	 	background: #17376d;
	 	font-size: 0.24rem;
	 	color: #5597ff;
	 	border-radius: 0.08rem;
	 	box-sizing: border-box;
	 	margin-right: 0.3rem;
	 	/*margin: 0 0.28rem 0 0.1rem;*/
	 	&.disabled {
	 		border-color: #736f95;
   			 color: #736f95;
	 	}
	 	i {
	 		font-style: normal;
	 	}
	}
	.input-box {
		position: relative;
		width: 100%;
		height: 0.95rem;
		line-height: 0.95rem;

		box-sizing: border-box;
		position: relative;
		display: flex;
		align-items: center;
		&.group-line:after {
			content: '';
			width: 100%;
			height: 0.02rem;
			background: #383f53;
			position: absolute;
			left: 0;
			bottom: 0;
		}
		/*.input-box {
			position: relative;
			display: flex;
		}*/
		.group-name {
			float: left;
			/*margin-top: .3rem;*/
			flex:0 0 1.6rem;
			font-size: 0.3rem;
			color: #fff;
		}
		.input-btn {
			display: block;
			height: 100%;
			flex: 1;

		}
		input {
			flex: 1;
			border: none;
			outline: none;
			height: 0.95rem;
			background: #193b73;
			font-size: 0.28rem;
			color: #fff;
		}
	}
</style>
