<template>
  <div class="interfacehome">
    <div class="interfacehomelist">
      <div class="list-group">
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankuser/interface/home/checkgoods">商品列表</router-link>
        </div>
        <div class="list-group-item"
             v-if="IsAllowed">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankuser/interface/home/checkseckillgoods">秒杀商品</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankuser/interface/home/homeactivity">活动列表</router-link>
        </div>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterfaceHome',
  data () {
    return {
      IsAllowed: false
    }
  },
  created () {
    // 发送get请求
    this.$http.get("apply/toApply",
      {
        params: {
          userId: sessionStorage.getItem("username")
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
    const timer = setInterval(() => {
      let temp = sessionStorage.getItem("userallowed")
      if (temp === "true") {
        this.IsAllowed = true
      }
    }, 1000);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer);
    })
  },
}
</script>

<style scoped>
.interfacehomelist {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.list-group {
  background-color: #ffffff;
  height: 100vh;
  width: 220px;
}

.list-group-item {
  height: 40px;
  width: 220px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
}

.routerlink {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 40px;
  /* or 82% */
  padding-left: 30px;
  color: #494949;
}

.active {
  color: #ea0437;
}
</style>