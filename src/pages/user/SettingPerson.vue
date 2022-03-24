<template>
  <div class="settingperson">
    <div class="personheader"
         @click="changeavatar">
      <div class="userimage"
           title="编辑"
           :style="{backgroundImage: 'url(' + imageurl + ')'}"></div>
      <div class="headerinfo">
        点击更换头像
      </div>
    </div>
    <div class="personbody">
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
      <p class="bodyinfo">银行卡账号
        <span class="inforight">{{user.bankCardNumber}}</span>
      <div class="line"></div>
      </p>
      <p class="bodyinfo">信誉情况
        <span class="inforight">{{user.truststatus}}</span>
      <div class="line"></div>
      </p>
      <p class="bodyinfo">工作情况
        <span class="inforight">{{user.jobstatus}}</span>
      <div class="line"></div>
      </p>
      <p class="bodyinfo">逾期次数
        <span class="inforight">{{user.overdueNum}}</span>
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
  name: 'Settingperson',
  data () {
    return {
      imageurl: 'https://store.southyang.cn/project/bankseckill/boy.png',
      isLoading: true,
      user: {
        imageurl: '',
        name: '',
        idNumber: '',
        id: '',
        bankCardNumber: '',
        truststatus: '',
        jobstatus: '',
        overdueNum: ''
      }
    }
  },
  methods: {
    initdata (data) {
      this.user.name = data.name
      this.user.idNumber = data.idNumber.slice(0,6) + "XXXXXX" + data.idNumber.slice(12,19)
      this.user.id = data.id.toString()
      this.user.id = this.user.id.slice(0,3) + "XXXX" + this.user.id.slice(7,12)
      this.user.bankCardNumber = data.bankCardNumber.slice(0,6)+ "XXXXXX" + data.bankCardNumber.slice(12,20)
      this.user.overdueNum = data.overdueNum + "次"
      if (data.sex === "男") {
        this.user.imageurl = "https://store.southyang.cn/project/bankseckill/boy.png"
      }
      else {
        this.user.imageurl = "https://store.southyang.cn/project/bankseckill/girl.png"
      }
      if (data.jobStatus === 1) {
        this.user.jobstatus = "良好"
      }
      else {
        this.user.jobstatus = "较差"
      }
      if (data.trustStatus === 1) {
        this.user.truststatus = "良好"
      }
      else {
        this.user.truststatus = "较差"
      }
    },
    changeavatar () {
      console.log("更换头像")
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
.settingperson {
  position: absolute;
  width: 70%;
  height: 600px;
  left: 320px;
  top: 150px;

  background: #ffffff;
  border-radius: 5px;
}

.personheader {
  margin-top: 20px;
  margin-bottom: 10px;
  width: 120px;
  height: 120px;
  margin-left: 45%;
  cursor: pointer;
}

.userimage {
  background-color: #ffffff;
  background-size: 100px 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 10px;
  overflow: hidden;
  float: left;
  z-index: 9999;
}

.headerinfo {
  width: 100%;
  text-align: center;

  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 105% */

  color: #8b8b8b;
}

.personbody {
  width: 80%;
  margin-left: 10%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 60px;
  /* or 143% */

  color: #494949;
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

.loading {
  width: 100%;
  text-align: center;
  margin-top: 300px;
}
</style>