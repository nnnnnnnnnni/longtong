<template>
  <div class="adddocument">
    <div class="nav">
      <a-input  size='large' v-model="title" placeholder="请在此输入标题" style="margin-right: 20px" />
      <a-button icon='rocket' size='large'  type='primary'>发 布</a-button>
    </div>
    <div class="editer">
      <editer mode="sv" ref="refEditer" v-model="body" />
    </div>
  </div>
</template>

<script>
import editer from "../common/editer";
export default {
  name: "add",
  data() {
    return {
      title: "",
      body: ""
    };
  },
  components: {
    editer
  }
};
</script>

<style scoped>
.adddocument {
  box-sizing: border-box;
  padding: 10px 6%;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.editer {
  height: calc(100% - 70px);
}
.nav {
  height: 70px;
  align-items: center;
  display: flex;
}
</style>
