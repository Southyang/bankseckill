<template>
  <div class="seckillgoodsdetail">
		<button @click="goback">返回</button>
    <h1> 秒杀商品{{GoodsID}}详情页面 </h1>
  </div>
</template>

<script>
export default {
  name: 'SeckillGoodsDetail',
	data(){
		return{
			GoodsID:''
		}
	},
	methods:{
		goback(){
			this.$router.back() //后退
		}
	},
	mounted(){
		this.GoodsID = this.$route.params.id
	}
}
</script>

<style>
</style>