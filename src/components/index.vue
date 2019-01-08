<template>
    <center>
      <h1>扫码签到</h1>
      <img src='../assets/code.png' alt=''>
      <router-link to="/signin" exact><input type='button' value='开始'></router-link>
      <P>主办单位：武汉百胜睿迪软件有限公司</P>
   </center>
</template>
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
center h1{
  font-size: 50px;
  line-height: 50px;
  color:white;
  margin: 10px;
}
center{
  max-width: 1200px;
  text-align: center;
  padding-bottom: 10px;
}
center img{
  display:inline-block;
  height: 500px;
  width: 500px;

}
center input{
  display: block;
  margin: 30px auto;
  border: 0px;
  height: 60px;
  width: 120px;
  border-radius: 5px;
  background-color: orangered;
  color: white;
  font-size: 25px;
  cursor: pointer;
}
center a{
  text-decoration: none;
}
p{
  font-size: 30px;
  color: white;
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
@media screen and (max-width: 1020px) {
  #home {
    width: 960px;
    margin: 0 auto;
  }
  header {
    max-width: 960px;
    height: 80px;
    border: 1px solid rebeccapurple;
  }
  footer {
    font-size: 20px;
    position: absolute;
    bottom: 0;
  }
}
</style>


