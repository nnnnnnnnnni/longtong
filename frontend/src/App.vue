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

html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  min-width: 1250px;
}
#app {
  font-family: 'Montserrat', sans-serif;
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
.week-navigator{
  display: none !important;
}
</style>
