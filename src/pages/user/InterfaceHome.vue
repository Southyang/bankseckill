<template>
  <div class="interfacehome">
    <div class="interfacehomelist">
      <div class="list-group">
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankuser/interface/home/checkgoods">商品列表</router-link>
        </div>
        <div class="list-group-item">
          <router-link class="routerlink"
                       active-class="active"
                       to="/bankuser/interface/home/checkseckillgoods">秒杀商品</router-link>
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
  name: 'InterfaceHome'
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