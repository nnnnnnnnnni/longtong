<template>
  <div class="companySetting">
    <a-tabs default-active-key="1" @change="changeTab">
      <a-tab-pane key="1" tab="基本设置">
        <baseTab :activeTab='activeTab' />
      </a-tab-pane>
      <a-tab-pane key="2" tab="人员设置">
        <participantsTab :activeTab='activeTab' />
      </a-tab-pane>
      <a-tab-pane key="3" tab="项目设置">
        <projectTab :activeTab='activeTab' />
      </a-tab-pane>
      <a-tab-pane key="4" tab="部门设置">
        <departmentTab :activeTab='activeTab' />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
// https://www.highcharts.com/demo/network-graph
import baseTab from "./tabs/base";
import projectTab from "./tabs/projects";
import participantsTab from "./tabs/participants";
import departmentTab from "./tabs/department";
export default {
  name: "companySetting",
  data() {
    return {
      activeTab: 1,
    };
  },
  components: {
    baseTab,
    projectTab,
    participantsTab,
    departmentTab
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
.companySetting {
  height: 100%;
  width: 100%;
}
</style>
