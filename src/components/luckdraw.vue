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
              <!-- <img :src="'http://www.zdsapi.com/'+list.img"> -->
              <img :src="'http://106.14.94.6:1109/'+list.img">
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
            <select v-model="luck_num">
              <option :value="se.value" v-for="(se,index) in luck_nums" :key="index">{{se.text}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <button @click="starMove" v-if="luckState==1">开始抽奖</button>
        <button style="background:#eee" v-if="luckState==2">停止抽奖</button>
        <button @click="stopLuck" v-if="luckState==3">停止抽奖</button>
      </div>
    </div>
    <div class="right">
      <div class="title">
        <i class="icon icon-title"></i>中奖名单
        <div class="resultNum">
          获奖人数:
          <span id="luckNumber">{{lottery_num}}</span>
        </div>
        <i class="icon icon-more"></i>
      </div>
      <div id="luckUl" class="result">
        <div class="level" v-for="(list,index) in lucked" :key="index">
          <label>{{list.award_name}}</label>
          <ul class="luckUl">
            <li v-for="(lists,index) in lucked[index].users" :key="index">
              <a @click="del(lists.lottery_id)"></a>
              
              <!-- <img :src="'http://www.zdsapi.com/'+lists.img" alt> -->
              <img :src="'http://106.14.94.6:1109/'+lists.img" alt>
              <span>{{lists.user_name}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="btn-box">
        <a class="btn reclick" @click="again">重新抽奖</a>
        <router-link to="/lucked" exact>获奖名单</router-link>
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
      luckState: 1, //抽奖状态1.开始抽奖2.不可选取3.停止抽奖
      beginTimer: null,
      liWidth: null, //每个头像的宽度
      liNum: null, //签到的人数
      options: [
        { value: 1, text: "特等奖" },
        { value: 2, text: "一等奖" },
        { value: 3, text: "二等奖" },
        { value: 4, text: "三等奖" },
        { value: 5, text: "纪念奖" }
      ],
      selecteds: "", //获取下拉框选项
      userList: "",
      signed: [], //签到名单
      lucked: "", //获取中奖名单
      num: "", //中奖索引
      re_luck: {
        //获取中奖ID然后删除
        lottery_id: ""
      },
      begin_luck: {
        //传入抽奖的种类
        award_id: "",
        num: "1"
      },
      id: "", //中奖人的id
      luck_nums: [
        //下拉框人数
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
        { value: 6, text: "6" },
        { value: 10, text: "10" }
      ],
      luck_num: "", //获取下拉框的人数
      lottery_num: 0, //中奖人总数
      award: "" //奖品信息
    };
  },
  created() {
    this.selecteds = this.options[0].value;
    this.luck_num = this.luck_nums[0].value;

    this.axios //获取签单名单
      .get("/pc_api/offline_activities/sign_in")
      .then(data => {
        return data.data.data;
      })
      .then(data => {
        this.signed = data.users;
        this.liNum = this.signed.length;
      });
    this.axios //获取中奖名单
      .get("/pc_api/offline_activities/lottery")
      .then(data => {
        return data.data.data;
      })
      .then(data => {
        this.lottery_num = 0;
        for (let i = 0; i < data.length; i++) {
          this.lottery_num = this.lottery_num + data[i].users.length;
        }
        this.lucked = data;
        console.log(this.lucked)
      });
    this.axios //获取奖品信息
      .get("/pc_api/offline_activities/award")
      .then(data => {
        this.award = data.data.data;
        console.log(this.award);
      });
  },
  mounted() {
    let oUl = this.$refs.oUl;
    if (window.innerWidth <= 1024) {
      //根据窗口宽度调整头像宽度
      this.liWidth = 140;
      oUl.style.left = 140 + "px";
    } else {
      this.liWidth = 190;
      oUl.style.left = 190 + "px";
    }
  },
  methods: {
    starMove: function() {
      var num = this.luck_num;
      if (num == 1) {
        this.move();
      } else {
        if (
          (this.selecteds == 1 && num + this.lucked[0].users.length > this.award[0].number) ||
          (this.selecteds == 2 && num + this.lucked[1].users.length > this.award[1].number) ||
          (this.selecteds == 3 && num + this.lucked[2].users.length > this.award[2].number) ||
          (this.selecteds == 4 && num + this.lucked[3].users.length > this.award[3].number) ||
          (this.selecteds == 5 && num + this.lucked[4].users.length > this.award[4].number) 
        ) {
          alert("奖品不足！");
          return;
        }
        this.move();
        this.generatorPromise(num).then(res1 => {
          this.move();
          if (res1 == 0) return;
          this.generatorPromise(res1).then(res2 => {
            if (res2 == 0) return;
            this.move();
            this.generatorPromise(res2).then(res3 => {
              if (res3 == 0) return;
              this.move();
              this.generatorPromise(res3).then(res4 => {
                if (res4 == 0) return;
                this.move();
                this.generatorPromise(res4).then(res5 => {
                  if (res5 == 0) return;
                  this.move();
                  this.generatorPromise(res5).then(res6 => {
                    if (res6 == 0) return;
                    this.move();
                    this.generatorPromise(res6).then(res7 => {
                      if (res7 == 0) return;
                      this.move();
                      this.generatorPromise(res7).then(res8 => {
                        if (res8 == 0) return;
                        this.move();
                        this.generatorPromise(res8).then(res9 => {
                          if (res9 == 0) return;
                          this.move();
                          this.generatorPromise(res9).then(res10 => {
                            if (res10 == 0) return;
                            this.move();
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      }
    },
    generatorPromise: function(num) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          this.stopLuck();
          setTimeout(() => {
            num--;
            res(num);
          }, 1000);
        }, 3000);
      });
    },
    move: function() {
      var oUl = this.$refs.oUl; //获取抽奖区节点
      var liWidth = this.liWidth; //抽奖池图片的宽度
      var liNum = this.liNum; //抽奖池人数
      var speed = 50; //抽奖速度
      this.begin_luck.award_id = this.selecteds;
      clearInterval(this.beginTimer);
      if (this.selecteds == 1 && this.lucked[0].users.length == this.award[0].number) {
        alert("奖品数量不足！");
        return;
      } else if (this.selecteds == 2 && this.lucked[1].users.length == this.award[1].number) {
        alert("奖品数量不足！");
        return;
      } else if (this.selecteds == 3 && this.lucked[2].users.length == this.award[2].number) {
        alert("奖品数量不足！");
        return;
      }else if (this.selecteds == 4 && this.lucked[3].users.length == this.award[3].number) {
        alert("奖品数量不足！");
        return;
      }else if (this.selecteds == 5 && this.lucked[4].users.length == this.award[4].number) {
        alert("奖品数量不足！");
        return;
      } else {
        this.axios //抽奖
          .get(
            "/pc_api/offline_activities/prize_draw?" +
              qs.stringify(this.begin_luck)
          )
          .then(data => {
            let lucks = data.data.data;
            this.id = lucks[0].id;
          });
        this.beginTimer = setInterval(function() {
          if (oUl.offsetLeft <= -liWidth * (liNum - 1)) {
            oUl.style.left = liWidth + "px";
          }
          oUl.style.left = oUl.offsetLeft - speed + "px";
        }, 10);
        this.luckState = 2; //抽奖状态
        setTimeout(() => {
          this.luckState = 3;
        }, 1000);
      }
    },
    stopLuck: function() {
      let oUl = this.$refs.oUl; //获取抽奖区节点
      let liWidth = this.liWidth; //抽奖池图片的宽度
      let selected = this.selecteds; //获取下拉框节点
      let liNum = this.liNum;

      clearInterval(this.beginTimer);

      for (let i = 0; i < this.signed.length; i++) {
        this.signed[i].index = i;
        if (this.signed[i].id == this.id) {
          if (this.signed[i].index == 0) {
            oUl.style.left = liWidth + "px";
          } else {
            oUl.style.left = -liWidth * (this.signed[i].index - 1) + "px";
          }
        }
      }
      //获取中奖名单
      this.axios
        .get("/pc_api/offline_activities/lottery")
        .then(data => {
          return data.data.data;
        })
        .then(data => {
          console.log(data);
          this.lottery_num = 0;
          for (let i = 0; i < data.length; i++) {
            this.lottery_num = this.lottery_num + data[i].users.length;
          }
          this.lucked = data;
        });
      this.luckState = 1;
    },
    again: function() {
      //清除所有中奖名单
      this.axios //获取中奖名单
        .get("/pc_api/offline_activities/lottery")
        .then(data => {
          return data.data.data;
        })
        .then(data => {
          this.re_luck.lottery_id = "";
          for (let i = 0; i < this.lucked.length; i++) {
            for (let j = 0; j < this.lucked[i].users.length; j++) {
              this.re_luck.lottery_id =
                this.re_luck.lottery_id +
                "," +
                this.lucked[i].users[j].lottery_id;
            }
          }
          this.re_luck.lottery_id = this.re_luck.lottery_id.slice(1);
          this.axios //删除中奖名单（多个）
            .delete("/pc_api/offline_activities/lottery", {
              data: this.re_luck
            })
            .then(data => {
              this.axios
                .get("/pc_api/offline_activities/lottery")
                .then(data => {
                  return data.data.data;
                })
                .then(data => {
                  this.lottery_num = 0;
                  this.lucked = data;
                });
            });
        });
    },
    del: function(id) {
      this.re_luck.lottery_id = "";
      this.re_luck.lottery_id = "" + id;
      this.axios //删除中奖名单（一个）
        .delete("/pc_api/offline_activities/lottery", {
          data: this.re_luck
        })
        .then(data => {
          this.axios
            .get("/pc_api/offline_activities/lottery")
            .then(data => {
              return data.data.data;
            })
            .then(data => {
              this.lottery_num = 0;
              for (let i = 0; i < data.length; i++) {
                this.lottery_num = this.lottery_num + data[i].users.length;
              }
              this.lucked = data;
            });
        });
    }
  }
};
</script>

<style >
#luckdraw {
  display: flex;
  position: absolute;
  max-width: 1200px;
  top: 200px;
  box-sizing: border-box;
  box-shadow: 0 0 8px hsla(0, 0%, 100%, 0.5);
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
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
  background: rgba(0, 0, 0, 0.5);
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
#luckdraw .result li:hover a {
  display: block;
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
    top: 115px;
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
    margin-left: 60px;
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
    margin-left: 173px;
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