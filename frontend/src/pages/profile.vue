<template>
  <div class="profile">
    <div class="menu">
      <profile-menu />
    </div>
    <div class="profile-container">
      <projects />
    </div>
  </div>
</template>

<script>
import profileMenu from "@/components/profile/profileMenu.vue";
import projects from "@/components/profile/projects";
export default {
  name: "profile",
  data() {
    return {};
  },
  components: {
    profileMenu,
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
