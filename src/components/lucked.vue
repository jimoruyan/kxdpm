<template>
  <div id="luckdraw">
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
          <label>
            {{list.award_name}}
            <a></a>
          </label>
          <ul class="luckUl">
            <li v-for="(lists,index) in lucked[index].users" :key="index">
              <img :src="'http://www.zdsapi.com/'+lists.img">
              <!-- <img :src="'http://www.zdsapi.com/'+lists.img"> -->
              <span>{{lists.user_name}}</span>
            </li>
          </ul>
        </div>
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
      lucked: "", //获取中奖名单
      lottery_num: 0
    };
  },
  created() {
    this.axios
      .get("/pc_api/offline_activities/lottery")
      .then(function(data) {
        return data.data.data;
      })
      .then(data => {
        this.lottery_num = 0;
        for (let i = 0; i < data.length; i++) {
          this.lottery_num = this.lottery_num + data[i].users.length;
        }
        this.lucked = data;
      });
  }
};
</script>

<style scoped>
#luckdraw {
  position: sticky;
  max-width: 1200px;
  margin: 60px auto;
  box-sizing: border-box;
  box-shadow: 0 0 8px hsla(0, 0%, 100%, 0.5);
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
}
#luckdraw .rigth {
  box-sizing: border-box;
  position: relative;
  font-size: 24px;
  color: white;
  margin: 0 auto;
  width: 960px;
  display: inline-block;
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
#luckdraw .right {
  box-sizing: border-box;
  position: relative;
  font-size: 24px;
  color: white;
  margin: 0 auto;
  width: 960px;
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
  height: 500px;
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
@media screen and (max-width: 1024px) {
  #luckdraw .right .result {
    height: 350px;
    margin-bottom: 0;
  }
  #luckdraw {
    margin: 5px auto;
  }
}
</style>