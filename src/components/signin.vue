<template>
  <div id="sign">
   <ul>
      <li v-for='(item,index) in imgs'><img v-bind:src='item.img'></li>
      <button @click='num()' >测试</button>
      <transition name='fade'> 
        <div id='tip' v-show='ishow'>
        <div id='imgg'><img src='../assets/3.jpg'><h6>leisiming</h6></div>
        
        <div id='text'>签到成功</div>
      </div>
        </transition>
   </ul>
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
      setTimeout(()=>{
       this.ishow=!this.ishow
      
     
          },2000)
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
  width: 350px;
  z-index: 10;
  top: 350px;
  left: 755px;
}
#imgg{
  height: 150px;
  width: 100px;
  float: left;
  margin-right: 10px;
  border-radius: 10px;
  background-color: white;
  position: relative;
}
#imgg h6{
  font-size: 15px;
  display: block;
  font-style: normal;
  line-height: 25px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: rgba(255, 255, 255, 0.7  );
}
#imgg img{
  height: 150px;
  width: 100px;
  border-radius: 10px;
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


@media screen and (max-width: 1024px){
#sign {
  max-width: 960px;
  margin: 0px auto;
}

ul{
  height: 480px;
  overflow: hidden;
  
}
li{
  list-style: none;
  height: 75px;
  width: 50px;
  margin-right: 5px;
  margin-bottom: 5px;
  background-color:rgba(0, 0, 0, 0.8  );
  display: inline-block;
}
li img{
  height: 75px;
  width: 50px;
}
#tip{
  position: absolute;
  height: 120px;
  width: 310px;
  z-index: 10;
  top: 250px;
  left: 360px;
}
#imgg{
  height: 120px;
  width: 80px;
  float: left;
  margin-right: 10px;
  border-radius: 10px;
  background-color: white;
  position: relative;
}
#text{
  display: inline-block;
  height: 120px;
  width: 200px;
  background-color: white;
  font-size: 40px;
  text-align: center;
  line-height: 120px;
  border-radius: 10px;
  font-family: STHeiti;
}
#imgg h6{
  font-size: 15px;
  display: block;
  font-style: normal;
  line-height: 25px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: rgba(255, 255, 255, 0.7  );
}
#imgg img{
  height: 120px;
  width: 80px;
  border-radius: 10px;
}
}
</style>