<template>
  <div id="sign">
   <ul>
      <li v-for='(item,index) in imgs' :key='item.id'><img v-bind:src='item.img'></li>
      <button id='ceshi' @click='num()' >测试</button>
      <transition name='fade'> 
        <div id='tip' v-show='ishow'>
        <div id='imgg'><img :src='last.img'><h6>{{last.name}}</h6></div>
        
        <div id='text'>签到成功{{number}}</div>
      </div>
        </transition>
   </ul>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'sign',
  data(){
    return{
      ishow:'',
      number:'',
      imgs:[{name:'4',img:require('../assets/胡超15827509535.jpg')},{name:'4',img:require('../assets/胡超15827509535.jpg')},{name:'4',img:require('../assets/胡超15827509535.jpg')},{name:'10',img:require('../assets/胡超15827509535.jpg')}],
      last:[],
      send:{
        order:'sign_in_time',
       
        
      }
    }
  },
  created(){
     let send=this.send
          let url='https://dev.ishop.baison.net/frontend/pc_api/offline_activities/sign_in'
              console.log('url',url);
              axios.get(url,{params:{order:'sign_in_time'}}).then((response)=>{
              console.log("请求成功",response.data.data.users)
              this.imgs=response.data.data.users
              console.log(this.imgs)
              },function(error){
              console.log("请求失败",error);
                })
                
    setInterval(()=>{setTimeout(()=>{
          
          let send=this.send
          let url='https://dev.ishop.baison.net/frontend/pc_api/offline_activities/sign_in'
              console.log('url',url);
              axios.get(url,{params:{order:'sign_in_time'}}).then((response)=>{
              console.log("请求成功",response.data.data.users)
              var newitem=response.data.data.users
              this,imgs.pish(newitem)
              console.log(this.imgs)
              },function(error){
              console.log("请求失败",error);
                })

    },0)
        

    },5000)
      
      // setInterval(()=>{
      // var newitem={name:'4',img:require('../assets/胡超15827509535.jpg')};
      // this.imgs.push(newitem);
      //     },5000)
  },
  methods:{
    num(){
      var newitem={name:'4',img:require('../assets/胡超15827509535.jpg')};
      this.imgs.push(newitem);
    }
  },
 watch:{
   
   imgs:{
    handler:function(newVal){
    var last=this.imgs[this.imgs.length-1]
     this.last=last
     console.log(last)
      // var newitem={name:'4',img:require('../assets/胡超15827509535.jpg')};
      // this.imgs.push(newitem);
      var li=document.getElementsByTagName('li');
      var length=li.length;
      this.number=length+1;
      console.log(length);
      this.ishow=!this.ishow;
      setTimeout(()=>{
       this.ishow=!this.ishow
          },2000)
          console.log(newVal)
    },
    deep:true
   
      
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
#ceshi {
  position: absolute;
  bottom: 50px;
  left: 20px;
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
  overflow: hidden;
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
  background-color: rgba(0, 0, 0, 0.5);
  padding: 6px;
}
ul{
  
  height: 770px;
  overflow: hidden;
  
}
li{
 
  list-style: none;
  height: 90px;
  width: 60px;
  margin: 3px;
  background-color:rgba(0, 0, 0, 0.8  );
  display: inline-block;
}
li img{
  height: 90px;
  width: 60px;
}


@media screen and (max-width: 1024px){
#sign {
  max-width: 960px;
  margin: 0px auto;
  padding: 7px;
  
}

ul{
  height: 460px;
  overflow: hidden;
  
  
}
li{
  list-style: none;
  height: 61.5px;
  width: 41px;
  margin: 2px;
  background-color:rgba(0, 0, 0, 0.8  );
  display: inline-block;
}
li img{
  height: 61.5px;
  width: 41px;
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