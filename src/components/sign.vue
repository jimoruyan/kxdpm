<template>
  <div id="sign">
	<div class="box">
	<h2>签到</h2>
    
		<form method='post' action=''>
    <div class="input_box">
    	<input type="text" placeholder="请输入姓名" id="uname" lay-verify="required" autocomplete="off"/>
    </div>
    <div class="input_box">
    	<input type="text" v-model='phonenum.phone' placeholder="请输入手机号" id="upass" maxlength="11"lay-verify="required"autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
    </div>
    <div class="input_box">
      <input type="text" v-model='phonenum.vcode'placeholder="请输入验证码" id='ucode'maxlength="6" lay-verify="required" autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
      <input type="button" v-model="msg" id="send" @click="send()" :disabled='disable'>
    </div>
		<div id="error_box" v-show='ishow'></div>
    <div class="input_box">
    		<input type='button' value="签到" id='button' @click="sign()">
    </div>
    </form>
</div>
    <div class="img">
      <img src='../assets/222.png'>
    </div> 
  </div>
</template>
<script>

import qs from "qs"
import axios from "axios"
export default {
	name: 'sign',
	data(){
		return{
			data:[],
			disable:false,
			time:60,
			timer:null,
			msg:"获取验证码",
			phonenum:{
				phone:'',
				vcode:''
			},
			
			ishow:false,
			
		}
	},
  methods:{
			send(){
				this.ishow=true
				var tip=document.getElementById('error_box')
				let phonenum=this.phonenum
				let url='http://www.zdsapi.com/pc_api/offline_activities/verification_code'
				console.log('url',url);
				axios.post(url,qs.stringify(this.phonenum)).then(function(response){
					console.log("请求成功",response.data.message)
					tip.innerHTML=response.data.message
				},function(error){
					console.log("请求失败",error);
				
				})
					if(!this.timer){
						this.timer=setInterval(()=>{
							if(this.time>0&&this.time<=60){
								this.time--;
								if(this.time!==0){
									this.msg="重新发送("+this.time+")";

								}
							}else{clearInterval(this.timer);
							this.msg='获取验证码';
							this.time=60;
							this.timer=null;
							this.disable=false;
							
							}
						},1000);
					}
			},
			sign(){
				this.ishow=true
				var tip=document.getElementById('error_box')
				let phonenum=this.phonenum
				let vcode=this.vcode
				let url='http://www.zdsapi.com/pc_api/offline_activities/sign_in'
				console.log('url',url);
				axios.post(url,qs.stringify(this.phonenum)).then(function(response){
					console.log("请求成功",response.data)
						tip.innerHTML=response.data.message
						
					
				},function(error){
					console.log("请求失败",error);
				})
			}
			}
	}

</script>

<style scoped>
*{
	margin:0;
	padding:0;
	font-family:"微软雅黑";
	font-size:12px;
}
#sign{
	width: 100%;
	height: 100%;
	background-image: url('../assets/qdbg.png');
	background-size: cover;
}
.img{
  position: absolute;
  right: 50px;
  left: 50px;
  bottom: 100px;
	text-align: center;
}
.img img{
  width: 250px;
}
.box{
	border:solid 1px #ddd;
	background:#FFF;
	top: 50px;
  right: 10px;
  left: 10px;
  position: absolute;
}
.box h2{
	font-weight:normal;
	color:#666;
	font-size:16px;
	line-height:46px;
	height:46px;
	text-align:center;
	border-bottom:solid 1px #ddd;
}
.input_box{
	width:300px;
	padding-bottom:10px;
	margin:0 auto;
	overflow:hidden;
  padding-top: 10px;
}
#uname,#upass{
	float:left;
	width:298px;
	height:40px;
	font-size:14px;
	border:solid 1px #ddd;
	text-indent:10px;
	outline:none;
	line-height:40px;
}
#ucode{
  float:left;
	width:200px;
	height:40px;
	font-size:14px;
	border:solid 1px #ddd;
	text-indent:10px;
	outline:none;
	line-height:40px;
}
#send{
  width: 90px;
  height: 40px;
  font-size: 14px;
  text-align: center;
  float: right;
  border: 0px;
  background: #3f89ec;
  color: white;
  border-radius: 5px;
}
#button{
	width:300px;
	height:48px;
	background:#3f89ec;
	border:none;
	border-radius:5px;
	outline:none;
	cursor:pointer;
	font-size:16px;
	color:#FFF;
}
.disable{
	pointer-events: none;
	color:#666;
}
a{
	color:red;
}
#error_box{
	height: 20px;
	width: 300px;
	font-size: 10px;
	margin: 0 auto;
	color: red;
padding-left: 10px;
}

</style>