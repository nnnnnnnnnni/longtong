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
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          class
          data-icon="question-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
          />
          <path
            d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
          />
        </svg>
      </div>
      <div class="profile-item" @click="jumpPage('help')">
        <svg t="1599630278083" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8539" width="200" height="200"><path d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z" p-id="8540"></path></svg>
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
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          class
          data-icon="setting"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"
          />
        </svg>
      </div>
      <div class="profile-item">
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          class
          data-icon="logout"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z"
          />
        </svg>
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