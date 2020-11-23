<template>
  <div class="performance-menu">
    <div class="container">
      <div class="menu-item" @click="changeTab('performance_create')">
        <div
          class="text"
          :class="{ menu_active: this.$route.name == 'performance_create' }"
        >
          <a-icon type="plus" />
          创建评审
        </div>
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
    }
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
  color: #333;
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
  background-color:#76c7fa;
}
</style>
