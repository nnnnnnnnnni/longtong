<template>
  <div class='setting'>
      <div class="menu">
        <setting-menu />
      </div>
      <div class="setting-container">
        <router-view />
      </div> 
  </div>
</template>

<script>
import settingMenu from '@/components/settings/menu.vue'
export default {
  name: 'setting',
  data() {
    return {};
  },
  components: {
    settingMenu
  }
};
</script>


<style scoped>
.setting{
  width: 1250px;
  margin: 0 auto;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.setting .menu {
  position: absolute;
  width: 300px;
  top: 60px;
  bottom: 0;
}
.setting-container{
  margin-left: 300px;
  height: 100%;
  width: 950px;
  box-sizing: border-box;
  padding: 10px 15px 10px 100px;
}
</style>