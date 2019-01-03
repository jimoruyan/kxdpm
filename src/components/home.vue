<template>
<div id="home">
  <header></header>
  <router-view></router-view>
  <footer>
    <router-link to="/" exact>签到墙</router-link>
    <router-link to="/luckdraw" exact>抽奖</router-link>
  </footer>
</div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style scoped>
#home {
  max-width: 1200px;
  margin: 0 auto;
}
header {
  max-width: 1200px;
  height: 150px;
  border: 1px solid rebeccapurple;
}
footer{
    font-size: 20px;
    position: absolute;
    bottom: 0;
}
</style>
