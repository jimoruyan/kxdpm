<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import home from './components/home'

export default {
  name: 'App',
  components: {
    home
  }
}
</script>

<style>
#app {
  background: url(./assets/bg.jpg)top center no-repeat;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
</style>
