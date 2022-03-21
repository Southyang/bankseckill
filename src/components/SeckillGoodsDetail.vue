<template>
  <div class="seckillgoodsdetail">
    <div class="seckilldetailheader">
      <img @click="goback"
           class="goback"
           src="../assets/image/goback.png" />
      秒杀商品详情
    </div>
    <div class="seckilldetailbody"
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
    <div v-show="isLoading"
         class="loading">加载中……</div>
    <div id="fade"
         class="black_overlay"
         v-show="IsShow">
    </div>
    <div id="MyDiv"
         class="white_content"
         v-show="IsShow">
      <div style="text-align: right; cursor: default; height: 20px;">
        <span style="font-size: 16px; cursor: pointer;"
              @click="CloseDiv">关闭</span>
      </div>
      <div style="display:flex; justify-content: center; flex-direction: column;align-items: center;">
        <div>人机交互验证</div>
        <div style="margin:15px 0">
          <img class="captchaimg"
               @click="refreshCaptcha"
               :src="captchaImg">
          <input class="captchainput"
                 v-model="captcha">
        </div>
        <button class="fadebutton"
                @click="captchacommit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import '../assets/js/dateformat'
export default {
  name: 'SeckillGoodsDetail',
  data () {
    return {
      //商品数据
      seckillGoodsId: '',
      goodsName: '',
      goodsImg: '',
      goodsPrice: '',
      seckillPrice: '',
      stockCount: '',
      startDate: '',
      endDate: '',
      showstartDate: '',
      showendDate: '',
      //判断数据
      isSale: '',
      infomessage: '',
      isLoading: true,
      IsShow: false,
      //验证数据
      captcha: '',
      captchaImg: ''
    }
  },
  methods: {
    goback () { //后退
      this.$router.back()
    },
    purchase () { //购买
      console.log("购买" + this.seckillGoodsId)
      // this.$messagebox("秒杀成功,是否查看订单", "success").then(() => {
      //   this.$router.push({
      //     name: 'orderdetail',
      //     /* params: {
      //       id: id
      //     } */
      //   })
      // }).catch(() => {
      //   this.$message.warning("取消查看订单")
      // });
      this.getcaptchaImg()
      this.ShowDiv()
    },
    computevalue () { //计算秒杀按钮是否生效
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
    },
    formatSeckillGoodsVo (data) { //格式化数据
      this.goodsName = data.goodsName
      this.goodsImg = "http://code.southyang.cn:8080/goods/image/" + data.goodsImg
      this.startDate = data.startDate
      this.endDate = data.endDate
      this.goodsPrice = data.goodsPrice
      this.seckillPrice = data.seckillPrice
      this.stockCount = data.stockCount

      this.showstartDate = new Date(this.startDate).Format("yyyy-MM-dd hh:mm:ss")
      this.showendDate = new Date(this.endDate).Format("yyyy-MM-dd hh:mm:ss")
    },
    ShowDiv () { //打开遮罩层
      this.IsShow = true
    },
    CloseDiv () { //隐藏遮罩层
      this.IsShow = false
    },
    getcaptchaImg () { //获取验证码图片
      let userId = sessionStorage.getItem("username")
      this.captchaImg = "http://code.southyang.cn:8080/seckill/captcha?userId=" + userId + "&seckillGoodsId=" + this.seckillGoodsId + "&time=" + new Date()
    },
    refreshCaptcha () { //刷新验证码
      console.log("刷新")
      this.getcaptchaImg()
    },
    captchacommit () { //提交验证码
      if (!this.captcha.trim()) {
        this.$message.warning("验证码不能为空")
        return
      }
      console.log("提交验证码", this.captcha)
      this.getSeckillPath();
    },
    getSeckillPath () { //获取秒杀路径
      // 发送get请求
      console.log("获取秒杀路径")
      this.$http.get("seckill/path",
        {
          params: {
            userId: sessionStorage.getItem("username"),
            seckillGoodsId: this.seckillGoodsId,
            captcha: this.captcha
          }
        }).then(
          response => {
            console.log('请求成功了', response.data)
            if (response.data.code === 200) {
              this.$message.success("验证成功")
              let path = response.data.obj
              this.CloseDiv()
              this.doSeckill(path)
            }
            else {
              this.$message.warning("验证码错误,请重新输入")
            }
          },
          error => {
            console.log('请求失败了', error.message)
            this.$message.error("网络错误")
          }
        )
    },
    doSeckill (path) { //进行秒杀
      console.log("进行秒杀")
      let data = {
        userId: sessionStorage.getItem("username"),
        seckillGoodsId: this.seckillGoodsId
      }
      //发送post请求登录
      this.$http.post('/seckill/' + path + '/doSeckill', qs.stringify(data)).then(
        response => {
          console.log('请求成功了', response.data)
          if (response.data.code === 200) {
            this.getResult(this.seckillGoodsId)
          }
          else {
            this.$message.warning("秒杀失败")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )
    },
    getResult (seckillGoodsId) { //获取秒杀结果
      // 发送get请求
      console.log("获取秒杀结果")
      const loading = this.$loading("秒杀中……")
      this.$http.get("/seckill/result",
        {
          params: {
            userId: sessionStorage.getItem("username"),
            seckillGoodsId: seckillGoodsId,
          }
        }).then(
          response => {
            console.log('请求成功了', response.data)
            if (response.data.code === 200) {
              let seckillresult = response.data.obj
              if (seckillresult < 0) { //失败
                this.$message.warning("秒杀失败")
              }
              else if (seckillresult === 0) { //排队中
                loading.close()
                setTimeout(() => {
                  this.getResult(seckillGoodsId)
                }, 50);
              }
              else { //成功
                loading.close()
                this.$messagebox("秒杀成功,是否查看订单", "success").then(() => {
                  this.$router.push({
                    name: 'orderdetail',
                    params: {
                      userId: sessionStorage.getItem("username"),
                      seckillOrderId: seckillresult,
                    }
                  })
                }).catch(() => {
                  this.$message.warning("取消查看订单")
                });
              }
            }
            else {
              this.$message.warning("秒杀失败")
            }
          },
          error => {
            console.log('请求失败了', error.message)
            this.$message.error("网络错误")
          }
        )
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
    this.$http.get("goods/seckillGoodsDetail",
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
            this.formatSeckillGoodsVo(response.data.obj.seckillGoodsVo)
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
  width: 80%;
  height: 600px;
  margin-left: 10%;
  margin-top: 120px;
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
  margin-right: 78%;
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

.loading {
  width: 100%;
  text-align: center;
  margin-top: 50px;
}

.black_overlay {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=80);
}

.white_content {
  position: absolute;
  top: 30%;
  left: 40%;
  width: 20%;
  height: 20%;
  min-width: 400px;
  border: 16px solid rgb(167, 167, 167);
  background-color: white;
  z-index: 1002;
  overflow: auto;
}

.captchaimg {
  width: 130px;
  height: 32px;
  float: left;
}

.captchainput {
  height: 26px;
  width: 50px;
  margin-left: 5px;
}
</style>