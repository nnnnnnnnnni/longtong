<template>
  <div class="zhaopin">
    <a-modal
      title="招聘申请"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>zhaopin</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "zhaopin",
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
