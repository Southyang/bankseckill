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
      delaynumber: false,
      workstatus: false,
      truststatus: false,
      oldcondition: false
    }
  },
  methods: {
    commit () {
      console.log("提交规则为: 逾期次数:" + this.delaynumber + " 工作状态:" + this.workstatus + " 信任状态:" + this.truststatus + " 年龄条件:" + this.oldcondition)
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