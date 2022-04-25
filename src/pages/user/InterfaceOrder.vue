<template>
  <div class="interfaceorder">
    <div class="orderheader bodybanner">
      <span class="spancontent"> 订单编号 </span>
      <span class="spancontent"> 商品名称 </span>
      <span class="spancontent"> 商品图片 </span>
      <span class="spancontent"> 商品价格 </span>
      <span class="spancontent"> 购买数量 </span>
      <span class="spancontent"> 创建时间 </span>
      <span class="spancontent"> 付款时间 </span>
      <span class="spancontent"> 订单状态 </span>
    </div>
    <div class="orderbody">
      <div v-show="isnoorder"
           style="margin: 50px 650px; width:200px">暂无订单</div>
      <div class="orderresult"
           v-for="(log,index) in showorderlogs"
           :key="index">
        <div class="resultcontent">
          <span class="spancontent"> {{log.id}} </span>
          <span class="spancontent"> {{log.goodsName}} </span>
          <img class="spancontent goodspicture"
               :src="log.goodsImg">
          <span class="spancontent"> {{log.goodsPrice}} </span>
          <span class="spancontent"> {{log.goodsCount}} </span>
          <span class="spancontent"> {{log.createDate}} </span>
          <span class="spancontent"> {{log.payDate}} </span>
          <span class="spancontent"> {{log.status}} </span>
        </div>
        <div class="resultline">
        </div>
      </div>
      <div v-show="isloading"
           style="margin: 50px 650px; width:200px"> 加载中…… </div>
    </div>
    <div class="orderfooter">
      <pager :pageSize="pageSize"
             v-model="pageNow"
             @on-jump="jump"></pager>
    </div>
  </div>
</template>

<script>
import pager from '../../components/pager.vue'
export default {
  name: 'InterfaceOrder',
  components: { pager },
  data () {
    return {
      orderlogs: [],
      showorderlogs: [],
      isloading: true,
      isnoorder: false,
      pageSize: 30,
      pageNow: 1
    }
  },
  methods: {
    jump (pageid) {
      console.log(pageid)
      this.isloading = true
      this.showorderlogs = this.orderlogs.slice((pageid - 1) * 4, pageid * 4)
      this.isloading = false
    },
    initdata (data) {
      this.pageSize = Math.ceil(data.length / 4)
      this.orderlogs = data
      if (this.orderlogs.length === 0) {
        console.log("123")
        this.isnoorder = true
      }
      else {
        for (let i = 0; i < this.orderlogs.length; i++) {
          if (this.orderlogs[i].status === 1) {
            this.orderlogs[i].status = "支付成功"
          } else {
            this.orderlogs[i].status = "未支付"
          }
          this.orderlogs[i].createDate = new Date(this.orderlogs[i].createDate).Format("yyyy-MM-dd hh:mm:ss")
          this.orderlogs[i].payDate = new Date(this.orderlogs[i].payDate).Format("yyyy-MM-dd hh:mm:ss")
          this.orderlogs[i].goodsImg = "http://code.southyang.cn:8080/goods/image/" + this.orderlogs[i].goodsId
        }
        if (this.orderlogs.length >= 4) {
          this.showorderlogs = this.orderlogs.slice(0, 4)
        }
        else {
          this.showorderlogs = this.orderlogs
        }
      }
    }
  },
  mounted () {
    this.$http.get("user/orders",
      {
        params: {
          id: sessionStorage.getItem('username')
        }
      }).then(
        response => {
          console.log(response.data)
          if (response.data.code === 200) {
            this.initdata(response.data.obj)
            this.$message.success("获取订单成功")
            this.isloading = false
          }
          else {
            this.$message.warning("获取订单失败")
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
.interfaceorder {
  /* 登录背景栏 */
  margin-top: 35px;
  margin-left: 5%;
  width: 90%;
  height: 590px;

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

.orderheader {
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 45px;
}

.orderbody {
  width: 100%;
}

.bodybanner {
  margin-top: 5px;
  background-color: #ea0437;
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
}

.spancontent {
  width: 16.6%;
  text-align: center;
}

.orderresult {
  height: 110px;
  width: 100%;
}

.resultcontent {
  height: 110px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #858585;
  font-size: 18px;
}

.goodspicture {
  display: inline-block;
  background-size: 16.6% 100px;
  width: 16.6%;
  height: 100px;
  overflow: hidden;
}

.resultline {
  width: 100%;
  border: 1px solid #c4c4c4;
  background-color: #c4c4c4;
}

.orderfooter {
  position: absolute;
  bottom: 15px;
  width: 100%;
  text-align: center;
  color: #494949;
}

.loading {
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
</style>