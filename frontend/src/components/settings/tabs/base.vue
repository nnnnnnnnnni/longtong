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
            <img v-if="companyInfo.logo" :src="companyInfo.logo" alt="avatar" />
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
        <div class="form-item-container">
          <a-tag color="green">管理员: {{ companyInfo.admins.length }}</a-tag>
          <a-tag color="blue">成员: {{ companyInfo.members.length }}</a-tag>
          <a-tag color="cyan">项目: {{ companyInfo.projectCount }}</a-tag>
          <a-tag color="pink">部门: {{ companyInfo.departmentCount }}</a-tag>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">公司名称:</div>
        <div class="form-item-container">
          <a-input v-model="companyInfo.name"></a-input>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">公司简介:</div>
        <div class="form-item-container">
          <a-textarea v-model="companyInfo.introduction"></a-textarea>
        </div>
      </div>

      <div class="form-item">
        <a-button type="primary" @click="editCompany">修改</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "baseTab",
  props: ["activeTab"],
  data() {
    return {
      companyInfo: {
        admins: [],
        members: []
      },
      loading: false,
      upload: this.$store.state.apis.upload
    };
  },
  created() {
    this.getCompany();
  },
  watch: {
    activeTab: function() {
      if (this.activeTab == 1) {
        this.getCompany();
      }
    }
  },
  methods: {
    getCompany: function() {
      this.$get("company/companyInfo", {
        field: "logo,name,introduction,admins,members"
      }).then(res => {
        this.companyInfo = res.data;
      });
    },
    editCompany: function(obj) {
      this.$put("company/update", {
        name: this.companyInfo.name,
        introduction: this.companyInfo.introduction,
        ...obj
      }).then(res => {
        if (res.status == 200) {
          this.$store.commit("CHANGE_COMPANY", res.data);
          this.$message.success("修改成功");
          this.getCompany();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleChange: function(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.logo = info.file.response.data.file;
        this.editCompany({ logo: this.logo });
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
