<template>
  <div class="login">
    <div class="logininfo">
      <img class="userloginimg"
           src="../../assets/image/userloginimg.png">
      <h1>用户登录</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scope>
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
.userloginimg {
  position: absolute;
  width: 560px;
  height: 670px;
  left: 79px;
  top: 202px;
}
.logininfo {
  margin-top: 109px;
}
</style>