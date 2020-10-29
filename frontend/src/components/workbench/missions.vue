<template>
  <div class="missions">
    <a-tabs size="small">
      <a-tab-pane key="1" tab="所有任务">
        <all />
      </a-tab-pane>
      <a-tab-pane key="2" tab="我发起的">
        <launch />
      </a-tab-pane>
      <a-tab-pane key="3" tab="我参与的">
        <participate />
      </a-tab-pane>
      <a-select default-value="lucy" style="width: 120px"  slot="tabBarExtraContent">
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="lucy1">Lucy1</a-select-option>
      </a-select>
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
    return {};
  },
  components: {
    participate,
    all,
    launch,
  },
};
</script>


<style scoped>
</style>