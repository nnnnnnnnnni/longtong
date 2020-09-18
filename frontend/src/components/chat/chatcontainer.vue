<template>
  <div class="chatcontainer">
    <div class="chat-nav">
      <div class="nav-name">{{ user.name }}</div>
    </div>
    <div class="chat-content"></div>
    <div class="chat-box">
      <div class="mutifn">
        <div class="mutifn-item" v-if="mutifn == 'edit'" @click="changeMutifnType('image')">
          <svg t="1599620966072" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8041" width="200" height="200"><path d="M257.7 752c2 0 4-0.2 6-0.5L431.9 722c2-0.4 3.9-1.3 5.3-2.8l423.9-423.9c3.9-3.9 3.9-10.2 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2c-1.9 11.1 1.5 21.9 9.4 29.8 6.6 6.4 14.9 9.9 23.8 9.9z m67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" p-id="8042" fill="#707070"></path></svg>
        </div>
        <div class="mutifn-item" v-if="mutifn == 'image'" @click="changeMutifnType('edit')">
          <svg t="1599621079045" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8378" width="200" height="200"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" p-id="8379" fill="#707070"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" p-id="8380" fill="#707070"></path></svg>
        </div>
      </div>
      <div class="send">
        <a-input v-if="mutifn == 'edit'" v-model="sendMessage" placeholder=" Enter 发送">
          <a-icon slot="prefix" type="smile" @click="clickEmoji" />
          <a-icon slot="suffix" type="notification" @click="clickEmoji" />
        </a-input>
        <a-upload
          v-else
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
          @change="handleUploadChange"
        >
          <a-button> <a-icon type="upload" /> Click to Upload </a-button>
        </a-upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chatcontainer",
  data() {
    return {
      user: {
        name: "niyongsehng"
      },
      mutifn: "edit",
      sendMessage: "",
      headers: {}
    };
  },
  created() {
    this.$bus.$on("get", data => {
      console.log(data);
    });
  },
  methods: {
    changeMutifnType: function(type) {
      this.mutifn = type;
    },
    clickEmoji: function() {
      console.log("ok");
    },
    handleUploadChange: function() {}
  },
  beforeDestory() {
    this.$bus.$off();
  }
};
</script>

<style scoped>
.chatcontainer {
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  position: relative;
}
.chat-nav {
  width: 100%;
  height: 70px;
  box-shadow: 0 2px 8px #f0f1f2;
  box-sizing: border-box;
  line-height: 70px;
  padding-left: 20px;
  font-size: 25px;
  user-select: none;
}
.chat-content {
  height: calc(100% - 70px);
  overflow-y: scroll;
  padding-bottom: 90px;
}
.chat-box {
  border-radius: 10px;
  position: absolute;
  bottom: 40px;
  left: 3%;
  right: 3%;
  height: 50px;
  box-shadow: 0px 1px 20px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.chat-box .mutifn {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat-box .mutifn .mutifn-item {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.chat-box .send {
  flex: 1;
  margin-right: 10px;
}
.chat-box .send span {
  display: flex;
  align-items: center;
}
.chat-box svg {
  width: 30px;
  height: 30px;
}
</style>
