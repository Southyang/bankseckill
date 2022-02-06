<template>

</template>

<script>
export default {
  name: "Toast",
  methods: {
    Toast (msg, kind) {
      var m = document.createElement('div');
      m.innerHTML = msg;
      if (kind === "failed") {
        m.style.cssText = "width:auto; min-width:150px; background:#f1dddd; opacity:0.5;" +
          "height: 40px; color:#000; line-height: 40px; text-align: center; border-radius: 5px; " +
          "position: fixed; top: 40vh; left: 40vw; z-index: 999999; font-weight: bold; ";
      }
      else if (kind === "success") {
        m.style.cssText = "width:auto; min-width:150px; background:#dff0d8; opacity:0.5;" +
          "height: 40px; color:#000; line-height: 40px; text-align: center; border-radius: 5px; " +
          "position: fixed; top: 40vh; left: 40vw; z-index: 999999; font-weight: bold; ";
      }
      else if (kind === "info") {
        m.style.cssText = "width:auto; min-width:150px; background:#d8edf7; opacity:0.5;" +
          "height: 40px; color:#000; line-height: 40px; text-align: center; border-radius: 5px; " +
          "position: fixed; top: 40vh; left: 40vw; z-index: 999999; font-weight: bold; ";
      }

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
</style>