// 固定组件
<template>
  <div class="banner">
    <div class="bannerRectangle">
      <img class="bannerimg" src="../assets/image/bannerimg.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  /* 顶部导航栏 */
  /* z-index: 1; */
  position: absolute;
  width: 100%;
  height: 70px;
  left: 0px;
  top: -2px;
}

.bannerRectangle {
  position: absolute;
  width: 100vw;
  height: 70px;
  left: 0px;
  top: -2px;
  background: #ffffff;
}

.bannerimg {
  position: absolute;
  width: 234px;
  height: 65px;
  left: 37px;
  top: 5px;
}
</style>
