<template>
  <div class="ltUpload">
      <lt-button title='点击上传' @click="upload">
  </div>
</template>

<script>
import ltButton from './button'
export default {
  name: "ltUpload",
  props: ['multiple'],
  data() {
    return {
      files: null,
    };
  },
  components: {
      ltButton
  },
  methods: {
    fileChange: function (files) {
      console.log(files);
      this.file = files;
    },
    upload: function(){
        
    }
  },
};
</script>


<style scoped>
.ltUpload {
    width: 101px;
    height: 40px;
}
</style>