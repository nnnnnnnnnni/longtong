<template>
  <div class='missions'>
    <div>
      <a-tabs size='small'>
        <a-tab-pane key="1" tab="所有任务">
          <all />
        </a-tab-pane>
        <a-tab-pane key="2" tab="我发起的" force-render>
          <launch />
        </a-tab-pane>
        <a-tab-pane key="3" tab="我参与的">
          <participate />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import participate from './tabs/participate'
import launch from './tabs/launch'
import all from './tabs/all'
export default {
  name: 'missions',
  data() {
    return {};
  },
  components: {
    participate,
    all,
    launch
  }
};
</script>


<style scoped>

</style>