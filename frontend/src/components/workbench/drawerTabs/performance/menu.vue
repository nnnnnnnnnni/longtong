<template>
  <div class="performance-menu">
    <div class="container">
      <div class="menu-item">
        <a-button type="primary" icon="plus" @click="changeTab('performance_create')">创建评审</a-button>
      </div>
      <div class="menu-item" @click="changeTab('performance_mine')">
        <div
          class="text"
          :class="{ menu_active: this.$route.name == 'performance_mine' }"
        >
          <a-icon type="pie-chart" />
          我的绩效
        </div>
      </div>
      <div class="menu-item" @click="changeTab('performance_history')">
        <div
          class="text"
          :class="{ menu_active: this.$route.name == 'performance_history' }"
        >
          <a-icon type="line-chart" />
          历史绩效
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "performanceMenu",
  data() {
    return {};
  },
  methods: {
    // 页面tab 切换
    changeTab: function(router) {
      if (this.$route.name == router) {
        return;
      }
      this.$router.push({ name: router });
    },
  }
};
</script>

<style scoped>
.menu-item {
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  cursor: pointer;
  color: #666;
}
.menu-item .text {
  margin: 3px auto;
  height: 34px;
  line-height: 34px;
  width: 110px;
  border-radius: 5px;
  transition: all 0.5s;
}
.menu-item i {
  margin-right: 8px;
}
.menu_active {
  background-color: rgba(0, 0, 0, 0.12);
}
</style>
