<template>
  <div class="caigou">
    <a-modal
      title="采购申请"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>caigou</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "caigou",
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
