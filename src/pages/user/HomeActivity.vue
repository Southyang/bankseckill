<template>
  <div>
    <h1 @click="applyactivity"
        style="cursor:pointer">申请活动</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeActivity',
  methods: {
    applyactivity () {
      console.log("申请活动")
      // 发送get请求
      this.$http.get("user/apply/toApply",).then(
        response => {
          console.log('请求成功了', response.data)
          if (response.data.code === 200) {
            // this.$bus.$emit('Toast', "验证码为:" + response.data.obj, "success")
            this.$message.success("申请成功")
            sessionStorage.setItem("userallowed", "true")
          }
          else if(response.data.code === 500600){
            // this.$bus.$emit('Toast', "该手机未注册", "info")
            this.$message.warning("初筛未通过")
            sessionStorage.setItem("userallowed", "false")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          // this.$bus.$emit('Toast', "网络错误", "failed")
          this.$message.error("网络错误")
        }
      )
      
    }
  }
}
</script>

<style>
</style>