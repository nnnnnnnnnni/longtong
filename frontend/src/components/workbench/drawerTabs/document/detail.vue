<template>
  <div class="document-detail">
    <div class="top">
      <h1 class="title">{{ doc.title }}</h1>
    </div>
    <div class="author">
      <div class="avator item">
        <img :src="doc.author.avator" alt="" />
      </div>
      <div class="name item">
        <a-button type="link">{{ doc.author.name }}</a-button>
      </div>
      <div class="mail item">
        <a-icon type="mail" />
        <a-button type="link">{{ doc.author.mail }}</a-button>
      </div>
      <div class="time item">
        <a-icon type="calendar" />
        <a-button type="link">{{ doc.createTime }}</a-button>
      </div>
      <div class="read item">
        <a-icon type="eye" />
        <a-button type="link">{{ doc.visitors.length }}</a-button>
      </div>
      <div class="action item">
        <a-button-group>
          <a-button
            @click="back"
            class="edit"
            size="small"
            type="primary"
            >返回</a-button
          >
          <a-button
            @click="edit"
            class="edit"
            size="small"
            type="primary"
            v-if="doc.author._id === this.$store.state.user._id"
            >编辑</a-button
          >
        </a-button-group>
      </div>
    </div>
    <div class="body" id="body"></div>
  </div>
</template>

<script>
import VditorPreview from "vditor/dist/method.min";
import "vditor/dist/index.css";
export default {
  name: "document",
  data() {
    return {
      id: this.$route.params.id,
      doc: { author: {}, visitors: [] }
    };
  },
  mounted() {
    this.getDoc();
    console.log();
  },
  methods: {
    back: function() {
      this.$router.push({name: 'document_list'})
    },
    edit: function() {
      this.$router.push({
        name: "document_add",
        query: { id: this.doc._id },
        params: { body: this.doc.body, title: this.doc.title }
      });
    },
    getDoc: function() {
      this.$get("/document/docById", {
        id: this.id
      }).then(async res => {
        await VditorPreview.preview(
          document.getElementById("body"),
          res.data.body
        );
        this.doc = res.data;
      });
    }
  }
};
</script>

<style scoped>
.document-detail {
  height: 100%;
  overflow-y: auto;
  padding: 20px 25%;
  width: 100%;
  min-width: 200px;
  margin: 0 auto;
}
.top {
  position: relative;
}
.top .edit {
  float: right;
}
.title {
  margin-bottom: 0px;
}
.author {
  height: 50px;
  display: flex;
  align-items: center;
}
.author .item {
  line-height: 30px;
  height: 30px;
}
.author .item i {
  color: #000;
}
.author .avator {
  height: 30px;
  margin-right: 10px;
}
.author .avator img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
.body {
  background-color: #fafafa;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
}
</style>
