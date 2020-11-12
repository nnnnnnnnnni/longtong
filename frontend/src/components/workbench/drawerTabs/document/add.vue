<template>
  <div class="adddocument">
    <div class="nav">
      <a-input
        size="large"
        v-model="title"
        placeholder="请在此输入标题"
        style="margin-right: 20px"
      />
      <a-button icon="rocket" size="large" type="primary" @click="saveDoc"
        >发 布</a-button
      >
    </div>
    <div class="editer">
      <editer mode="sv" ref="refEditer" v-model="body" :val="editerVal" />
    </div>
  </div>
</template>

<script>
import editer from "../../../common/editer";
export default {
  name: "add",
  data() {
    return {
      title: "",
      body: "",
      editerVal: null
    };
  },
  components: {
    editer
  },
  created() {
    this.title = this.$route.params.title;
    this.editerVal = this.$route.params.body;
    this.body = this.$route.params.body;
    if (this.$route.query.id) {
      this.getDoc(this.$route.query.id);
    }
  },
  methods: {
    getDoc: function(id) {
      this.$get("/document/docById", {
        id: id
      }).then(res => {
        this.editerVal = res.data.body;
        this.title = res.data.title;
      });
    },
    saveDoc: function() {
      if (!this.title) return this.$message.error("必填：标题");
      if (!this.body) return this.$message.error("必填：内容");
      this.$post("/document/create", {
        title: this.title,
        body: this.body,
        id: this.$route.query.id
      }).then(res => {
        if (res.status == 200) {
          this.$message.success("成功, 2秒后跳转到详情页");
          setTimeout(() => {
            this.$router.push({
              name: "document_detail",
              params: { id: res.data._id }
            });
          }, 2000);
        }
      });
    }
  }
};
</script>

<style scoped>
.adddocument {
  box-sizing: border-box;
  padding: 10px 6%;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.editer {
  height: calc(100% - 70px);
}
.nav {
  height: 70px;
  align-items: center;
  display: flex;
}
</style>
