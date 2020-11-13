<template>
  <div class="jiaban">
    <a-modal
      title="加班申请"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>jiaban</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "jiaban",
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
