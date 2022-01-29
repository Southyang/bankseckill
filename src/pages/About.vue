<template>
  <div>
    <h2>我是About的内容</h2>
    <button @click="gotohome">about</button>
    <button @click="gototest">test</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods:{
    gotohome () {
      this.$router.replace('/home');
      console.log('跳转到Home')
    },
    gototest () {
      this.$router.replace('/about/test');
      console.log('跳转到Test')
    }
  }
}
</script>