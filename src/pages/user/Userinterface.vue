<template>
  <div class="userinterface">
    <div class="userinterfaceline">
    </div>
    <div class="list-group">
      <router-link class="list-group-item"
                   active-class="active"
                   to="/bankuser/interface/home">首页</router-link>
      <router-link class="list-group-item"
                   active-class="active"
                   to="/bankuser/interface/account">我的账户</router-link>
      <router-link class="list-group-item"
                   active-class="active"
                   to="/bankuser/interface/order">我的订单</router-link>
      <router-link class="list-group-item"
                   active-class="active"
                   to="/bankuser/interface/setting">设置</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Userinterface',
  mounted () {
    if (!sessionStorage.getItem('username')) {
      this.$message.warning("请先登录")
      this.$router.replace("/bankuser/login")
    }
  }
}
</script>

<style scoped>
.userinterface {
  margin-top: 66px;
  background-color: #ffffff;
  height: 50px;
}

.userinterfaceline {
  width: 100%;
  height: 0px;
  border: 1.3px solid #ea0437;
  background-color: #ea0437;
  transform: rotate(0deg);
}

.list-group {
  text-align: center;
  margin-top: 17px;
}

.list-group-item {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 15px;
  /* or 57% */

  color: #858585;
  margin: 0 5vw;
}

.active {
  color: #ea0437;
}
</style>