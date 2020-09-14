<template>
  <div class='bench-menu'>
    <div class="menu-item">
      <span class="item-icon">
        <a-icon type='home'></a-icon>
      </span>
      <span class="item-title">首页</span>
    </div>
    <div class="menu-item">
      <span class="item-icon">
        <a-icon type='bars'></a-icon>
      </span>
      <span class="item-title">我的任务</span>
    </div>
    <div class="menu-item">
      <span class="item-icon">
        <a-icon type='appstore'></a-icon>
      </span>
      <span class="item-title">我的项目</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'benchMenu',
  data() {
    return {};
  },
};
</script>


<style scoped>
.bench-menu{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 40px 0px;
}
.menu-item {
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
}
</style>