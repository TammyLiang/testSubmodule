<template lang="html">
    <div>
        <div class="notice" v-if="showMessage">
            <pop-tab @openMessage="openMessage" @showTabeOne="showWhichTab" :systemUnread="systemUnread"
            :personalUnread="personalUnread">
                <div class="system-notice">
					<ul v-if="messageList">
						<li class="sp-title-bg" v-for="item in messageList" @click="showMineDetail(item)">
							<p :class="{'gift':!showSystemNotice}"></p>
							<p>
								<span>
									{{item.title}}&nbsp;>
									<em :class="{'read':item.messageStatus != 1}">{{item.messageStatus == 1 ? '已读' : '未读'}}</em>
									<em>{{item.createTime.substr(0,10)}}</em>
								</span><br>
								<span v-html="item.content"></span>
							</p>
						</li>
					</ul>
					<div class="no-record" v-if="noRecord">
						<p></p><br>
						暂无数据
					</div>
                </div>
            </pop-tab>
        </div>
        <pop :showPop="showPop" :popBtn="popBtn" :isBig="true" :enable="popBtn == '立即领取' && enable"
        :popTitle="popTitle" :goPage="close" @close="close('close')">
            <div class="slot">
                <p class="sp-title-bg">
                    <em :class="{'gifticon':!showSystemNotice}"></em>
                    {{noticeTitle}}
                    <em>{{noticeDate}}</em>
                </p>
                <p>亲爱的玩家： <br>
                    <em v-html="noticeContent"></em><br>
                    <!-- awardsList.awardsImage -->
                    <span v-if="awardsList && !enable">
                        <img src="../../../images/game/giftbox.png">
                        <i class="gift-bg">{{awardsList && awardsList.name.split('金')[0]}}</i>
                    </span>
                </p>
            </div>
        </pop>
        <loading v-show = "showLoading" :smaller="true"></loading>
    </div>

</template>

<script>
import popTab from '../../common/popTab.vue'
import API from '../../../api';
import pop from '../../common/popMask.vue'
import loading from '../../common/loading.vue'
export default {
    data(){
        return{
            messageList : null,
            awardsList : null,
            noRecord : true,
            showPop : false,
            popBtn: "确定",
            noticeContent : "",
            popTitle : "",
            showLoading :true,
            noticeDate : '',
            noticeTitle : '',
            unreadCount : 0,
            systemUnread : 0,
            personalUnread : 0,
            currentID:'',
            enable : false
        }
    },
    props:{
        showMessage : Boolean,
        showSystemNotice : Boolean
    },
    components:{
        popTab,
        pop,
        loading
    },
    mounted(){
        console.log(this.showMessage+'ssss')
        this.refreshInfo(this.showSystemNotice)
    },
    methods:{
        getNoticeList(val){
            this.axios.post(API.messageList, {
                value: val,
                page: 1,
                pageSize: 100
            }).then((res) => {
                let params = res.data
                if(params.code == 200){
                    this.showLoading = false
                    this.messageList = params.data.messages
                    let unread = params.data.unreadCount,
                        unreadAll = params.data.allUnreadCount
                    let gap = parseInt(unreadAll - unread)
                    if(val == 1){
                        this.systemUnread = unread
                        this.personalUnread = gap
                    }else{
                        this.personalUnread = unread
                        this.systemUnread = gap
                    }

                    if(this.messageList.length > 0){
                        this.noRecord = false
                    }else{
                        this.noRecord = true
                    }
                }else{
                    this.noRecord = true
                }
            })
        },
        openMessage(val){
            this.$emit('openMessage',val)
        },
        showWhichTab(val){
            this.refreshInfo(val)
            this.$emit('getTabInfo',val)
        },
        refreshInfo(tab){
            // 1 - 系统通知  2-个人消息
            if(tab){
                this.getNoticeList(1)
            }else{
                this.getNoticeList(2)
            }
        },
        showMineDetail(val){
            // console.log(this.showSystemNotice);
            // 是否阅读当前消息，null--已读 暂不处理
            this.popTitle = this.showSystemNotice ? '系统通知':'个人消息'
            if(val.messageStatus != 1){
                this.axios.post(API.readNotice, {
                    value: val.messageId,
                }).then((res) => {
                    this.refreshInfo(this.popTitle == '系统通知')
                })
            }
            this.$emit('showMessage',false)
            this.showPop = true
            this.noticeContent = val.content
            this.noticeTitle = val.title
            this.noticeDate = val.createTime.substr(0,10)
            this.awardsList = val.awards && val.awards[0]
            this.enable = val.awardsStatus == 0 ? false : true
            if(val.awards && val.awards.length != 0 && !this.enable){
                this.popBtn = '立即领取'
                this.currentID = val.messageId
            }else{
                this.popBtn = '确定'
            }
        },
        close(val){
            if(val !='close' && this.popBtn == '立即领取'){
                if(!this.enable){
                    this.axios.post(API.yourAwards, {
                        value: this.currentID,
                    }).then((res) => {
                        let params = res.data
                        if(params.code == 200){
                            let that = this
                            this.$toast({
        						message: '领取成功',
        						duration: 2000
        					});
                            setTimeout(function(){
                                // TODO: 领取成功更新金叶子
                                that.showPop=false
                                that.refreshInfo(this.popTitle == '系统通知')
                                that.$emit('openMessage',{'isclose':true,'refreshUnread':true,
                                           'showSys':this.popTitle == '系统通知'})
                            },3000)
                        }
                    })
                }else{
                    this.$toast({
                        message: '您已领取过了哦~',
                        duration: 2000
                    });
                    // return
                }
            }else{
                this.showPop=false
                this.$emit('openMessage',{'refreshUnread':true,'showSys':this.popTitle == '系统通知'})
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
