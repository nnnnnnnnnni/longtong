<template>
  <div class='projectSetting'>
    <div class="creater" v-if="this.$store.state.user.company.role== 'creater'">
      <a-empty>
        <span slot="description">管理员可在（公司设置 -> 项目设置）内设置</span>
        <a-button type='primary' @click="jumpPage">跳转</a-button>
      </a-empty>
    </div>
  </div>
</template>

<script>
export default {
  name: 'projectSetting',
  data() {
    return {};
  },
  methods: {
    jumpPage: function() {
      this.$router.push({name: 'company', params: {tab: 2}});
    }
  }
};
</script>


<style scoped>
.projectSetting{
  height: inherit;
}
.creater{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>