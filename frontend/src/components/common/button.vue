<template>
  <div class="lt-button">
    <div class="button-container">
      <button>{{title}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ltButton",
  props: ["title", "loading"],
  data() {
    return {};
  },
};
</script>


<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
}
.button-container button {
  flex: 1;
  border: none;
  outline: none;
  background-color: #69c0ff;
  transition: all 0.2s;
  height: 45px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 3px;
  color: #ffffff;
}
.button-container button:hover {
  background-color: #1890ff;
}
</style>