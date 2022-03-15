<template>
  <div class="interfaceget">
    <div class="getheader">
      <span class="spancontent"> 客户姓名 </span>
      <span class="spancontent"> 客户手机号 </span>
      <span class="spancontent"> 商品名称 </span>
      <span class="spancontent"> 商品价格 </span>
      <span class="spancontent"> 购买数量 </span>
    </div>
    <div class="getbody">
      <div class="getresult"
           v-for="(log,index) in getlogs"
           :key="index">
        <div class="resultcontent">
          <span class="spancontent"> {{log.name}} </span>
          <span class="spancontent"> {{log.id}} </span>
          <span class="spancontent"> {{log.goodsName}} </span>
          <span class="spancontent"> {{log.goodsPrice}} </span>
          <span class="spancontent"> {{log.goodsCount}} </span>
        </div>
        <div class="resultline">
        </div>
      </div>
      <div v-show="isloading"> 加载中…… </div>
    </div>
    <div class="getfooter">
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
  name: 'InterfaceGet',
  data () {
    return {
      nowpage: '1',
      getlogs: [],
      isloading: true
    }
  },
  methods: {
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
      return Math.ceil(this.getlogs.length / 15)
    },
    pages () {
      let temp = []
      for (let i = 1; i <= this.pagenumber; i++) {
        temp.push(i)
      }
      return temp
    }
  },
  mounted () {
    this.$http.get("manage/result",
      {
        params: {
          id: sessionStorage.getItem('managername')
        }
      }).then(
        response => {
          console.log('请求成功了', response.data)
          if (response.data.code === 200) {
            // this.$bus.$emit('Toast', "验证码为:" + response.data.obj, "success")
            this.$message.success("成功获取秒杀结果")
            this.isloading = false
            this.getlogs = response.data.obj
          }
          else {
            // this.$bus.$emit('Toast', "该手机未注册", "info")
            this.$message.warning("获取秒杀结果失败")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          // this.$bus.$emit('Toast', "网络错误", "failed")
          this.$message.error("网络错误")
        }
      )
  }
}
</script>

<style scoped>
.interfaceget {
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
  line-height: 18px;
}

.getheader {
  background-color: #ea0437;
  height: 32px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
}

.spancontent {
  width: 20%;
  text-align: center;
}

.getbody {
  width: 100%;
}

.getresult {
  height: 32px;
  width: 100%;
}

.resultcontent {
  height: 31px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #858585;
  font-size: 18px;
}

.resultline {
  width: 100%;
  border: 1px solid #c4c4c4;
  background-color: #c4c4c4;
}

.getfooter {
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