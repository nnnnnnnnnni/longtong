<template>
  <div id="vditor"></div>
</template>

<script>
// https://ld246.com/article/1549638745630#--%E7%AE%80%E4%BB%8B
import Vditor from "vditor";
import "vditor/dist/index.css";
export default {
  name: "editer",
  data() {
    return {
      contentEditor: '',
      ca: 1
    };
  },
  model: {
    prop: "body", //指向props的参数名
    event: "change" //事件名称
  },
  props: ["body", "mode"],
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 360,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      mode: this.mode || "wysiwyg",
      toolbar: [
        "emoji",
        "|",
        "headings",
        "bold",
        "italic",
        "|",
        "line",
        "ordered-list",
        "check",
        "code",
        "undo",
        "redo",
        "upload",
        "link",
        "table",
        "export",
        "fullscreen"
      ],
      typewriterMode: true,
      upload: {
        fieldName: "file",
        accept: "image/*",
        url: "http://localhost:8000/generic/upload",
        filename(name) {
          return name
            .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "")
            .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "")
            .replace("/\\s/g", "");
        },
        linkToImgCallback: function(res) {
          console.log(res);
        },
        format: function(files, res) {
          return JSON.stringify({
            msg: "success",
            code: 0,
            data: {
              errFiles: [],
              succMap: {
                "image1.png": JSON.parse(res).data.file
              }
            }
          });
        }
      },
      input: (val, pre) => {
        this.$emit("change", val);
      }
    });
  },
  methods: {
    clearEditer: () => {
      console.log(this.ca)
    }
  }
};
</script>

<style scoped>
.vditor-reset {
  background-color: transparent !important;
}
</style>
