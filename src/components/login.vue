<template>
  <div id="login">
      <div class="login">
    <input type="text" v-model="param.user_name"><br>
    <input type="text" v-model="param.password"><br>
    <button @click="login()">登陆</button>
    </div>
  </div>
</template>
<script>
import axios from "../axios-auth";
import { mapMutations } from 'vuex';
import qs from "qs";

export default {
  name: "login",
  data() {
    return {
      param: {
        user_name: "test",
        password: "17dc93eeb4c83c8eba331bb47ac03920"
      },
      userToken:""
    };
  },
  created(){
      var a =this.$store.state.count;
      
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    login() {
      let _this = this; 
      if (this.param.user_name === "" || this.param.password === "") { 
        alert("账号或密码不能为空");
      } else {
        axios.post("/pc_api/offline_activities/login",qs.stringify(this.param))
          .then(res => {
            console.log(res.data);
            _this.userToken = "Bearer " + res.data.data.token;
            // 将用户token保存到vuex中
            _this.changeLogin({ Authorization: _this.userToken });
            _this.$router.push("/home");
            alert("登陆成功");
            console.log(this.$store.state.Authorization)
          })
          .catch(error => {
            alert("账号或密码错误");
            console.log(error);
          });
      }
    }
  }
};
</script>
<style scoped>
#login{
    width: 760px;
    margin: 0 auto;
    position: relative;
    top:300px;
}
#login .login{
    text-align: center;
    box-shadow: 0 0 8px hsla(0, 0%, 100%, 0.5);
}
#login input{
    width: 220px;
    height: 30px;
    margin-top: 20px;
}
#login button{
    width: 180px;
    height: 40px;
    margin-top: 50px;
    margin-bottom: 20px;
    font-size: 20px;
    background-color: red;
}

</style>

