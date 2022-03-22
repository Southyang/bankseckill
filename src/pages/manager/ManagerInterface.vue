<template>
  <div class="managerinterface">
    <div class="managerinterfaceline">
    </div>
    <div class="managerinterfacelist">
      <div class="list-group">
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankmanager/interface/checkapplication">查看申请记录</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankmanager/interface/getresult">获取秒杀结果</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankmanager/interface/configurerule">配置拦截规则</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankmanager/interface/addgoods">添加商品</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankmanager/interface/modifygoods">修改商品信息</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankmanager/interface/addgoodsdetail">增加商品配置</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankmanager/interface/modifygoodsdetail">修改商品配置</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankmanager/interface/deletegoods">删除商品</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankmanager/interface/addseckillgoods">添加秒杀商品</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankmanager/interface/modifyseckillgoods">修改秒杀商品信息</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankmanager/interface/deleteseckillgoods">删除秒杀商品</router-link>
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
  name: 'Managerinterface',
  mounted () {
    if (!sessionStorage.getItem('managername') || sessionStorage.getItem("managername") === "undefined") {
      this.$message.warning("请先登录")
      this.$router.replace("/bankmanager/login")
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.managerinterface {
  margin-top: 66px;
}

.managerinterfaceline {
  width: 100%;
  height: 0px;
  border: 1.3px solid #ea0437;
  background-color: #ea0437;
  transform: rotate(0deg);
}

.managerinterfacelist {
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
  background: #ea0437;
  color: #ffffff;
}
</style>