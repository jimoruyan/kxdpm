<template>
  <div id="app">
    <!-- <home></home> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import home from './components/home'
// import login from './components/login'
export default {
  name: 'App',
  components: {
    // home,
    // login
    
  }
}
</script>

<style>
#app {
  background: url(./assets/bg.png)no-repeat;
  background-position: center center;
  background-size: cover;
  background-color: #fff;
  width: 100%;
  height: 100%;
  user-select:none;
}
</style>
