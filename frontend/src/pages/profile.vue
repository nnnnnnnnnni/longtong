<template>
  <div class="profile">
    <div class="container">
      <div class="menu">
        <profile-menu />
      </div>
      <div class="profile-container">
        <projects />
      </div>
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
.profile .menu {
  position: absolute;
  width: 300px;
  top: 60px;
  bottom: 0;
}
.profile-container {
  margin-left: 300px;
  height: 100%;
  width: auto;
  box-sizing: border-box;
  padding: 10px 15px 10px 50px;
}
</style>
