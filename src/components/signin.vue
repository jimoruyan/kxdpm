<template>
  <div id="sign">
   <ul>
      <li v-for='(item,index) in imgs'><img v-bind:src='item.img'></li>
      <transition name='fade'> 
        <div id='tip' v-show='ishow'>
        <div id='imgg'></div>
        <div id='text'>签到成功</div>
      </div>
        </transition>
   </ul>
   <footer>
    <router-link to="/signin" exact><input type='button'value="签到墙" @click="num()"></router-link>
    <router-link to="/luckdraw" exact><input type='button' value="抽奖"></router-link>
  </footer>
  </div>
</template>

<script>

export default {
  name: 'sign',
  data(){
    return{
      ishow:'',
      imgg:'',
      number:'',
      imgs:[
        {name:'1',img:require('../assets/1.jpg')},
        {name:'2',img:require('../assets/2.jpg')},
        {name:'3',img:require('../assets/3.jpg')},
        {name:'4',img:require('../assets/4.jpg')},
        {name:'5',img:require('../assets/5.jpg')},
        {name:'6',img:require('../assets/6.jpg')},
        {name:'7',img:require('../assets/7.jpg')},
        {name:'8',img:require('../assets/8.jpg')},
        {name:'9',img:require('../assets/9.jpg')},
        {name:'10',img:require('../assets/10.jpg')},
        {name:'11',img:require('../assets/11.jpg')},
        {name:'12',img:require('../assets/12.jpg')},
        {name:'13',img:require('../assets/13.jpg')},
        {name:'14',img:require('../assets/14.jpg')},
      
      ]
    }
  },
  methods:{
   num(){
      var newitem={name:'15',img:require('../assets/1.jpg')};
      this.imgs.push(newitem);
      var li=document.getElementsByTagName('li');
      var length=li.length+1;
      this.number=length;
      console.log(length);
      this.ishow=!this.ishow;
      setTimeout(function(){
       document.getElementById('tip').style.display='none'
     
          },5000)
    }
  }
}
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{
    transition: all 0.5s;
}
.fade-enter,.fade-leave-to{
 opacity: 0;
  
}
#tip{
  position: absolute;
  height: 150px;
  width: 400px;
  z-index: 10;
  top: 350px;
  left: 755px;
}
#imgg{
  height: 150px;
  width: 150px;
  float: left;
  margin-right: 10px;
  border-radius: 10px;
  background-color: white;
}
#text{
  display: inline-block;
  height: 150px;
  width: 240px;
  background-color: white;
  font-size: 50px;
  text-align: center;
  line-height: 150px;
  border-radius: 10px;
  font-family: STHeiti;
}
#sign {
  max-width: 1200px;
  margin: 0 auto;
}
header {
  max-width: 1200px;
  /* border: 1px solid rebeccapurple; */
  color:white;
  flex-grow: 1;
  padding-top: 10px;
  padding-bottom: 10px;

  position: relative;
}
#code{
  width: 120px;
  height: 120px;
  /* border: 1px solid yellow; */
  display: inline-block;
}
span{
  margin-left: 600px;
  font-size: 20px;
  color: silver;
}

#name{
  width: 200px;

  /* border: 1px solid yellow; */
  display: inline-block;
  position: absolute;
  right: 30px;
  top: 45px;
  
}


ul{
  height: 798px;
  overflow: hidden;
  
}
li{
 
  list-style: none;
  height: 96px;
  width: 64px;
  margin-right: 5px;
  margin-bottom: 5px;
  background-color:rgba(0, 0, 0, 0.8  );
  display: inline-block;
}
li img{
  height: 96px;
  width: 64px;
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
</style>