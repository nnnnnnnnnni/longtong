<template>
  <div class="login">
    <div class="img">
      <div class="title">Longtong</div>
      <img :src="imgSrc" />
    </div>
    <div class="container" v-if="loginMode">
      <div class="form">
        <div class="title">
          <span>登录 笼统</span>
          <span class="small" @click="changeMode(1)">去注册 <a-icon type="arrow-right" /></span>
        </div>
        <div class="step">
          <a-tabs :tabBarStyle="tabBarStyle" size="small" :tabBarGutter="0">
            <a-tab-pane key="1" tab="邮箱">
              <div class="item">
                <a-input v-model="account" size="large" placeholder="请输入邮箱"></a-input>
              </div>
              <div class="item">
                <a-input-password v-model="password" size="large" placeholder="请输入密码" type='password'/>
              </div>
              <div class="item">
                <a-button size='large' type='primary' :disabled='!bindLogin' shape="round" icon='arrow-right' @click="login(1)">登录</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="手机">
              <div class="item">
                <a-input v-model="phone" size="large" placeholder="请输入手机号">
                  <template slot="suffix">
                    <a-button @click="sendCode" size="small" :disabled="bindSendCode" type="link" >{{codeText}}</a-button>
                  </template>
                </a-input>
              </div>
              <div class="item">
                <a-input v-model="code" maxLength='6' size="large" placeholder="请输入验证码"/>
              </div>
              <div class="item">
                <a-button size='large' type='primary' :disabled='!bindLogin' shape="round" icon='arrow-right' @click="login(2)">登录</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="微信">
              <div class="item">
                <img src="https://bkimg.cdn.bcebos.com/pic/2934349b033b5bb571dc8c5133d3d539b600bc12?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg" alt="">
              </div>
              <div class="sub">请使用“笼统小程序”扫码</div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="form">
        <div class="title">
          <span>注册 笼统</span>
          <span class="small" @click="changeMode(2)"><a-icon type="arrow-left" /> 返回登陆</span>
        </div>
        <div class="register-step">
          <div class="register-item">
            <a-input v-model="registerMaill" size="large" placeholder="请输入邮箱"></a-input>
          </div>
          <div class="register-item">
            <a-input-password v-model="registerPassword" size="large" placeholder="请输入至少6位数的密码"/>
          </div>
          <div class="register-item">
            <a-button size='large' type='primary' :disabled='!bindRegister' shape="round" icon='arrow-right' @click="register">注册</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ismail, isPhone, isCode} from '../lib/utils';
import img from '../assets/logo.png'
export default {
  name: "login",
  data() {
    return {
      loginMode: true,
      tabBarStyle: { border: "none", "user-select": "none", "margin-bottom": '0'},
      codeText: "发送验证码",
      bindSendCode: false,
      bindLogin: false,
      bindRegister: false,
      imgSrc: img,
      account: '',
      phone: '',
      password: '',
      code: '',
      registerMaill: '',
      registerPassword: ''
    };
  },
  components: {},
  created() {},
  mounted() {},
  watch: {
    account: function() {
      this.bindLogin = ismail(this.account) && this.password != '';
    },
    password: function() {
      this.bindLogin = ismail(this.account) && this.password != '';
    },
    phone: function() {
      this.bindLogin = isPhone(this.phone) && isCode(this.code);
    },
    code: function() {
      this.bindLogin = isPhone(this.phone) && isCode(this.code);
    },
    registerMaill: function() {
      this.bindRegister = ismail(this.registerMaill) && this.registerPassword.length >=6;
    },
    registerPassword: function() {
      this.bindRegister = ismail(this.registerMaill) && this.registerPassword.length >=6;
    }

  },
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
          this.codeText = '发送验证码';
          this.bindSendCode = false;
        }
      }, 1000);
    },
    changeMode: function(type) {
      this.account = this.password = this.phone = this.code = this.registerMaill = this.registerPassword = '';
      this.loginMode = type != 1;
    },
    register: async function() {
      await this.$post('/user/register', {
        mail: this.registerMaill,
        pass: this.registerPassword,
      }).then(res =>{
        localStorage.setItem('token',res.data.token);
        this.$store.commit("CHANGE_USER", res.data.user);
        setTimeout(() => {
          this.$router.push({name: 'calendar'})
        }, 1000);
        return this.$message.success('登录成功！');
      })
    },
    login: async function(type) {
      // 账号密码登录
      if(type == 1) {
        await this.$post('/user/login', {
          mail: this.account,
          pass: this.password,
          type: 1,
        }).then(res =>{
          localStorage.setItem('token',res.data.token);
          this.$store.commit("CHANGE_USER", res.data.user);
          setTimeout(() => {
            this.$router.push({name: 'calendar'})
          }, 1000);
          return this.$message.success('登录成功！');
        })
      } else { // 手机号登录

      }
    }
  }
};
</script>

<style scoped>
@import url('//fonts.googleapis.com/css?family=Montserrat:300,400,500,600');
.ant-tabs-bar {
  border: none !important;
}
.login {
  font-family: 'Montserrat', sans-serif;
  height: 100%;
  width: 100%;
  display: flex;
  min-width: 1250px;
  justify-content: center;
  align-items: center;
}
.login .img {
  height: 800px;
  width: 700px;
  margin-right: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
}
.login .img .title {
  width: 100%;
  font-size: 50px;
  text-align: center;
}
.login .img img {
  display: block;
  height: 500px;
  width: 700px;
}
.login .container {
  height: 100%;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.container .form {
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
.form .title {
  margin-bottom: 6px;
  user-select: none;
  font-size: 22px;
  color: #1f2329;
  font-weight: 600;
  line-height: 30px;
  white-space: pre-wrap;
  display: flex;
  justify-content: space-between;
}
.form .title .small {
  font-size: 0.45em;
  font-weight: normal;
  cursor: pointer;
}
.form .title .small:hover {
  text-decoration: underline;
}
.item {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}
.item img {
  width: 200px;
  height: 200px;
}
.sub {
  margin-top: 20px;
  font-size: 14px;
  color: #333333;
  font-weight: 600;
  text-align: center;
}

.form .register-step {
  width: 100%;
  padding-top: 35px;
  box-sizing: border-box;
  height: calc(100% - 36px);
}
.register-step .register-item {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}
</style>
