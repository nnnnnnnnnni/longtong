<template>
  <div class="baseSetting">
    <div class="form-container">
      <div class="form-item">
        <h2>基本设置</h2>
      </div>
      <div class="form-item">
        <div class="form-item-label">昵称</div>
        <div class="form-item-container">
          <a-input v-model="userInfo.userName" placeholder="请输入昵称" />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">姓名</div>
        <div class="form-item-container">
          <a-input
            v-model="userInfo.name"
            placeholder="请输入姓名"
            :disabled="this.$store.state.user.company.role == 'user'"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">邮箱</div>
        <div class="form-item-container">
          <a-input
            v-model="userInfo.mail"
            placeholder="请前往 绑定设置 绑定"
            disabled
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">手机</div>
        <div class="form-item-container">
          <a-input
            v-model="userInfo.phone"
            placeholder="请前往 绑定设置 绑定"
            disabled
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">岗位</div>
        <div class="form-item-container">
          <a-input
            v-model="userInfo.job"
            placeholder="请联系管理员设置"
            disabled
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">部门</div>
        <div class="form-item-container">
          <a-input
            v-model="userInfo.department"
            placeholder="请联系管理员设置"
            disabled
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">简介</div>
        <div class="form-item-container">
          <a-textarea
            v-model="userInfo.introduction"
            :autoSize="{ minRows: 4, maxRows: 6 }"
          ></a-textarea>
        </div>
      </div>

      <div class="form-item">
        <a-button type="primary" @click="editInfo">修改</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "baseSetting",
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo: function() {
      this.$get("/user/userInfo", {
        field: "name,userName,mail,phone,job,department,introduction"
      }).then(res => {
        this.userInfo = res.data;
      });
    },
    editInfo: function() {
      this.$put("/user/update", {
        userName: this.userInfo.userName,
        name: this.userInfo.name,
        introduction: this.userInfo.introduction
      }).then(res => {
        this.getInfo();
        this.$store.commit("CHANGE_USER", Object.assign({}, res.data));
        this.$message.success("修改成功");
      });
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
h2 {
  margin: 0px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
}
</style>
