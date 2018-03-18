<template>
	 <div class="game-load">
      <div class="load-box">
        <img src="../../images/bigImage/game-load.png">
      </div>
    </div>
</template>
<script type="text/javascript">
	export default {

	}
</script>
<style lang="less" scoped>
	.game-load {
          width: 100%;
          height: 100%;
          position: fixed;
          left: 0;
          top: 0;
          background: #000;
          z-index: 101;
        }
        .game-load .load-box {
          width: 1.6rem;
          height: 1.6rem;
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          display: flex;
          align-items: center;
              justify-content: center;
        }
        .game-load .load-box img {
          width: 1rem;
          height: 1rem;
          animation: rotate .5s linear infinite;
        }
</style>