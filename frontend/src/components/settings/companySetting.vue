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
    </a-tabs>
  </div>
</template>

<script>
import baseTab from "./tabs/base";
import projectTab from "./tabs/projects";
import participantsTab from "./tabs/participants";
export default {
  name: "companySetting",
  data() {
    return {};
  },
  components: {
    baseTab,
    projectTab,
    participantsTab
  }
};
</script>

<style scoped></style>
