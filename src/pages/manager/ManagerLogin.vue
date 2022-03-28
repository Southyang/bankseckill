<template>
  <div class="managerlogin">
    <button class="gotoother"
            @click="gotouser">用户端</button>
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
      <div class="managerloginbuttonbox">
        <button class="managerlogin managerloginbutton"
                @click="managerlogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import { SM4Util } from '../../assets/js/sm4'
export default {
  name: 'managerLogin',
  data () {
    return {
      managername: '',
      password: '',
    }
  },
  methods: {
    gotouser () {
      this.$router.replace('/bankuser');
      console.log('跳转到user')
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
    modifymanagerpassowrd () {
      this.$router.push('/bankmanager/forget')
      console.log('跳转到用户修改密码界面')
    },
    managerlogin () {
      console.log("用户登录，与后端交互验证信息正误")


      if (!this.managername === "" || !this.password.trim())
        return alert("用户名和密码不能为空")

      console.log("用户名:" + this.managername + " 密码:" + this.password)
      const sm4 = new SM4Util();
      const passwordtrans = sm4.encryptData_CBC('123456')
      let data = {
        id: this.managername,
        password: passwordtrans
      }
      //发送post请求登录
      this.$http.post('manage/toLogin', qs.stringify(data)).then(
        response => {
          console.log(data)
          this.password = ''
          console.log('请求成功了', response.data)
          if (response.data.code !== 200) {
            this.$message.warning("账号或密码错误")
          }
          else {
            sessionStorage.setItem("managername", this.managername)
            this.$message.success("登录成功")
            this.$router.push('/bankmanager/interface')
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )
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
  background: #ffffff;
  border: 2px solid #ea0437;
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