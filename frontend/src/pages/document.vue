<template>
  <div class='document'>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'document',
  data() {
    return {};
  },
};
</script>


<style scoped>
.document{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>