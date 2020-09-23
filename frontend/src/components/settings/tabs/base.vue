<template>
  <div class="base">
    <div class="form-container">
      <div class="form-item">
        <div class="form-item-container">
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

      <div class="form-item">
        <div class="form-item-label">公司名称:</div>
        <div class="form-item-container">
          <a-input v-model="name"></a-input>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">公司简介:</div>
        <div class="form-item-container">
          <a-input v-model="introduction"></a-input>
        </div>
      </div>

      <div class="form-item">
        <a-button type="primary">修改</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "baseTab",
  data() {
    return {
      loading: false,
      logo: this.$store.state.user.company.info.logo,
      name: this.$store.state.user.company.info.name,
      introduction: this.$store.state.user.company.info.introduction,
      upload:
        process.env.NODE_ENV == "development"
          ? this.$store.state.apis.dev.upload
          : this.$store.state.apis.prd.upload
    };
  },
  methods: {
    handleChange: function(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.logo = "http://" + info.file.response.data.file;
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  padding-left: 20px;
}
.form-item {
  padding: 10px 0px;
}
.form-item .form-item-label {
  padding: 0 0 8px;
  line-height: 1.5715;
  white-space: normal;
  text-align: left;
  position: relative;
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
}
.form-item .form-item-container {
  width: 350px;
}
img {
  max-width: 128px;
  max-height: 128px;
}
</style>
