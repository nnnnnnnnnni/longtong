<template>
  <div class="setting">
    <div class="container">
      <div class="menu">
        <setting-menu :userInfo="userInfo" edit_type="setting" />
      </div>
      <div class="setting-container">
        <router-view @getUserInfo="getUserInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import settingMenu from "@/components/settings/settingMenu";
export default {
  name: "setting",
  data() {
    return {
      userInfo: {
        company: { info: "", role: "user" },
        department: { info: { name: "" } }
      }
    };
  },
  components: {
    settingMenu
  },
  methods: {
    getUserInfo: function(data) {
      this.userInfo = Object.assign(this.userInfo, data);
    }
  }
};
</script>

<style scoped>
.setting {
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
.setting .menu {
  position: absolute;
  width: 300px;
  top: 60px;
  bottom: 0;
}
.setting-container {
  margin-left: 300px;
  height: 100%;
  width: auto;
  box-sizing: border-box;
  padding: 10px 15px 10px 50px;
}
</style>
