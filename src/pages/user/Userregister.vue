<template>
  <div class="userregister">
    <div class="userregisterbox">
      <div class="userregisterbanner">
        <img class="icon"
             src="../../assets/image/userregistericon.png" />
        <div class="registercontext"> 注册 </div>
      </div>
      <div class="userregisterline">
      </div>
      <div class="userregisterinputbox">
        <div class="inputbox">
          <div class="userregisterinput">客户姓名</div>
          <input class="userinput"
                 placeholder="请输入客户姓名"
                 v-model="username" />
        </div>
        <div class="inputbox">
          <div class="userregisterinput">客户昵称</div>
          <input class="userinput"
                 placeholder="请输入昵称"
                 v-model="nickname" />
        </div>
        <div class="inputbox">
          <div class="userregisterinput">账号密码</div>
          <input class="userinput"
                 type="password"
                 placeholder="请输入密码"
                 v-model="password" />
        </div>
        <div class="inputbox">
          <span class="userregisterinput">证件类型</span>
          <select class="userinput usercardkind"
                  v-model="selected">
            <option value="第二代居民身份证"
                    style="font-size:15px">第二代居民身份证</option>
            <option value="第二代居民身份证1"
                    style="font-size:15px">第二代居民身份证1</option>
            <option value="第二代居民身份证2"
                    style="font-size:15px">第二代居民身份证2</option>
            <option value="第二代居民身份证3"
                    style="font-size:15px">第二代居民身份证3</option>
          </select>
        </div>
        <div class="inputbox">
          <span class="userregisterinput">证件号码</span>
          <input class="userinput"
                 placeholder="请输入证件号码"
                 v-model="cardid" />
        </div>
        <!-- <div class="inputbox">
          <span class="userregisterinput">账(卡)号</span>
          <input class="userinput"
                 placeholder="请输入绑定卡卡号"
                 v-model="bankcard" />
        </div> -->
        <div class="inputbox">
          <span class="userregisterinput">手机号码</span>
          <input class="userinput"
                 placeholder="请输入手机号码"
                 v-model="phone" />
        </div>
        <!-- <div class="inputbox">
          <span class="userregisterinput">短信验证码</span>
          <input class="userinput vcode"
                 placeholder="请输入手机验证码"
                 v-model="vcode" />
          <button class="getvcode"
                  @click="getvcode"> 获取验证码 </button>
        </div> -->
      </div>
      <div class="userregisterconfirmbox">
        <input type="checkbox"
               v-model="checked"
               class="userregisterconfirm" />
        <span> 阅读并同意
          <a style="color: #0578FF;"
             href="#">《三湘银行个人网银开户协议》</a></span>
      </div>

      <span class="userregisterbuttonbox">
        <button class="userconfirm userregisterbutton"
                @click="confirm"> 确认 </button>
        <button class="usergoback userregisterbutton"
                @click="goback"> 返回 </button>
      </span>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import md5 from '../../assets/js/md5.min.js'
export default {
  name: 'Userregister',
  data () {
    return {
      checked: false,
      username: '',
      nickname: '',
      password: '',
      selected: '第二代居民身份证',
      cardid: '',
      // bankcard: '',
      phone: '',
      // vcode: ''
    }
  },
  methods: {
    getvcode () {
      console.log("用户注册获取验证码")
    },
    confirm () {
      console.log("用户注册确认")

      if(this.checked === false){
        this.$message.warning("请勾选协议框");
        return false;
      }
      if(!this.username.trim() || !this.nickname.trim() || !this.password.trim() || !this.cardid.trim() || !this.phone.trim()){
        this.$message.warning("输入不能为空");
        return false;
      }

      let salt = "1a2b3c4d"
      let password = this.password
      let str = "" + salt.charAt(0) + salt.charAt(2) + password + salt.charAt(5) + salt.charAt(4)
      let passwordsalt = md5(str)
      let data = {
        id: this.phone,
        nickname: this.nickname,
        password: passwordsalt,
        salt:"",
        name: this.username,
        idNumber: this.cardid
      }
      //发送post请求
      this.$http.post('user/toRegister', qs.stringify(data)).then(
        response => {
          console.log(data)
          console.log(response.data)
          if(response.data.code !== 200){
            this.$message.warning(response.data.message)
          }
          else{
            this.$message.success("注册成功")
            this.$router.push('/bankuser/')
          }
        },
        error => {
          console.log('请求失败了',error.message)
          this.$message.error("网络错误")
        }
      )
      /* if (temp === true) {
        // this.$bus.$emit('Toast', "注册成功", "success")
        this.$message.success("注册成功")
      }
      else {
        // this.$bus.$emit('Toast', "注册失败", "failed")
        this.$message.error("注册失败")
      } */
    },
    goback () {
      console.log("用户注册返回")
      this.$router.replace('/bankuser')
    }
  }
}
</script>

<style scoped>
.userregister {
  margin-top: 100px;
}
.userregisterbox {
  position: absolute;
  width: 80vw;
  min-width: 1000px;
  height: 80vh;
  min-height: 660px;
  left: 10vw;
  right: 10vw;
  top: 100px;

  background: #ffffff;
  border-radius: 5px;
}

.userregisterbanner {
  margin-top: 15px;
}

.icon {
  margin-left: 2.5%;
  width: 30px;
  height: 30px;
  float: left;
}

.registercontext {
  float: left;
  /* position: absolute; */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  /* or 74% */
  margin-left: 5px;
  line-height: 30px;
  color: #ea0437;
}

.userregisterline {
  width: 95%;
  height: 0px;
  margin-left: 2.5%;
  margin-top: 5%;
  border: 1px solid #858585;
  transform: rotate(-0.11deg);
  background-color: #858585;
}

.userregisterinputbox {
  margin-top: 50px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 15px;
  /* or 61% */
  margin-left: 26%;
}

.inputbox {
  margin-top: 25px;
  width: 560px;
  height: 40px;
}

.userregisterinput {
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
  color: #858585;
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

input[type='checkbox'] {
  height: 26px;
  width: 26px;
  vertical-align: middle;
}

.userregisterconfirmbox {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 15px;
  /* or 61% */
  text-align: center;
  color: #858585;
  margin-top: 30px;
  margin-bottom: 15px;
}

.userregisterbuttonbox {
  margin-left: 35%;
}

.userregisterbutton {
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