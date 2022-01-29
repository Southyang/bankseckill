<template>
  <div>
    <h2>我是Home的内容</h2>
    <button @click="gotoabout">about</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    gotoabout () {
      this.$router.replace('/about');
      console.log('跳转到about')
    }
  }
}
</script>