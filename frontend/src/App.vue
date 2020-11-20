<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url('//fonts.googleapis.com/css?family=Montserrat:300,400,500,600');
@import url('./assets/scroll.css');
/* @import url('https://fonts.yecdn.com/css2?family=Noto+Serif+SC:wght@300;700&display=swap');
@import url('https://fonts.yecdn.com/css2?family=Noto+Sans+SC&display=swap'); */

html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
}
#app {
  font-family: 'Montserrat', 'Noto Sans SC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
th._center,
td._center {
  text-align: center !important;
}
.fc-header-toolbar, .fc-toolbar, .fc-toolbar-ltr{
  display: none !important;
}
.ant-drawer-title {
  display: flex !important;
  justify-content: space-between;
}
.ant-table td { white-space: nowrap; }
.vditor-preview__action{
  display: none !important;
}
.vditor-reset img {
  margin: 0 auto;
  display: inherit;
}
.vditor-reset table {
  margin: 0 auto;
}
</style>
