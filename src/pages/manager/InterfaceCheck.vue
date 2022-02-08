<template>
  <div class="interfacecheck">
    <div class="checkheader">
      <div class="inputbox">
        <span class="managercheckinput"> 姓名 </span>
        <input class="managerinput"
               v-model="inputname" />
      </div>
      <div class="inputbox">
        <span class="managercheckinput"> 日期 </span>
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
        <span class="spancontent"> 申请结果 </span>
      </div>
      <div class="checkresult"
           v-for="(log,index) in filchecklogs"
           :key="index">
        <div class="resultcontent">
          <span class="spancontent"> {{log.number}} </span>
          <span class="spancontent"> {{log.name}} </span>
          <span class="spancontent"> {{log.applydate}} </span>
          <span class="spancontent"> {{log.applyresult}} </span>
        </div>
        <div class="resultline">
        </div>
      </div>
    </div>
    <div class="checkfooter">
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
  name: 'InterfaceCheck',
  data () {
    return {
      inputname: '',
      inputdate: '',
      checkname: '',
      checkdate: '',
      nowpage:'1',
      checklogs: [
        {
          number: '20220201024735',
          name: '王某某',
          applydate: '2022-02-01',
          applyresult: '已通过'
        },
        {
          number: '20220203024735',
          name: '李某某',
          applydate: '2022-02-03',
          applyresult: '审核中'
        },
        {
          number: '20220203024735',
          name: '王某某',
          applydate: '2022-02-03',
          applyresult: '审核中'
        }
      ]
    }
  },
  methods: {
    check () {
      console.log("查询申请记录 " + this.inputname + " " + this.inputdate)
      this.checkname = this.inputname
      this.checkdate = this.inputdate
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
    filchecklogs () {
      return this.checklogs.filter((log) => {
        return (log.name.indexOf(this.checkname) !== -1 && log.applydate.indexOf(this.checkdate) !== -1)
      })
    },
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
  }
}
</script>

<style scoped>
.interfacecheck {
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
  bottom: 10px;
  width: 1200px;
  text-align: center;
  color: #494949;
}

.spanbutton{
  cursor: pointer;
}
</style>