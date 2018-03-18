<template lang="html">
    <div class="login-pop">
		<div class="login-bg">
			<p class="login-btn" :class="{'center':!canUseVisitorLogin}" @click="aokeLogin">澳客登录</p>
			<!-- <p class="play-btn" v-if="canUseVisitorLogin" @click="playNow">快速试玩</p> -->
		</div>
	</div>
</template>

<script>
import API from '../../api';
export default {
    data(){
        return{
            userid : null,
            canUseVisitorLogin : true, // 是否可用游客登录
        }
    },
    beforeMount(){
        GLOBALS.buryingPoint(1201);


        this.userid = localStorage.getItem('userid') ? localStorage.getItem('userid') : '';
        // 是否可以游客登录
    //    if(this.userid){
    //         this.axios.post(API.isCanVisitor,{
    //             source : 5,
    //             visitorToken : this.userid
    //         }).then((response) => {
    //             let params = response.data;
    //             if(params.code == 200){
    //                 this.canUseVisitorLogin = params.data ==1 ? true : false
    //             }else{
    //                 this.$toast({
    //                     message: params.message,
    //                     duration: 1500
    //                 });
    //             }
    //         });
    //     }
    },
    methods:{
        closePop(){
            this.$emit('only-close');
        },
        playNow(){
            GLOBALS.buryingPoint(120101);
            // 游客登录返回token
            this.axios.post(API.visitorLogin,{
                source : 5,
                visitorToken : this.userid
            }).then((response) => {
                let params = response.data;
                if(params.code == 200){
                    this.userid = params.data
                    localStorage.setItem('userid',params.data)
                    localStorage.setItem('visitorLogin',true)
                    localStorage.setItem('loginfail',false)
                    this.$router.replace('/');
                }else{
                    this.$toast({
                        message: '未授权，请先登录',
                        duration: 1500
                    });
                }
            });

        },
        aokeLogin(){
            GLOBALS.buryingPoint(120102);
            let urls;
            if(localStorage.getItem('okooo') == 'null'){
                 urls = encodeURIComponent('/game?type=jdd&status=login');
            }else{
                 urls = encodeURIComponent('/game?type=jdd&status=bind');
            }
            location.href='http://m.okooo.com/user/login.php?FromUrl='+urls;
        }
    }
}
</script>

<style lang="less">
@import "./index.less";
</style>
