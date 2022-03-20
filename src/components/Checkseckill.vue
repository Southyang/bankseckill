<template>
  <div class="checkseckill">
    <div class="checkseckillheader">
      秒杀商品列表
    </div>
    <div class="checkseckillbody">
      <div class="bodybanner">
        <span class="spancontent"> 商品序号 </span>
        <span class="spancontent"> 商品名称 </span>
        <span class="spancontent"> 商品图片 </span>
        <span class="spancontent"> 商品原价 </span>
        <span class="spancontent"> 秒杀价 </span>
        <span class="spancontent"> 库存数量 </span>
        <span class="spancontent"> 详情 </span>
      </div>
      <div class="checkresult"
           v-for="(log,index) in checklogs"
           :key="index">
        <div class="resultcontent">
          <span class="spancontent"> {{log.id}} </span>
          <span class="spancontent"> {{log.goodsName}} </span>
          <img class="spancontent goodspicture"
               :src="log.goodsImg">
          <span class="spancontent"> {{log.goodsPrice}} </span>
          <span class="spancontent"> {{log.seckillPrice}} </span>
          <span class="spancontent"> {{log.stockCount}} </span>
          <span class="spancontent"
                style="color:#EA0437;cursor:pointer"
                @click="checkdetail"> {{detail}} </span>
        </div>
        <div class="resultline">
        </div>
      </div>
    </div>
    <div class="checkseckillfooter">
      <pager :pageSize="pageSize"
             v-model="pageNow"
             @on-jump="jump"></pager>
    </div>
    <div v-show="isLoading"
         class="loading">加载中……</div>
  </div>
</template>

<script>
import pager from '../components/pager.vue'
export default {
  name: 'Checkseckill',
  components: { pager },
  data () {
    return {
      detail: '详情',
      checklogs: [],
      showchecklogs: [],
      isLoading: true,
      pageSize: 30,
      pageNow: 1,
    }
  },
  methods: {
    checkdetail (e) {
      let id = e.currentTarget.parentElement.firstElementChild.innerHTML
      console.log("查看ID为" + e.currentTarget.parentElement.firstElementChild.innerHTML + "的商品详情")
      let nowname = sessionStorage.getItem("username")
      if (!nowname) {
        return
      }
      else {
        this.$router.push({
          name: 'seckillgoodsdetail',
          params: {
            id: id
          }
        })
      }
    },
    jump (pageid) {
      this.isLoading = false
      this.showchecklogs = this.checklogs.slice((pageid - 1) * 4, pageid * 4)
      this.isLoading = false
    },
    formatdata () {
      for (let i = 0; i < this.checklogs.length; i++) {
        this.checklogs[i].goodsImg = "http://code.southyang.cn:8080/goods/image/" + this.checklogs[i].goodsImg
      }
      this.pageSize = Math.ceil(this.checklogs.length / 4)
      if (this.checklogs.length > 4) {
        this.showchecklogs = this.checklogs.slice(0, 4)
      }
      else {
        this.showchecklogs = this.checklogs
      }
    }
  },
  created () {
    // 发送get请求
    this.$http.get("goods/toSeckillGoodsList",
      {
        params: {
          userId: sessionStorage.getItem("username")
        }
      }).then(
        response => {
          console.log('请求成功了', response.data)
          if (response.data.code === 200) {
            this.$message.success("成功获取秒杀商品信息")
            this.checklogs = response.data.obj
            this.formatdata()
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
  }
}
</script>

<style scoped>
.checkseckill {
  /* 登录背景栏 */
  margin-top: 45px;
  margin-left: 55px;
  width: 1200px;
  height: 670px;

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

.checkseckillheader {
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 45px;
}

.checkseckillbody {
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
  width: 14.3%;
  text-align: center;
}

.checkresult {
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
  background-size: 200px 100px;
  width: 170px;
  height: 100px;
  overflow: hidden;
}

.resultline {
  width: 100%;
  border: 1px solid #c4c4c4;
  background-color: #c4c4c4;
}

.checkseckillfooter {
  position: absolute;
  bottom: 10px;
  width: 1200px;
  text-align: center;
  color: #494949;
}

.spanbutton {
  cursor: pointer;
}

.loading {
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
</style>