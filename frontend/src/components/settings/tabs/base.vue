<template>
  <div class="base">
    <div class="form-container">
      <!-- <div class="form-item">
        <div class="form-item-label">{{fromData.logo.label}}</div>
        <div class="form-item-container">
          <a-input v-model="fromData.logo.value"/>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">{{fromData.name.label}}</div>
        <div class="form-item-container">
          <a-input v-model="fromData.name.value" :placeholder='fromData.name.placeholder' />
        </div>
      </div>
      <div class="form-item">
        <a-button type='primary'>修改</a-button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "baseTab",
  data() {
    return {
      // fromData: {
      //   name: {
      //     placeholder: '请输入姓名',
      //     label: "公司名称",
      //     value: this.$store.state.user.company.info.name,
      //   },
      //   logo: {
      //     placeholder: '',
      //     label: "logo",
      //     value: this.$store.state.user.company.info.name,
      //   },
      // },
    };
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
</style>
