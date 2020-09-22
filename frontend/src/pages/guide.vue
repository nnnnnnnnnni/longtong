<template>
  <div class="guide">
    <a-steps :current="currentStep" size="small">
      <a-step title="完善个人资料" />
      <a-step title="创建公司" />
      <a-step title="完成" />
    </a-steps>
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
        <div class="item-name required">姓名：</div>
        <div class="item-field">
          <a-input size='large' v-model="user.name"></a-input>
        </div>
      </div>
      <div class="guide-item">
        <div class="item-name">昵称：</div>
        <div class="item-field">
          <a-input size='large' v-model="user.username"></a-input>
        </div>
      </div>
      <div class="guide-item">
        <div class="item-name">简介：</div>
        <div class="item-field">
          <a-textarea size='large' v-model="user.introduction"></a-textarea>
        </div>
      </div>
      <div class="guide-item">
        <a-button type="primary" @click="currentStep++">下一步</a-button>
      </div>
    </div>
    <div class="container" v-else-if="currentStep == 1">
      <div class="guide-item">
        <div class="item-name">LOGO:</div>
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
        <div class="item-name">公司名称:</div>
        <div class="item-field">
          <a-input size="large" v-model="name"></a-input>
        </div>
      </div>
      <div class="guide-item">
        <div class="item-name">公司简介:</div>
        <div class="item-field">
          <a-textarea v-model="introduction"></a-textarea>
        </div>
      </div>
      <div class="guide-item">
        <a-button @click="currentStep--">上一步</a-button>
        <a-button type="primary" @click="currentStep++">下一步</a-button>
      </div>
    </div>
    <div class="container"></div>
  </div>
</template>

<script>
export default {
  name: "guide",
  data() {
    return {
      user: {
        name: '',
        username: '',
        introduction: '',
      },
      loading: false,
      name: "",
      introduction: "",
      logo: "",
      upload:
        process.env.NODE_ENV == "development"
          ? this.$store.state.apis.dev.upload
          : this.$store.state.apis.prd.upload,
      currentStep: 0,
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.logo = "http://" + info.file.response.data.file;
        this.loading = false;
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
        logo: this.logo
      }).then(res => {});
    }
  }
};
</script>

<style scoped>
.guide {
  width: 500px;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
}
.container {
  height: inherit;
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}
.container .guide-item {
  width: inherit;
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
  display: f;
  justify-content: center;
  align-items: center;
}
.required::before {
  content: '*';
  color: #f5222d;
  position: absolute;
  left: 0px;
  top: 0px;
}
</style>
