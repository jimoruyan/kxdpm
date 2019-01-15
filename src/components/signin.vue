<template>
  <div id="sign">
   <ul>
      <li v-for='(item,index) in imgs' :key='item.index'><img v-bind:src="'http://www.zdsapi.com'+item.img"></li> 
      <!-- <button id='ceshi' @click='num()' >测试</button> -->
      <!-- 测试按钮 -->
      <transition name='fade'> 
        <div id='tip' v-show='ishow'>
        <div id='imgg'><img :src="'http://www.zdsapi.com'+last.img"><h6>{{last.name}}</h6></div>
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
      imgs:[],
      last:[],
      end_time:'',
      websock:null,
      timer:null,
      list:[],
      timer2:null
    }
  },
  mounted(){ 
     //创建页面时获取签到的名单
      let url='/pc_api/offline_activities/sign_in'
      this.axios.get(url,{params:{order:'sign_in_time'}}).then((response)=>{
          this.imgs=response.data.data.users
      },
      function(error){
              console.log("请求失败",error);
        })
  
      //定时器每5秒获取当前时间前五秒之间的名单
      this.timer=setInterval(()=>{
            var timestamp=new Date().getTime()/1000;
            let url='/pc_api/offline_activities/sign_in'
            this.axios.get(url,{params:{order:'sign_in_time',start_time:timestamp-6.000,end_time:timestamp-1.000}}).then((response)=>{
                var newitem=response.data.data.users
                if(newitem.length!==0){
                  this.list=this.list.concat(newitem) //与队列数组合并
                }
            },function(error){
                console.log("请求失败",error);
              })

      },5000)
    this.timer2=setInterval(()=>{ //定时将队列中的名单推送到签到墙中
          if(this.list.length!==0){
              this.imgs.push(this.list[0])
              this.list.shift()
          }
      
     },3000)
  },
  beforeDestroy(){  //离开界面销毁定时器
    if(this.timer){
       clearInterval(this.timer)
    }
    if(this.timer2){
        clearInterval(this.timer2)
    }
  },
 
methods:{
    num(){ //测试按钮
      var newitem=[{name:'1',img:require('../assets/me.jpg')},{name:'2',img:require('../assets/me.jpg')}];
      this.list=this.list.concat(newitem)
     
        
    },
},
 watch:{
    list:function(){
    },
      imgs:function(){
            var last=this.imgs[this.imgs.length-1]
            this.last=last
            var li=document.getElementsByTagName('li');
            var length=li.length;
            this.number=length+1;
            this.ishow=!this.ishow;
        setTimeout(()=>{
            this.ishow=!this.ishow
        },2000)   
      
     
   },
   //监听数组变化显示提示签到信息

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