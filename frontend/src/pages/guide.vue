<template>
  <div class="guide">
    <div class="guide-step">
      <a-steps :current="currentStep" size="small">
        <a-step title="完善个人资料" />
        <a-step title="创建公司" />
        <a-step title="完成" />
      </a-steps>
    </div>
    <div class="container" v-if="currentStep == 0">
      <div class="guide-item">
        <div class="item-name required">头像:</div>
        <div class="item-field">
          <a-upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="upload"
            @change="handleUserChange"
          >
            <img v-if="user.logo" :src="user.logo" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </div>
      </div>
      <div class="guide-item">
        <div class="item-name required">姓名：</div>
        <div class="item-field">
          <a-input size="large" v-model="user.name"></a-input>
        </div>
      </div>
      <div class="guide-item">
        <div class="item-name">昵称：</div>
        <div class="item-field">
          <a-input size="large" v-model="user.username"></a-input>
        </div>
      </div>
      <div class="guide-item">
        <div class="item-name">简介：</div>
        <div class="item-field">
          <a-textarea size="large" v-model="user.introduction"></a-textarea>
        </div>
      </div>
      <div class="guide-item">
        <a-button type="primary" @click="nextStep(1)">下一步</a-button>
      </div>
    </div>
    <div class="container" v-else-if="currentStep == 1">
      <div class="guide-item">
        <div class="item-name required">LOGO:</div>
        <div class="item-field">
          <a-upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="upload"
            @change="handleChange"
          >
            <img v-if="logo" :src="logo" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </div>
      </div>
      <div class="guide-item">
        <div class="item-name required">公司名称:</div>
        <div class="item-field">
          <a-input size="large" v-model="name"></a-input>
        </div>
      </div>
      <div class="guide-item">
        <div class="item-name required">公司简介:</div>
        <div class="item-field">
          <a-textarea v-model="introduction"></a-textarea>
        </div>
      </div>
      <div class="guide-item">
        <a-button @click="currentStep--">上一步</a-button>
        <a-button type="primary" @click="nextStep(2)">下一步</a-button>
      </div>
    </div>
    <div class="container">
      <div class="guide-item">
        <h2>个人</h2>
      </div>
      <div class="guide-item">
        <div class="item-name">头像：</div>
        <div class="item-field">
          <img :src="user.logo" alt="" />
        </div>
      </div>
      <div class="guide-item">
        <div class="item-name">姓名：</div>
        <div class="item-field">{{ user.name }}</div>
      </div>
      <div class="guide-item">
        <div class="item-name">昵称：</div>
        <div class="item-field">{{ user.username || user.name }}</div>
      </div>
      <div class="guide-item">
        <div class="item-name">简介：</div>
        <div class="item-field">{{ user.introduction }}</div>
      </div>
      <div class="guide-item">
        <h2>公司</h2>
      </div>
      <div class="guide-item">
        <div class="item-name">logo：</div>
        <div class="item-field">
          <img :src="logo" alt="" />
        </div>
      </div>
      <div class="guide-item">
        <div class="item-name">昵称：</div>
        <div class="item-field">{{ name }}</div>
      </div>
      <div class="guide-item">
        <div class="item-name">简介：</div>
        <div class="item-field">{{ introduction }}</div>
      </div>
      <div class="guide-item">
        <a-button @click="currentStep--">返回修改</a-button>
        <a-button type="primary" @click="nextStep(3)">确定创建</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "guide",
  data() {
    return {
      user: {
        name: "",
        username: "",
        introduction: "",
        logo: ""
      },
      loading: false,
      name: "",
      introduction: "",
      logo: "",
      upload: this.$store.state.apis.upload,
      currentStep: 0
    };
  },
  methods: {
    handleChange: function(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.logo = info.file.response.data.file;
        this.loading = false;
      }
    },
    handleUserChange: function(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.user.logo = info.file.response.data.file;
        this.loading = false;
      }
    },
    nextStep: function(step) {
      if (step == 1) {
        if (!this.user.logo) {
          return this.$message.warning("必填：头像");
        }
        if (!this.user.name) {
          return this.$message.warning("必填：姓名");
        }
        this.currentStep++;
      } else if (step == 2) {
        if (!this.logo) {
          return this.$message.warning("必填：logo");
        }
        if (!this.name) {
          return this.$message.warning("必填：公司名称");
        }
        if (!this.introduction) {
          return this.$message.warning("必填：公司简介");
        }
        this.currentStep++;
      } else {
        this.createCompay();
      }
    },
    createCompay: function() {
      if (!this.name) {
        return this.$message.warning("必填：公司名称");
      }
      if (!this.introduction) {
        return this.$message.warning("必填：公司简介");
      }
      this.$post("/company/create", {
        name: this.name,
        introduction: this.introduction,
        logo: this.logo,
        user: this.user,
      }).then(res => {
        this.$message.success('创建成功！');
        setTimeout(() => {
          this.$router.push({name: 'index'});
        }, 500);
      });
    }
  }
};
</script>

<style scoped>
.guide {
  width: 400px;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
}
.guide-step {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}
.container .guide-item {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0px;
}
.guide-item .item-name {
  width: 100px;
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 16px;
  position: relative;
}
.guide-item .item-field {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.required::before {
  content: "*";
  color: #f5222d;
  position: absolute;
  left: 0px;
  top: 0px;
}
img {
  max-width: 98px;
  max-width: 98px;
}
</style>
