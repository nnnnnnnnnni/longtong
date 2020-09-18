<template>
  <div class="login">
    <img class="login-img" :src="imgSrc" />
    <div class="login-container">
      <div class="login-form">
        <div class="login-title">
          <span>登录 笼统</span>
          <span class="small">去注册 <a-icon type="arrow-right" /></span>
        </div>
        <div class="login-step">
          <a-tabs :tabBarStyle="tabBarStyle" size="small" :tabBarGutter="0">
            <a-tab-pane key="1" tab="邮箱">
              <div class="login-item">
                <a-input v-model="account" size="large" placeholder="请输入邮箱"></a-input>
              </div>
              <div class="login-item">
                <a-input v-model="password" size="large" placeholder="请输入密码" type='password'/>
              </div>
              <div class="login-item">
                <a-button size='large' type='primary' shape="round" icon='arrow-right'>登录</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="手机">
              <div class="login-item">
                <a-input v-model="phone" size="large" placeholder="请输入手机号">
                  <template slot="suffix">
                    <a-button @click="sendCode" size="small" :disabled="bindSendCode" type="link" >{{codeText}}</a-button>
                  </template>
                </a-input>
              </div>
              <div class="login-item">
                <a-input v-model="code" size="large" placeholder="请输入验证码"/>
              </div>
              <div class="login-item">
                <a-button size='large' type='primary' shape="round" icon='arrow-right'>登录</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="微信">
              <div class="login-item">
                <img src="https://bkimg.cdn.bcebos.com/pic/2934349b033b5bb571dc8c5133d3d539b600bc12?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg" alt="">
              </div>
              <div class="login-sub">请使用“笼统小程序”扫码</div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      tabBarStyle: { border: "none", "user-select": "none", "margin-bottom": '0'},
      codeText: "发送验证码",
      bindSendCode: false,
      imgSrc: "https://www.bing.com/th?id=OHR.Schrecksee_ZH-CN8548752524_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
      account: '',
      phone: '',
      password: '',
      code: '',
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    sendCode: function() {
      this.bindSendCode = true;
      let time = 5;
      this.codeText = `${time} S后重试`;
      const timer = setInterval(() => {
        time -= 1;
        this.codeText = `${time} S后重试`;
        if(time == 0) {
          clearInterval(timer)
          this.codeText = '发送验证码'
          this.bindSendCode = false
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.ant-tabs-bar {
  border: none !important;
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
.login-container .login-form {
  width: 400px;
  box-sizing: border-box;
  padding: 25px;
  height: 450px;
  border-radius: 10px;
  box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
.login-form .login-title {
  margin-bottom: 6px;
  font-size: 22px;
  color: #1f2329;
  font-weight: 600;
  line-height: 30px;
  white-space: pre-wrap;
  display: flex;
  justify-content: space-between;
}
.login-form .login-title .small {
  font-size: 0.45em;
  font-weight: normal;
  cursor: pointer;
}
.login-form .login-title .small:hover {
  text-decoration: underline;
}
.login-item {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}
.login-item img {
  width: 200px;
  height: 200px;
}
.login-sub {
  margin-top: 20px;
  font-size: 14px;
  color: #333333;
  font-weight: 600;
  text-align: center;
}
</style>
