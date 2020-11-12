<template>
  <div class="address">
    <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "address",
  props: ['visible'],
  data() {
    return {};
  },
  mounted() {

  },
};
</script>

<style scoped></style>
