<template>
  <div class="interfaceaccount">
    <div class="accountbox">
      <div class="accountbox-header">
        <div class="userimage"
             :style="{backgroundImage: 'url(' + user.imageurl + ')'}"
             @click="changeimage"></div>
        <div>
          {{user.username}} <br>
          {{user.userid}}(账户)
        </div>
      </div>
      <div class="accountbox-body">
        <div class="accountboxtitle">
          {{name}} <br>
          {{sex}} <br>
          {{cardkind}} <br>
          {{cardnumber}} <br>
          {{phone}}
        </div>
        <div class="accountboxline"></div>
        <div class="accountboxcontent">
          {{user.name}} <br>
          {{user.sex}} <br>
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
export default {
  name: 'InterfaceAccount',
  data () {
    return {
      name: '姓名',
      sex: '性别',
      cardkind: '证件类型',
      cardnumber: '证件号码',
      phone: '账号关联手机号',
      // imageurl: 'https://store.southyang.cn/1.png',

      user: {
        imageurl: 'https://mail.csu.edu.cn/coremail/s?func=lp:getImg&org_id=&img_id=logo_001',
        username: '枏山柟',
        userid: '3874-2674-2268-3146',
        name: '南阳',
        sex: '男',
        cardkind: '第二代居民身份证',
        cardnumber: '123456789',
        phone: '123456',
      }

    }
  },
  methods: {
    changeimage () {
      console.log("用户修改图片")
    }
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