<template>
  <div class="approve">
    <a-tabs size="small" default-active-key="1" @change="changeTab">
      <a-tab-pane key="1" tab="发起申请">
        <my-start :activeTab="activeTab" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="我的审批">
        <my-approve :activeTab="activeTab" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="已提交">
        <processing :activeTab="activeTab" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import myApprove from '../components/workbench/drawerTabs/approve/myApprove'
import processing from '../components/workbench/drawerTabs/approve/processing'
import myStart from '../components/workbench/drawerTabs/approve/myStart'
export default {
  name: "approve",
  data() {
    return {
      activeTab: 1
    };
  },
  components: {
    myApprove,processing,myStart
  },
  methods: {
    // tab 切换通知
    changeTab: function(index) {
      this.activeTab = index;
    }
  }
};
</script>

<style scoped>
.approve {
  height: 100%;
  width: 60%;
  min-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
