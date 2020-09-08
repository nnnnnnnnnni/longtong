<template>
  <div class='chatcontainer'>
    <div class="chat-nav">
      <div class="nav-name">{{user.name}}</div>
    </div>
    <div class="chat-content">
      <p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p>
      <p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p>
    </div>
    <div class="chat-box">
      <div class="chat-box-mutifn"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatcontainer',
  data() {
    return {
      user: {
        name: 'niyongsehng'
      }
    };
  },
  created() {
    this.$bus.$on('get', (data)=> {
      console.log(data)
    })
  },
  beforeDestory() {
    this.$bus.$off()
  }
};
</script>


<style scoped>
.chatcontainer{
  height: 100%;
  width: 100%;
  overflow-y: hidden;
}
.chat-nav{
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
  height: calc(100% - 270px);
  overflow-y: scroll;
}
.chat-box {
  width: 100%;
  height: 200px;
  box-shadow: 0px -2px 10px 2px #f0f1f2;
  box-sizing: border-box;
}
.chat-box-mutifn {
  height: 40px;
}
</style>