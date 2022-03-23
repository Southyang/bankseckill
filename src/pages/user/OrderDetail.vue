<template>
  <div class="orderdetail">
    <div class="detailheader">
      <img @click="goback"
           class="goback"
           src="../../assets/image/goback.png" />
      秒杀订单详情
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
          订单价格
        </div>
        <div class="infoget">
          {{goodsPrice}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          下单时间
        </div>
        <div class="infoget">
          {{createDate}}
        </div>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          订单状态
        </div>
        <span v-if="!ispay"
              style="color: #FFC700;margin-right:25px">待支付</span>
        <span v-if="!ispay"
              class="pay"
              @click="topay">立即支付</span>
        <span v-if="ispay"
              class="pay outpay">{{infomessage}}</span>
      </div>
      <div class="bodyinfo">
        <div class="infoword">
          交易方
        </div>
        <div class="infoget">
          {{person}}
        </div>
      </div>
    </div>
    <div v-show="isLoading"
         class="loading">加载中……</div>
  </div>
</template>

<script>
import qs from 'qs'
import '../../assets/js/dateformat'
export default {
  name: 'OrderDetail',
  data () {
    return {
      //测试数据
      goodsName: '1',
      goodsImg: 'https://mail.csu.edu.cn/coremail/s?func=lp:getImg&org_id=&img_id=logo_001',
      goodsPrice: '2',
      createDate: '3',
      status: 5,
      person: '5',
      //正式数据
      userId: '',
      seckillOrderId: '',
      ispay: true,
      infomessage: '',
      GoodsVo: [],
      isLoading: true,
      autocheck: false,
      autoinfo: '',
      beforecheck: false,
      beforeinfo: '',
      array: ["autoRedeem", "dayLimit", "interestRate", "goodsStock", "dayLimit", "minDeposit", "withdrawEarly", "depositDuration"]
    }
  },
  methods: {
    goback () {
      this.$router.back() //后退
    },
    topay () {
      console.log("支付订单")
      this.$messagebox("是否确认支付", "success")
        .then(() => {
          this.pay()
        }).catch(() => {
          this.$message.warning("取消支付")
        });
    },
    pay () { //支付函数
      const loading = this.$loading("支付中……")
      this.$http.get("account/toPay",
        {
          params: {
            seckillOrderId: this.seckillOrderId
          }
        }).then(
          response => {
            console.log('请求成功了', response.data)
            if (response.data.code === 200) {
              loading.close()
              this.$message.success("支付成功")
              this.ispay = true
              this.status = 1
              this.checkstatus()
              this.$notification("恭喜您秒杀成功", "success")
            }
            else {
              this.$message.warning("支付失败")
            }
          },
          error => {
            console.log('请求失败了', error.message)
            this.$message.error("网络错误")
          }
        )
    },
    checkstatus () { //判断当前状态
      this.ispay = true
      switch (this.status) {
        case 0:
          this.ispay = false
          break;
        case 1:
          this.infomessage = "已支付"
          break;
        case 2:
          this.infomessage = "已发货"
          break;
        case 3:
          this.infomessage = "已收货"
          break;
        case 4:
          this.infomessage = "已退款"
          break;
        case 5:
          this.infomessage = "已完成"
          break;
      }
    },
    initdata (data) { //数据初始化
      let goods = data.seckillGoodsVo
      let order = data.order
      this.goodsName = goods.name
      this.goodsImg = "http://code.southyang.cn:8080/goods/image/" + goods.id + ".png"
      this.goodsPrice = order.goodsPrice
      this.createDate = new Date(order.createDate).Format("yyyy-MM-dd hh:mm:ss")
      this.status = order.status
      console.log(this.status)
      this.person = "测试人"
      this.checkstatus()
    }
  },
  mounted () {
    this.userId = this.$route.params.userId
    this.seckillOrderId = this.$route.params.seckillOrderId
    console.log("查看秒杀订单", this.userId, this.seckillOrderId)
    this.$http.get("order/detail",
      {
        params: {
          userId: this.userId,
          seckillOrderId: this.seckillOrderId
        }
      }).then(
        response => {
          console.log('请求成功了', response.data)
          if (response.data.code === 200) {
            this.$message.success("订单信息获取成功")
            this.initdata(response.data.obj)
            this.isLoading = false
          }
          else {
            this.$message.warning("订单信息获取失败")
            this.$router.back() //后退
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )
  }
}
</script>

<style scoped>
.orderdetail {
  width: 60%;
  height: 560px;
  margin-left: 20%;
  margin-top: 130px;
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
  margin-right: 58%;
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
  margin-left: 150px;
  position: absolute;
  width: 0px;
  border: 1px solid #c4c4c4;
  background-color: #c4c4c4;
  height: 520px;
}

.bodyinfo {
  margin-bottom: 50px;
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

.pay {
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

.outpay {
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