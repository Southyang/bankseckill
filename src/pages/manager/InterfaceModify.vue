<template>
  <div class="interfacemodify">
    <div class="modifyheader">
      修改商品信息
    </div>
    <div class="modifybody">
      <form id="goods"
            enctype="multipart/form-data">
        <div class="modifyinfo">
          <div class="infoword">商品id</div>
          <input class="infoinput"
                 type="text"
                 name="id"/>
        </div>
        <div class="modifyinfo">
          <div class="infoword">商品名称</div>
          <input class="infoinput"
                 type="text"
                 name="name"
                 v-model="goodsName" />
        </div>
        <div class="modifyinfo">
          <div class="infoword">商品图片</div>
          <a href="javascript:;"
             class="choosebutton"
             @click="choosepicture">选择文件
            <input type="file"
                   id="file"
                   name="file"
                   @change="filePreview">
          </a>
          <img class="choosepicture"
               :src="imgurl">
        </div>
        <div class="modifyinfo">
          <div class="infoword">商品描述</div>
          <textarea class="infoinput longinput"
                    v-model="goodsDetail"
                    type="text"
                    name="description" />
        </div>
        <div class="modifyinfo">
          <div class="infoword">商品价格</div>
          <input class="infoinput shortinput"
                 v-model="goodsPrice"
                 type="text"
                 name="price" />
        </div>
        <div class="modifyinfo">
          <div class="infoword">商品库存</div>
          <input class="infoinput shortinput"
                 v-model="goodsStock"
                 type="text"
                 name="stock" />
        </div>
        <div class="modifyinfo">
          <div class="infoword">起存金额</div>
          <input class="infoinput shortinput"
                 type="text"
                 name="minDeposit" />
        </div>
        <div class="modifyinfo">
          <div class="infoword">存款期限</div>
          <input class="infoinput shortinput"
                 type="text"
                 name="depositDuration" />
        </div>
        <div class="modifyinfo">
          <div class="infoword">利率</div>
          <input class="infoinput shortinput"
                 type="text"
                 name="interestRate" />
        </div>
        <div class="modifyinfo">
          <div class="infoword">每日限额</div>
          <input class="infoinput shortinput"
                 type="text"
                 name="dayLimit" />
        </div>
        <div class="modifyinfo">
          <div class="infoword">到期是否自动赎回</div>
          <input class="infoinput shortinput"
                 type="text"
                 name="autoRedeem" />
        </div>
        <div class="modifyinfo">
          <div class="infoword">是否支持提前支取</div>
          <input class="infoinput shortinput"
                 type="text"
                 name="withdrawEarly" />
        </div>
      </form>
    </div>
    <div class="modifyfooter">
      <button class="modifybutton"
              @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import defaultpicture from '../../assets/image/choosegoodspicture.png'
export default {
  name: 'InterfaceModify',
  data () {
    return {
      goodsName: '',
      goodsDetail: '',
      goodsPrice: '',
      goodsStock: '',
      imgurl: defaultpicture,
      file: ''
    }
  },
  methods: {
    choosepicture (e) {
      console.log("选择文件")
      document.getElementById('file').click()
    },
    filePreview (e) {
      let _this = this
      var files = e.target.files[0]
      this.file = files
      if (!e || !window.FileReader) return  // 判断是否支持FileReader
      let reader = new FileReader()
      reader.readAsDataURL(files) // 文件转换
      reader.onloadend = function () {
        _this.imgurl = this.result
      }
    },
    submit () {
      console.log("添加商品");
      let formData = new FormData($("#goods")[0]);
      this.$http({
        headers: {
          dataType: 'json',
          contentType: false, //必须
          processData: false, //必须
          async: false,
          cache: false,
        },
        method: 'post',
        url: '/manage/updateGoods',
        data: formData
      }).then(
        response => {
          console.log('请求成功了', response.data)
          if (response.data.code === 200) {
            this.$message.success("修改商品信息成功")
          }
          else {
            this.$message.warning("修改商品信息失败")
          }
        },
        error => {
          console.log('请求失败了', error.message)
          this.$message.error("网络错误")
        }
      )
    }
  }
}
</script>

<style scoped>
.interfacemodify {
  /* 登录背景栏 */
  margin-top: 45px;
  margin-left: 55px;
  width: 1200px;
  height: 630px;

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

.modifyheader {
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

.modifybody {
  width: 1000px;
  height: 500px;
  margin-top: 35px;
  margin-left: 200px;
  overflow: auto;
}

.modifyinfo {
  margin-bottom: 25px;
}

.infoword {
  float: left;
  text-align: center;
  line-height: 35px;
  width: 160px;
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
  width: 150px;
}

.choosebutton {
  display: flex;
  justify-content: center;
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

.choosebutton input {
  position: absolute;
  font-size: 0px;
  right: 0;
  top: 0;
  opacity: 0;
}

.choosepicture {
  background-size: auto 110px;
  width: auto;
  height: 110px;
  overflow: hidden;
}

.modifyfooter {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.modifybutton {
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

a {
  text-decoration: none;
}
</style>