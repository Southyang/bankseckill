<template>
  <div class="managerlogin">
    <button class="gotoother"
            @click="gotomanager">用户端</button>
    <img class="managerloginimg"
         src="../../assets/image/userloginimg.png">
    <div class="managerloginbox">
      <div class="managerlogincontext">
        秒杀管理系统登录
      </div>
      <div class="managerloginline">
      </div>
      <div v-if="status === true"
           class="managerlogininputbox">
        <div class="managerlogininput managername">
          <img src="../../assets/image/usernameicon.png"
               class="managericon">
          <input class="managerinput"
                 type="text"
                 placeholder="输入账号"
                 v-model="managername">
        </div>
        <div class="managerlogininput password">
          <img src="../../assets/image/passwordicon.png"
               class="managericon">
          <form>
            <input class="managerinput"
                   placeholder="输入密码"
                   v-model="password"
                   type="password"
                   autocomplete="off">
          </form>
        </div>
      </div>
      <div v-else
           class="managerlogininputbox">
        <div class="managerlogininput managername">
          <img src="../../assets/image/usernameicon.png"
               class="managericon">
          <input class="managerinput"
                 type="text"
                 placeholder="输入手机号"
                 v-model="managername">
        </div>
        <div class="flex1">
          <div class="managerlogininput vcode">
            <img src="../../assets/image/passwordicon.png"
                 class="managericon">
            <input class="managerinput vcode"
                   placeholder="输入验证码"
                   v-model="code">
          </div>
          <button class="getvcode"
                  @click="getvcode"> 获取验证码 </button>
        </div>
      </div>
      <div class="managerlogininfotext">
        <!-- <div class="usephonevcode"
             @click="usephonevcode"> {{text}} </div> -->
        <div class="managerloginforget"
             @click="modifymanagerpassowrd"> 忘记密码 </div>
      </div>
      <div class="managerloginbuttonbox">
        <button class="managerlogin managerloginbutton"
                @click="managerlogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import md5 from '../../assets/js/md5.min.js'
export default {
  name: 'managerLogin',
  data () {
    return {
      managername: '',
      password: '',
      code: '',
      status: true,
      text: '验证码登录'
    }
  },
  methods: {
    gotomanager () {
      this.$router.replace('/bankuser');
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
      if (!this.managername === "")
        return alert("用户名不能为空")
      console.log("用户" + this.managername + "登录获取验证码")
      this.$http.get("user/sendCode",
        {
          params: {
            id: this.managername
          }
        }).then(
          response => {
            console.log('请求成功了', response.data)
            if (response.data.code === 200) {
              // this.$bus.$emit('Toast', "验证码为:" + response.data.obj, "success")
              this.$message.info("验证码为:" + response.data.obj)
            }
            else {
              // this.$bus.$emit('Toast', "该手机未注册", "info")
              this.$message.warning("该手机未注册")
            }
          },
          error => {
            console.log('请求失败了', error.message)
            // this.$bus.$emit('Toast', "网络错误", "failed")
            this.$message.error("网络错误")
          }
        )
    },
    modifymanagerpassowrd () {
      this.$router.push('/bankmanager/forget')
      console.log('跳转到用户修改密码界面')
    },
    managerlogin () {
      console.log("用户登录，与后端交互验证信息正误")

      if (this.status === true) { //账号密码登录
        if (!this.managername === "" || !this.password.trim())
          return alert("用户名和密码不能为空")

        console.log("用户名:" + this.managername + " 密码:" + this.password)
        let salt = "1a2b3c4d"
        let inputPass = this.password
        let str = "" + salt.charAt(0) + salt.charAt(2) + inputPass + salt.charAt(5) + salt.charAt(4);
        let passwordsalt = md5(str);
        let data = {
          id: this.managername,
          password: passwordsalt
        }
        //发送post请求登录
        this.$http.post('manage/toLogin', qs.stringify(data)).then(
          response => {
            console.log(data)
            this.password = ''
            console.log('请求成功了', response.data)
            if (response.data.code !== 200) {
              // this.$bus.$emit('Toast', "账号或密码错误", "failed")
              this.$message.warning("账号或密码错误")
            }
            else {
              // this.$bus.$emit('Toast', "登录成功", "success")
              sessionStorage.setItem("managername", this.managername)
              this.$message.success("登录成功")
              this.$router.push('/bankmanager/interface')
            }
          },
          error => {
            console.log('请求失败了', error.message)
            // this.$bus.$emit('Toast', "网络错误", "info")
            this.$message.error("网络错误")
          }
        )
        /* this.password = ''
        this.$router.push('/bankmanager/interface') */
      }
      else { //验证码登录
        if (!this.managername === "" || !this.code.trim())
          return alert("用户名和验证码不能为空")

        let data = {
          id: this.managername,
          code: this.code
        }
        console.log("用户名:" + this.managername + " 验证码:" + this.code)
        //发送post请求登录
        this.$http.post('user/toLogin2', qs.stringify(data)).then(
          response => {
            console.log(data)
            this.code = ''
            console.log('请求成功了', response.data)
            if (response.data.code !== 200) {
              // this.$bus.$emit('Toast', response.data.message, "failed")
              this.$message.warning(response.data.message)
            }
            else {
              // this.$bus.$emit('Toast', "登录成功", "success")
              sessionStorage.setItem("managername", this.managername)
              this.$message.success("登录成功")
              this.$router.push('/bankmanager/interface')
            }
          },
          error => {
            console.log('请求失败了', error.message)
            // this.$bus.$emit('Toast', "网络错误", "info")
            this.$message.error("网络错误")
          }
        )
        /* this.code = ''
        this.$router.push('/bankmanager/interface') */
      }
    }
  }
}
</script>

<style scoped>
.managerlogin {
  margin-top: 70px;
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
  width: 650px;
  height: 450px;
  right: 100px;
  top: 200px;
  /* bottom: 10vh; */
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
  width: 80%;
  height: 51px;
  margin-left: 10%;
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

.vcode {
  width: 55%;
}

.flex1 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.getvcode {
  width: 20%;
  height: 51px;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 15px;
  /* or 67% */
  color: #ea0437;
  margin-left: 5%;
  margin-top: 30px;
  cursor: pointer;
  background: #FFFFFF;
  border: 2px solid #EA0437;
  box-sizing: border-box;
  border-radius: 5px;
}

.managerlogininfotext {
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

.managerloginforget {
  width: 76px;
  height: 20px;
  margin-left: 78%;
}

.managerloginbuttonbox {
  margin-top: 5%;
}

.managerlogin {
  background: #ea0437;
  color: #ffffff;
}

.managerloginbutton {
  width: 80%;
  height: 51px;
  margin-left: 10%;
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