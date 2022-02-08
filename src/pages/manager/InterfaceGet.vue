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
          <span class="spancontent"> {{log.phone}} </span>
          <span class="spancontent"> {{log.goodsname}} </span>
          <span class="spancontent"> {{log.goodsprice}} </span>
          <span class="spancontent"> {{log.purchasequantity}} </span>
        </div>
        <div class="resultline">
        </div>
      </div>
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
			nowpage:'1',
      getlogs: [
        {
          name: '王某某',
          phone: '12345678912',
          goodsname: 'GOODS1',
          goodsprice: '50',
          purchasequantity: '1'
        },
        {
          name: '王某某',
          phone: '12345678912',
          goodsname: 'GOODS1',
          goodsprice: '50',
          purchasequantity: '1'
        },
        {
          name: '王某某',
          phone: '12345678912',
          goodsname: 'GOODS1',
          goodsprice: '50',
          purchasequantity: '1'
        },
        {
          name: '王某某',
          phone: '12345678912',
          goodsname: 'GOODS1',
          goodsprice: '50',
          purchasequantity: '1'
        },
        {
          name: '王某某',
          phone: '12345678912',
          goodsname: 'GOODS1',
          goodsprice: '50',
          purchasequantity: '1'
        }
      ]
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

.spanbutton{
  cursor: pointer;
}
</style>