<template>
  <div class="interfacedeleteseckill">
    <div class="deleteseckillheader">
      删除秒杀商品
    </div>
    <div class="deleteseckillbody">
      <div class="deleteseckillword">秒杀商品ID</div>
			<div class="line"></div>
      <input class="deleteseckillinput" v-model="GoodsID"/>
    </div>
    <div class="deleteseckillfooter">
      <button class="deleteseckillbutton" @click="deleteseckillgoods">删除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterfaceDeleteseckill',
	data(){
		return{
			GoodsID:''
		}
	},
	methods:{
		deleteseckillgoods(){
			console.log("删除秒杀商品ID为:" + this.GoodsID)
			this.GoodsID = ''
		}
	}
}
</script>

<style scoped>
.interfacedeleteseckill {
  width: 840px;
  height: 420px;
  background: #ffffff;
  border-radius: 5px;
  margin-top: 150px;
  margin-left: 210px;
}

.deleteseckillheader {
  background-color: #ea0437;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 22px;
  line-height: 24px;
  letter-spacing: 0.3em;
}

.deleteseckillbody {
  width: 400px;
  height: 50px;
  margin-top: 130px;
  margin-left: 220px;
  border: 1px solid #494949;
  box-sizing: border-box;
  border-radius: 0px 5px 5px 0px;
}

.deleteseckillword {
  float: left;
  text-align: center;
  line-height: 50px;
  width: 135px;
  font-size: 22px;
  letter-spacing: 0.055em;
}

.line{
	height: 49px;
	width:1px;
	background-color: #494949;
	float: left;
}

.deleteseckillinput {
  height: 48px;
  background: #ffffff;
  border: 1px solid #494949;
  box-sizing: border-box;
  border-radius: 0px 5px 5px 0px;
  font-size: 22px;
  width: 259px;
	padding-left: 15px;
	outline: none;
	border: none;
}

.deleteseckillfooter {
  display: flex;
  justify-content: center;
  margin-top: 120px;
}

.deleteseckillbutton {
  width: 120px;
  height: 40px;

  background: #ffffff;
  /* 1 */
  border: 2px solid #ea0437;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 24px;
  line-height: 15px;
  letter-spacing: 0.055em;
  color: #ea0437;
	cursor: pointer;
}
</style>