<template>
  <div class="Settingarticle">
    <div class="articleheader">
      协议与条款
    </div>
    <div class="articlebody">
			<agreements/>
		</div>
    <div class="articlefooter">
      <img class="footerimg"
           src="../../assets/image/bannerimg.png" />
    </div>
  </div>
</template>

<script>
import Agreements from '../../components/Agreements.vue'
export default {
  name: 'Settingarticle',
  components: { Agreements }
}
</script>

<style scoped>
.Settingarticle {
  width: 1100px;
  height: 550px;
  margin-left: 10%;
  margin-top: 50px;
  background: #ffffff;
  border-radius: 5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 18px;
}

.articleheader {
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

.articlebody{
  width: 1075px;
  margin-left: 25px;
}

.articlefooter{
	position: absolute;
  top: 670px;
  width: 1100px;
  text-align: center;
  color: #494949;
}

.footerimg{
	width: 160px;
	height: 40px;
}
</style>