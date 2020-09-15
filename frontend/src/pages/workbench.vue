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
  max-width: 1500px;
  min-width: 800px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
}
.bench-menu {
  width: 200px;
  height: 100%;
}
.bench-container {
  flex: 1;
  padding: 20px 0px 0px 50px;
  box-sizing: border-box;
  height: 100%;
}
</style>