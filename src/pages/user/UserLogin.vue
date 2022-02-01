<template>
  <div class="userlogin">
    <button class="gotoother" @click="gotomanager">管理端</button>
    <img class="userloginimg"
         src="../../assets/image/userloginimg.png">
    <div class="userloginbox">
      <div class="userlogincontext">
        用户网上银行登录
      </div>
      <div class="userloginline">
      </div>
      <div class="userlogininputbox">
        <div class="userlogininput username">
          <img src="../../assets/image/usernameicon.png"
               class="usericon">
          <input class="userinput"
                 placeholder="输入手机号/身份证号"
                 v-model="username">
        </div>
        <div class="userlogininput password">
          <img src="../../assets/image/passwordicon.png"
               class="usericon">
          <input class="userinput"
                 placeholder="输入密码"
                 v-model="password"
                 type="password">
        </div>
      </div>
      <div class="userloginforget"
           @click="modifyuserpassowrd"> 忘记密码 </div>
      <div class="userloginbuttonbox">
        <button class="userlogin userloginbutton"
                @click="userlogin">登录</button>
        <button class="userregister userloginbutton"
                @click="userregister">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    gotomanager(){
			this.$router.replace('/bankmanager');
      console.log('跳转到manager')
		},
    modifyuserpassowrd () {
      console.log("用户忘记密码，与后端交互修改密码")
    },
    userlogin () {
      console.log("用户登录，与后端交互验证信息正误")
      if (!this.username.trim() || !this.password.trim())
        return alert("用户名和密码不能为空")

      console.log("用户名:" + this.username + " 密码:" + this.password)
      this.password = ''
    },
    userregister () {
      this.$router.push('/bankuser/register')
      console.log('跳转到用户注册界面')
    }
  }
}
</script>

<style scoped>
.userlogin {
  margin-top: 100px;
}

.userloginimg {
  position: absolute;
  width: 630px;
  height: 670px;
  left: 79px;
  top: 202px;
}

.userloginbox {
  position: absolute;
  width: 528px;
  height: 543px;
  right: 100px;
  top: 150px;
  /* bottom: 10vh; */
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.userlogincontext {
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

.userloginline {
  width: 95%;
  height: 0px;
  margin-left: 2.5%;
  margin-top: 3%;
  border: 1px solid #ea0437;
  background-color: #ea0437;
  transform: rotate(0deg);
}

.userlogininputbox {
  margin-top: 50px;
}

.userlogininput {
  width: 420px;
  height: 51px;
  margin-left: 54px;
  margin-top: 30px;
  background: #ffffff;
  box-shadow: inset 0px 1px 1px rgba(146, 146, 146, 0.25);
  border-radius: 5px;
}

.usericon {
  width: 31px;
  height: 31px;
  margin-top: 10px;
  margin-left: 15px;
  float: left;
}

.userinput {
  height: 31px;
  margin-top: 10px;
  width: 85%;
  margin-left: 1px;
  border: 0; /* 去除未选中状态边框 */
  outline: none; /* 去除选中状态边框 */
  font-size: 20px;
}

.userlogininput:hover {
  box-shadow: 1px 1px 1px 1px #f2f2f2;
}

.userloginforget {
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

.userloginbuttonbox {
  margin-top: 5%;
}

.userlogin {
  background: #ea0437;
  color: #ffffff;
}

.userregister {
  background: #ffffff;
  color: #858585;
}

.userloginbutton {
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