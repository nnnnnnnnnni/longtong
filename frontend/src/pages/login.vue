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
            <div class="form-input-item" v-if="loginType == 0">
              <lt-input placeholder='请输入手机号' v-model="accountNumber" @input="checkInput()" :status='loginStatus'>
                <template slot="pre"></template>
                <template slot="extra">
                  <span class="tipCode" :class="{'tip_active': loginStatus == 1 || loginStatus == 3}" @click="sendPhoneCode(10)">{{tipCode}}</span>
                </template>
              </lt-input>
            </div>
            <div class="form-input-item" v-else>
              <lt-input placeholder='请输入邮箱' v-model="accountNumber" @input="checkInput()" :status='loginStatus'>
                <template slot="pre"></template>
                <template slot="extra">
                  <span class="tipCode" :class="{'tip_active': loginStatus == 1 || loginStatus == 3}" @click="sendPhoneCode(10)">{{tipCode}}</span>
                </template>
              </lt-input>
            </div>
            <div class="form-input-item">
              <lt-input placeholder='请输入验证码' v-model="codeNumber">
                <template slot="pre"></template>
                <template slot="extra"></template>
              </lt-input>
            </div>
            <div class="form-input-item item-button">
              <lt-button circle='true' title="确定" :loading='buttonLoading'></lt-button>
            </div>
          </div>
        </div>
        <div class="third-platform">
          <div class="third-platform-item">
            <svg t="1598255401606" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2109" width="200" height="200"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#15C434" p-id="2110"></path><path d="M825.804 582.368c0-89.149-85.233-161.42-190.375-161.42-105.141 0-190.375 72.271-190.375 161.42 0 89.15 85.234 161.42 190.375 161.42 22.077 0 43.27-3.196 62.986-9.057 5.626-1.672 62.218 38.114 65.089 35.691s-25.78-51.72-18.917-55.8c49.106-29.191 81.217-77.541 81.217-132.254zM575.95 559.207c-14.723 0-26.658-11.938-26.658-26.662 0-14.723 11.936-26.658 26.658-26.658 14.724 0 26.658 11.936 26.658 26.658 0 14.724-11.934 26.662-26.658 26.662z m124.025 0c-14.723 0-26.658-11.938-26.658-26.662 0-14.723 11.936-26.658 26.658-26.658 14.724 0 26.659 11.936 26.659 26.658 0 14.724-11.936 26.662-26.659 26.662z m0 0" fill="#FFFFFF" p-id="2111"></path><path d="M422.978 252.292c-124.531 0-225.481 85.883-225.481 191.821 0 27.123 6.621 52.928 18.559 76.314C232.757 516.279 250.956 514 270 514c81.186 0 147 41.414 147 92.5 0 10.162-2.612 19.938-7.423 29.085 4.435 0.222 8.9 0.348 13.401 0.348 5.83 0 11.61-0.187 17.327-0.556-6.309-16.715-9.73-34.521-9.73-53.009 0.004-95.927 91.717-173.693 204.854-173.693 3.09 0 6.159 0.067 9.215 0.184-19.46-89.099-111.297-156.567-221.666-156.567z m-77.09 161.42c-18.392 0-33.299-14.908-33.299-33.299 0-18.388 14.908-33.296 33.299-33.296 18.387 0 33.295 14.908 33.295 33.296 0 18.391-14.908 33.299-33.295 33.299z m154.904 0c-18.388 0-33.296-14.908-33.296-33.299 0-18.388 14.908-33.296 33.296-33.296 18.391 0 33.298 14.908 33.298 33.296 0 18.391-14.907 33.299-33.298 33.299z" fill="#FFFFFF" p-id="2112"></path><path d="M270 514c-19.044 0-37.243 2.279-53.944 6.427 15.305 29.982 39.35 55.989 69.399 75.694 8.851 5.804-29.853 61.271-22.529 66.45s67.883-43.248 74.597-40.906c22.437 7.824 46.68 12.652 72.053 13.92 4.811-9.146 7.423-18.923 7.423-29.085C417 555.414 351.186 514 270 514z" fill="#FFFFFF" opacity=".4" p-id="2113"></path></svg>
          </div>
        </div>
        <div class="qr-container" v-if="showQrCode">
          <div class="qr-img">
            <img :src="qrImg" alt="">
            <span> 请使用 “笼统” 小程序扫码登陆</span>
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
      accountNumber: '',
      codeNumber: '',
      loginStatus: 0,
      buttonLoading: false,
      timer: null,
      showQrCode: false,
      qrImg: 'data:image/png;base64,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'
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
      this.showQrCode = (this.platformType +1 ) % 2 == 1;
    },
    /**
     * 描述 切换登录方式
     * @date 2020-08-24
     * @param {any} type 0 手机，1 邮箱
     * @returns {any}
     */
    changeLogin: function(type){
      this.accountNumber = '';
      this.loginType = type;
      this.loginStatus = 0;
    },
    
    /**
     * 描述 校验手机号合法
     * @date 2020-08-24
     * @param {any} e input的值
     * @returns {any}
     */
    checkInput: function(e){
      if(this.timer != null){
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(()=>{
        if(this.loginType == 0){
          this.loginStatus = utils.isPhoneNumber(this.accountNumber) ? 1 : 2
        }
        if(this.loginType == 1){
          this.loginStatus = utils.ismail(this.accountNumber) ? 1 : 2
        }
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
        this.loginStatus = 3
      } else{
          this.tipCode= loading + 's 后重试';
          this.loginStatus = 0;
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
*,
*::before,
*::after {
  box-sizing: content-box;
}
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
  position: relative;
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
  z-index: 9999;
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
  position: absolute;
  left: -42px;
  top: 18px;
  background-color: #ffffff;
  transform: rotate(45deg);
  cursor: default;
  border-top: 42.5px solid #ffffff;
  border-bottom: 42.5px solid transparent;
  border-left: 42.5px solid transparent;
  border-right: 42.5px solid #ffffff;
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
  height: 45px;
  margin: 20px 0px;
}
.item-button{
  font-size: 18px;
  letter-spacing: 3px;
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
  margin-top: 150px;
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
.qr-container{
  position: absolute;
  border-radius: 12px;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qr-container .qr-img{
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  filter: drop-shadow(0px 10px 20px #888);
}
.qr-container .qr-img img{
  width: 200px;
  height: 200px;
  user-select: none;
  -webkit-user-drag: none;
}
.qr-container .qr-img span{
  margin-top: 20px;
  font-size: 14px;
  user-select: none;
  -webkit-user-drag: none;
}
.tip_active{
  color: #1890ff !important;
}
.active{
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}
</style>