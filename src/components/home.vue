<template>
  <div id="home">
    <header>
      <img src="../assets/code.png" id="code">
      <img src="../assets/logo.png" id="name">
    </header>
    <router-view></router-view>
    
    <footer>
      <router-link to="/index" exact><input type='button' value="首页"></router-link>
      <router-link to="/signin" exact><input type='button' value="签到墙"></router-link>
      <router-link to="/luckdraw" exact><input type='button' value="抽奖"></router-link>
      <router-link to="/sign" exact><input type='button' value="签到"></router-link>
      <router-link to="/lucked" exact><input type='button' value="获奖名单"></router-link>
    </footer>
  </div>
</template>

<script>

export default {
  name: "home",
  data(){
      return{
        number:''
      }
  },
  
};
</script>

<style scoped>
#home {
  max-width: 1200px;
  margin: 0 auto;
}
header {
  max-width: 1200px;
  color:white;
  flex-grow: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
}
#code{
  width: 120px;
  height: 120px;
  display: inline-block;
}
#name{
  width: 200px;
  display: inline-block;
  position: absolute;
  right: 30px;
  top: 45px;
  
}

footer{
    font-size: 20px;
    position: absolute;
    bottom: 5px;
    margin: 0 auto; 
    left: 0;
    right: 0;
    text-align: center;
}
footer input{
  height: 40px;
  width: 100px;
  background-color: grey;
  border: 0px;
  border-radius: 5px;
  cursor: pointer;
}
footer input:hover{
  background-color: #00BFFF;
  color:white;
}
@media screen and (max-width: 1024px) {
  #home {
    width: 960px;
    margin: 0 auto;
  }
  header {
    max-width: 960px;
    height: 90px;
  }
  #code{
  width: 90px;
  height: 90px;
  display: inline-block;
  }
  #name{
  width: 200px;
  display: inline-block;
  position: absolute;
  right: 30px;
  top: 30px;
  }

  footer {
    font-size: 20px;
    bottom: 5px;
  }
  footer input{
  height: 30px;
  width: 80px;
  background-color: grey;
  border: 0px;
  border-radius: 5px;
  cursor: pointer;

}
}
</style>
