<template>
  <div class="performance">
    <div class="container">
      <div class="performance-menu">
        <performance-menu />
      </div>
      <div class="performance-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import performanceMenu from "@/components/workbench/drawerTabs/performance/menu";
export default {
  name: "performance",
  data() {
    return {};
  },
  components: {
    performanceMenu
  }
};
</script>

<style scoped>
.performance {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.container {
  width: 65%;
  height: 100%;
  margin: 0 auto;
  min-width: 1000px;
}
.performance-menu {
  position: absolute;
  width: 200px;
  top: 60px;
  bottom: 0;
}
.performance-container {
  margin-left: 200px;
  height: 100%;
  width: auto;
  box-sizing: border-box;
  padding: 15px;
}
</style>
