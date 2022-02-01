<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
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
a{
  text-decoration: none;
}
</style>
