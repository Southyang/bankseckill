<template>
  <div class="interfaceaccount">
    <div class="accountbox">
      <div class="accountbox-header">
        <div class="userimage"
             :style="{backgroundImage: 'url(' + user.imageurl + ')'}"
             @click="changeimage"></div>
        <div>
          {{user.nickname}} <br>
          <!-- {{user.userid}}(账户) -->
        </div>
      </div>
      <div class="accountbox-body">
        <div class="accountboxtitle">
          {{name}} <br>
          {{nickname}} <br>
          {{cardkind}} <br>
          {{cardnumber}} <br>
          {{phone}}
        </div>
        <div class="accountboxline"></div>
        <div class="accountboxcontent">
          {{user.name}} <br>
          {{user.nickname}} <br>
          {{user.cardkind}} <br>
          {{user.cardnumber}} <br>
          {{user.phone}}
        </div>
      </div>
      <div class="accountbox-footer">
      </div>
    </div>
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
      cardkind: '证件类型',
      cardnumber: '证件号码',
      phone: '账号关联手机号',
      // imageurl: 'https://store.southyang.cn/1.png',

      user: {
        imageurl: 'https://mail.csu.edu.cn/coremail/s?func=lp:getImg&org_id=&img_id=logo_001',
        // userid: '3874-2674-2268-3146',
        name: '',
        nickname: '',
        cardkind: '第二代居民身份证',
        cardnumber: '',
        phone: '',
      }

    }
  },
  methods: {
    changeimage () {
      console.log("用户修改图片")
    }
  },
  mounted () {
    let data = {
      userId: sessionStorage.getItem("username")
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
          this.user['name'] = response.data.obj.name
          this.user.nickname = response.data.obj.nickname
          this.user.cardnumber =  response.data.obj.idNumber
          this.user.phone = response.data.obj.id
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
}

.userimage:hover::after {
  height: inherit;
  content: '编辑';
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.userimage:hover {
  opacity: 0.8;
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
</style>