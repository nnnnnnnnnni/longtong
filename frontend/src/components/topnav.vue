<template>
  <div id="topnav">
    <div class="tabs">
      <div
        class="tab-item"
        :class="{'tab-active': this.$store.state.route == 'calendar'}"
        @click="jumpPage('calendar')"
      >
        <a-icon style="fontSize: 36px; color: #333" type="calendar" />
        <span class="time">{{currentDate}}</span>
      </div>
      <div
        class="tab-item"
        :class="{'tab-active': this.$store.state.route == 'chat'}"
        @click="jumpPage('chat')"
      >
        <a-icon style="fontSize: 36px; color: #333" type="message" />
      </div>
      <div
        class="tab-item"
        :class="{'tab-active': this.$store.state.route == 'home' || this.$store.state.route == 'mission' || this.$store.state.route == 'project'}"
        @click="jumpPage('home')"
      >
        <a-icon style="fontSize: 36px; color: #333" type="area-chart" />
      </div>
    </div>
    <div class="profiles">
      <div class="profile-item" @click="jumpPage('help')">
        <a-icon type="question-circle" />
      </div>
      <div class="profile-item" @click="jumpPage('help')">
        <a-icon type="bell" />
      </div>
      <div class="profile-item" @click="jumpPage('profile')">
        <div class="item-avator item-info">
          <img :src="avator" alt />
        </div>
        <div class="item-name item-info">
          <span>{{this.$store.state.user.name}}</span>
        </div>
      </div>
      <div class="profile-item" @click="jumpPage('setting')">
        <a-icon type="setting" />
      </div>
      <div class="profile-item">
        <a-icon type="logout" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topnav",
  data() {
    return {
      currentDate: "",
      avator: this.$store.state.user.avator,
    };
  },
  created() {},
  mounted() {
    this.currentDate = new Date().getDate();
  },
  methods: {
    jumpPage: function (name) {
      if (name != this.$store.state.route) {
        this.$router.push({ name: name });
      }
    },
  },
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
  right: 20px;
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
  padding: 0 8px;
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
}
.item-info {
  margin-left: 5px;
}
</style>