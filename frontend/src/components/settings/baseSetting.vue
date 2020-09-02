<template>
  <div class="baseSetting">
    <div class="form-container">
      <div class="form-item">
        <h2>基本设置</h2>
      </div>
      <div class="form-item">
        <div class="form-item-label">{{fromData.name.label}}</div>
        <div class="form-item-container">
          <a-input v-model="fromData.name.value" :placeholder='fromData.name.placeholder' disabled />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">{{fromData.mail.label}}</div>
        <div class="form-item-container">
          <a-input type='mail' v-model="fromData.mail.value" :placeholder='fromData.mail.placeholder' disabled />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">{{fromData.phone.label}}</div>
        <div class="form-item-container">
          <a-input v-model="fromData.phone.value" :placeholder='fromData.phone.placeholder' disabled />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">{{fromData.job.label}}</div>
        <div class="form-item-container">
          <a-input v-model="fromData.job.value" :placeholder='fromData.job.placeholder' disabled />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">{{fromData.department.label}}</div>
        <div class="form-item-container">
          <a-input v-model="fromData.department.value" :placeholder='fromData.department.placeholder' disabled />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">{{fromData.introduction.label}}</div>
        <div class="form-item-container">
          <a-textarea v-model="fromData.introduction.value" :placeholder='fromData.introduction.placeholder' :autosize='fromData.introduction.autosize' />
        </div>
      </div>
      <div class="form-item">
        <a-button type='primary'>修改</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "baseSetting",
  data() {
    return {
      fromData: {
        name: {
          placeholder: '请输入姓名',
          label: "姓名",
          value: this.$store.state.user.name,
        },
        mail: {
          placeholder: '请前往 "绑定设置" 绑定',
          label: "邮箱",
          value: this.$store.state.user.mail,
        },
        phone: {
          placeholder: '请前往 "绑定设置" 绑定',
          label: "邮箱",
          value: this.$store.state.user.phone,
        },
        job: {
          placeholder: '',
          label: "职位",
          value: this.$store.state.user.job,
        },
        department: {
          placeholder: '',
          label: "部门",
          value: this.$store.state.user.department,
        },
        introduction: {
          placeholder: '',
          label: "个人简介",
          value: this.$store.state.user.introduction,
          autosize: {minRows: 4, maxRows: 6}
        },
      },
    };
  },
};
</script>

<style scoped>
.form-container{
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
.form-item .form-item-container{
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