<template lang="html">
    <div class="pop-masks" v-show="showPop">
        <div class="popbg" :class="{'big-bg':isBig}">
            <p class="close" @click="close"></p>
            <div class="pop-title">
                {{popTitle}}
                <p class="box-line"></p>
            </div>
            <div class="content-bg":class="{'big':isBig}">
                <div class="pop-content">
                    <slot></slot>
                    <span>{{popContent}}</span>
                </div>
                <p class="pop-btn" :class="{'gray':enable}" @click="goPageFn" v-if="popBtn != ''">{{popBtn}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        popContent : {
            type: String,
            default: ''
        },
        popBtn :{
            type: String,
            default: ''
        },
        popTitle:{
            type:String,
            default : '温馨提示'
        },
        showPop : Boolean,
        goPage : Function,
        isBig : Boolean,
        enable : Boolean
    },
    methods:{
        goPageFn(){
            this.goPage && this.goPage()
        },
        close(){
            this.$emit('close')
        }
    }
}
</script>

<style lang="less" scoped>
.pop-masks{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    z-index: 13;

    .popbg{
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 166;
        transform: translate(-50%,-50%);
        width: 84%;
        height: 5rem;
        font-size: .28rem;
        color: #fff;
        box-shadow: 0 0 0.1rem #4c91ff;
        text-align: center;
        &.big-bg{
            height: 5.9rem;
        }
        .pop-title{
            font-size: .36rem;
            height: 1.3rem;
            line-height: 1.3rem;
            background: url('../../images/topbg.png') repeat;
            background-size: 100% 100%;
        }
        .content-bg{
            height: 74%;
            background: url('../../images/headbj.png') repeat;
            background-size: 100% 100%;
            &.big{
                height: 77%;
            }
        }
        .close{
            position: absolute;
            top: -.3rem;
            right: -.3rem;
            width: .68rem;
            height: .68rem;
            background: url("../../images/pop-close.png") no-repeat;
            background-size: 100%;
        }
        .pop-content{
            display: table-cell;
            padding: 0 .3rem;
            height: 2.5rem;
            width: 6.1rem;
            vertical-align: middle;
            span{
                display: inline-block;
                vertical-align: middle;
                line-height: .5rem;
            }
        }
        .pop-btn{
            margin: 0 auto;
            width: 2.39rem;
            height: .79rem;
            line-height: .79rem;
            background: url("../../images/popbtn.png") no-repeat;
            background-size: 100%;
            &.gray{
                color: #93979f;
                background: url("../../images/popreceived.png") no-repeat;
                background-size: 100%;
            }
        }
        .box-line {
	        width: 100%;
	        height: 1px;
	        background: url(../../images/game/c-line.png) no-repeat;
	        background-size: 100% 1px;
	        position: absolute;
	        left: 0;
	    }
    }
}
</style>
