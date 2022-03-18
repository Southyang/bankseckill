<template>
  <div class="checkgoods">
    <h1> 商品列表 </h1>
    {{goodslist}}
  </div>
</template>

<script>
export default {
  name: 'CheckGoods',
  data () {
    return {
      goodslist: []
    }
  },
  created () {
    // 发送get请求
    this.$http.get("goods/toGoodsList",
      {
        params: {
          userId: sessionStorage.getItem("username")
        }
      }).then(
        response => {
          console.log('请求成功了', response.data)
          if (response.data.code === 200) {
            this.$message.info("成功获取商品信息")
            this.goodslist = response.data.obj
          }
          else {
            this.$message.warning("商品信息获取失败")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )
  }
}
</script>

<style>
</style>