<template>
  <div class="list">
    <div class="container">
      <div class="nav">
        <a-input
          v-model="text"
          style="width:300px;margin-right: 50px"
          placeholder="请输入标题"
        ></a-input>
        <a-button-group>
          <a-button type="primary" icon="sync" @click="reset">重置</a-button>
          <a-button type="primary" icon="search" @click="search">查询</a-button>
          <a-button type="primary" icon="edit" @click="jump">写文档</a-button>
        </a-button-group>
      </div>
      <div class="doc" v-for="doc in docs" :key="doc._id">
        <div class="top">
          <router-link :to="{name: 'document_detail',params: {id: doc._id}}">{{ doc.title }}</router-link>
        </div>
        <div class="preview">{{ doc.body }}</div>
        <div class="infos">
          <div class="avator item">
            <img :src="doc.author.avator" alt="" />
          </div>
          <div class="name item"><a-icon type="user" />{{ doc.author.name }}</div>
          <div class="time item"><a-icon type="calendar" />{{ doc.time }}</div>
          <div class="red item">
            <a-icon type="eye" />{{ doc.visitors.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VditorPreview from "vditor/dist/method.min";
export default {
  name: "list",
  data() {
    return {
      docs: [],
      text: ""
    };
  },
  mounted() {
    this.getDocs();
  },
  methods: {
    reset: function() {
      this.text = "";
    },
    jump: function() {
      this.$router.push({ name: "document_add" });
    },
    search: function() {
      this.getDocs(this.text);
    },
    getDocs: function(text) {
      const params = {};
      if (text) {
        params.text = text;
      }
      this.$get("/document/docs", params).then(res => {
        let data = [...res.data];
        data.map(item => {
          item.body = item.body.slice(0, 300);
          return item;
        });
        this.docs = data;
      });
    }
  }
};
</script>

<style scoped>
.list {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px;
}
.container {
  width: 60%;
  margin: 0 auto;
  min-width: 1000px;
}
.nav {
  display: flex;
  height: 60px;
  align-items: center;
}
.doc {
  padding: 10px 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: all 0.3s;
}
.doc:hover {
  border-color: #40a9ff;
  cursor: pointer;
}
.doc a {
  font-size: 20px;
  margin-bottom: 10px;
  display: inline-block;
  transition: all 0.3s;
}
.doc a:hover {
  text-decoration: underline;
}
.doc .preview {
  height: 60px;
  line-height: 30px;
  margin-bottom: 10px;
  overflow: hidden;
}
.doc .infos {
  display: flex;
  height: 30px;
  align-items: center;
  line-height: 30px;
}
.doc .infos i {
  display: inline-block;
  margin-right: 5px;
}
.doc .infos .item {
  margin-right: 10px;
  font-size: 12px;
}
.doc .infos .avator {
  height: 20px;
  width: 20px;
  margin: 5px;
}
.doc .infos .avator img {
  height: inherit;
  width: inherit;
  border-radius: 50%;
  float: left;
}
</style>
