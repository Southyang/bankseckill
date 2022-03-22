<template>
  <div class="interfacesetting">
    <div class="list-group">
      <div class="list-group-item">
        <router-link class="list-group-item" active-class="active"
                     to="/bankuser/interface/setting/settingperson">个人信息设置</router-link>
      </div>
      <div class="list-group-item">
        <router-link class="list-group-item" active-class="active"
                     to="/bankuser/interface/setting/settingaccount">账号与安全</router-link>
      </div>
      <div class="list-group-item">
        <router-link class="list-group-item" active-class="active"
                     to="/bankuser/interface/setting/settingarticle">协议与条款</router-link>
      </div>
    </div>
    <div>
			<router-view></router-view>
		</div>
  </div>
</template>

<script>
export default {
  name: 'InterfaceSetting'
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.interfacesetting{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.list-group {
  background-color: #ffffff;
  height: 100vh;
  width: 220px;
	float: left;
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