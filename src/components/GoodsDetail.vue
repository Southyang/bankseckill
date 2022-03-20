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
          {{goodsName}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          商品图片
        </div>
        <img class="goodspicture"
             :src="goodsImg">
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          商品简介
        </div>
        <div class="infoget">
          {{goodsPrice}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          商品价格
        </div>
        <div class="infoget">
          {{goodsPrice}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          起存金额
        </div>
        <div class="infoget">
          {{goodsPrice}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          存款年限
        </div>
        <div class="infoget">
          {{goodsPrice}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          商品利率
        </div>
        <div class="infoget">
          {{goodsPrice}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          单日限额
        </div>
        <div class="infoget">
          {{goodsPrice}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          库存数量
        </div>
        <div class="infoget">
          {{stockCount}}
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
      GoodsId: '1',
      goodsName: '2',
      goodsImg: 'https://aecpm.alicdn.com/simba/img/TB13xKuLVXXXXcHapXXSutbFXXX.jpg',
      goodsPrice: '3',
      Price: '4',
      stockCount: '5',
      startDate: '6',
      endDate: '7',
      showstartDate: '8',
      showendDate: '9',
      isSale: '',
      infomessage: '',
      isLoading: true
    }
  },
  methods: {
    goback () {
      this.$router.back() //后退
    },
    purchase () {
      console.log("购买" + this.GoodsId)
    },
    computevalue () {
      /* let starttime = new Date(this.StartTime).getTime()
      let endtime = new Date(this.EndTime).getTime() */
      let starttime = this.startDate
      let endtime = this.endDate
      let nowtime = new Date().getTime()
      if (nowtime >= starttime && nowtime <= endtime) {
        this.isSale = true
        this.infomessage = ""
      }
      else {
        this.isSale = false
        if (!this.isSale) {
          if (nowtime > endtime) {
            this.infomessage = "秒杀已结束"
          }
          else if (nowtime < starttime) {
            this.infomessage = "秒杀未开始"
          }
        }
      }
    }
  },
  created () {
    const timer = setInterval(() => {
      this.computevalue()
    }, 1000);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer);
    })
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
    this.isLoading = false

    // 发送get请求
    /* this.$http.get("goods/detail",
      {
        params: {
          userId: sessionStorage.getItem("username"),
          GoodsId: this.GoodsId
        }
      }).then(
        response => {
          console.log('请求成功了', response.data)
          if (response.data.code === 200) {
            this.$message.success("成功获取秒杀商品信息")
            this.goodsName = response.data.obj.GoodsVo.goodsName
            this.goodsImg = "http://code.southyang.cn:8080/goods/image/" + response.data.obj.GoodsVo.goodsImg
            this.startDate = response.data.obj.GoodsVo.startDate
            this.endDate = response.data.obj.GoodsVo.endDate
            this.goodsPrice = response.data.obj.GoodsVo.goodsPrice
            this.Price = response.data.obj.GoodsVo.Price
            this.stockCount = response.data.obj.GoodsVo.stockCount

            this.showstartDate = new Date(this.startDate).Format("yyyy-MM-dd hh:mm:ss")
            this.showendDate = new Date(this.endDate).Format("yyyy-MM-dd hh:mm:ss")

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
      ) */

    console.log("与后端交互得到商品信息")
  }
}
</script>

<style scoped>
.goodsdetail {
  width: 1200px;
  height: 600px;
  margin-left: 60px;
  margin-top: 50px;
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
  margin-right: 1160px;
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
  margin-left: 140px;
  position: absolute;
  width: 0px;
  border: 1px solid #c4c4c4;
  background-color: #c4c4c4;
  height: 560px;
}

.bodyinfo {
  margin-bottom: 30px;
}

.infoword {
  float: left;
  color: #858585;
  width: 120px;
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
</style>