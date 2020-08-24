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
          <div class="form-input">
            <div class="form-input-item">
              <lt-input placeholder='请输入手机号' v-model="phoneNumber" @input="changePhoneInput()" :status='loginStatus'>
                <template slot="pre"></template>
                <template slot="extra">
                  <span class="tipCode" :class="{'tip_active': loginStatus == 1 }" @click="sendPhoneCode(10)">{{tipCode}}</span>
                </template>
              </lt-input>
            </div>
            <div class="form-input-item">
              <lt-input placeholder='请输入验证码' v-model="codeNumber">
                <template slot="pre"></template>
                <template slot="extra"></template>
              </lt-input>
            </div>
            <div class="form-input-item">
              <lt-button title="确定" :loading='buttonLoading'></lt-button>
            </div>
          </div>
        </div>
        <div class="third-platform">
          <div class="third-platform-item">
            <svg t="1598255401606" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2109" width="200" height="200"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#15C434" p-id="2110"></path><path d="M825.804 582.368c0-89.149-85.233-161.42-190.375-161.42-105.141 0-190.375 72.271-190.375 161.42 0 89.15 85.234 161.42 190.375 161.42 22.077 0 43.27-3.196 62.986-9.057 5.626-1.672 62.218 38.114 65.089 35.691s-25.78-51.72-18.917-55.8c49.106-29.191 81.217-77.541 81.217-132.254zM575.95 559.207c-14.723 0-26.658-11.938-26.658-26.662 0-14.723 11.936-26.658 26.658-26.658 14.724 0 26.658 11.936 26.658 26.658 0 14.724-11.934 26.662-26.658 26.662z m124.025 0c-14.723 0-26.658-11.938-26.658-26.662 0-14.723 11.936-26.658 26.658-26.658 14.724 0 26.659 11.936 26.659 26.658 0 14.724-11.936 26.662-26.659 26.662z m0 0" fill="#FFFFFF" p-id="2111"></path><path d="M422.978 252.292c-124.531 0-225.481 85.883-225.481 191.821 0 27.123 6.621 52.928 18.559 76.314C232.757 516.279 250.956 514 270 514c81.186 0 147 41.414 147 92.5 0 10.162-2.612 19.938-7.423 29.085 4.435 0.222 8.9 0.348 13.401 0.348 5.83 0 11.61-0.187 17.327-0.556-6.309-16.715-9.73-34.521-9.73-53.009 0.004-95.927 91.717-173.693 204.854-173.693 3.09 0 6.159 0.067 9.215 0.184-19.46-89.099-111.297-156.567-221.666-156.567z m-77.09 161.42c-18.392 0-33.299-14.908-33.299-33.299 0-18.388 14.908-33.296 33.299-33.296 18.387 0 33.295 14.908 33.295 33.296 0 18.391-14.908 33.299-33.295 33.299z m154.904 0c-18.388 0-33.296-14.908-33.296-33.299 0-18.388 14.908-33.296 33.296-33.296 18.391 0 33.298 14.908 33.298 33.296 0 18.391-14.907 33.299-33.298 33.299z" fill="#FFFFFF" p-id="2112"></path><path d="M270 514c-19.044 0-37.243 2.279-53.944 6.427 15.305 29.982 39.35 55.989 69.399 75.694 8.851 5.804-29.853 61.271-22.529 66.45s67.883-43.248 74.597-40.906c22.437 7.824 46.68 12.652 72.053 13.92 4.811-9.146 7.423-18.923 7.423-29.085C417 555.414 351.186 514 270 514z" fill="#FFFFFF" opacity=".4" p-id="2113"></path></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ltInput from '../components/common/input'
import ltButton from '../components/common/button'
import * as utils from '../lib/utils'
export default {
  name: "login",
  data() {
    return {
      imgSrc: "https://www.bing.com/th?id=OHR.Schrecksee_ZH-CN8548752524_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
      platformType: 1,
      loginType: 0,
      tipCode: '点击发送',
      phoneNumber: '',
      codeNumber: '',
      loginStatus: 0,
      buttonLoading: false,
      timer: null
    };
  },
  components: {
    ltInput, ltButton
  },
  created() {
  },
  mounted() {},
  methods: {
    /**
     * 描述 切换登录平台方式
     * @date 2020-08-24
     * @returns {any}
     */
    changePlatform: function(){
      this.platformType = (this.platformType +1 ) % 2;
    },
    /**
     * 描述 切换登录方式
     * @date 2020-08-24
     * @param {any} type 0 手机，1 邮箱
     * @returns {any}
     */
    changeLogin: function(type){
      this.loginType = type;
    },
    
    /**
     * 描述 校验手机号合法
     * @date 2020-08-24
     * @param {any} e input的值
     * @returns {any}
     */
    changePhoneInput: function(e){
      if(this.timer != null){
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(()=>{
        this.loginStatus = utils.isPhoneNumber(this.phoneNumber) ? 1 : 2
      }, 500)
    },

    /**
     * 描述 发送验证码后，发送按钮冷却
     * @date 2020-08-24
     * @param {any} loading: 冷却时间(秒)
     * @returns {any}
     */
    sendPhoneCode: function(loading){
      if(loading == 0){
        this.tipCode = '点击发送'
        this.loginStatus = 1
      } else{
        setTimeout(()=>{
          this.tipCode= loading + 's 后重试';
          this.loginStatus = 0;
          this.sendPhoneCode(loading -1)
        }, 1000)
      }
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
.form-input{
  margin-top: 20px;
}
.form-input .form-input-item{
  margin: 20px 0px;
}
.form-input .tipCode{
  color: #8c8c8c;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
}
.third-platform{
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.third-platform .third-platform-item{
  height: 40px;
  width: 40px;
  height: inherit;
  justify-content: center;
}
.third-platform .third-platform-item svg{
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s;
}
.third-platform .third-platform-item svg:hover{
  filter: drop-shadow(0 0 5px );
}
.tip_active{
  color: #1890ff !important;
}
.active{
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}
</style>