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
import qs from 'qs'
import md5 from '../../assets/js/md5.min.js'
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
    getvcode () { //获取验证码
      if (!this.phone.trim()) {
        this.$message.warning("手机号不能为空");
        return false;
      }
      console.log("用户" + this.phone + "修改密码 获取验证码")
      this.$http.get("user/sendCode2",
        {
          params: {
            id: this.phone
          }
        }).then(
          response => {
            console.log('请求成功了', response.data)
            if (response.data.code === 200) {
              this.$message.info("验证码为:" + response.data.obj)
            }
            else {
              this.$message.warning("该手机未注册")
            }
          },
          error => {
            console.log('请求失败了', error.message)
            this.$message.error("网络错误")
          }
        )
    },
    confirm () { //确认
      console.log("用户修改密码确认,与后端交互")
      if (!this.password.trim() || !this.repassword.trim() || !this.phone.trim() || !this.vcode.trim()) {
        this.$message.warning("输入不能为空")
        return
      }
      if (this.password !== this.repassword) {
        this.$message.warning("两次输入密码不一致")
        return
      }
      this.modify()
    },
    modify () { //修改密码
      let salt = "27ae1gh9"
      let inputPass = this.password
      let str = "" + salt.charAt(0) + salt.charAt(2) + inputPass + salt.charAt(5) + salt.charAt(4);
      let passwordsalt = md5(str);
      let data = {
        id: this.phone,
        code: this.vcode,
        password: passwordsalt
      }
      /* console.log("未加密",inputPass)
      console.log("第一次加密",passwordsalt)
      str = "" + salt.charAt(0) + salt.charAt(2) + passwordsalt + salt.charAt(5) + salt.charAt(4);
      passwordsalt = md5(str);
      console.log("第二次加密",passwordsalt) */

      //发送post请求登录
      this.$http.post('user/updatePassword', qs.stringify(data)).then(
        response => {
          console.log(data)
          console.log('请求成功了', response.data)
          if (response.data.code !== 200) {
            this.$message.warning("修改密码失败")
          }
          else {
            this.$message.success("修改密码成功")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )
    },
    goback () { //返回
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
  cursor: pointer;
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