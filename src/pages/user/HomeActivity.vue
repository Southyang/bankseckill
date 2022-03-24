<template>
  <div class="homeactivity">
    <h1 @click="applyactivity"
        style="cursor:pointer"
        class="applyactivity">申请参加现有秒杀活动</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeActivity',
  methods: {
    applyactivity () {
      console.log("申请活动")
      // 发送get请求
      this.$http.get("user/toApply",
        {
          params: {
            id: sessionStorage.getItem("username")
          }
        }).then(
          response => {
            console.log('请求成功了', response.data)
            if (response.data.code === 200) {
              this.$message.info("申请成功")
              sessionStorage.setItem("userallowed", "true")
            }
            else {
              this.$message.warning("初筛未通过")
              sessionStorage.setItem("userallowed", "false")
            }
          },
          error => {
            console.log('请求失败了', error.message)
            this.$message.error("网络错误")
          }
        )
    }
  }
}
</script>

<style>
.homeactivity{
  margin-top: 50px;
  margin-left: 50px;
}

.applyactivity{
  width: 260px;
  height: 40px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 40px;
  letter-spacing: 0.15em;
  /* or 61% */
  letter-spacing: 4px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
  background-color: #ea0437;
  color: #ffffff;
  border: none;
}
</style>