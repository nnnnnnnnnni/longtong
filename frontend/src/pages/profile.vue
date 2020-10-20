<template>
  <div class="profile">
    <div class="menu">
      <setting-menu />
    </div>
    <div class="profile-container">
      <projects />
    </div>
  </div>
</template>

<script>
import settingMenu from "@/components/settings/menu.vue";
import projects from "@/components/profile/projects";
export default {
  name: "profile",
  data() {
    return {};
  },
  components: {
    settingMenu,
    projects
  }
};
</script>

<style scoped>
.profile {
  width: 1250px;
  margin: 0 auto;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.profile .menu {
  position: absolute;
  width: 300px;
  top: 60px;
  bottom: 0;
}
.profile-container {
  margin-left: 300px;
  height: 100%;
  width: 950px;
  box-sizing: border-box;
  padding: 10px 15px 10px 50px;
}
</style>
