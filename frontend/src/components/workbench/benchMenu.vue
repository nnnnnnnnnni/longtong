<template>
  <div class='bench-menu'>
    <div class="menu-item" :class="{'menu-active': this.$store.state.route == 'home'}" @click="jump('home')">
      <span class="item-icon">
        <a-icon type='home'></a-icon>
      </span>
      <span class="item-title">首页</span>
    </div>
    <div class="menu-item" :class="{'menu-active': this.$store.state.route == 'mission'}" @click="jump('mission')">
      <span class="item-icon">
        <a-icon type='bars'></a-icon>
      </span>
      <span class="item-title">我的任务</span>
    </div>
    <div class="menu-item" :class="{'menu-active': this.$store.state.route == 'project'}" @click="jump('project')">
      <span class="item-icon">
        <a-icon type='appstore'></a-icon>
      </span>
      <span class="item-title">我的项目</span>
    </div>
    <div class="menu-item" @click="isDrawerOpen = true">
      <span class="item-icon">
        <a-icon type="apartment" />
      </span>
      <span class="item-title">更多 MORE</span>
    </div>
    <drawer :status ='isDrawerOpen' @drawerClosed='isDrawerOpen = false' />
  </div>
</template>

<script>
import drawer from './drawer';
export default {
  name: 'benchMenu',
  data() {
    return {
      avitveMenu: this.$store.state.route,
      isDrawerOpen: false,
    };
  },
  components: {
    drawer
  },
  methods: {
    jump: function(pathName) {
      this.$router.push({name: pathName})
    },
  }
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
  line-height: 40px;
  display: flex;
  transition: all 0.3s;
  user-select: none;
}
.menu-item .item-icon {
  height: 40px;
  width: 40px;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.08);
}
.menu-active {
  background-color: #76c7fa !important;
}
</style>