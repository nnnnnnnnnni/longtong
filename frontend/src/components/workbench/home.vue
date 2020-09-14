<template>
  <div class="home">
    <div>
      <a-tabs size='small' @change="callback">
        <a-tab-pane key="1" tab="所有任务">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane key="2" tab="我发起的" force-render>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="我参与的">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
};
</script>


<style scoped>
.home {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>