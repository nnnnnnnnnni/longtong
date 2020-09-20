<template>
  <div class="main">
    <top-nav></top-nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import topNav from "@/components/topnav";
export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    topNav
  },
  created() {
    const token = localStorage.getItem('token');
    // if(!token) {
    //   this.$router.push({name: 'login'})
    // } else {
    //   this.$router.push({name: 'calendar'})
    // }
  }
};
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.container {
  box-sizing: border-box;
  overflow: hidden;
  flex: 1;
}
</style>
