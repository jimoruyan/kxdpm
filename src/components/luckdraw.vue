<template>
  <div id="luckdraw">
    <div class="left">
      <div class="title">
        <i class="icon icon-title"></i>
        滚动抽奖
      </div>
      <div class="userList">
        <div class="luck"></div>
        <div class="luck_user">
          <ul ref="oUl" style="width:28500px;">
            <li class="oLi" v-for="(list,index) in signed" :key="index">
              <img src="../assets/me.jpg">
              <span>{{list.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="condition">
        <div class="select">
          <div class="prize">
            奖项：
            <select v-model="selecteds">
              <option :value="se.value" v-for="(se,index) in options" :key="index">{{se.text}}</option>
            </select>
          </div>
          <div class="num">
            人数：
            <select></select>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <button @click="starMove" v-if="luckState">开始抽奖</button>
        <button @click="stopLuck" v-if="!luckState">停止抽奖</button>
      </div>
    </div>
    <div class="right">
      <div class="title">
        <i class="icon icon-title"></i>中奖名单
        <div class="resultNum">
          获奖人数:
          <span id="luckNumber">54</span>
        </div>
        <i class="icon icon-more"></i>
      </div>
      <div id="luckUl" class="result">
        <div  class="level" v-for="(list,index) in lucked" :key="index">
          <label>
            {{list.award_name}}
            <a></a>
          </label>
          <ul class="luckUl">
            <li v-for="(lists,index) in lucked[index].users" :key="index">
              <img src="../assets/me.jpg" alt>
              <span>{{lists.user_name}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="btn-box">
        <a class="btn reclick" @click="again">重新抽奖</a>
        <a class="btn submitUser" id="submitLottery">确认名单</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios-auth";
import qs from "qs";
export default {
  name: "luckdraw",
  data() {
    return {
      img_width: "",
      img_num: "",
      luckState: true, //抽奖状态
      timer: null, // 定时器
      scrollRange: null, //每个li的长度，根据窗口大小设置
      beginTimer: null,
      stopTimer: null,
      liWidth: null,
      liNum: null,
      options: [
        { value: 0, text: "一等奖" },
        { value: 1, text: "二等奖" },
        { value: 2, text: "三等奖" },
        { value: 3, text: "参与奖" }
      ],
      selecteds: "",
      userList: "",
      signed: [], //签到名单
      luck: {
        //上传中奖名单
        award_id: "3",
        user_ids: "3,4,5"
      },
      lucked: "" //获取中奖名单
    };
  },
  created() {
    // let _this = this;
    this.selecteds = this.options[0].value;
    this.axios    //获取签单名单
      .get("/pc_api/offline_activities/sign_in")
      .then( data=> {
        return data.data.data;
      })
      .then(data => {
        this.signed = data.users;
        this.liNum = this.signed.length;
      });
      this.axios    //获取中奖名单
      .get("/pc_api/offline_activities/lottery")
      .then(data => {
        return data.data.data;
      })
      .then(data => {
        this.lucked = data;
        console.log(this.lucked);
      });
    
  },
  mounted() {
    let oUl = this.$refs.oUl;
    
    if (window.innerWidth <= 1024) {
      //根据窗口宽度调整头像宽度
      this.liWidth = 140;
      oUl.style.left = 140 + "px";
      // oUl.style.width = this.liWidth * this.liNum + "px";
    } else {
      this.liWidth = 190;
      oUl.style.left = 190 + "px";
      // oUl.style.width = this.liWidth * this.liNum + "px";
    }
  },
  methods: {
    starMove: function() {
      let oUl = this.$refs.oUl; //获取抽奖区节点
      let liWidth = this.liWidth; //抽奖池图片的宽度
      let liNum = this.liNum; //抽奖池人数
      // let liNum = this.userList.length;                          //抽奖池人数

      this.luckState = false; //抽奖状态
      var speed = 50; //抽奖速度
      clearInterval(this.beginTimer);
      this.beginTimer = setInterval(function() {
        if (oUl.offsetLeft <= -liWidth * (liNum - 1)) {
          oUl.style.left = liWidth + "px";
        }
        oUl.style.left = oUl.offsetLeft - speed + "px";
      }, 10);
    },
    stopLuck: function() {
      let oUl = this.$refs.oUl; //获取抽奖区节点
      let liWidth = this.liWidth; //抽奖池图片的宽度
      let oLi = document.getElementsByClassName("oLi"); //获取抽奖池节点
      let luckUl = document.getElementsByClassName("luckUl"); //获取奖金池节点
      let distance = oUl.offsetLeft % this.liWidth; //获取定时器停止时宽度差
      let selected = this.selecteds; //获取下拉框节点
      let liNum = this.liNum;
      console.log(oUl.offsetLeft);
      clearInterval(this.beginTimer);
      if (oUl.offsetLeft > 0) {
        oUl.style.left = liWidth + "px";
      } else if (oUl.offsetLeft <= -liWidth * (liNum - 1)) {
        oUl.style.left = oUl.offsetLeft + liWidth - distance + "px";
      } else {
        oUl.style.left = oUl.offsetLeft - distance + "px";
      }
      let _num = -oUl.offsetLeft / liWidth; //获取中奖人
      let luckLi = oLi[_num + 1].cloneNode(true);
      luckUl[selected].appendChild(luckLi);
      this.luckState = true;
    },
    // again: function() {
    //   this.axios    //删除中奖名单
    //   .delete("/pc_api/offline_activities/lottery")
    //   .then(data => {
    //     console.log(data)
    //   });
    // }
  }
};
</script>

<style>
#luckdraw {
  display: flex;
  position: absolute;
  max-width: 1200px;
  top: 200px;
  box-sizing: border-box;
  box-shadow: 0 0 8px hsla(0, 0%, 100%, 0.5);
  padding: 10px;
}
#luckdraw .left {
  width: 600px;
  color: white;
  position: relative;
  display: inline-block;
}
#luckdraw .left .title {
  line-height: 58px;
  background-size: 100%;
  height: 58px;
  font-size: 22px;
  padding: 10px 8px;
  background: url(../assets/title-bg.png) no-repeat;
}

#luckdraw .left .title .icon-title {
  width: 28px;
  height: 28px;
  position: relative;
  top: -2px;
  display: inline-block;
  vertical-align: middle;
  background: url(../assets/sprite.png) 0 0 no-repeat;
  transform: scale(0.7);
}
#luckdraw .left .userList {
  height: 280px;
  margin-left: 20px;
  margin-top: 25px;
  /* position: relative; */
}
#luckdraw .left .luck {
  width: 280px;
  height: 280px;
  left: 165px;
  top: 65px;
  z-index: 99;
  position: absolute;
  background: url(../assets/lucky.png) no-repeat;
  background-size: 100% 100%;
}
#luckdraw .luck:before {
  content: "";
  width: 280px;
  height: 280px;
  display: block;
  animation: rotate 1.2s infinite linear;
  background: url(../assets/lucky1.png) no-repeat;
  background-size: 100% 100%;
}
@keyframes rotate {
  0% {
    transform: rotateZ(0);
  }

  100% {
    transform: rotateZ(360deg);
  }
}
#luckdraw .left .luck_user {
  position: relative;
  overflow-x: hidden;
  width: 570px;
  margin: 21px 0;
}
#luckdraw .luck_user ul {
  position: relative;
}
#luckdraw .luck_user li {
  float: left;
  width: 190px;
  height: 260px;
  overflow: hidden;
  text-align: center;
  font-size: 24px;
}
#luckdraw .luck_user li img {
  width: 190px;
  height: 190px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 20px;
  border-radius: 100%;
}
#luckdraw .left .condition {
  font-size: 20px;
  color: white;
}
#luckdraw .left .condition .select > div {
  display: inline-block;
  width: 200px;
  /* margin-left: 40px; */
}
#luckdraw .left .condition select {
  border-radius: 5px;
  opacity: 0.6;
  height: 28px;
  width: 100px;
}
/* #luckdraw .left .condition select option{
  opacity: 0.6;
} */
#luckdraw .left .prize {
  margin-left: 120px;
}
#luckdraw .left .num select {
  width: 80px;
}
#luckdraw .left .btn-box {
  margin-top: 40px;
  text-align: center;
}
#luckdraw .left .btn-box button {
  padding: 5px 30px;
  height: 38px;
  line-height: 30px;
  font-size: 24px;
  margin-top: 5px;
  z-index: 9999;
  border-radius: 4px;
  color: #fff;
  background: #ef3b39;
  border: none;
}
#luckdraw .right {
  box-sizing: border-box;
  position: relative;
  font-size: 24px;
  color: white;
  width: 600px;
  display: inline-block;
}
#luckdraw .right .title {
  height: 58px;
  font-size: 22px;
  line-height: 58px;
  padding: 10px 8px;
  background-size: 100%;
  background: url(../assets/title-bg.png) no-repeat;
}
#luckdraw .right .title .icon-title {
  margin-left: 80px;
  background: url(../assets/sprite.png) -36px 0 no-repeat;
  width: 28px;
  height: 28px;
  transform: scale(0.7);
  margin-right: 5px;
  display: inline-block;
  vertical-align: middle;
}
#luckdraw .right .title .resultNum {
  position: absolute;
  display: inline-block;
  margin-left: 175px;
}
#luckdraw .right .title .icon-more {
  width: 28px;
  height: 28px;
  background: url(../assets/sprite.png) -4pc 0 no-repeat;
  position: absolute;
  height: 28px;
  right: 15px;
  top: 22px;
  cursor: pointer;
}
#luckdraw .right .result {
  height: 360px;
  overflow: auto;
}
#luckdraw .right .level {
  position: relative;
}
#luckdraw .right .level:before,
#luckdraw .right .level:after {
  content: "";
  display: block;
  height: 100px;
  background-size: 100% 100%;
  /* background-image: url(../assets/border-t2.png) center no-repeat; */
}
#luckdraw .right .level:before {
  height: 88px;
  background-image: url(../assets/border-t2.png);
}

#luckdraw .right .level:after {
  height: 56px;
  background-image: url(../assets/border-b2.png);
}
#luckdraw .result label {
  position: absolute;
  top: 17px;
  left: 0;
  right: 0;
  margin: auto;
  color: #fff922;
  text-align: center;
  text-shadow: 0 3px 5px #df8bff;
}

#luckdraw .result ul {
  font-size: 16px;
  margin: -10px 10px -50px 10px;
}
#luckdraw .result ul:after {
  content: "";
  display: block;
  clear: both;
  width: 100%;
  height: 0;
}
#luckdraw .result li {
  width: 100px;
  float: left;
  text-align: center;
  margin-bottom: 10px;
  margin-left: 8px;
  position: relative;
  height: 120px;
}
#luckdraw .result li a {
  position: absolute;
  background: url(../assets/delete.png);
  width: 25px;
  height: 25px;
  right: 2px;
  top: -10px;
  display: none;
}
#luckdraw .result li img {
  display: block;
  width: 75px;
  height: 75px;
  border: 2px solid hsla(0, 0%, 100%, 0.5);
  background-clip: padding-box;
  border-radius: 100%;
  margin: auto;
  margin-bottom: 10px;
}
#luckdraw .right .btn-box {
  margin-top: 20px;
  text-align: center;
}
#luckdraw .right .btn-box a {
  text-decoration: none;
  color: #fff;
  background: #ef3b39;
  margin: 0 10px;
  display: inline-block;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 20px;
}
@media screen and (max-width: 1024px) {
  #luckdraw {
    max-width: 960px;
    margin: 0 auto;
    top: 120px;
    padding: 8px;
  }
  #luckdraw .left {
    width: 500px;
  }
  #luckdraw .left .title {
    font-size: 20px;
    line-height: 26px;
    width: 450px;
    background-size: 100%;
    height: 36px;
    padding: 5px 4px;
  }
  #luckdraw .left .title .icon-title {
    width: 28px;
    height: 28px;
    top: -2px;
    vertical-align: middle;
    background: url(../assets/sprite.png) 0 0 no-repeat;
    transform: scale(0.7);
  }
  #luckdraw .left .userList {
    height: 220px;
    margin-left: 10px;
    margin-top: 15px;
  }
  #luckdraw .left .luck {
    width: 220px;
    height: 220px;
    left: 111px;
    top: 25px;
  }
  #luckdraw .luck:before {
    content: "";
    width: 220px;
    height: 220px;
    background-size: 100% 100%;
  }
  #luckdraw .left .luck_user {
    width: 440px;
    margin: 15px 0;
  }
  #luckdraw .luck_user li {
    width: 140px;
    height: 200px;
    font-size: 16px;
  }
  #luckdraw .luck_user li img {
    width: 140px;
    height: 140px;
    margin-bottom: 20px;
    border-radius: 100%;
  }
  #luckdraw .left .condition {
    font-size: 16px;
  }
  #luckdraw .left .condition .select > div {
    display: inline-block;
    width: 160px;
    /* margin-left: 40px; */
  }
  #luckdraw .left .condition select {
    border-radius: 5px;
    opacity: 0.6;
    height: 28px;
    width: 100px;
  }
  /* #luckdraw .left .condition select option{
  opacity: 0.6;
} */
  #luckdraw .left .prize {
    margin-left: 60px;
  }
  #luckdraw .left .num select {
    width: 80px;
  }
  #luckdraw .left .btn-box {
    margin-top: 50px;
  }
  #luckdraw .left .btn-box button {
    padding: 16px 30px;
    height: 28px;
    line-height: 2px;
    font-size: 22px;
    margin-top: 10px;
  }
  #luckdraw .right {
    font-size: 20px;
    width: 450px;
  }
  #luckdraw .right .title {
    height: 36px;
    font-size: 20px;
    line-height: 26px;
    padding: 5px 4px;
    background-size: 100%;
  }
  #luckdraw .right .title .icon-title {
    margin-left: 10px;
  }
  #luckdraw .right .title .resultNum {
    margin-left: 135px;
  }
  #luckdraw .right .title .icon-more {
    height: 28px;
    right: 15px;
    top: 5px;
  }
  #luckdraw .right .result {
    margin-bottom: 30px;
    height: 320px;
    overflow: auto;
  }
  #luckdraw .right .level:before,
  #luckdraw .right .level:after {
    height: 100px;
  }
  #luckdraw .right .level:before {
    height: 88px;
    background-image: url(../assets/border-t2.png);
  }

  #luckdraw .right .level:after {
    height: 56px;
    background-image: url(../assets/border-b2.png);
  }
  #luckdraw .result label {
    position: absolute;
    top: 17px;
    left: 0;
    right: 0;
    margin: auto;
    color: #fff922;
    text-align: center;
    text-shadow: 0 3px 5px #df8bff;
  }

  #luckdraw .result ul {
    font-size: 16px;
    margin: -10px 10px -50px 10px;
  }
  #luckdraw .result ul:after {
    content: "";
    display: block;
    clear: both;
    width: 100%;
    height: 0;
  }
  #luckdraw .result li {
    width: 100px;
    float: left;
    text-align: center;
    margin-left: 2px;
    margin-bottom: 10px;
    position: relative;
    height: 120px;
  }
  #luckdraw .result li a {
    position: absolute;
    background: url(../assets/delete.png);
    width: 25px;
    height: 25px;
    right: 2px;
    top: -10px;
    display: none;
  }
  #luckdraw .result li img {
    display: block;
    width: 75px;
    height: 75px;
    border: 2px solid hsla(0, 0%, 100%, 0.5);
    background-clip: padding-box;
    border-radius: 100%;
    margin: auto;
    margin-bottom: 10px;
  }
  #luckdraw .right .btn-box {
    text-align: center;
  }
  #luckdraw .right .btn-box a {
    text-decoration: none;
    color: #fff;
    background: #ef3b39;
    margin: 0 10px;
    display: inline-block;
    border-radius: 5px;
    padding: 5px 15px;
    font-size: 20px;
  }
}
</style>