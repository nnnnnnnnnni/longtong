<template>
  <div class="waichu">
    <a-modal
      title="外出申请"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>waichu</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "waichu",
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
