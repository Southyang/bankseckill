<template>
  <div>
    <Banner />
		<button class="gotoother" @click="gotomanager">管理端</button>
		<router-view></router-view>
  </div>
</template>

<script>
import Banner from './Banner.vue'
export default {
  name: 'User',
  components: { Banner },
	methods:{
		gotomanager(){
			this.$router.replace('/bankmanager');
      console.log('跳转到manager')
		}
	}
}
</script>

<style>


</style>