<template>
  <div class="interfacecheck">
    <div class="checkheader">
      <div class="inputbox">
        <span class="managercheckinput"> 姓名 </span>
        <input class="managerinput"
               v-model="inputname" />
      </div>
      <div class="inputbox">
        <span class="managercheckinput"> 几天前 </span>
        <input class="managerinput"
               v-model="inputdate" />
      </div>
      <button class="checkbutton"
              @click="check">
        <img src="../../assets/image/managercheckbutton.png"
             class="icon">
        <div class="checkbuttoncontent">查询</div>
      </button>
    </div>
    <div class="checkbody">
      <div class="bodytitle">
        申请记录查询结果
      </div>
      <div class="bodybanner">
        <span class="spancontent"> 记录编号 </span>
        <span class="spancontent"> 客户姓名 </span>
        <span class="spancontent"> 申请时间 </span>
        <span class="spancontent"> 初筛结果 </span>
      </div>
      <div class="checkresult"
           v-show="!isprecheck"
           v-for="(log,index) in showchecklogs"
           :key="index">
        <div class="resultcontent">
          <span class="spancontent"> {{log.id}}</span>
          <span class="spancontent"> {{log.name}} </span>
          <span class="spancontent"> {{log.applyDate}} </span>
          <span class="spancontent"> {{log.applyResult}} </span>
        </div>
        <div class="resultline">
        </div>
      </div>
      <div class="checkresult"
           v-show="isprecheck"
           v-for="(log,index) in filprechecklogs"
           :key="'第' + index + '条'">
        <div class="resultcontent">
          <span class="spancontent"> {{log.id}}</span>
          <span class="spancontent"> {{log.name}} </span>
          <span class="spancontent"> {{log.applyDate}} </span>
          <span class="spancontent"> {{log.applyResult}} </span>
        </div>
        <div class="resultline">
        </div>
      </div>
      <div v-show="isloading"
           style="margin: 50px 500px">加载中……</div>
    </div>
    <div class="checkfooter">
      <pager :pageSize="pageSize"
             v-model="pageNow"
             @on-jump="jump"></pager>
    </div>
  </div>
</template>

<script>
import '../../assets/js/dateformat'
import pager from '../../components/pager.vue'
export default {
  name: 'InterfaceCheck',
  components: { pager },
  data () {
    return {
      inputname: '',
      inputdate: '',
      checkname: '',
      checkdate: '',
      prechecklogs: [],
      filprechecklogs: [],
      showchecklogs: [],
      isloading: true,
      allpageSize: 30,
      pageSize: 30,
      pageNow: 1,
      isprecheck: false
    }
  },
  methods: {
    initdata(){
      this.prechecklogs = [],
      this.filprechecklogs = [],
      this.showchecklogs = []
    },
    check () {
      console.log("查询申请记录 " + this.inputname + " " + this.inputdate + "天前")
      if (this.inputname.trim() && this.inputdate.trim()) {
        this.isprecheck = true
        this.isloading = true
        this.$http.get("manage/showRecords",
          {
            params: {
              id: sessionStorage.getItem('managername'),
              name: this.inputname,
              daysAgo: this.inputdate
            }
          }).then(
            response => {
              console.log(response.data)
              if (response.data.code === 200) {
                this.initdata()
                this.prechecklogs = response.data.obj
                for (let i = 0; i < this.prechecklogs.length; i++) {
                  if (this.prechecklogs[i].applyResult === 1) {
                    this.prechecklogs[i].applyResult = "成功"
                  } else {
                    this.prechecklogs[i].applyResult = "失败"
                  }
                  this.prechecklogs[i].applyDate = new Date(this.prechecklogs[i].applyDate).Format("yyyy-MM-dd hh:mm:ss")
                }
                this.pageSize = Math.ceil(this.prechecklogs.length / 15);
                if (this.prechecklogs.length >= 15) {
                  this.filprechecklogs = this.prechecklogs.slice(0, 15)
                } else {
                  this.filprechecklogs = this.prechecklogs
                }
                this.isloading = false
              }
              else {
                this.$message.warning("获取申请记录失败")
              }
            },
            error => {
              console.log('请求失败了', error.message)
              this.$message.error("网络错误")
            }
          )
      }
      else {
        this.isprecheck = false
        this.computepageSize()
      }

    },
    jump (pageid) {
      // 获取当前页的内容
      this.isloading = true
      if (this.isprecheck === true) {
        this.filprechecklogs = this.prechecklogs.slice((pageid - 1) * 15 , pageid * 15)
        this.isloading = false
      }
      else {
        this.$http.get("manage/recordPage",
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
                this.showchecklogs = response.data.obj
                for (let i = 0; i < this.showchecklogs.length; i++) {
                  if (this.showchecklogs[i].applyResult === 1) {
                    this.showchecklogs[i].applyResult = "成功"
                  } else {
                    this.showchecklogs[i].applyResult = "失败"
                  }
                  this.showchecklogs[i].applyDate = new Date(this.showchecklogs[i].applyDate).Format("yyyy-MM-dd hh:mm:ss")
                }
                this.isloading = false
              }
              else {
                this.$message.warning("获取申请记录失败")
              }
            },
            error => {
              console.log('请求失败了', error.message)
              this.$message.error("网络错误")
            }
          )
      }
    },
    computepageSize () {
      this.pageSize = this.allpageSize
    }
  },
  created () {
    // 获取总页数
    this.$http.get("manage/recordCount",
      {
        params: {
          id: sessionStorage.getItem('managername')
        }
      }).then(
        response => {
          console.log(response.data)
          if (response.data.code === 200) {
            this.allpageSize = Math.ceil(response.data.obj / 15)
            this.pageSize = this.allpageSize
          }
          else {
            this.$message.warning("获取申请记录失败")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )
    // 获取第一页的内容
    this.$http.get("manage/recordPage",
      {
        params: {
          id: sessionStorage.getItem('managername'),
          pageNo: this.pageNow,
          pageSize: 15
        }
      }).then(
        response => {
          console.log(response.data)
          if (response.data.code === 200) {
            this.$message.success("获取申请记录成功")
            this.showchecklogs = response.data.obj
            for (let i = 0; i < this.showchecklogs.length; i++) {
              if (this.showchecklogs[i].applyResult === 1) {
                this.showchecklogs[i].applyResult = "成功"
              } else {
                this.showchecklogs[i].applyResult = "失败"
              }
              this.showchecklogs[i].applyDate = new Date(this.showchecklogs[i].applyDate).Format("yyyy-MM-dd hh:mm:ss")
            }
            this.isloading = false
          }
          else {
            this.$message.warning("获取申请记录失败")
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
.interfacecheck {
  /* 登录背景栏 */
  margin-top: 35px;
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

.checkheader {
  padding-top: 15px;
  margin-left: 25px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.inputbox {
  height: 32px;
  width: 200px;
  float: left;
}

.managercheckinput {
  line-height: 30px;
  color: #494949;
  height: 29px;
  width: 30px;
}

.managerinput {
  margin-left: 5px;
  width: 120px;
  height: 32px;
  font-size: 20px;

  background: #ffffff;
  border: 1px solid #ea0437;
  box-sizing: border-box;
  border-radius: 2px;
}

.checkbutton {
  width: 90px;
  height: 32px;
  background: #ea0437;
  border-radius: 2px;
  color: #ffffff;
  border: none;
  cursor: pointer;
}

.icon {
  width: 20px;
  height: 20px;
  float: left;
}

.checkbuttoncontent {
  font-size: 18px;
  line-height: 20px;
}

.checkbody {
  margin-top: 20px;
  font-size: 18px;
}

.bodytitle {
  text-align: center;
  color: #858585;
}

.bodybanner {
  margin-top: 5px;
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
  width: 25%;
  text-align: center;
}

.checkresult {
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

.checkfooter {
  position: absolute;
  bottom: 0px;
  width: 1200px;
  text-align: center;
  color: #494949;
}

.spanbutton {
  cursor: pointer;
}
</style>