<template>
  <div class="interfaceadddetail">
    <div class="adddetailheader">
      增加商品详细配置
    </div>
    <div class="adddetailbody">
      <div class="adddetailinfo">
        <div class="infoword">商品编号</div>
        <input class="infoinput longinput"
               v-model="goodsId" />
      </div>
      <div class="adddetailinfo">
        <div class="infoword">起存金额</div>
        <input class="infoinput longinput"
               v-model="minDeposit" />
      </div>
      <div class="adddetailinfo">
        <div class="infoword">存款期限</div>
        <input class="infoinput longinput"
               v-model="depositDuration" />
      </div>
      <div class="adddetailinfo">
        <div class="infoword">利率</div>
        <input class="infoinput longinput"
               v-model="interestRate" />
      </div>
      <div class="adddetailinfo">
        <div class="infoword">每日限额</div>
        <input class="infoinput longinput"
               v-model="dayLimit" />
      </div>
      <div class="adddetailinfo">
        <div class="infoword">到期是否自动赎回</div>
        <input class="infoinput longinput"
               v-model="autoRedeem" />
      </div>
      <div class="adddetailinfo">
        <div class="infoword">是否支持提前支取</div>
        <input class="infoinput longinput"
               v-model="withdrawEarly" />
      </div>
    </div>
    <div class="adddetailfooter">
      <button class="adddetailbutton"
              @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'InterfaceAddDetail',
  data () {
    return {
      goodsId: '',
      minDeposit: '',
      depositDuration: '',
      interestRate: '',
      dayLimit: '',
      autoRedeem: '',
      withdrawEarly: '',
      array:["managerId","goodsId","minDeposit","interestRate","dayLimit","autoRedeem","withdrawEarly"]
    }
  },
  methods: {
    submit () {
      console.log("增加详细配置")

      let data = {
        managerId: sessionStorage.getItem("managername"),
        goodsId: this.goodsId,
        minDeposit: this.minDeposit,
        depositDuration: this.depositDuration,
        interestRate: this.interestRate,
        dayLimit: this.dayLimit,
        autoRedeem: this.autoRedeem,
        withdrawEarly: this.withdrawEarly
      }
      for(let i = 0; i < this.array.length ; i ++){
        if(!data[this.array[i]].trim()){
            this.$message.warning("输入不能为空")
            return
        }
      }
      //发送post请求登录
      this.$http.post('manage/addGoodsDetail', qs.stringify(data)).then(
        response => {
          console.log(data)
          console.log('请求成功了', response.data)
          if (response.data.code !== 200) {
            this.$message.warning("增加失败")
          }
          else {
            sessionStorage.setItem("managername", this.managername)
            this.$message.success("增加成功")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )
    }
  }
}
</script>

<style scoped>
.interfaceadddetail {
  /* 登录背景栏 */
  margin-top: 45px;
  margin-left: 55px;
  width: 1200px;
  height: 650px;

  background: #ffffff;
  border-radius: 5px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 33px;
  /* or 164% */

  color: #494949;
}

.adddetailheader {
  background-color: #ea0437;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 22px;
  line-height: 24px;
  letter-spacing: 0.3em;
}

.adddetailbody {
  width: 500px;
  height: 400px;
  margin-top: 70px;
  margin-left: 387.5px;
}

.adddetailinfo {
  margin-bottom: 25px;
}

.infoword {
  float: left;
  text-align: left;
  line-height: 35px;
  width: 160px;
}

.infoinput {
  height: 35px;
  background: #ffffff;
  border: 1px solid #494949;
  box-sizing: border-box;
  border-radius: 5px;
  margin-left: 25px;
  font-size: 22px;
  width: 130px;
}

.longinput {
  width: 280px;
}

.datetimepicker {
  border: 1px solid #494949;
  box-sizing: border-box;
  border-radius: 5px;
  margin-left: 25px;
  color: #494949;
}

.adddetailfooter {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.adddetailbutton {
  width: 120px;
  height: 40px;

  background: #ea0437;
  border-radius: 5px;
  border: none;
  font-size: 24px;
  line-height: 24px;
  /* or 99% */

  color: #ffffff;
  cursor: pointer;
}
</style>