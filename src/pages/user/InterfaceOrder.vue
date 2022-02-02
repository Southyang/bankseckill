<template>
  <div class="interfaceorder">
    <div class="list-group">
      <div class="list-group-item">
        <router-link class="list-group-item" active-class="active"
                     to="/bankuser/interface/order/orderall">全部订单</router-link>
      </div>
      <div class="list-group-item">
        <router-link class="list-group-item" active-class="active"
                     to="/bankuser/interface/order/orderbook">预约订单</router-link>
      </div>
      <div class="list-group-item">
        <router-link class="list-group-item" active-class="active"
                     to="/bankuser/interface/order/orderfinish">完成订单</router-link>
      </div>
    </div>
    <div>
			<router-view></router-view>
		</div>
  </div>
</template>

<script>
export default {
  name: 'InterfaceOrder'
}
</script>

<style scoped>
.interfaceorder{
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
}

.list-group {
  background-color: #ffffff;
  height: 100vh;
  width: 240px;
}

.list-group-item {
  padding-top: 50px;
  margin-bottom: 50px;
  margin-left: 15px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 15px;
  /* or 67% */

  color: #494949;
}

.active{
	color: #EA0437;
}
</style>