<template lang="html">
    <div class="personal-wrap">

        <div class="user-info">
            <div id="userHead">
                <p class="user-headimg" @click="handleTx">
                    <img v-if="userInfo.headImg" :src="userInfo.headImg|imgCurrency" >
                    <img v-else src="../../images/img_photo.png">
                </p>
            </div>
            <p class="user-content">
                <span class="nickname user-tip" v-if="userInfo">{{userInfo.nickname}}</span>
            </p>
            <div class="box-line"></div>
        </div>
        <div class="user-count">
            <p>金叶子</p>
            <p class="amount" v-if="userInfo" @click="goShopping">{{userInfo.useAmount}}<i class="buy"></i></p>
            <p>冲盈利排行，赢话费</p>
        </div>
        <div class="personal-box">
            <div class="box-line first-line"></div>
            <div class="box-line second-line"></div>
            <div class="box-line third-line"></div>
            <div class="box-line four-line"></div>
            <div class="box-line five-line"></div>
            <div class="six-line"></div>
            <ul class="personal-group">
                <li @click="goPage('record')">
                    <img src="../../images/personalnew/ic_record.png">
                    <span>投注记录</span>
                </li>
                <li @click="goPage('details')">
                    <img src="../../images/personalnew/ic_detail.png">
                    <span>资金明细</span>
                </li>
                <li>
                    <a href="#/my/news">
                        <img src="../../images/personalnew/ic_message.png">
                        <span>&nbsp;我的消息</span>
                    </a>
                </li>
                <li>
                    <router-link to="/customer">
                        <img src="../../images/personalnew/ic_service.png">
                        <span>&nbsp;客服专区</span>
                    </router-link>
                </li>
            </ul>
        </div>

        <pop :showPop="showPop" :popContent="popContent" :popBtn="popBtn"
         :goPage="close" @close="showPop=false"></pop>
         <!-- 商城 -->
         <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>

        <router-view></router-view>
        <c-footer :currentIndex="4"></c-footer>
        <loading v-show="showLoading"></loading>
    </div>
</template>
<script>
import API from '../../api';
import Vue from 'vue';
import { bus } from '../../common/bus';
export default {
    data(){
        return{
            uploadUrl: API.UpdateHeadImg,
            imgUpload: { accessToken: GLOBALS.accessToken },
            isIOS: false,
            isSafari : false,
            userInfo : {},
            isBind : false, //手机是否绑定
            phoneNum : '' , //手机号
            showBind :false,
            popBtn: "确定",
            popContent : "",
            showPop:false,
            isShoppingMall: false,
            actions: [{
                name: '修改头像',
                method: function() {
                   clp();
                   function clp() {
                        return  document.querySelector('.el-upload__input').click();
                   }
                }
            }],
            sheetVisible: false,
            showLoading : true
        }
    },
    created(){
        let ua = navigator.userAgent;
        this.isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        this.isSafari = ua.indexOf('Safari') != -1 && ua.indexOf('baidubrowser') == -1 && ua.indexOf("Version") != -1;
        this.getPersonalInfo()
    },
    components:{
        'pop':() => import('components/common/popMask'),
        'cFooter':() => import('components/footer'),
        'loading':() => import('components/common/loading'),
    },
    methods:{
        handleTx() {
            GLOBALS.buryingPoint(1202);
        },
        goLogin() {
            localStorage.setItem('originDeffer', window.location.href);
            window.location.href= GLOBALS.loginUrl;
        },
        goShopping() {
            GLOBALS.buryingPoint(1203);
            if(GLOBALS.accessToken) {
                localStorage.setItem('APP_CHANNEL', GLOBALS.channel);
                localStorage.setItem('APP_VERSION', '3.0.0');
                setTimeout(() => {
                    window.location.href = GLOBALS.shopUrl;
                })
            }else {
                this.$toast({
                    message: '未授权，请先登录',
                    duration: 1500
                });
            }
        },
        handleUploadphoto() {
            this.sheetVisible = true;
        },
        handleAvatarSuccess(res, file) {
            this.userInfo.headImg = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              this.$toast({
                message: '头像大小不超过2MB',
                duration: 1500
              })
            }
            return isLt2M;
          },
        handleUpdatePhoto() {
            this.sheetVisible = true;
        },

        getPersonalInfo(){
            this.axios.post(API.GetUserPersonalInfo).then((response) => {
                if(response.data.code == 200){
                    this.userInfo = response.data.data;
                }else if(response.data.code == 401) {
                    setTimeout(() => {
                        // this.$router.replace('/login');
                        // window.location.href=GLOBALS.loginUrl;
                    },1500);

                }
            })
            this.axios.post(API.GetUserPhoneBindInfo).then((response) => {
                if(response.data.code == 200){
                    this.isBind = response.data.data.existsFlag;
                    this.phoneNum  = response.data.data.phone;
                }
            })
            this.showLoading = false;
        },
        modifyNickname(){
            this.$router.replace('/modifyNickname')
        },
        back(){
            this.showBind=false
            location.reload()
        },
        close(){
            this.showPop=false
        },
        goPage(item){
            if(item == 'record'){
                this.$router.replace({ name: 'bettingRecord', params: { type: 'record'}})
            }else{
                this.$router.replace({ name: 'capitalDetail', params: { type: 'details'}})
            }
        },
    }
}
</script>

<style lang="less" >
@import "./personal.less";

</style>
