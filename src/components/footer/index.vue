<template>
	<div class="footer">
      <ul>
        <li :class="currentIndex === 1 ? 'active':'' " >
        	<a href="javascript:" @click="handleTab(1)">
	            <div class="f-box">
	              <img v-if="currentIndex == 1" src="../../images/footer/game-icon-big.png" class="game-icon-big">
	              <img v-else src="../../images/footer/game-icon-small.png" class="game-icon">
	            </div>
	            <span>游戏</span>
            </a>
        </li>
        <!-- #/knapsack -->
        <li :class="currentIndex === 2 ? 'active':'' " >
        	<a href="javascript:"  @click="handleTab(2)">
	            <div class="f-box">
	              <img v-if="currentIndex == 2" src="../../images/footer/knapsack-icon-big.png" class="knapsack-icon-big">
	              <img v-else src="../../images/footer/knapsack-icon-small.png" class="knapsack-icon">
	            </div>
	            <span>背包</span>
            </a>
        </li>
        <!-- #/luckdraw -->
        <li :class="currentIndex === 3 ? 'active':'' " >
        	<a href="javascript:" @click="handleTab(3)">
	            <div class="f-box">
	              <img v-if="currentIndex == 3" src="../../images/footer/luckdraw-big.png" class="luck-draw-big">
	              <img v-else src="../../images/footer/luckdraw-small.png" class="luck-draw">
	            </div>
	            <span>抽奖</span>
            </a>
        </li>
        <!-- #/personal -->
        <li :class="currentIndex === 4 ? 'active':'' ">
        	<a href="javascript:" @click="handleTab(4)">
	            <div class="f-box">
	              <img v-if="currentIndex == 4" src="../../images/footer/head-big.png" class="head-icon-big">
	              <img v-else src="../../images/footer/head-small.png" class="head-icon">
	            </div>
	            <span>个人</span>
            </a>
        </li>
      </ul>
    </div>
</template>
<script type="text/javascript">
	export default {
		data() {
	      	return {
	      	}
		},
		props: {
			currentIndex: {
				type: Number,
				default: 1
			}
		},
		methods: {

	      handleTab(index) {
	          switch (index) {
	            case 1: 
	              this.$router.push({path:'/'})
	              ++GLOBALS.tabNumber;
	              break;
	            case 2: 
	              this.$router.push({path:'/knapsack'})
	              GLOBALS.buryingPoint(1211);
	              ++GLOBALS.tabNumber;
	              break;
	            case 3: 
	              this.$router.push({path:'/luckdraw'});
	              GLOBALS.buryingPoint(1212);
	              ++GLOBALS.tabNumber;
	              break;
	            case 4:
	              this.$router.push({path:'/personal'});
	              GLOBALS.buryingPoint(1213);
	              ++GLOBALS.tabNumber;
	              break;
	          }
	      }
	  },
	  mounted() {
	  }
	}
</script>
<style lang="">
	
</style>