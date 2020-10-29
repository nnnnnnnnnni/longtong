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
          <span class="title-sub"><a-button size="small" type="link">编辑</a-button></span>
        </div>
      </template>
      <div class="drawer-contaner">
        <div class="drawer-item" v-for="item in drawers" :key="item.icon" @click="item.function(1)">
          <div class="item-icon">
            <a-icon :type="item.icon" />
          </div>
          <div class="item-title">{{ item.title }}</div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import drawers from "./drawers";
export default {
  name: "drawer",
  props: ["status"],
  data() {
    return {
      drawers: drawers,
    };
  },
  methods: {
    onClose: function() {
      this.$emit("drawerClosed", false);
      console.log("closed");
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
.title-sub {
  font-size: 12px;
  margin-right: 30px;
  cursor: pointer;
}
.drawer-contaner {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.drawer-contaner .drawer-item {
  width: 25%;
  height: 80px;
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
