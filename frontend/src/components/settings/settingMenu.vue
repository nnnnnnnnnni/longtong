<template>
  <div class="setting-menu">
    <div class="avator">
      <img :src="this.$store.state.user.avator" />
    </div>
    <div class="username">{{ this.$store.state.user.userName }}</div>
    <div class="menu-group">
      <div class="info-item">
        <a-button type="primary" block @click="exitSetting"
          >EXIT SETTING</a-button
        >
      </div>
      <div
        class="info-item _edit"
        :class="{ checked_active: this.$route.name == 'setting_base' }"
        @click="changeTab('setting_base')"
      >
        <div class="info-item-text">基本设置</div>
      </div>
      <div
        class="info-item _edit"
        :class="{ checked_active: this.$route.name == 'setting_safe' }"
        @click="changeTab('setting_safe')"
      >
        <div class="info-item-text">安全设置</div>
      </div>
      <div
        class="info-item _edit"
        :class="{ checked_active: this.$route.name == 'setting_bind' }"
        @click="changeTab('setting_bind')"
      >
        <div class="info-item-text">绑定设置</div>
      </div>
      <div
        v-if="userInfo.company.role != 'user'"
        class="info-item _edit"
        :class="{ checked_active: this.$route.name == 'setting_company' }"
        @click="changeTab('setting_company')"
      >
        <div class="info-item-text">公司设置</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setting-menu",
  props: ["userInfo"],
  data() {
    return {
      editActive: this.$route.name,
      userId: this.$route.params.id
    };
  },
  methods: {
    exitSetting: function() {
      this.$router.push({ name: "profile", params: { id: this.userInfo._id } });
    },
    changeTab: function(tab) {
      if (this.editActive == tab) {
        return;
      } else {
        this.editActive = tab;
        this.$router.push({ name: tab });
      }
    }
  }
};
</script>

<style scoped>
.setting-menu {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
}
.setting-menu .avator {
  cursor: pointer;
  margin: 20px auto;
  width: 220px;
  height: 220px;
}
.avator img {
  width: inherit;
  height: inherit;
}
.username {
  font-size: 26px;
  height: 40px;
  line-height: 40px;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
}
.menu-group {
  overflow: hidden;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.8s;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}
.info-item {
  box-sizing: border-box;
  position: relative;
  text-align: left;
  padding: 10px 0px;
  height: 40px;
  font-size: 14px;
  margin: 0px auto;
  line-height: 40px;
  display: flex;
  align-items: center;
  color: #666;
  width: 90%;
  user-select: none;
  transition: all 0.5s;
}
.info-item .info-item-text {
  flex: 1;
  margin-left: 10px;
}
._edit .info-item-text {
  margin-left: 0px;
}
._edit {
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}
.checked_active {
  background-color: rgba(0, 0, 0, 0.12);
}
</style>
