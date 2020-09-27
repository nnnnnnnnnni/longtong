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
        <a-button type="danger" @click="editPwd">修改密码</a-button>
      </div>
    </div>

    <!-- model -->
    <a-modal title='修改密码' :model="pwdForm"  :visible="modalVisible" @ok="modalMethodOk" @cancel="modalVisible = false" >
      <a-form-model :model="pwdForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 14,offset: 1 }">
        <a-form-model-item label="旧密码">
          <a-input-password v-model="pwdForm.old" placeholder='请输入...'></a-input-password>
        </a-form-model-item>
        <a-form-model-item label="新密码">
          <a-input-password v-model="pwdForm.new" placeholder='请输入...'></a-input-password>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "baseSetting",
  data() {
    return {
      modalVisible: false,
      userInfo: {},
      pwdForm: {}
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
    // 编辑信息
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
    },
    editPwd: function() {
      this.modalVisible = true;
    },
    modalMethodOk:async function() {
      if(!this.pwdForm.old) return this.$message.error('必须：旧密码');
      if(!this.pwdForm.new) return this.$message.error('必须：新密码');
      if(this.pwdForm.old == this.pwdForm.new) return this.$message.error('新旧密码不能相同');
      if(this.pwdForm.new.length < 6) return this.$message.error('密码长度不可少于6');
      this.$put("/user/update", {
        type: 'pwd',
        old: this.pwdForm.old,
        new: this.pwdForm.new
      }).then(async res => {
        if(res.status == 200) {
          await this.$post("/user/logout", {
            token: localStorage.getItem("token")
          }).then(res => {
            localStorage.removeItem("token");
            this.$store.commit("CHANGE_USER", {});
            this.$message.warning('密码已修改，请重新登录');
            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 500);
          });
        }
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
