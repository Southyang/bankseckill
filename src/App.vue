<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    Toast (msg) {
      var m = document.createElement('div');
      m.innerHTML = msg;
      m.style.cssText = "width:20vw; min-width:150px; background:#000; opacity:0.5; height:40px; color:#fff; line-height:40px; text-align:center; border-radius:5px; position:fixed; top:40%; left:40vw; z-index:999999; font-weight:bold;";
      document.body.appendChild(m);
      setTimeout(function () {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function () { document.body.removeChild(m) }, d * 1000);
      }, 2000);
    }
  },
  mounted () {
    this.$bus.$on('Toast', this.Toast)
  }
}

</script>

<style>
.gotoother {
  z-index: 9999;
  position: absolute;
  top: 1vh;
  right: 1vh;
  text-decoration: none;
  background-color: deepskyblue;
  border-radius: 15px;
  padding: 5px 5px;
  cursor: pointer;
  color: black;
}
a {
  text-decoration: none;
}
</style>
