<template>
  <div class="interfaceconfigure">
    <div class="configureheader">
      配置拦截规则
    </div>
    <div class="configurebody">
      <div class="bodyrule">
        <div class="rulecontent">
          <div class="ruleword">还款逾期次数</div>
          <input type="checkbox"
                 v-model="delaynumber"
                 class="ruleconfirm" />
        </div>
        <div class="rulecontent">
          <div class="ruleword">工作状态</div>
          <input type="checkbox"
                 v-model="workstatus"
                 class="ruleconfirm" />
        </div>
        <div class="rulecontent">
          <div class="ruleword">信任状态</div>
          <input type="checkbox"
                 v-model="truststatus"
                 class="ruleconfirm" />
        </div>
        <div class="rulecontent">
          <div class="ruleword">年龄条件</div>
          <input type="checkbox"
                 v-model="oldcondition"
                 class="ruleconfirm" />
        </div>
      </div>
    </div>
    <div class="configurefooter">
      <button class="footerbutton"
              @click="commit">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterfaceConfigure',
  data () {
    return {
      delaynumber: true,
      workstatus: true,
      truststatus: true,
      oldcondition: true
    }
  },
  methods: {
    commit () {
      let res = '';
      if (this.delaynumber === true) {
        res += '0';
      }
      if (this.workstatus === true) {
        res += '1';
      }
      if (this.truststatus === true) {
        res += '2';
      }
      if (this.oldcondition === true) {
        res += '3';
      }
      console.log(res);
      this.$http.get("manage/rules",
        {
          params: {
            id: sessionStorage.getItem('managername'),
            rules:res
          }
        }).then(
          response => {
            console.log('请求成功了', response.data)
            if (response.data.code === 200) {
              // this.$bus.$emit('Toast', "验证码为:" + response.data.obj, "success")
              this.$message.success("配置成功")
            }
            else {
              // this.$bus.$emit('Toast', "该手机未注册", "info")
              this.$message.warning("配置失败")
            }
          },
          error => {
            console.log('请求失败了', error.message)
            // this.$bus.$emit('Toast', "网络错误", "failed")
            this.$message.error("网络错误")
          }
        )
    }
  }
}
</script>

<style scoped>
.interfaceconfigure {
  width: 1100px;
  height: 540px;
  margin-left: 110px;
  margin-top: 80px;

  background: #ffffff;
  border-radius: 5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 18px;
}

.configureheader {
  background-color: #ea0437;
  height: 32px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  letter-spacing: 0.3em;
}

.configurebody {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.bodyrule {
  width: 210px;
  height: 230px;

  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 15px;
  /* or 67% */

  text-align: center;
  letter-spacing: 0.055em;

  color: #858585;
}

.rulecontent {
  margin-bottom: 20px;
}

.ruleword {
  width: 150px;
  float: left;
  line-height: 35px;
  text-align: center;
}

input[type='checkbox'] {
  height: 30px;
  width: 30px;
  vertical-align: middle;
  margin-left: 15px;
}

.configurefooter {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}

.footerbutton {
  width: 130px;
  height: 50px;
  left: calc(50% - 132px / 2 + 84px);
  top: calc(50% - 53px / 2 + 235.5px);

  background: #ffffff;
  /* 1 */
  border: 2px solid #ea0437;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 24px;
  line-height: 15px;
  /* or 61% */
  font-family: Arial;
  text-align: center;
  letter-spacing: 0.055em;
  color: #ea0437;
}
</style>