<template>
  <div class="missions">
    <a-tabs size="small" default-active-key="1" @change="changeTab">
      <a-tab-pane key="1" tab="所有任务">
        <all :activeTab='activeTab'/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="我发起的">
        <launch :activeTab='activeTab'/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="我参与的">
        <participate :activeTab='activeTab' />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import participate from "./missionTabs/participate";
import launch from "./missionTabs/launch";
import all from "./missionTabs/all";
export default {
  name: "missions",
  data() {
    return {
      activeTab: 1,
    };
  },
  components: {
    participate,
    all,
    launch,
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
.missions {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>