<template lang="html">
    <transition name="fade">
        <div class="tips-wrap">
            <div class="tips-bg">
                <p class="closebtn" @click="close" v-if="showClose"></p>
                <div class="tips-content">
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
            showtips :true
        }
    },
    props:{
        showClose : Boolean
    },
    methods:{
        close(){
            this.$emit('close',true)
        },
    }
}
</script>

<style lang="less">
@import "./index.less";
</style>
