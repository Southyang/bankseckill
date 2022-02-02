<template>
  <div class="useraccount">
    <div class="accountbox">
      <div class="accountbox-header">
        <div class="userimage"> </div>
        <div>
          {{username}} <br>
          {{userid}}(账户)
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
        <div class="accountboxtitle">
          {{name}} <br>
          {{sex}} <br>
          {{cardkind}} <br>
          {{cardnumber}} <br>
          {{phone}}
        </div>
      </div>
      <div class="accountbox-footer">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Useraccount',
  data () {
    return {
      username: '用户名',
      userid: '3874-2674-2268-3146',
      name: '姓名',
      sex: '性别',
      cardkind: '证件类型',
      cardnumber: '证件号码',
      phone: '账号关联手机号'
    }
  }
}
</script>

<style>
.accountbox {
  position: absolute;
  width: 60vw;
  min-width: 800px;
  height: 550px;
  left: 20vw;
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
}

.userimage {
  background-color: #ffffff;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-left: 50px;
	margin-right: 10px;
  overflow: hidden;
  float: left;
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
}

.accountboxtitle {
  margin-left: 10%;
  width: 30%;
}

.accountboxline {
  width: 0px;
  height: 80%;
  border: 1px solid #b8b8b8;
  background-color: #b8b8b8;
}

.accountbox-footer {
  width: 100%;
  height: 10%;
}
</style>