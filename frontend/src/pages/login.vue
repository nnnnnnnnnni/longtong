<template>
  <div class="login">
    <img class="login-img" :src="imgSrc" />
    <div class="login-container">
      <div class="login-form">
        <div class="platform-swiper" :class="{'pc': platformType == 0, 'qr': platformType == 1}" @click="changePlatform">
          <div class="_platform-swiper"></div>
        </div>
        <div class="login-form-container">
          <div class="form-title">登录笼统</div>
          <div class="form-tabs">
            <div class="form-tabs-item" :class="{'active': loginType == 0}" @click="changeLogin(0)">手机</div>
            <div class="form-tabs-item" :class="{'active': loginType == 1}" @click="changeLogin(1)">邮箱</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from '../lib/utils'
export default {
  name: "login",
  data() {
    return {
      imgSrc: "https://www.bing.com/th?id=OHR.Schrecksee_ZH-CN8548752524_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
      platformType: 1,
      loginType: 0,
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    changePlatform: function(){
      this.platformType = (this.platformType +1 ) % 2;
    },
    changeLogin: function(type){
      this.loginType = type;
    }
  },
};
</script>


<style scoped>
.login {
  height: 100%;
  width: 100%;
  display: flex;
}
.login .login-img {
  display: block;
  height: 100%;
  width: 40%;
}
.login .login-container {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login .login-form {
  width: 370px;
  height: 500px;
  padding: 25px 40px;
  box-shadow: 0 4px 14px 0 rgba(206, 207, 209, 0.28);
  border-radius: 12px;
  position: relative;
}
.platform-swiper{
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  border-top-right-radius: 12px;
  background-color: #69c0ff;
  transition: background-color 0.3s;
  background-size: 70%;
  background-position: 80% 20%;
  background-repeat: no-repeat;
  cursor: pointer;
}
.qr{
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PHBhdGggZD0iTTYuNjY3IDE4LjMzM2gxMS42NjZWNi42NjdINi42Njd2MTEuNjY2ek01IDMuMzMzaDE1Yy45MiAwIDEuNjY3Ljc0NyAxLjY2NyAxLjY2N3YxNWMwIC45Mi0uNzQ3IDEuNjY3LTEuNjY3IDEuNjY3SDVjLS45MiAwLTEuNjY3LS43NDctMS42NjctMS42NjdWNWMwLS45Mi43NDctMS42NjcgMS42NjctMS42Njd6TTEwIDEwaDV2NWgtNXYtNXpNNi42NjcgMjguMzMzdjVoNXYtNWgtNXpNNSAyNWg4LjMzM2MuOTIgMCAxLjY2Ny43NDYgMS42NjcgMS42NjdWMzVjMCAuOTItLjc0NiAxLjY2Ny0xLjY2NyAxLjY2N0g1Yy0uOTIgMC0xLjY2Ny0uNzQ3LTEuNjY3LTEuNjY3di04LjMzM0MzLjMzMyAyNS43NDcgNC4wOCAyNSA1IDI1ek0yOC4zMzMgNi42Njd2NWg1di01aC01em0tMS42NjYtMy4zMzRIMzVjLjkyIDAgMS42NjcuNzQ3IDEuNjY3IDEuNjY3djguMzMzYzAgLjkyLS43NDcgMS42NjctMS42NjcgMS42NjdoLTguMzMzYy0uOTIgMC0xLjY2Ny0uNzQ2LTEuNjY3LTEuNjY3VjVjMC0uOTIuNzQ2LTEuNjY3IDEuNjY3LTEuNjY3em0xLjY2NiAyNXY1aDV2LTVoLTV6TTI2LjY2NyAyNUgzNWMuOTIgMCAxLjY2Ny43NDYgMS42NjcgMS42NjdWMzVjMCAuOTItLjc0NyAxLjY2Ny0xLjY2NyAxLjY2N2gtOC4zMzNDMjUuNzQ3IDM2LjY2NyAyNSAzNS45MiAyNSAzNXYtOC4zMzNjMC0uOTIuNzQ2LTEuNjY3IDEuNjY3LTEuNjY3em0tOC4zMzQgMGgzLjMzNHYzLjMzM2gtMy4zMzRWMjV6bTAgNS44MzNoMy4zMzR2NS44MzRoLTMuMzM0di01LjgzNHpNMjUgMTguMzMzaDMuMzMzdjMuMzM0SDI1di0zLjMzNHptNS44MzMgMGg1LjgzNHYzLjMzNGgtNS44MzR2LTMuMzM0eiIgZmlsbD0iI0ZGRiIvPjwvZz48L3N2Zz4=);
}
.pc{
  background-size: 60%;
  background-position: 70% 30%;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNCIgaGVpZ2h0PSIzMiI+PHBhdGggZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjYgMjl2M0g5di0zaDE3em02LjM4MS0yOUMzMy4yNzUgMCAzNCAuNzI4IDM0IDEuNjI1djIyLjc1YzAgLjg5Ny0uNzI1IDEuNjI1LTEuNjE5IDEuNjI1SDEuNjE5QTEuNjIyIDEuNjIyIDAgMDEwIDI0LjM3NVYxLjYyNUMwIC43MjguNzI1IDAgMS42MTkgMGgzMC43NjJ6bS0xLjYyIDIwSDMuMjM4djIuNzVoMjcuNTI0TDMwLjc2IDIwem0wLTE2Ljc1SDMuMjM5VjE3aDI3LjUyM1YzLjI1eiIvPjwvc3ZnPg==);
}
.platform-swiper:hover{
  background-color: #1890ff;
}
._platform-swiper{
  pointer-events: none;
  width: 85px;
  height: 85px;
  position: absolute;
  left: -42px;
  top: 18px;
  background-color: #ffffff;
  transform: rotate(45deg);
  cursor: default;
}
.login-form-container .form-title{
  font-weight: bold;
  font-size: 24px;
  color: #333;
  margin: 10px 0px;
}
.login-form-container .form-tabs{
  margin-top: 20px;
  position: relative;
  display: flex;
}
.login-form-container .form-tabs .form-tabs-item{
  cursor: pointer;
  font-size: 16px;
  margin-right: 20px;
  height: 30px;
  line-height: 30px;
  user-select: none;
}
.active{
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}
</style>