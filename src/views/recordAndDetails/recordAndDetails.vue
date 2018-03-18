<template lang="html">
    <transition name="slide">
        <div class="record-wrap">
            <div class="header">
                <headers :text="pageTitle" linkHref="#/personal"></headers>
                <div class="title" v-if="type=='record'">
                    <span>时间</span>
                    <span>游戏</span>
                    <span>金叶子数</span>
                </div>
                <div class="title" v-else>
                    <span>时间</span>
                    <span>业务</span>
                    <span>金额</span>
                    <span>状态</span>
                </div>
            </div>
            <div class="record-content">
                <template v-if="type=='record'">
                    <scroll :data="recordList">
                        <ul>
                            <li v-for="item in recordList">
                                <!-- <span>{{item.createTime.split('')[0]}}<br>{{item.createTime.split('')[1]}}</span> -->
                                <span>{{item.createTime}}</span>
                                <span>{{item.gameName}}</span>
                                <span>{{item.changeMoney}}</span>
                            </li>
                        </ul>
                    </scroll>
                </template>
                <template v-else>
                    <scroll :data="recordList">
                        <ul>
                            <li v-for="item in recordList">
                                <!-- <span>{{item.time.split('')[0]}}<br>{{item.time.split('')[1]}}</span> -->
                                 <span>{{item.time}}</span>
                                <span>{{item.business}}</span>
                                <span>{{Math.abs(item.amount)}}元</span>
                                <span :class="{'red':item.status=='未到账'}">{{item.status}}</span>
                            </li>
                        </ul>
                    </scroll>
                </template>
            </div>

            <div class="no-record" v-if="recordList && recordList.length == 0">
                <p></p><br>
                暂无记录
            </div>
            <loading :smaller="true" v-show="showLoading"></loading>
        </div>
    </transition>
</template>

<script>
import API from '../../api'
// import {headers,scroll,loading} from '../../components';

import headers from 'components/header/header';
import scroll from 'components/scroll/scroll';
import loading from 'components/common/loading';

export default {
    data(){
        return{
            pageTitle : '',
            recordList : null,
            type :this.$route.params.type,
            showLoading : true
        }
    },
    components:{
        headers,
        scroll,
        loading
    },
    beforeMount(){
        this.pageTitle = this.type=='record' ? '投注记录' : '资金明细'
        this.getRecords()
    },
    methods:{
        getRecords(){
            if(this.type=='record'){
                this.axios.post(API.BeetingRecord,{
                    page: 1,
                    pageSize: 100
                }).then((response) => {
                    if(response.data.code == 200){
                        this.recordList = response.data.data
                    }
                    this.showLoading = false
                })
            }else{
                this.axios.post(API.TransDetails,{
                    page: 1,
                    pageSize: 100
                }).then((response) => {
                    if(response.data.code == 200){
                        this.recordList = response.data.data;
                    }
                    this.showLoading = false
                })
            }

        }
    }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
