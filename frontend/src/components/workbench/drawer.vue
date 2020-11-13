<template>
  <div class="drawer">
    <a-drawer
      placement="left"
      :width="400"
      :visible="status"
      :body-style="{ paddingBottom: '80px', 'z-dinex': '1000' }"
      @close="onClose"
    >
      <template slot="title">
        <div class="drawer-title">
          <span class="title-text">更多 More</span>
        </div>
      </template>
      <div class="drawer-contaner">
        <div class="drawer-item" v-for="item in drawers" :key="item.icon" @click="action(item.function, item.val)">
          <div class="item-icon">
            <a-icon :type="item.icon" />
          </div>
          <div class="item-title">{{ item.title }}</div>
        </div>
      </div>
      <address-modal :visible='visible' @modalCancel='modalCancel' @okClick='okClick' />
    </a-drawer>
  </div>
</template>

<script>
import addressModal from './drawerTabs/addressModal'
import drawers from "./drawers";
export default {
  name: "drawer",
  props: ["status"],
  data() {
    return {
      drawers: drawers,
      visible: false,
    };
  },
  components: {
    addressModal
  },
  methods: {
    // 通知父组件，drawer关闭
    onClose: function() {
      this.$emit("drawerClosed", false);
      console.log("closed");
    },
    okClick: function() {
      this.$router.push({ name: "chat" });
    },
    // 点击 通讯录 方法
    address: function() {
      this.visible = true;
    },
    // 处理每个tab的方法
    action: function(action, val) {
      if (val === "address") action(this.address);
      else {
        action()
      }
    },
    // 通讯录modal关闭通知
    modalCancel: function (){
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.drawer-title {
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.drawer-contaner {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.drawer-contaner .drawer-item {
  width: 33%;
  height: 116px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
}
.drawer-item .item-icon {
  font-size: 18px;
}
.drawer-item .item-title {
  margin-top: 5px;
  font-size: 14px;
}
.drawer-contaner .drawer-item:hover {
  color: #40a9ff;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.03);
}
</style>
