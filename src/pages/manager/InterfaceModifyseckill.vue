<template>
  <div class="interfacemodifyseckill">
    <div class="modifyseckillheader">
      修改秒杀商品信息
    </div>
    <div class="modifyseckillbody">
      <!-- <div class="modifyseckillinfo">
        <div class="infoword">管理员ID</div>
        <input class="infoinput longinput"
               v-model="ID" />
      </div> -->
      <div class="modifyseckillinfo">
        <div class="infoword">秒杀商品ID</div>
        <input class="infoinput longinput"
               v-model="SeckillGoodsID" />
      </div>
      <div class="modifyseckillinfo">
        <div class="infoword">秒杀商品价格</div>
        <input class="infoinput"
               v-model="SeckillGoodsprice" />
      </div>
      <div class="modifyseckillinfo">
        <div class="infoword">秒杀商品库存</div>
        <input class="infoinput"
               v-model="Goodsnumber" />
      </div>
      <div class="modifyseckillinfo">
        <div class="infoword">秒杀开始时间</div>
        <el-date-picker v-model="startdatetime"
                        type="datetime"
                        placeholder="选择开始日期时间"
                        class="datetimepicker">
        </el-date-picker>
      </div>
      <div class="modifyseckillinfo">
        <div class="infoword">秒杀结束时间</div>
        <el-date-picker v-model="enddatetime"
                        type="datetime"
                        placeholder="选择结束日期时间"
                        class="datetimepicker">
        </el-date-picker>
      </div>
    </div>
    <div class="modifyseckillfooter">
      <button class="modifyseckillbutton"
              @click="outputtime">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterfaceModifyseckill',
  data () {
    return {
      SeckillGoodsID: '',
      SeckillGoodsprice: '',
      Goodsnumber: '',
      startdatetime: '',
      enddatetime: '',
      montharray: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  methods: {
    outputtime () {
      if (this.startdatetime === "" || this.enddatetime === "") {
        this.$message.info("请输入起始和截止时间")
        return
      }

      // console.log("开始时间为: " + this.startdatetime)
      let datetimeArray = this.startdatetime.toString().split(" ") //日期加时间
      let timeArray = datetimeArray[4].split(":") //时间
      // console.log(datetimeArray[3] + "年" + (this.montharray.indexOf(datetimeArray[1]) + 1) + "月" + datetimeArray[2] + "日")
      // console.log(timeArray[0] + "时" + timeArray[1] + "分" + timeArray[2] + "秒")
      let start = datetimeArray[3] + "-" + (this.montharray.indexOf(datetimeArray[1]) + 1) + "-" + datetimeArray[2] + " " +
        timeArray[0] + ":" + timeArray[1] + ":" + timeArray[2]
      // console.log(start)
      // console.log("-------------------------------------")
      // console.log("结束时间为: " + this.enddatetime)
      datetimeArray = this.enddatetime.toString().split(" ") //日期加时间
      timeArray = datetimeArray[4].split(":") //时间
      // console.log(datetimeArray[3] + "年" + (this.montharray.indexOf(datetimeArray[1]) + 1) + "月" + datetimeArray[2] + "日")
      // console.log(timeArray[0] + "时" + timeArray[1] + "分" + timeArray[2] + "秒")
      let end = datetimeArray[3] + "-" + (this.montharray.indexOf(datetimeArray[1]) + 1) + "-" + datetimeArray[2] + " " +
        timeArray[0] + ":" + timeArray[1] + ":" + timeArray[2]
      // console.log(end)

      let data = {
        managerId: sessionStorage.getItem("managername"),
        id: this.SeckillGoodsID,
        seckillPrice: this.SeckillGoodsprice,
        stockCount: this.Goodsnumber,
        start: start,
        end: end,
      }

      //发送post请求登录
      this.$http.post('manage/updateSeckillGoods', this.$qs.stringify(data)).then(
        response => {
          console.log(data)
          console.log('请求成功了', response.data)
          if (response.data.code !== 200) {
            this.$message.warning("修改失败")
          }
          else {
            this.$message.success("修改成功")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )

      /* this.GoodsID = ''
      this.Goodsprice = ''
      this.Goodsnumber = ''
      this.startdatetime = ''
      this.enddatetime = '' */
      // this.$message.success("添加成功")
    }
  }
}
</script>

<style scoped>
.interfacemodifyseckill {
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

.modifyseckillheader {
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

.modifyseckillbody {
  width: 425px;
  height: 400px;
  margin-top: 70px;
  margin-left: 387.5px;
}

.modifyseckillinfo {
  margin-bottom: 25px;
}

.infoword {
  float: left;
  text-align: left;
  line-height: 35px;
  width: 120px;
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

.modifyseckillfooter {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.modifyseckillbutton {
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