<template>
  <div class="login">
    <div class="logininfo">
      <img class="managerloginimg"
           src="../../assets/image/userloginimg.png">
      <div class="managerloginbox">
        <div class="managerlogincontext">
          秒杀管理系统登录
        </div>
        <div class="managerloginline">
        </div>
        <div class="managerlogininputbox">
          <div class="managerlogininput managername">
            <img src="../../assets/image/usernameicon.png"
                 class="managericon">
            <input class="managerinput"
                   placeholder="输入账号"
                   v-model="username">
          </div>
          <div class="managerlogininput password">
            <img src="../../assets/image/passwordicon.png"
                 class="managericon">
            <input class="managerinput"
                   placeholder="输入密码"
                   v-model="password"
                   type="password">
          </div>
        </div>
        <div class="managerloginforget"
             @click="modifymanagerpassowrd"> 忘记密码 </div>
        <div class="managerloginbuttonbox">
          <button class="managerloginbutton managerbutton"
                  @click="managerlogin">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManagerLogin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    modifymanagerpassowrd () {
      console.log("管理员忘记密码，与后端交互修改密码")
    },
    managerlogin () {
      console.log("管理员登录，与后端交互验证信息正误")
      if (!this.username.trim() || !this.password.trim())
        return alert("用户名和密码不能为空")
      console.log("管理员名:" + this.username + " 密码:" + this.password)
      this.password = ''
    },
    managerregister () {
      console.log("管理员注册，与后端交互录入管理员信息")
    }
  }
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

.logininfo {
  margin-top: 100px;
}

.managerloginimg {
  position: absolute;
  width: 630px;
  height: 670px;
  left: 79px;
  top: 202px;
}

.managerloginbox {
  position: absolute;
  width: 528px;
  height: 500px;
  right: 100px;
  /* top: 150px; */
  bottom: 10vh;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.managerlogincontext {
  width: auto;
  height: 29px;
  text-align: center;
  margin-top: 6%;

  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 15px;
  /* or 61% */
  letter-spacing: 2px;

  color: #858585;
}

.managerloginline {
  width: 95%;
  height: 0px;
  margin-left: 2.5%;
  margin-top: 3%;
  border: 1px solid #ea0437;
  background-color: #ea0437;
  transform: rotate(0deg);
}

.managerlogininputbox {
  margin-top: 50px;
}

.managerlogininput {
  width: 420px;
  height: 51px;
  margin-left: 54px;
  margin-top: 30px;
  background: #ffffff;
  box-shadow: inset 0px 1px 1px rgba(146, 146, 146, 0.25);
  border-radius: 5px;
}

.managericon {
  width: 31px;
  height: 31px;
  margin-top: 10px;
  margin-left: 15px;
  float: left;
}

.managerinput {
  height: 31px;
  margin-top: 10px;
  width: 85%;
  margin-left: 1px;
  border: 0; /* 去除未选中状态边框 */
  outline: none; /* 去除选中状态边框 */
  font-size: 20px;
}

.managerlogininput:hover {
  box-shadow: 1px 1px 1px 1px #f2f2f2;
}

.managerloginforget {
  width: 76px;
  height: 20px;
  margin-left: 75%;
  margin-top: 3%;

  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 15px;
  /* or 82% */

  letter-spacing: 1px;

  color: #858585;
  cursor: pointer;
}

.managerloginbuttonbox {
  margin-top: 5%;
}

.managerloginbutton {
  background: #ea0437;
  color: #ffffff;
}

.managerbutton {
  width: 418px;
  height: 51px;
  margin-left: 55px;
  margin-top: 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 15px;
  /* or 61% */

  letter-spacing: 4px;
}

/* input的默认提示字体设置 */
input::-webkit-input-placeholder {
  /* WebKit browsers */
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 2px;
  color: #b3b3b3;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 2px;
  color: #b3b3b3;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 2px;
  color: #b3b3b3;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 2px;
  color: #b3b3b3;
}
</style>