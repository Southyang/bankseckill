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
          <div class="userregisterinput">客户昵称</div>
          <input class="userinput"
                 placeholder="请输入昵称"
                 v-model="nickname" />
        </div>
        <div class="inputbox">
          <div class="userregisterinput">客户姓名</div>
          <input class="userinput"
                 placeholder="请输入客户姓名"
                 v-model="username" />
        </div>
        <div class="inputbox">
          <span class="userregisterinput">身份证号</span>
          <input class="userinput"
                 placeholder="请输入证件号码"
                 v-model="cardid" />
        </div>
        <div class="inputbox">
          <span class="userregisterinput">手机号码</span>
          <input class="userinput"
                 placeholder="请输入手机号码"
                 v-model="phone" />
        </div>
        <div class="inputbox">
          <div class="userregisterinput">账号密码</div>
          <form>
            <input class="userinput"
                   type="password"
                   placeholder="请输入密码"
                   v-model="password"
                   autocomplete="off" />
          </form>
        </div>
        <div class="inputbox">
          <div class="userregisterinput">确认密码</div>
          <form>
            <input class="userinput"
                   type="password"
                   placeholder="请再次输入密码"
                   v-model="repassword"
                   autocomplete="off" />
          </form>
        </div>
      </div>
      <div class="userregisterconfirmbox">
        <input type="checkbox"
               v-model="checked"
               class="userregisterconfirm" />
        <span> 阅读并同意
          <a style="color: #0578FF;text-decoration: none;"
             href="#"
             @click="DialogVisible=true">《三湘银行个人网银开户协议》</a></span>
      </div>

      <span class="userregisterbuttonbox">
        <button class="userconfirm userregisterbutton"
                @click="confirm"> 确认 </button>
        <button class="usergoback userregisterbutton"
                @click="goback"> 返回 </button>
      </span>
    </div>

    <el-dialog title="《三湘银行个人网银开户协议》"
               :visible.sync="DialogVisible"
               width="80%"
               align="center"
               model="false"
               :before-close="handleClose">
      <Agreements />
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="DialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import { SM4Util } from '../../assets/js/sm4'
import Agreements from '../../components/Agreements.vue'
export default {
  name: 'Userregister',
  components: { Agreements },
  data () {
    return {
      checked: false,
      username: '',
      nickname: '',
      password: '',
      repassword: '',
      cardid: '',
      phone: '',
      sex: '',
      age: '',
      DialogVisible: false,
    }
  },
  methods: {
    computedata (data) {
      if (parseInt(data.substr(16, 1)) % 2 == 1) {
        this.sex = "男";
      } else {
        this.sex = "女";
      }
      let myDate = new Date();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      let age = myDate.getFullYear() - data.substring(6, 10) - 1;
      if (data.substring(10, 12) < month || data.substring(10, 12) == month && data.substring(12, 14) <= day) {
        age++;
      }
      this.age = age
    },
    confirm () { //确认注册
      console.log("用户注册确认")

      if (this.checked === false) {
        this.$message.warning("请勾选协议框");
        return false;
      }
      if (!this.username.trim() || !this.nickname.trim() || !this.password.trim() || !this.repassword.trim() || !this.cardid.trim() || !this.phone.trim()) {
        this.$message.warning("输入不能为空");
        return false;
      }
      if (this.password !== this.repassword) {
        this.$message.warning("两次密码不一致");
        return false;
      }

      const sm4 = new SM4Util();
      const passwordtrans = sm4.encryptData_CBC(this.password)
      let bankCardNumber = this.generateCard(19)
      this.computedata(this.cardid)
      let data = {
        id: this.phone,
        nickname: this.nickname,
        password: passwordtrans,
        name: this.username,
        idNumber: this.cardid,
        sex: this.sex,
        age: this.age,
        bankCardNumber: bankCardNumber
      }
      console.log(data)
      //发送post请求
      this.$http.post('user/toRegister', qs.stringify(data)).then(
        response => {
          console.log(data)
          console.log(response.data)
          if (response.data.code !== 200) {
            this.$message.warning(response.data.message)
          }
          else {
            this.$messagebox1("请保管好您的银行卡号:" + bankCardNumber, "注册成功", "success").then(() => {
              this.$router.push('/bankuser/')
            })
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )
    },
    goback () { //返回
      console.log("用户注册返回")
      this.$router.replace('/bankuser')
    },
    handleClose (done) {
      this.$messagebox("确认关闭？", "info")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    generateCard (len) {
      let res = '';
      for (let i = 0; i < len; i++) {
        res += Math.floor(Math.random() * 10);
      }
      return res;
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

.agreement-txt {
  text-align: left;
  line-height: 25px;
  white-space: break-spaces; /* pre-line、pre-wrap 也可以 */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: auto;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  font-size: 28px;
  color: #323232;
  font-family: '微软雅黑';
}
</style>