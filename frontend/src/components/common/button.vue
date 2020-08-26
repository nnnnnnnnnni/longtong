<template>
  <div class="lt-button">
    <button>
      <span>{{title}}</span>
    </button>
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
.lt-button {
  width: 95%;
  height: 100%;
}
button {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: #1890ff;
  transition: all 0.2s;
  height: inherit;
  border-radius: 5px;
  cursor: pointer;
  font-size: inherit;
  letter-spacing: inherit;
  color: #ffffff;
}
button:hover {
  background-color: #69c0ff;
}
</style>