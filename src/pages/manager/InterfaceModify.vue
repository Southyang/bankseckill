<template>
  <div class="interfacemodify">
    <div class="modifyheader">
      修改商品信息
    </div>
    <div class="modifybody">
      <form id="goods"
            enctype="multipart/form-data">
        <div class="modifyinfo">
          <div class="infoword">商品ID</div>
          <input class="infoinput"
                 style="width:280px"
                 v-model="id" 
                 name="id"/>
        </div>
        <div class="modifyinfo">
          <div class="infoword">商品名称</div>
          <input class="infoinput"
                 v-model="goodsName" 
                 name="goodsName"/>
        </div>
        <div class="modifyinfo">
          <div class="infoword">商品标题</div>
          <input class="infoinput"
                 v-model="goodsTitle" 
                 name="goodsTitle"/>
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
                    name="goodsDetail" />
        </div>
        <div class="modifyinfo">
          <div class="infoword">商品价格</div>
          <input class="infoinput shortinput"
                 v-model="goodsPrice" 
                 name="goodsPrice"/>
        </div>
        <div class="modifyinfo">
          <div class="infoword">商品库存</div>
          <input class="infoinput shortinput"
                 v-model="goodsStock" 
                 name="goodsStock"/>
        </div>
      </form>
    </div>
    <div class="modifyfooter">
      <button class="modifybutton"
              @click="modify">提交</button>
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
      id: '',
      goodsName: '',
      goodsTitle: '',
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
    modify () {
      console.log("修改商品信息")
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
            // this.$bus.$emit('Toast', "验证码为:" + response.data.obj, "success")
            this.$message.success("修改商品成功")
          }
          else {
            // this.$bus.$emit('Toast', "该手机未注册", "info")
            this.$message.warning("修改商品失败")
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
}
</script>

<style scoped>
.interfacemodify {
  /* 登录背景栏 */
  margin-top: 15px;
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
  width: 800px;
  height: 550px;
  margin-left: 200px;
  margin-top: 35px;
}

.modifyinfo {
  margin-bottom: 25px;
}

.infoword {
  float: left;
  text-align: center;
  line-height: 35px;
  width: 100px;
  text-align: left;
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
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}

.choosepicture {
  background-size: auto 100px;
  width: auto;
  height: 100px;
  overflow: hidden;
}

.modifyfooter {
  display: flex;
  justify-content: center;
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
</style>