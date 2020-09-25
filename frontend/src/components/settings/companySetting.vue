<template>
  <div class="companySetting">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="基本设置">
        <baseTab />
      </a-tab-pane>
      <a-tab-pane key="2" tab="人员设置">
        <participantsTab />
      </a-tab-pane>
      <a-tab-pane key="3" tab="项目设置">
        <projectTab />
      </a-tab-pane>
      <a-tab-pane key="4" tab="部门设置">
        <departmentTab />
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
    return {};
  },
  components: {
    baseTab,
    projectTab,
    participantsTab,
    departmentTab
  }
};
</script>

<style scoped>
.companySetting {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
