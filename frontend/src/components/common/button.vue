<template>
  <div class="lt-button">
    <button :class="{
      'normal': type == 'normal' || !type, 
      'warning': type == 'warning', 
      'success': type == 'success', 
      'danger': type == 'danger',
      'circle': !!circle
      }"
      @click="handleClick"
    >
      <span>{{title}}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ltButton",
  props: ["title", "type", 'circle'],
  data() {
    return {};
  },
  methods: {
    handleClick: function(event){
      this.$emit('click', event)
    }
  }
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
  transition: all 0.2s;
  height: inherit;
  border-radius: 1px;
  cursor: pointer;
  font-size: inherit;
  letter-spacing: inherit;
  color: #ffffff;
}
.normal {
  background-color: #1890ff;
}
.normal:hover {
  background-color: #69c0ff;
}
.warning {
  background-color: #faad14;
}
.warning:hover {
  background-color: #ffd666;
}
.success {
  background-color: #a0d911;
}
.success:hover {
  background-color: #d3f261;
}
.danger {
  background-color: #f5222d;
}
.danger:hover {
  background-color: #ff7875;
}
.circle{
  border-radius: 5px;
}
</style>