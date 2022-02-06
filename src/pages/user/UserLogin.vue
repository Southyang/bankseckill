<template>
  <div class="userlogin">
    <button class="gotoother"
            @click="gotomanager">管理端</button>
    <img class="userloginimg"
         src="../../assets/image/userloginimg.png">
    <div class="userloginbox">
      <div class="userlogincontext">
        用户网上银行登录
      </div>
      <div class="userloginline">
      </div>
      <div v-if="status === true"
           class="userlogininputbox">
        <div class="userlogininput username">
          <img src="../../assets/image/usernameicon.png"
               class="usericon">
          <input class="userinput"
                 type="text"
                 placeholder="输入手机号/身份证号"
                 v-model="username">
        </div>
        <div class="userlogininput password">
          <img src="../../assets/image/passwordicon.png"
               class="usericon">
          <form>
            <input class="userinput"
                   placeholder="输入密码"
                   v-model="password"
                   type="password"
                   autocomplete="off">
          </form>
        </div>
      </div>
      <div v-else
           class="userlogininputbox">
        <div class="userlogininput username">
          <img src="../../assets/image/usernameicon.png"
               class="usericon">
          <input class="userinput"
                 type="text"
                 placeholder="输入手机号"
                 v-model="username">
        </div>
        <div class="flex1">
          <div class="userlogininput vcode">
            <img src="../../assets/image/passwordicon.png"
                 class="usericon">
            <input class="userinput vcode"
                   placeholder="输入验证码"
                   v-model="code">
          </div>
          <button class="getvcode"
                  @click="getvcode"> 获取验证码 </button>
        </div>
      </div>
      <div class="userlogininfotext">
        <div class="usephonevcode"
             @click="usephonevcode"> {{text}} </div>
        <div class="userloginforget"
             @click="modifyuserpassowrd"> 忘记密码 </div>
      </div>
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
import qs from 'qs'
import md5 from '../../assets/js/md5.min.js'
export default {
  name: 'UserLogin',
  data () {
    return {
      username: '',
      password: '',
      code: '',
      status: true,
      text: '验证码登录'
    }
  },
  methods: {
    gotomanager () {
      this.$router.replace('/bankmanager');
      console.log('跳转到manager')
    },
    usephonevcode () {
      if (this.status === true) {
        console.log('使用验证码登录')
        this.text = '密码登录'
        this.status = false
      }
      else {
        console.log('使用密码登录')
        this.text = '验证码登录'
        this.status = true
      }
    },
    getvcode () {
      if (!this.username === "")
        return alert("用户名不能为空")
      console.log("用户" + this.username + "登录获取验证码")
      this.$http.get("user/sendCode",
        {
          params: {
            id: this.username
          }
        }).then(
          response => {
            console.log('请求成功了', response.data)
            if (response.data.code === 200) {
              this.$bus.$emit('Toast', "验证码为:" + response.data.obj, "success")
            }
            else {
              this.$bus.$emit('Toast', "该手机未注册", "info")
            }
          },
          error => {
            console.log('请求失败了', error.message)
            this.$bus.$emit('Toast', "网络错误", "failed")
          }
        )
    },
    modifyuserpassowrd () {
      this.$router.push('/bankuser/forget')
      console.log('跳转到用户修改密码界面')
    },
    userlogin () {
      console.log("用户登录，与后端交互验证信息正误")

      sessionStorage.setItem("username", this.username)
      if (this.status === true) { //账号密码登录
        if (!this.username === "" || !this.password.trim())
          return alert("用户名和密码不能为空")

        console.log("用户名:" + this.username + " 密码:" + this.password)
        let salt = "1a2b3c4d"
        let inputPass = this.password
        let str = "" + salt.charAt(0) + salt.charAt(2) + inputPass + salt.charAt(5) + salt.charAt(4);
        let passwordsalt = md5(str);
        let data = {
          mobile: this.username,
          password: passwordsalt
        }
        //发送post请求登录
        /* this.$http.post('user/toLogin1', qs.stringify(data)).then(
          response => {
            console.log(data)
            this.password = ''
            console.log('请求成功了', response.data)
            if (response.data.code !== 200) {
              this.$bus.$emit('Toast', "账号或密码错误", "failed")
            }
            else {
              this.$bus.$emit('Toast', "登录成功", "success")
              this.$router.push('/bankuser/interface')
            }
          },
          error => {
            console.log('请求失败了', error.message)
            this.$bus.$emit('Toast', "网络错误", "info")
          }
        ) */
        this.password = ''
        this.$router.push('/bankuser/interface')
      }
      else { //验证码登录
        if (!this.username === "" || !this.code.trim())
          return alert("用户名和验证码不能为空")

        let data = {
          id: this.username,
          code: this.code
        }
        console.log("用户名:" + this.username + " 验证码:" + this.code)
        //发送post请求登录
        /* this.$http.post('user/toLogin2', qs.stringify(data)).then(
          response => {
            console.log(data)
            this.code = ''
            console.log('请求成功了', response.data)
            if (response.data.code !== 200) {
              this.$bus.$emit('Toast', response.data.message, "failed")
            }
            else {
              this.$bus.$emit('Toast', "登录成功", "success")
              this.$router.push('/bankuser/interface')
            }
          },
          error => {
            console.log('请求失败了', error.message)
            this.$bus.$emit('Toast', "网络错误", "info")
          }
        ) */
        this.code = ''
        this.$router.push('/bankuser/interface')
      }
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

.vcode {
  width: 54%;
}

.flex1 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.getvcode {
  width: 120px;
  height: 51px;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 15px;
  /* or 67% */
  background: #ffffff;
  border: 1px solid #ea0437;
  box-sizing: border-box;
  color: #ea0437;
  margin-left: 15px;
  margin-top: 30px;
  cursor: pointer;
}

.userlogininfotext {
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 15px;
  /* or 82% */

  letter-spacing: 1px;

  color: #858585;
  cursor: pointer;
  margin-top: 3%;
}

.usephonevcode {
  width: 95px;
  height: 20px;
  margin-left: 11%;
  float: left;
}

.userloginforget {
  width: 76px;
  height: 20px;
  margin-left: 75%;
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