<template>
  <div>
    <Banner />
		<button class="gotoother" @click="gotouser">用户端</button>
  </div>
</template>

<script>
import Banner from './Banner.vue'
export default {
  name: 'Manager',
  components: { Banner },
	methods:{
		gotouser(){
			this.$router.replace('/bankuser');
      console.log('跳转到user')
		}
	}
}
</script>

<style>
</style>