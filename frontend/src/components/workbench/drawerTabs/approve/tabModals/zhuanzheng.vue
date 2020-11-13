<template>
  <div class="zhuanzheng">
    <a-modal
      title="转正申请"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>zhuanzheng</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "zhuanzheng",
  props: ["visible"],
  data() {
    return {};
  },
  methods: {
    handleOk: function() {},
    handleCancel: function() {
      this.$emit('cancel')
    }
  }
};
</script>

<style scoped></style>
