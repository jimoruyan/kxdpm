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
          <ul>
            <li>
              <img src="../assets/me.jpg" alt>
            </li>
            <li>
              <img src="../assets/me.jpg" alt>
            </li>
            <li>
              <img src="../assets/me.jpg" alt>
            </li>
            <!-- <li>
              <img src="../assets/me.jpg" alt>
            </li>
            <li>
              <img src="../assets/me.jpg" alt>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="condition">
        <div class="select">
          <div class="prize">
            奖项：
            <select name id>
              <option value>一等奖</option>
              <option value>二等奖</option>
              <option value>三等奖</option>
            </select>
          </div>
          <div class="num">
            人数：
            <select name id>
              <option value>1</option>
              <option value>2</option>
              <option value>3</option>
            </select>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <button>开始抽奖</button>
        <button style="display:none">停止抽奖</button>
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
        <div id="level_18795" class="level">
          <label>
            一等奖：
            <a>10</a>
          </label>
          <ul>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzs63NK72yyXZ-xqqRj8ghZWc.jpg"
              >
              <span>夜空星语</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
          </ul>
        </div>
        <!-- <div id="level_18795" class="level">
          <label>
            一等奖：
            <a>10</a>
          </label>
          <ul>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzs63NK72yyXZ-xqqRj8ghZWc.jpg"
              >
              <span>夜空星语</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
            <li class="submited" data-hasluck="1" data-level="18795">
              <img
                onerror="imgError(this);"
                src="http://file.kxdpm.com/FansAvatar/201901/Weixin_gh_d1585d3fbecb/otKnzsyBJsxyokVhqptaY1PTburs.jpg"
              >
              <span>川农村夫</span>
            </li>
          </ul>
        </div> -->
      </div>
      
      <div class="btn-box">
        <a class="btn reclick" id="removeLottery">重新抽奖</a>
        <a class="btn submitUser" id="submitLottery">确认名单</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "luckdraw"
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
  position: relative;
  display: inline-block;
}
#luckdraw .left .title {
  font-size: 24px;
  color: white;
  line-height: 58px;
  width: 600px;
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
  width: 100%;
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
  width: 560px;
  display: inline-block;
}
#luckdraw .right .title {
  height: 58px;
  font-size: 22px;
  line-height: 58px;
  padding: 9px 0;
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
  height: 45px;
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
@media screen and (max-width: 1024px) {
 #luckdraw {
  max-width: 960px;
  margin: 0 auto;
  top: 120px;
  padding: 8px;
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
  height: 58px;
  font-size: 22px;
  line-height: 58px;
  padding: 9px 0;
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
  height: 45px;
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