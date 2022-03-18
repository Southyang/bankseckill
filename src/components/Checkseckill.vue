<template>
  <div class="checkseckill">
    <div class="checkseckillheader">
      秒杀商品列表
    </div>
    <div class="checkseckillbody">
      <div class="bodybanner">
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
      <span @click="beforepage"
            class="spanbutton"> 上一页&nbsp;&nbsp; </span>
      <span v-for="index in pages"
            :key="index"
            @click="changepage"
            class="spanbutton"> {{index}}&nbsp;&nbsp; </span>
      <span @click="afterpage"
            class="spanbutton"> 下一页 </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkseckill',
  data () {
    return {
      detail: '详情',
      checklogs: [
        /* {
          ID: 'GOODS1',
          Url: 'https://aecpm.alicdn.com/simba/img/TB13xKuLVXXXXcHapXXSutbFXXX.jpg',
          oldprice: '100',
          nowprice: '50',
          number: '20',
        },
        {
          ID: 'GOODS2',
          Url: 'https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg',
          oldprice: '100',
          nowprice: '50',
          number: '20',
        } */
      ]
    }
  },
  methods: {
    checkdetail (e) {
      let id = e.currentTarget.parentElement.firstElementChild.innerHTML
      console.log("查看ID为" + e.currentTarget.parentElement.firstElementChild.innerHTML + "的商品详情")
      let nowname = sessionStorage.getItem("username")
      if (!nowname) {
        nowname = sessionStorage.getItem("managername")
        if (nowname) {
          this.$router.push({
            name: 'managerseckillgoodsdetail',
            params: {
              id: id
            }
          })
        }
      }
      else {
        this.$router.push({
          name: 'userseckillgoodsdetail',
          params: {
            id: id
          }
        })
      }
    },
    beforepage () {
      console.log("上一页")
    },
    changepage (e) {
      console.log("当前页为:" + e.target.innerText)
    },
    afterpage () {
      console.log("下一页")
    }
  },
  computed: {
    pagenumber () {
      return Math.ceil(this.checklogs.length / 15)
    },
    pages () {
      let temp = []
      for (let i = 1; i <= this.pagenumber; i++) {
        temp.push(i)
      }
      return temp
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
            this.$message.info("成功获取秒杀商品信息")
            this.checklogs = response.data.obj
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
  width: 16.6%;
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
  width: 200px;
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
</style>