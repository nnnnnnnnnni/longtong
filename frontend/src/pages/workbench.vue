<template>
  <div class='workbench'>
      <div class="bench-menu">
        <benchMenu />
      </div>
      <div class="bench-container">
        <router-view />
      </div> 
  </div>
</template>

<script>
import benchMenu from '@/components/workbench/benchMenu'
export default {
  name: 'workbench',
  data() {
    return {};
  },
  components: {
    benchMenu
  }
};
</script>


<style scoped>
.workbench{
  width: 90%;
  max-width: 1700px;
  min-width: 800px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
}
.bench-menu {
  width: 300px;
  height: 100%;
  margin-right: 60px;
}
.bench-container {
  flex: 1;
  height: 100%;
}
</style>