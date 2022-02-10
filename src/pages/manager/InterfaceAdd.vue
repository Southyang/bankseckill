<template>
  <div class="interfaceadd">
    <div class="addheader">
      添加商品
    </div>
    <div class="addbody">
      <div class="addinfo">
        <div class="infoword">商品名称</div>
        <input class="infoinput" />
      </div>
      <div class="addinfo">
        <div class="infoword">商品标题</div>
        <input class="infoinput" />
      </div>
      <div class="addinfo">
        <div class="infoword">商品图片</div>
        <input type="file"
               id="filed"
               hidden=""
               @change="filePreview">
        <button class="choosebutton"
                @click="choosepicture">选择文件</button>
        <img class="choosepicture"
             :src="imgurl">
      </div>
      <div class="addinfo">
        <div class="infoword">商品描述</div>
        <input class="infoinput longinput" />
      </div>
      <div class="addinfo">
        <div class="infoword">商品价格</div>
        <input class="infoinput shortinput" />
      </div>
      <div class="addinfo">
        <div class="infoword">商品库存</div>
        <input class="infoinput shortinput" />
      </div>
    </div>
    <div class="addfooter">
      <button class="addbutton">提交</button>
    </div>
  </div>
</template>

<script>
import defaultpicture from '../../assets/image/choosegoodspicture.png'
export default {
  name: 'InterfaceAdd',
  data () {
    return {
      imgurl: defaultpicture
    }
  },
  methods: {
    choosepicture (e) {
      console.log("选择文件")
      document.getElementById('filed').click()
    },
    filePreview (e) {
      let _this = this
      var files = e.target.files[0]
      if (!e || !window.FileReader) return  // 判断是否支持FileReader
      let reader = new FileReader()
      reader.readAsDataURL(files) // 文件转换
      reader.onloadend = function () {
        _this.imgurl = this.result
      }
    }
  }
}
</script>

<style scoped>
.interfaceadd {
  /* 登录背景栏 */
  margin-top: 45px;
  margin-left: 55px;
  width: 1200px;
  height: 650px;

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

.addheader {
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

.addbody {
  width: 800px;
  height: 500px;
  margin-top: 35px;
  margin-left: 200px;
}

.addinfo {
  margin-bottom: 25px;
}

.infoword {
  float: left;
  text-align: center;
  line-height: 35px;
  width: 100px;
}

.infoinput {
  height: 35px;
  background: #ffffff;
  border: 1px solid #494949;
  box-sizing: border-box;
  border-radius: 5px;
  margin-left: 25px;
  font-size: 22px;
  width: 525px;
}

.longinput {
  width: 675px;
  height: 110px;
}

.shortinput {
  width: 130px;
}

.choosebutton {
  margin-left: 25px;
  width: 120px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #ea0437;
  box-sizing: border-box;
  border-radius: 2px;
  font-size: 20px;
  line-height: 33px;
  /* or 164% */

  color: #ea0437;
  cursor: pointer;
  float: left;
  margin-right: 25px;
}

.choosepicture {
  background-size: auto 110px;
  width: auto;
  height: 110px;
  overflow: hidden;
}

.addfooter {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.addbutton {
  width: 120px;
  height: 40px;

  background: #ea0437;
  border-radius: 5px;
  border: none;
  font-size: 24px;
  line-height: 24px;
  /* or 99% */

  color: #ffffff;
}
</style>