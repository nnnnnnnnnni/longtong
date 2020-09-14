<template>
  <div class="chat">
    <div class="left">
      <chatlist />
    </div>
    <div class="right">
      <chatcontainer />
    </div>
  </div>
</template>

<script>
import chatlist from "@/components/chat/chatlist";
import chatcontainer from "@/components/chat/chatcontainer";
export default {
  name: "chat",
  data() {
    return {};
  },
  components: {
    chatlist,chatcontainer
  },
};
</script>


<style scoped>
.chat {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
}
.left {
  width: 30%;
  min-width: 299px;
  max-width: 349px;
  border-right: 1px solid #e4e4e4;
}
.right {
  flex: 1;
}
</style>