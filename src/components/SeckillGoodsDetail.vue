<template>
  <div class="seckillgoodsdetail">
    <div class="seckilldetailheader">
      <img @click="goback"
           class="goback"
           src="../assets/image/goback.png" />
      秒杀商品详情
    </div>
    <div class="seckilldetailbody" v-show="!isLoading">
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
          秒杀开始时间
        </div>
        <span class="infoget"
              style="margin-right:25px">
          {{showstartDate}}
        </span>
        <span v-if="!isSale"
              style="color: #FFC700;margin-right:25px">{{infomessage}}</span>
        <span v-if="isSale"
              class="purchase"
              @click="purchase">立即秒杀</span>
        <span v-if="!isSale"
              class="purchase outpurchase">立即秒杀</span>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          秒杀结束时间
        </div>
        <span class="infoget"
              style="margin-right:25px">
          {{showendDate}}
        </span>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          商品原价
        </div>
        <div class="infoget">
          {{goodsPrice}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          秒杀价
        </div>
        <div class="infoget">
          {{seckillPrice}}
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
    <div v-show="isLoading" class="loading">加载中……</div>
  </div>
</template>

<script>
import '../assets/js/dateformat'
export default {
  name: 'SeckillGoodsDetail',
  data () {
    return {
      seckillGoodsId: '',
      goodsName: '',
      goodsImg: 'https://aecpm.alicdn.com/simba/img/TB13xKuLVXXXXcHapXXSutbFXXX.jpg',
      goodsPrice: '',
      seckillPrice: '',
      stockCount: '',
      startDate: '',
      endDate: '',
      showstartDate: '',
      showendDate: '',
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
      console.log("购买" + this.seckillGoodsId)
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
    this.seckillGoodsId = this.$route.params.id
    if (!this.seckillGoodsId) {
      this.seckillGoodsId = sessionStorage.getItem("seckillGoodsId")
    }
    else {
      sessionStorage.setItem("seckillGoodsId", this.seckillGoodsId)
    }
    if (!this.seckillGoodsId) {
      this.$router.replace("./")
    }

    // 发送get请求
    this.$http.get("goods/detail",
      {
        params: {
          userId: sessionStorage.getItem("username"),
          seckillGoodsId: this.seckillGoodsId
        }
      }).then(
        response => {
          console.log('请求成功了', response.data)
          if (response.data.code === 200) {
            this.$message.success("成功获取秒杀商品信息")
            this.goodsName = response.data.obj.seckillGoodsVo.goodsName
            this.goodsImg = "http://code.southyang.cn:8080/goods/image/" + response.data.obj.seckillGoodsVo.goodsImg
            this.startDate = response.data.obj.seckillGoodsVo.startDate
            this.endDate = response.data.obj.seckillGoodsVo.endDate
            this.goodsPrice = response.data.obj.seckillGoodsVo.goodsPrice
            this.seckillPrice = response.data.obj.seckillGoodsVo.seckillPrice
            this.stockCount = response.data.obj.seckillGoodsVo.stockCount

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
      )

    console.log("与后端交互得到秒杀商品信息")
  }
}
</script>

<style scoped>
.seckillgoodsdetail {
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

.seckilldetailheader {
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

.seckilldetailbody {
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
  margin-bottom: 45px;
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

.loading{
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
</style>