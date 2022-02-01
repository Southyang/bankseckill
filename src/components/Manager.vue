<template>
  <div class="login">
    <Banner />
		
		<router-view></router-view>
  </div>
</template>

<script>
import Banner from './Banner.vue'
export default {
  name: 'Manager',
  components: { Banner },
}
</script>

<style scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
</style>