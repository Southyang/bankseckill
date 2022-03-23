<template>
  <div class="goodsdetail">
    <div class="detailheader">
      <img @click="goback"
           class="goback"
           src="../assets/image/goback.png" />
      商品详情
    </div>
    <div class="detailbody"
         v-show="!isLoading">
      <div class="bodyline">
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          商品名称
        </div>
        <div class="infoget">
          {{GoodsVo.name}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          商品图片
        </div>
        <img class="goodspicture"
             :src="GoodsVo.goodsImg">
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          商品简介
        </div>
        <div class="infoget">
          {{GoodsVo.description}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          商品价格
        </div>
        <div class="infoget">
          {{GoodsVo.price}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          库存数量
        </div>
        <div class="infoget">
          {{GoodsVo.stock}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          起存金额
        </div>
        <div class="infoget">
          {{GoodsVo.minDeposit}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          存款年限
        </div>
        <div class="infoget">
          {{GoodsVo.depositDuration}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          商品利率
        </div>
        <div class="infoget">
          {{GoodsVo.interestRate}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          单日限额
        </div>
        <div class="infoget">
          {{GoodsVo.dayLimit}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          到期是否自动赎回
        </div>
        <div class="infoget">
          <input type="checkbox"
                 v-model="autocheck" /> <span>{{autoinfo}}</span>
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          是否可以提前支取
        </div>
        <div class="infoget">
          <input type="checkbox"
                 v-model="beforecheck" /> <span>{{beforeinfo}}</span>
        </div>
      </div>
    </div>
    <div v-show="isLoading"
         class="loading">加载中……</div>
  </div>
</template>

<script>
import '../assets/js/dateformat'
export default {
  name: 'GoodsDetail',
  data () {
    return {
      GoodsVo: [],
      isLoading: true,
      autocheck: false,
      autoinfo: '',
      beforecheck: false,
      beforeinfo: '',
      array: ["autoRedeem", "dayLimit", "interestRate", "goodsStock", "minDeposit", "withdrawEarly", "depositDuration"]
    }
  },
  methods: {
    goback () {
      this.$router.back() //后退
    },
    formatGoodsVo () {
      this.GoodsVo.goodsImg = "http://code.southyang.cn:8080/goods/image/" + this.GoodsVo.id
      if (this.GoodsVo.autoRedeem === 0) {
        this.autocheck = false
        this.autoinfo = "否"
      }
      else {
        this.autocheck = true
        this.autoinfo = "是"
      }
      if (this.GoodsVo.withdrawEarly === 0) {
        this.beforecheck = false
        this.beforeinfo = "否"
      }
      else {
        this.beforecheck = true
        this.beforeinfo = "是"
      }
      for (let i = 0; i < this.array.length; i++) {
        if (!this.GoodsVo[this.array[i]]) {
          this.GoodsVo[this.array[i]] = "暂未设定"
        }
      }
    }
  },
  mounted () {
    this.GoodsId = this.$route.params.id
    if (!this.GoodsId) {
      this.GoodsId = sessionStorage.getItem("GoodsId")
    }
    else {
      sessionStorage.setItem("GoodsId", this.GoodsId)
    }
    if (!this.GoodsId) {
      this.$router.replace("./")
    }

    // 发送get请求
    this.$http.get("goods/goodsDetail",
      {
        params: {
          userId: sessionStorage.getItem("username"),
          goodsId: this.GoodsId
        }
      }).then(
        response => {
          console.log('请求成功了', response.data)
          if (response.data.code === 200) {
            this.$message.success("成功获取秒杀商品信息")
            this.GoodsVo = response.data.obj
            this.formatGoodsVo()
            console.log(this.GoodsVo)
            this.isLoading = false
          }
          else {
            this.$message.warning("秒杀商品信息获取失败")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )

    console.log("与后端交互得到商品信息")
  }
}
</script>

<style scoped>
.goodsdetail {
  width: 80%;
  height: 630px;
  margin-left: 10%;
  margin-top: 100px;
  background: #ffffff;
  border-radius: 5px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 18px;
  /* or 82% */
}

.detailheader {
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

.goback {
  position: absolute;
  margin-right: 78%;
  width: 35px;
  height: 30px;
  cursor: pointer;
}

.detailbody {
  margin-top: 30px;
  margin-left: 100px;
}

.bodyline {
  margin-top: -30px;
  margin-left: 180px;
  position: absolute;
  width: 0px;
  border: 1px solid #c4c4c4;
  background-color: #c4c4c4;
  height: 590px;
}

.bodyinfo {
  margin-bottom: 23px;
}

.infoword {
  float: left;
  color: #858585;
  width: 160px;
  text-align: left;
  margin-right: 80px;
}

.infoget {
  color: #494949;
}

.goodspicture {
  display: inline-block;
  background-size: 200px 100px;
  width: 200px;
  height: 100px;
  overflow: hidden;
}

.purchase {
  width: 180px;
  height: 40px;
  padding: 5px 15px;
  background: #ea0437;
  border-radius: 5px;
  font-size: 22px;
  line-height: 15px;
  /* or 67% */
  letter-spacing: 0.07em;
  color: #ffffff;
  cursor: pointer;
}

.outpurchase {
  background: #f0f0f0;
  color: #494949;
  cursor: not-allowed;
}

.loading {
  width: 100%;
  text-align: center;
  margin-top: 50px;
}

input[type='checkbox'] {
  height: 20px;
  width: 20px;
  vertical-align: middle;
  cursor: pointer;
}
</style>