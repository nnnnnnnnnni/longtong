<template>
  <div class="main">
    <top-nav></top-nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import {isEmpty} from '../lib/utils';
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
    console.log(token)
    if(isEmpty(token)) {
      this.$message.warning('请先登录！')
      this.$router.push({name: 'login'})
    } else {
      this.$router.push({name: 'calendar'})
    }
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
