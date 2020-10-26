<template>
  <div class="setting">
    <div class="menu">
      <setting-menu :userInfo='userInfo' edit_type='setting' />
    </div>
    <div class="setting-container">
      <router-view @getUserInfo='getUserInfo' />
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
        company: {info: '', role: 'user'},
        department: {info: {name: ''}}
      },
    };
  },
  components: {
    settingMenu
  },
  methods: {
    getUserInfo: function(data) {
      this.userInfo = Object.assign(this.userInfo, data);
    },
  }
};
</script>

<style scoped>
.setting {
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
.setting-container {
  margin-left: 300px;
  height: 100%;
  width: 950px;
  box-sizing: border-box;
  padding: 10px 15px 10px 50px;
}
</style>
