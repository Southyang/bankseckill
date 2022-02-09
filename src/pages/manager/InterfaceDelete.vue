<template>
  <div class="interfacedelete">
    <div class="deleteheader">
      删除商品
    </div>
    <div class="deletebody">
      <div class="deleteword">商品ID</div>
			<div class="line"></div>
      <input class="deleteinput" v-model="GoodsID"/>
    </div>
    <div class="deletefooter">
      <button class="deletebutton" @click="deletegoods">删除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterfaceDelete',
	data(){
		return{
			GoodsID:''
		}
	},
	methods:{
		deletegoods(){
			console.log("删除商品ID为:" + this.GoodsID)
			this.GoodsID = ''
		}
	}
}
</script>

<style>
.interfacedelete {
  width: 840px;
  height: 420px;
  background: #ffffff;
  border-radius: 5px;
  margin-top: 150px;
  margin-left: 210px;
}

.deleteheader {
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

.deletebody {
  width: 360px;
  height: 50px;
  margin-top: 130px;
  margin-left: 240px;
  border: 1px solid #494949;
  box-sizing: border-box;
  border-radius: 0px 5px 5px 0px;
}

.deleteword {
  float: left;
  text-align: center;
  line-height: 50px;
  width: 95px;
  font-size: 22px;
  letter-spacing: 0.055em;
}

.line{
	height: 49px;
	width:1px;
	background-color: #494949;
	float: left;
}

.deleteinput {
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

.deletefooter {
  display: flex;
  justify-content: center;
  margin-top: 120px;
}

.deletebutton {
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