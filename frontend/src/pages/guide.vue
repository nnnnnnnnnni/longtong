<template>
  <div class="guide">
    <div class="guide-container">
      <div class="guide-item">
        <h2>创建公司</h2>
      </div>
      <div class="guide-item">
        <div class="item-name">公司名称:</div>
        <div class="item-field">
          <a-input v-model="name"></a-input>
        </div>
      </div>
      <div class="guide-item">
        <div class="item-name">公司简介:</div>
        <div class="item-field">
          <a-textarea v-model="introduction"></a-textarea>
        </div>
      </div>
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
        <a-button type="primary" @click="createCompay">确定</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "guide",
  data() {
    return {
      loading: false,
      name: "",
      introduction: "",
      logo: "",
      upload: process.env.NODE_ENV == 'development' ? this.$store.state.apis.dev.upload : this.$store.state.apis.prd.upload
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.logo = info.file.response.data.file;
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
  width: 600px;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
}
.guide-container {
  height: inherit;
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.guide-container .guide-item {
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
}
.guide-item .item-name {
  width: 100px;
}
.guide-item .item-field {
  flex: 1;
  display: f;
  justify-content: center;
  align-items: center;
}
</style>
