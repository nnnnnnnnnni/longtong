<template>
  <div id="topnav">
    <div class="company">
      <div class="company-logo">
        <img :src="this.$store.state.user.company.info.logo" alt="" />
      </div>
      <div class="company-name">
        {{ this.$store.state.user.company.info.name }}
      </div>
    </div>
    <div class="tabs">
      <div
        class="tab-item"
        :class="{ 'tab-active': this.$store.state.route == 'calendar' }"
        @click="jumpPage('calendar')"
      >
        <a-icon style="fontSize: 36px; color: #333" type="calendar" />
        <span class="time">{{ currentDate }}</span>
      </div>
      <div
        class="tab-item"
        :class="{ 'tab-active': this.$store.state.route == 'chat' }"
        @click="jumpPage('chat')"
      >
        <a-icon style="fontSize: 36px; color: #333" type="message" />
      </div>
      <div
        class="tab-item"
        :class="{
          'tab-active':
            this.$store.state.route == 'home' ||
            this.$store.state.route == 'mission' ||
            this.$store.state.route == 'project'
        }"
        @click="jumpPage('home')"
      >
        <a-icon style="fontSize: 36px; color: #333" type="area-chart" />
      </div>
    </div>
    <div class="profiles">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>帮助</span>
        </template>
        <div class="profile-item" @click="jumpPage('help')">
          <a-icon type="question-circle" />
        </div>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>通知</span>
        </template>
        <div class="profile-item" @click="jumpPage('help')">
          <a-icon type="bell" />
        </div>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>设置</span>
        </template>
        <div class="profile-item" @click="jumpPage('base')">
          <a-icon type="setting" />
        </div>
      </a-tooltip>
      <div class="profile-item" @click="jumpPage('profile')">
        <div class="item-avator item-info">
          <img :src="this.$store.state.user.avator" alt />
        </div>
        <div class="item-name item-info">
          <span>{{ this.$store.state.user.userName }}</span>
        </div>
      </div>
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>登出</span>
        </template>
        <div class="profile-item" @click="logout">
          <a-icon type="logout" />
        </div>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "topnav",
  data() {
    return {
      currentDate: ""
    };
  },
  created() {},
  mounted() {
    this.currentDate = new Date().getDate();
  },
  methods: {
    jumpPage: function(name) {
      if (name != this.$store.state.route) {
        if(name == 'profile') {
          return this.$router.push({ name: name, params: {id: this.$store.state.user._id} });
        }
        this.$router.push({ name: name });
      }
    },
    logout: async function() {
      await this.$post("/user/logout", {
        token: localStorage.getItem("token")
      }).then(res => {
        localStorage.removeItem("token");
        setTimeout(() => {
          this.$router.push({ name: "login" });
          this.$store.commit("CHANGE_USER", {});
        }, 500);
        return this.$message.success("登出成功！");
      });
    }
  }
};
</script>

<style scoped>
#topnav {
  height: 54px;
  width: 100%;
  box-shadow: 0 2px 8px #f0f1f2;
  position: relative;
  z-index: 999;
}
.company {
  position: absolute;
  height: inherit;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  left: 6%;
  user-select: none;
}
.company .company-logo img {
  height: 34px;
  width: 34px;
}
.company .company-name {
  margin-left: 20px;
  font-size: 14px;
}
.tabs {
  width: 40%;
  max-width: 750px;
  height: inherit;
  margin: 0 auto;
  font-size: 20px;
  display: flex;
}
.tabs .tab-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
}
.tabs .tab-item span {
  position: absolute;
  left: 50%;
  font-size: 16px;
  bottom: 50%;
  transform: translate(-50%, 78%);
  font-weight: 600;
  user-select: none;
}
.tab-active {
  box-shadow: 0px 1px 10px -2px rgba(0, 0, 0, 0.16);
}
.tabs .tab-item:hover {
  background-color: #ececec;
}

.profiles {
  position: absolute;
  top: 0;
  height: inherit;
  right: 6%;
  display: flex;
}
.profiles .profile-item {
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  cursor: pointer;
  font-size: 14px;
  padding: 0 10px;
  transition: all 0.25s;
  user-select: none;
}
.profiles .profile-item:hover {
  background-color: #ececec;
}
.profiles .profile-item svg {
  height: 14px;
  width: 14px;
}
img {
  height: 26px;
  width: 26px;
  border-radius: 50%;
}
.item-info {
  margin-left: 10px;
}
</style>
