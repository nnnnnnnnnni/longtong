<template>
  <div class="workbench">
    <div class="bench-menu">
      <benchMenu />
    </div>
    <div class="bench-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import benchMenu from "@/components/workbench/benchMenu";
export default {
  name: "workbench",
  data() {
    return {};
  },
  components: {
    benchMenu
  }
};
</script>

<style scoped>
.workbench {
  width: 85%;
  min-width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
}
.bench-menu {
  width: 200px;
  height: 100%;
  min-width: 150px;
}
.bench-container {
  flex: 1;
  padding-left: 10px;
  padding-top: 10px;
  box-sizing: border-box;
  height: 100%;
}
</style>
