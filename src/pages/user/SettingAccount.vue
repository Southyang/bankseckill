<template>
  <div class="settingaccount">
    <div class="accountbody">
      <p class="bodyinfo">姓名
        <span class="inforight">{{user.name}}</span>
      <div class="line"></div>
      </p>
      <p class="bodyinfo">关联手机号
        <span class="inforight">{{user.id}}</span>
      <div class="line"></div>
      </p>
      <p class="bodyinfo">关联证件号
        <span class="inforight">{{user.idNumber}}</span>
      <div class="line"></div>
      </p>
      <p class="bodyinfo">密码
        <span class="inforight userforgetbutton"
              @click="changepassword">修改密码</span>
      <div class="line"></div>
      </p>
    </div>
    <div v-show="isLoading"
         class="loading">加载中……</div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'SettingAccount',
  data () {
    return {
      isLoading: true,
      user: {
        name: '',
        idNumber: '',
        id: '',
      }
    }
  },
  methods: {
    initdata (data) {
      this.user.name = data.name
      this.user.idNumber = data.idNumber.slice(0, 6) + "XXXXXX" + data.idNumber.slice(12, 19)
      this.user.id = data.id.toString()
      this.user.id = this.user.id.slice(0, 3) + "XXXX" + this.user.id.slice(7, 12)
    },
    changepassword () {
      this.$router.push({
        name: 'forget',
      })
    }
  },
  mounted () {
    let data = {
      id: sessionStorage.getItem("username")
    }
    // 发送post请求
    this.$http.post('user/info', qs.stringify(data)).then(
      response => {
        console.log(data)
        console.log(response.data)
        if (response.data.code !== 200) {
          this.$message.warning(response.data.message)
        }
        else {
          this.$message.success("信息获取成功")
          this.initdata(response.data.obj)
          this.isLoading = false
        }
      },
      error => {
        console.log('请求失败了', error.message)
        this.$message.error("网络错误")
      }
    )
  }
}
</script>

<style scoped>
.settingaccount {
  position: absolute;
  width: 60%;
  height: 500px;
  left: 25%;
  top: 200px;

  background: #ffffff;
  border-radius: 5px;
}

.accountbody {
  width: 80%;
  margin-left: 10%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 60px;
  /* or 143% */

  color: #494949;
  margin-top: 80px;
}

.bodyinfo {
  height: 60px;
}

.inforight {
  float: right;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #c4c4c4;
  transform: matrix(1, 0, 0, 1, 0, 0);
}

.userforgetbutton {
  width: 130px;
  height: 40px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 40px;
  letter-spacing: 0.15em;
  /* or 61% */
  letter-spacing: 4px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
  background-color: #ea0437;
  color: #ffffff;
  border: none;
}

.loading {
  width: 100%;
  text-align: center;
  margin-top: 300px;
}
</style>