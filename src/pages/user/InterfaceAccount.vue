<template>
  <div class="interfaceaccount">
    <div class="accountbox"
         v-show="!isLoading">
      <div class="accountbox-header">
        <div class="userimage"
             :style="{backgroundImage: 'url(' + user.imageurl + ')'}"></div>
        <div>
          {{user.nickname}} <br>
          {{user.banknumber}}(账户)
        </div>
      </div>
      <div class="accountbox-body">
        <div class="accountboxtitle">
          {{name}} <br>
          {{nickname}} <br>
          {{phone}} <br>
          {{banknumber}} <br>
          {{cardnumber}} <br>
          {{overdueNum}}
        </div>
        <div class="accountboxline"></div>
        <div class="accountboxcontent">
          {{user.name}} <br>
          {{user.nickname}} <br>
          {{user.phone}} <br>
          {{user.banknumber}} <br>
          {{user.cardnumber}} <br>
          {{user.overdueNum}}
        </div>
      </div>
      <div class="accountbox-footer">
      </div>
    </div>
    <div v-show="isLoading"
         class="loading">加载中……</div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'InterfaceAccount',
  data () {
    return {
      name: '姓名',
      nickname: '昵称',
      banknumber: '银行卡号',
      cardnumber: '身份证号',
      phone: '账号关联手机号',
      overdueNum: '逾期次数',
      isLoading: true,
      user: {
        imageurl: 'https://mail.csu.edu.cn/coremail/s?func=lp:getImg&org_id=&img_id=logo_001',
        name: '',
        nickname: '',
        cardnumber: '',
        phone: '',
        banknumber: '',
        overdueNum: ''
      }
    }
  },
  methods: {
    initdata (data) {
      this.user['name'] = data.name
      this.user.nickname = data.nickname
      this.user.cardnumber = data.idNumber
      this.user.phone = data.id
      this.user.banknumber = data.bankCardNumber
      this.user.overdueNum = data.overdueNum
      if (data.sex === "男") {
        this.user.imageurl = "https://store.southyang.cn/project/bankseckill/boy.png"
      }
      else {
        this.user.imageurl = "https://store.southyang.cn/project/bankseckill/girl.png"
      }
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
.accountbox {
  position: absolute;
  width: 70vw;
  min-width: 800px;
  height: 550px;
  left: 15vw;
  top: 170px;

  background: #ea0437;
  border-radius: 5px;
}

.accountbox-header {
  display: flex;
  width: 100%;
  height: 20%;
  justify-content: flex-start;
  align-items: center;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  /* or 57% */

  color: #ffffff;
}

.userimage {
  background-color: #ffffff;
  background-size: 70px 70px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-left: 50px;
  margin-right: 20px;
  overflow: hidden;
  float: left;
  z-index: 9999;
}

.accountbox-body {
  width: 100%;
  height: 70%;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 2;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 60px;
}

.accountboxtitle {
  margin-left: 15%;
  width: 25%;

  /* or 74% */

  color: #494949;
}

.accountboxline {
  width: 0px;
  height: 80%;
  border: 1px solid #b8b8b8;
  background-color: #b8b8b8;
}

.accountboxcontent {
  margin-left: 10%;
  width: 25%;

  /* or 74% */

  color: #858585;
}

.accountbox-footer {
  width: 100%;
  height: 10%;
}

.loading {
  width: 100%;
  text-align: center;
  margin-top: 300px;
}
</style>