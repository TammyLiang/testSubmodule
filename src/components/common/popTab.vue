<template lang="html">
    <transition name="fade">
        <div class="pop-wrap">
            <div class="pop-content">
                <a href="javascript:">
                    <img src="../../images/pop-close.png" class="pop-close" @click="close">
                </a>
                <!-- 任务tab -->
                <div class="task-nav sp-title-bg">
                    <ul>
                        <li :class="{'active':showTabeOne}" @click="handleTaskNav(tabone)">
                            {{tabone}}
                            <span v-if="systemUnread > 0 ">{{systemUnread}}
                            {{systemUnread > 99 ? '+' : ''}}</span>
                        </li>
                        <li :class="{'active':!showTabeOne}" @click="handleTaskNav">
                            {{tabtwo}}
                            <span v-if="personalUnread > 0">{{personalUnread}}
                            {{personalUnread > 99 ? '+' : ''}}</span>
                        </li>
                    </ul>
                </div>
                <!-- 任务内容 -->
                <div class="task-items">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
        return{
            showTabeOne :true,
            showLoading :true
        }
    },
    props:{
        tabone : {
            type: String,
            default :'系统通知'
        },
        tabtwo : {
            type: String,
            default :'个人消息'
        },
        currentPop : {
            type: String,
            default :'openMessage'
        },
        systemUnread : {
            type: Number,
            default : 0
        },
        personalUnread : {
            type: Number,
            default : 0
        },
    },
    beforeMount(){
        this.showLoading = false
    },
    methods:{
        close(){
            this.$emit(this.currentPop,false)
        },
        handleTaskNav(val){
            if(val == this.tabone){
                this.showTabeOne = true
                this.$emit('showTabeOne',true)
            }else{
                this.showTabeOne = false
                this.$emit('showTabeOne',false)

            }
        }
    }

}
</script>

<style lang="less" scoped>
.pop-wrap{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    z-index: 13;
}
.pop-content {
    width: 84%;
    height: 7.7rem;
    background: url(../../images/game/common-pop-bg.jpg) repeat-x;
    background-size: 100% 7.7rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 0.08rem;
    border: 0.02rem solid #304a92;
    z-index: 12;
    .pop-close {
        width: 0.68rem;
        height: 0.68rem;
        position: absolute;
        right: -0.34rem;
        top: -0.34rem;
    }
}
.task-nav {
    height: 1.28rem;
    ul {
        display: flex;
        align-items: center;
        height: 1.28rem;
        padding: 0 0.35rem;
    }
    li {
        height: 1.28rem;
        line-height: 1.28rem;
        flex: 1;
        text-align: center;
        font-size: 0.32rem;
        position: relative;
        cursor: pointer;
        span{
            position: absolute;
            margin-left: .1rem;
            top: .2rem;
            // left: .1rem;
            height: .3rem;
            line-height: .3rem;
            min-width: .3rem;
            background: #ff5346;
            border-radius: 50%;
            font-size: .18rem;
            color: #fff;
            text-align: center;
        }
        &:after {
            content: '';
            display: block;
            width: 1.0rem;
            height: 0.06rem;
            position: absolute;
            left: 50%;
            bottom: 0.22rem;
            transform: translateX(-50%);
            background: #feda48;
            border-radius: 0.04rem;
            display: none;
        }
        &.active {
            color: #fbcf56;
            &:after {
                display: block;
            }
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

</style>
