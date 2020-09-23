<template>
  <div class="baseSetting">
    <div class="form-container">
      <div class="form-item">
        <h2>基本设置</h2>
      </div>
      <div class="form-item" v-for="item in formData" :key="item.label">
        <div class="form-item-label">{{item.label}}</div>
        <div class="form-item-container">
          <a-textarea v-if="item.hasOwnProperty('autosize')" v-model="item.value" :placeholder='item.placeholder' :autoSize='item.autosize' ></a-textarea>
          <a-input v-else v-model="item.value" :placeholder='item.placeholder' :disabled='item.disabled' />
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
      formData: [
        {
          placeholder: '请输入姓名',
          label: "姓名",
          disabled: true,
          value: this.$store.state.user.name,
        },
        {
          placeholder: '请前往 "绑定设置" 绑定',
          label: "邮箱",
          disabled: true,
          value: this.$store.state.user.mail,
        },
        {
          placeholder: '请前往 "绑定设置" 绑定',
          label: "手机",
          disabled: true,
          value: this.$store.state.user.phone,
        },
        {
          placeholder: '',
          label: "职位",
          disabled: true,
          value: this.$store.state.user.job,
        },
        {
          placeholder: '',
          label: "部门",
          disabled: true,
          value: this.$store.state.user.department,
        },
        {
          placeholder: '',
          label: "个人简介",
          disabled: false,
          value: this.$store.state.user.introduction,
          autosize: {minRows: 4, maxRows: 6}
        },
      ],
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