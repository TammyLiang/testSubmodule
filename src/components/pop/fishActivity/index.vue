<template lang="html">
    <!-- <transition name="fade"> -->
        <div class="">
            <div class="fish-wrap">
                <div class="fish-bg">
                    <p class="closebtn" @click="closePop"></p>
                    <p class="header"></p>
                    <div class="body"  v-if="bettingList">
                        <div class="content" >
                            <div class="line" v-for="(item,index) in bettingList"
                            :class="{'second' : index == 1 || index == 3,'last' : index==4 }">
                                <div v-if="index == 0 || index == 2 || index == 4">
                                    <p class="icon"></p>
                                    <p class="detail" >
                                        <span class="award" :class="{'card15':index==2,'card50':index==4}"></span>
                                        <span class="normal"><em v-if="index != 4"></em>(累计投注满{{item.level/10000}}万)</span><br>
                                        <span class="btn" @click="goClick(item)"
                                            :class="{'recieive':item.status==1,'recieived':item.status==2}">
                                            {{item.status==1 ? '立即领取' : ( item.status==2 ? '已经领取' :'快去完成')}}
                                        </span>
                                    </p>
                                </div>

                                <div v-else>
                                    <p class="detail">
                                        <span class="normal">(累计投注满{{item.level/10000}}万)&nbsp;&nbsp;</span>
                                        <span class="award" :class="{'card5':index == 1,'card35':index == 3}"></span><br>
                                        <span class="btn" @click="goClick(item)"
                                            :class="{'recieive':item.status==1,'recieived':item.status==2}">
                                            {{item.status==1 ? '立即领取' : ( item.status==2 ? '已经领取' :'快去完成')}}
                                        </span>
                                    </p>
                                    <p class="icon left"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="bottom"></p>
                </div>
            </div>
            <transition name = "fade">
                <div class="success-pop" v-if="showPop">
                    <div class="successbg">
                        <p class="title"></p>
                        <p class="img"></p>
                        <p class="name">{{awardsName}}</p>
                        <p class="normal">奖品已发放，请到背包内查看。</p>
                        <p class="closebtn" @click="getBettingList">嗯&nbsp;&nbsp;啊</p>
                    </div>
                </div>
            </transition>

        </div>
    <!-- </transition> -->
</template>

<script>
import API from '../../../api';


export default {
    data(){
        return{
            awardsName : '',
            awardsImg :'',
            showPop :false
        }
    },
    props:{
        bettingList : {
            type:Array,
            default : ''
        }
    },
    methods:{
        goClick(item){
            console.log(item.awardsName);
            if(item.status== 0){
                window.location.href = 'https://m.jddfun.com/channel/newokooo/fish/?token='+GLOBALS.accessToken+'&channel=100006';
            }else if(item.status == 1){
                // TODO: 立即领取
                this.axios.post(API.getAwards, {
					// isShowTotast: "false",
                    value : item.awardsId
				}).then((response) => {
					if(response.data.code == 200) {
                        this.showPop = true
						let params = response.data.data
						this.awardsName = params.awardsName
                        this.awardsImg = params.awardsIcon
					}
				})
            }else{
                return
            }
        },
        getBettingList(){
            this.axios.post(API.bettingList).then((response) => {
                if(response.data.code === 200) {
                    this.showPop = false
                    this.$emit('bettingList',response.data.data.bettingList.list)
                    // this.bettingList = response.data.data.bettingList.list
                }
            })
        },
        closePop(){
            this.$emit('close')
        }
    }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
