<template>
  <div class="setting-menu">
    <div class="avator">
      <img :src="userInfo.avator" alt />
    </div>
    <div class="username">{{ userInfo.userName }}</div>
    <div class="menu-group">
      <div class="info-item" v-if="userInfo.isOwn">
        <a-button type="primary" block @click="goSetting">GO SETTING</a-button>
      </div>
      <div class="info-item" :title="userInfo.job">
        <a-icon class="icon-style" type="idcard" />
        <span class="info-item-text">{{ userInfo.job || "暂未设置" }}</span>
      </div>
      <div class="info-item ellipsis" :title="userInfo.department">
        <a-icon class="icon-style" type="cluster" />
        <span class="info-item-text ellipsis">{{
          userInfo.department.info.name || "暂未设置"
        }}</span>
      </div>
      <div class="info-item" :title="userInfo.mail">
        <a-icon class="icon-style" type="mail" />
        <div class="info-item-text">{{ userInfo.mail || "暂未设置" }}</div>
      </div>
      <div class="info-item" :title="userInfo.phone">
        <a-icon class="icon-style" type="phone" />
        <div class="info-item-text">{{ userInfo.phone || "暂未设置" }}</div>
      </div>
      <div class="info-item">
        <a-icon class="icon-style" type="line-chart" />
        <div class="info-item-text">{{ userInfo.timeLine || 0 }}</div>
      </div>
      <div class="_info-item">
        <a-icon class="icon-style _icon-style" type="eye" />
        <div class="info-item-text">
          {{ userInfo.introduction || "暂未设置" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setting-menu",
  data() {
    return {
      userInfo: {
        company: { info: "", role: "user" },
        department: { info: { name: "" } }
      },
      userId: this.$route.params.id
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    goSetting: function() {
      this.$router.push({ name: "setting" });
    },
    getInfo: function() {
      this.$get("/user/userInfo", {
        userId: this.userId
      }).then(res => {
        this.userInfo = Object.assign(this.userInfo, res.data);
      });
    }
  }
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: content-box;
}
.icon-style {
  font-size: 16px;
  color: #1890ff;
}
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
._info-item {
  box-sizing: border-box;
  position: relative;
  text-align: left;
  font-size: 14px;
  margin: 0px auto;
  line-height: 26px;
  display: flex;
  align-items: center;
  color: #666;
  width: 90%;
  user-select: none;
  transition: all 0.5s;
}
._info-item .info-item-text {
  word-break: break-all;
  margin: 0px 10px 0px 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
._info-item ._icon-style {
  position: absolute;
  top: 6px;
}
.info-item .info-item-text {
  flex: 1;
  margin-left: 10px;
}
</style>
