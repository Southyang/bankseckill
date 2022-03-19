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
      <div v-show="isloading"
           style="margin: 50px 500px"> 加载中…… </div>
    </div>
    <div class="getfooter">
      <pager :pageSize="pageSize"
             v-model="pageNow"
             @on-jump="jump"></pager>
    </div>
  </div>
</template>

<script>
import pager from '../../components/pager.vue'
export default {
  name: 'InterfaceGet',
  components: { pager },
  data () {
    return {
      filgetlogs: [],
      getlogs: [],
      isloading: true,
      pageSize: 30,
      pageNow: 1
    }
  },
  methods: {
    jump (pageid) {
      this.isloading = true
      // this.filgetlogs = this.getlogs.slice((id - 1) * 15, id * 15);
      this.$http.get("manage/resultPage",
        {
          params: {
            id: sessionStorage.getItem('managername'),
            pageNo: pageid,
            pageSize: 15
          }
        }).then(
          response => {
            console.log(response.data)
            if (response.data.code === 200) {
              this.isloading = false
              this.getlogs = response.data.obj
            }
            else {
              this.$message.warning("获取秒杀结果失败")
            }
          },
          error => {
            console.log('请求失败了', error.message)
            this.$message.error("网络错误")
          }
        )
    },
  },
  mounted () {
    /* this.$http.get("manage/result",
      {
        params: {
          id: sessionStorage.getItem('managername')
        }
      }).then(
        response => {
          console.log(response.data)
          if (response.data.code === 200) {
            this.$message.success("成功获取秒杀结果")
            this.isloading = false
            this.getlogs = response.data.obj

            this.pageSize = Math.ceil(this.getlogs.length / 15);
            if (this.getlogs.length >= 15) {
              this.filgetlogs = this.getlogs.slice(0, 15)
            }else{
              this.filgetlogs = this.getlogs
            }
          }
          else {
            this.$message.warning("获取秒杀结果失败")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      ) */
  },
  created () {
    // 获取总页数
    this.$http.get("manage/resultCount",
      {
        params: {
          id: sessionStorage.getItem('managername')
        }
      }).then(
        response => {
          console.log(response.data)
          if (response.data.code === 200) {
            this.pageSize = response.data.obj
          }
          else {
            this.$message.warning("获取秒杀结果失败")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )
    // 获取第一页
    this.$http.get("manage/resultPage",
      {
        params: {
          id: sessionStorage.getItem('managername'),
          pageNo: 1,
          pageSize: 15
        }
      }).then(
        response => {
          console.log(response.data)
          if (response.data.code === 200) {
            this.$message.success("获取秒杀结果成功")
            this.isloading = false
            this.getlogs = response.data.obj
          }
          else {
            this.$message.warning("获取秒杀结果失败")
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