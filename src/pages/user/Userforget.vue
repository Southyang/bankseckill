<template>
  <div class="userforget">
    <div class="userforgetbox">
      <div class="userforgetbanner">
        <img class="icon"
             src="../../assets/image/userregistericon.png" />
        <div class="forgetcontext"> 忘记密码 </div>
      </div>
      <div class="userforgetline">
      </div>
      <div class="userforgetinputbox">
        <div class="inputbox">
          <span class="userforgetinput">手机号码</span>
          <input class="userinput"
                 placeholder="请输入手机号码"
                 v-model="phone" />
        </div>
        <div class="inputbox">
          <span class="userforgetinput">短信验证码</span>
          <input class="userinput vcode"
                 placeholder="请输入手机验证码"
                 v-model="vcode" />
          <button class="getvcode"
                  @click="getvcode"> 获取验证码 </button>
        </div>
        <div class="inputbox">
          <span class="userforgetinput">新密码</span>
          <form>
            <input class="userinput"
                   placeholder="请输入新密码"
                   type="password"
                   v-model="password"
                   autocomplete="off" />
          </form>
        </div>
        <div class="inputbox">
          <span class="userforgetinput">再次输入</span>
          <form>
            <input class="userinput"
                   placeholder="请再次输入新密码"
                   type="password"
                   v-model="repassword"
                   autocomplete="off" />
          </form>
        </div>
      </div>

      <span class="userforgetbuttonbox">
        <button class="userconfirm userforgetbutton"
                @click="confirm"> 确认 </button>
        <button class="usergoback userforgetbutton"
                @click="goback"> 返回 </button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Userforget',
  data () {
    return {
      repassword: '',
      password: '',
      phone: '',
      vcode: ''
    }
  },
  methods: {
    getvcode () {
      console.log("用户修改密码获取验证码")
    },
    confirm () {
      console.log("用户修改密码确认,与后端交互")
      let temp = true
      if (temp === true) {
        this.$bus.$emit('Toast',"修改成功" , "success")
      }
			else{
				this.$bus.$emit('Toast',"修改失败" , "failed")
			}
    },
    goback () {
      console.log("用户修改密码返回")
      this.$router.replace('/bankuser')
    },

  }
}
</script>

<style scoped>
.userforget {
  margin-top: 100px;
}
.userforgetbox {
  position: absolute;
  width: 80vw;
  min-width: 1000px;
  height: 65vh;
  min-height: 500px;
  left: 10vw;
  right: 10vw;
  top: 150px;

  background: #ffffff;
  border-radius: 5px;
}

.userforgetbanner {
  margin-top: 15px;
}

.icon {
  margin-left: 2.5%;
  width: 30px;
  height: 30px;
  float: left;
}

.forgetcontext {
  float: left;
  /* position: absolute; */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 15px;
  /* or 74% */
  margin-left: 5px;
  line-height: 30px;
  color: #ea0437;
}

.userforgetline {
  width: 95%;
  height: 0px;
  margin-left: 2.5%;
  margin-top: 5%;
  border: 1px solid #858585;
  transform: rotate(-0.11deg);
  background-color: #858585;
}

.userforgetinputbox {
  margin-top: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 15px;
  /* or 61% */
  margin-left: 26%;
  margin-bottom: 35px;
}

.inputbox {
  margin-top: 35px;
  width: 560px;
  height: 40px;
}

.userforgetinput {
  line-height: 40px;
  color: #858585;
  height: 29px;
  width: 120px;
  text-align: right;
  float: left;
}

.userinput:hover {
  box-shadow: 1px 1px 1px 1px #b8b8b8;
}

.userinput {
  margin-left: 10px;
  width: 430px;
  height: 40px;
  font-size: 22px;
  background: #ffffff;
  border: 1px solid #b8b8b8;
  box-sizing: border-box;
  padding-left: 10px;
}

.usercardkind {
  font-size: 18px;
}

.vcode {
  text-align: left;
  width: 270px;
  height: 40px;
}

.getvcode {
  width: 145px;
  height: 40px;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 15px;
  /* or 67% */
  background: #ffffff;
  border: 1px solid #ea0437;
  box-sizing: border-box;
  color: #ea0437;
  margin-left: 15px;
}

.userforgetbuttonbox {
  margin-left: 35%;
}

.userforgetbutton {
  width: 171px;
  height: 50px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 15px;
  /* or 61% */
  letter-spacing: 4px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.userconfirm {
  background-color: #ea0437;
  color: #ffffff;
  border: none;
  /* margin-left: 440px; */
}

.usergoback {
  margin-left: 20px;
  background: #ffffff;
  border: 1px solid #858585;
  box-sizing: border-box;
  color: #858585;
}

/* input的默认提示字体设置 */
input::-webkit-input-placeholder {
  /* WebKit browsers */
  font-family: Roboto;
  font-style: normal;
  font-weight: 100;
  font-size: 18px;
  line-height: 18px;
  /* or 67% */
  color: #b8b8b8;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-family: Roboto;
  font-style: normal;
  font-weight: 100;
  font-size: 18px;
  line-height: 18px;
  /* or 67% */
  color: #b8b8b8;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-family: Roboto;
  font-style: normal;
  font-weight: 100;
  font-size: 18px;
  line-height: 18px;
  /* or 67% */
  color: #b8b8b8;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-family: Roboto;
  font-style: normal;
  font-weight: 100;
  font-size: 18px;
  line-height: 18px;
  /* or 67% */
  color: #b8b8b8;
}
</style>