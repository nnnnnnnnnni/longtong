<template>
  <div class="addressModal">
    <a-modal
      title="通讯录"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :destroyOnClose="true"
      :ok-button-props="{ props: { disabled: selectedKey === '' } }"
      okText="跳转 聊天"
      cancelText="关闭"
    >
      <a-tree
        :tree-data="address"
        showIcon
        @select='select'
      >
        <a-icon slot="smile" type="smile" theme="twoTone" two-tone-color="#096dd9" />
        <a-icon slot="star" type="star" theme="twoTone" two-tone-color="#d4b106" />
        <a-icon slot="bank" type="bank" theme="twoTone" two-tone-color="#000000" />
      </a-tree>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "addressModal",
  props: ["visible"],
  data() {
    return {
      address: [],
      selectedKey: ''
    };
  },
  mounted() {
    this.getAddress();
  },
  methods: {
    // 获取所有address
    getAddress: function() {
      this.$get("/address").then(res => {
        this.address = res.data;
      });
    },
    // 点击确定 跳转到聊天页面
    handleOk: function() {
      this.$emit('okClick');
    },
    // 点击取消通知上个页面
    handleCancel: function() {
      this.$emit("modalCancel", true);
    },
    select: function(key, info) {
      console.log(key)
      if(key[0].startsWith('admin') || key[0].startsWith('member')) {
        this.selectedKey = key[0].split('_')[1]
      } else {
        this.selectedKey = ''
      }
    }
  }
};
</script>

<style scoped></style>
